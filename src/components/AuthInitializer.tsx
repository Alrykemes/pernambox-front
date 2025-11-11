import { authApi } from "@/lib/authApi";
import { useAuthStore } from "@/stores/auth-store";
import { type ReactNode, useEffect } from "react";

export function AuthInitializer({ children }: { children: ReactNode }) {
  const {
    accessToken,
    setAccessToken,
    setUser,
    setAuthReady,
    user,
    fetchUser,
  } = useAuthStore();

  useEffect(() => {
    const tryRefresh = async () => {
      const hasSession = sessionStorage.getItem("sessionActive");
      if (accessToken) return;
      if (!hasSession) return;

      try {
        const { data } = await authApi.get("/auth/refresh-token");
        setAccessToken(data.token);
        if (!user) {
          const user = await fetchUser();
          if (user) setUser(user);
        }
      } catch (err) {
        // ignore refresh errors
      } finally {
        setAuthReady(true);
      }
    };

    tryRefresh();
  }, [accessToken, setAccessToken, setUser, fetchUser, setAuthReady, user]);

  return children;
}
