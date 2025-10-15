import { useAuthStore } from "@/stores/auth-store";
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

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
        const { data } = await api.get("/auth/refresh-token", {
          withCredentials: true,
        });
        const { accessToken } = data;
        useAuthStore.getState().setAccessToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
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
