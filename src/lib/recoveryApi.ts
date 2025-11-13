import { useResetPasswordStore } from "@/stores/reset-password-store";
import axios from "axios";

export const recoveryApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// this token is specifically for password recovery flows
recoveryApi.interceptors.request.use((config) => {
  if (!config.headers?.Authorization) {
    const { token } = useResetPasswordStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  console.log("Request headers:", config.headers?.Authorization ?? null);
  return config;
});
