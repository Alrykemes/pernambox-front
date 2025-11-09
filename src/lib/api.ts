import { authApi } from "@/lib/authApi";
import { useAuthStore } from "@/stores/auth-store";
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// attach token to each request if available
api.interceptors.request.use((config) => {
  const sessionActive = sessionStorage.getItem("sessionActive");
  if (!sessionActive) {
    console.log("Sem sessão ativa");
    return config;
  }

  if (!config.headers?.Authorization) {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  console.log("Request headers:", config.headers?.Authorization ?? null);
  return config;
});

// get response and handle errors globally
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.message ||
      "Um erro inesperado ocorreu";

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {

        if (originalRequest.url === "/auth/login" && originalRequest.method === "post") {
          return Promise.reject(error);
        }

        console.log("axios: tentando refresh token");
        const { data } = await authApi.get("/auth/refresh-token", {
          withCredentials: true,
        });

        const newToken = data.token;
        setAuthToken(newToken);
        useAuthStore.getState().setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.log("axios: refresh token falhou, limpando autenticação local");
        useAuthStore.getState().logout(false);
        return Promise.reject(err);
      }
    } else if (status === 500) {
      toast.error("Erro interno do servidor: " + message);
    } else {
      console.log("Erro: " + message);
    }

    return Promise.reject(error);
  },
);

export default api;
