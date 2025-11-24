import { useAuthStore } from "@/stores/auth-store";
import axios, { type AxiosRequestConfig } from "axios";

/* ============================================================
   Instâncias base
============================================================ */

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const noAuthApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/* ============================================================
   Controle interno
============================================================ */

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (error: any) => void;
  originalRequest: AxiosRequestConfig;
}> = [];

/* ============================================================
   Processamento da fila
============================================================ */

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, originalRequest }) => {
    if (token) {
      const retryConfig: AxiosRequestConfig = {
        ...originalRequest,
        headers: {
          ...(originalRequest.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      };

      resolve(authApi(retryConfig));
    } else {
      reject(error);
    }
  });

  failedQueue = [];
};

/* ============================================================
   Interceptor de request
============================================================ */

authApi.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

/* ============================================================
   Interceptor de resposta
============================================================ */

authApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Permitir falhar login normal
      if (
        originalRequest.url === "/auth/login" &&
        originalRequest.method === "post"
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, originalRequest });

        if (!isRefreshing) {
          isRefreshing = true;

          (async () => {
            try {
              const response = await noAuthApi.get("/auth/refresh-token");

              const { setAccessToken, setAuthReady } =
                useAuthStore.getState();
              setAuthReady(false);

              const newToken = response.data.token;
              setAccessToken(newToken);

              processQueue(null, newToken);
            } catch (refreshError) {
              processQueue(refreshError, null);

              const { logout } = useAuthStore.getState();
              await logout();
            } finally {
              isRefreshing = false;
            }
          })();
        }
      });
    }

    return Promise.reject(error);
  }
);
