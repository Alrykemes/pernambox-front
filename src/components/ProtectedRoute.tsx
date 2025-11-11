import { useAuthStore } from "@/stores/auth-store";
import { Navigate } from "react-router-dom";
import { FullPageSpinner } from "./FullPageSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, accessToken, isAuthReady } = useAuthStore();

  if (!isAuthReady) {
    return <FullPageSpinner />;
  }

  if (!user || !accessToken) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
