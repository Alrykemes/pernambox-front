import api from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { accessToken, setAccessToken, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await api.get("/auth/refresh-token", {
          withCredentials: true,
        });
        setAccessToken(data.accessToken);
        await fetchUser();
      } catch {
        logout();
      }
    };
    if (!accessToken) init();
  }, []);

  return <>{children}</>;
}
