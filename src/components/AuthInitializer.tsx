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
    const initialize = async () => {
      // ✅ Aguarda a reidratação manualmente
      const waitForHydration = async () => {
        if (useAuthStore.persist.hasHydrated()) return;
        await new Promise<void>((resolve) => {
          const unsub = useAuthStore.persist.onFinishHydration(() => {
            unsub();
            resolve();
          });
        });
      };

      await waitForHydration();

      const hasSession = sessionStorage.getItem("sessionActive");

      // 🔹 Caso 1: já há token
      if (accessToken) {
        try {
          if (!user) {
            const fetchedUser = await fetchUser();
            if (fetchedUser) setUser(fetchedUser);
          }
        } catch {
          // ignore refresh errors
        } finally {
          setAuthReady(true);
        }
        return;
      }

      // 🔹 Caso 2: há sessão mas sem token
      if (hasSession && !accessToken) {
        try {
          const { data } = await authApi.get("/auth/refresh-token");
          setAccessToken(data.token);
          const fetchedUser = await fetchUser();
          if (fetchedUser) setUser(fetchedUser);
        } catch {
          // ignore refresh errors
        } finally {
          setAuthReady(true);
        }
        return;
      }

      // 🔹 Caso 3: sem sessão nem token
      setAuthReady(true);
    };

    initialize();
  }, [accessToken, user, fetchUser, setUser, setAccessToken, setAuthReady]);

  return children;
}
