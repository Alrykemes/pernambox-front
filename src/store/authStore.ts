import api from "@/lib/api";
import { create } from "zustand";

type User = {
  id: string;
  email: string;
  role: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  setAccessToken: (token: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  loading: false,

  login: async (email, password, rememberMe) => {
    try {
      const { data } = await api.post("/auth/login", { email, password, rememberMe });
      set({ user: data.user, accessToken: data.accessToken });
    } catch (error) {
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
