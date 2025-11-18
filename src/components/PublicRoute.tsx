import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import type { ReactNode } from "react";
import { FullPageSpinner } from "./FullPageSpinner";

export function PublicRoute({ children }: { children: ReactNode }) {
    const { accessToken, isAuthReady } = useAuthStore();
    const hasSession = sessionStorage.getItem("sessionActive");
  
    // Enquanto a auth não estiver pronta, não tomamos decisões
    if (!isAuthReady) {
      return <FullPageSpinner />;
    }
  
    // Quando a auth já está pronta:
    // Se há token E há sessão → redirecionar home
    if (accessToken && hasSession) {
      return <Navigate to="/dashboard" replace />;
    }
    
    console.log(!isAuthReady, accessToken, hasSession);

    // Caso contrário, o utilizador pode ir pro login
    return <>{children}</>;
}