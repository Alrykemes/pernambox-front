import api, { setAuthToken } from "@/lib/api";
import type { LoginType } from "@/schemas/auth/login";
import type { User } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

let fetchUserPromise: Promise<User | null> | null = null;

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<User | null>;
  login: (data: LoginType) => Promise<void>;
  logout: (callServer: boolean) => Promise<void>;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

      login: async (data: LoginType) => {
        sessionStorage.setItem("sessionActive", "true");

        try {
          const { data: response } = await api.post("/auth/login", data);
          const token = response.token;

          setAuthToken(token);
          set({ accessToken: token });

          const user = await get().fetchUser();
          set({ user: user });
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },

      logout: async (callServer: boolean) => {
        if (callServer) {
          try {
            await api.post("/auth/logout", null, { withCredentials: true });
          } catch (err) {
            console.warn("Logout request failed:", err);
          }
        }
        get().setUser(null);
        get().setAccessToken(null);
        setAuthToken(undefined);
        sessionStorage.removeItem("auth-storage");
        sessionStorage.removeItem("sessionActive");
      },

      fetchUser: async () => {
        const { user } = get();
        if (user) return user;

        if (fetchUserPromise) return fetchUserPromise;

        fetchUserPromise = (async () => {
          try {
            const { data } = await api.get("/auth/me");
            set({ user: data });
            return data as User;
          } catch (err) {
            set({ user: null });
            return null;
          } finally {
            fetchUserPromise = null;
          }
        })();

        return fetchUserPromise;
      },

      setAccessToken: (token: string | null) => {
        set({ accessToken: token });
        setAuthToken(token ?? undefined);
      },
      setUser: (user) => set({ user }),
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
