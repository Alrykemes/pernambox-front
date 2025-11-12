import { authApi } from "@/lib/authApi";
import type { LoginType } from "@/pages/auth/Login";
import type { AuthMeResponse, LoginResponse } from "@/types/api/auth";
import type { User } from "@/types/common";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<User | null>;
  login: (data: LoginType) => Promise<User | null>;
  logout: () => Promise<void>;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isAuthReady: boolean;
  setAuthReady: (v: boolean) => void;

  clearAuthData: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthReady: false,

      login: async (data: LoginType) => {
        try {
          const { data: response } = await authApi.post<LoginResponse>(
            "/auth/login",
            data,
          );
          const token = response.token;
          if (!token) throw new Error("O token de acesso não foi fornecido.");

          set({ accessToken: token });
          sessionStorage.setItem("sessionActive", "true");

          const user = await get().fetchUser();
          return user;
        } catch (error) {
          get().clearAuthData();
          throw error;
        }
      },

      logout: async () => {
        try {
          await authApi.post("/auth/logout");
        } catch (err) {
          throw err;
        }
        get().clearAuthData();
      },

      fetchUser: async () => {
        const cachedUser = get().user;
        if (cachedUser) return cachedUser;
        try {
          const { data } = await authApi.get<AuthMeResponse>("/auth/me");
          const user = data;
          if (!user) throw new Error("Usuário não encontrado.");
          set({ user });
          return user;
        } catch (err) {
          set({ user: null });
          throw err;
        }
      },

      clearAuthData: () => {
        set({ user: null, accessToken: null });
        sessionStorage.removeItem("auth-storage");
        sessionStorage.removeItem("sessionActive");
      },

      setAccessToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      setAuthReady: (ready) => set({ isAuthReady: ready }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user
          ? {
              userId: state.user.userId,
              name: state.user.name,
              email: state.user.email,
              phone: state.user.phone,
              role: state.user.role,
              avatar: state.user.avatar,
            }
          : null,
      }),
    },
  ),
);
