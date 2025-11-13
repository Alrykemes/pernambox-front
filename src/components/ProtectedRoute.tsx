import { useAuthStore } from "@/stores/auth-store";
import { Navigate } from "react-router-dom";
import { FullPageSpinner } from "./FullPageSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, accessToken, isAuthReady } = useAuthStore();

  return (
    !isAuthReady ? (
      <FullPageSpinner />
    ) 
    : (!user || !accessToken) ? (
      <Navigate to="/" replace />
    ) 
    : <>{children}</>
  );
}
