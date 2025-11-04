import { authApi } from "@/lib/authApi";
import { useAuthStore } from "@/stores/auth-store";
import { type ReactNode, useEffect, useRef } from "react";

export function AuthInitializer({ children }: { children: ReactNode }) {
  const { accessToken, setAccessToken, setUser } = useAuthStore();
  const triedRefreshRef = useRef(false);

  useEffect(() => {
    const tryRefresh = async () => {
      if (accessToken || triedRefreshRef.current) return;
      triedRefreshRef.current = true;

      const hasSession = sessionStorage.getItem("sessionActive");
      if (!hasSession) {
        console.log("Sem sessão local — não tentando refresh.");
        return;
      }

      try {
        console.log("Tentando refresh token...");
        const { data } = await authApi.get("/auth/refresh-token", {
          withCredentials: true,
        });
        setAccessToken(data.accessToken);
        setUser(data.user);
        console.log("Sessão restaurada com sucesso.");
      } catch (err) {
        console.warn("Refresh falhou, limpando sessão.", err);
        sessionStorage.removeItem("sessionActive");
      }
    };

    tryRefresh();
  }, [accessToken, setAccessToken, setUser]);

  return children;
}
