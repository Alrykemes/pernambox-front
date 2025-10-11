import api from "@/lib/api";
import type { LoginType } from "@/schemas/auth/login";
import type { User } from "@/types/user";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  fetchUser: () => Promise<void>;
  login: (data: LoginType) => Promise<void>;
  logout: () => void;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  loading: false,

  login: async (data: LoginType) => {
    try {
      const { data: response } = await api.post("/auth/login", data);
      set({ user: response.user, accessToken: response.accessToken });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  logout: () => {
    set({ user: null, accessToken: null });
  },

  fetchUser: async () => {
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data });
    } catch {
      set({ user: null });
    }
  },

  setAccessToken: (token) => set({ accessToken: token }),
}));
