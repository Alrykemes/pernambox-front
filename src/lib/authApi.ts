import { useAuthStore } from "@/stores/auth-store";
import axios from "axios";

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    token ? prom.resolve(token) : prom.reject(error);
  });
  failedQueue = [];
};

authApi.interceptors.request.use((config) => {
  if(config.url === "auth/logout") {
    config.headers.Authorization = '';
    return config;
  }
  const { accessToken } = useAuthStore.getState();
  if (!config.headers?.Authorization && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// authApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalReq = error.config;
//     const { setAccessToken, logout } = useAuthStore.getState();

//     if (error.response?.status === 401 && !originalReq._retry) {

//       if (originalReq.url === "/auth/login" && originalReq.method === "post") {
//         return Promise.reject(error);
//       }

//       if (originalReq.url === "/auth/refresh-token" && originalReq.method === "get") {
//         return Promise.reject(error);
//       }

//       console.log("401 recebido, tentando refresh token...");
//       if (isRefreshing) {
//         // queue requests while refresh is in progress
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           originalReq.headers!["Authorization"] = `Bearer ${token}`;
//           return authApi(originalReq);
//         }).catch((error) => {
//           return Promise.reject(error);
//         });
//       }

//       originalReq._retry = true;
//       isRefreshing = true;

//       try {
//         const { data } = await authApi.get("/auth/refresh-token");
//         setAccessToken(data.token);
//         processQueue(null, data.token);
//         originalReq.headers!["Authorization"] = `Bearer ${data.token}`;
//         return authApi(originalReq);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         logout(); // clear state and redirect to /login
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     return Promise.reject(error);
//   },
// );

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalReq = error.config;
    const { setAccessToken, logout } = useAuthStore.getState();

    // impede loop: não tenta refresh da request de refresh
    if (originalReq?._isRefreshRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalReq._retry) {

      if (originalReq.url === "/auth/login" && originalReq.method === "post") {
        return Promise.reject(error);
      }

      console.log("401 recebido, tentando refresh token...");

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalReq.headers["Authorization"] = `Bearer ${token}`;
          return authApi(originalReq);
        });
      }

      originalReq._retry = true;
      isRefreshing = true;

      try {
        const { data } = await authApi.get("/auth/refresh-token", {
          _isRefreshRequest: true, // ⬅ ESSENCIAL
        });

        setAccessToken(data.token);
        processQueue(null, data.token);

        originalReq.headers["Authorization"] = `Bearer ${data.token}`;
        return authApi(originalReq);

      } catch (refreshError) {
        processQueue(refreshError, null);
        logout();
        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);