import { useAuthStore } from "@/stores/auth-store";
import { Navigate } from "react-router-dom";
import { FullPageSpinner } from "./FullPageSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { accessToken, isAuthReady } = useAuthStore();
  const hasSession = sessionStorage.getItem("sessionActive");

  // Enquanto a auth não estiver pronta, não tomamos decisões
  if (!isAuthReady) {
    return <FullPageSpinner />;
  }

  // Quando a auth já está pronta:
  // Se não há token E não há sessão → redirecionar
  if (!accessToken && !hasSession) {
    return <Navigate to="/" replace />;
  }

  // Caso contrário, o utilizador pode entrar
  return <>{children}</>;
}
