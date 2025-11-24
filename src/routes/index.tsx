import { CenteredLayout } from "@/components/layouts/CenteredLayout";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { authRoutes } from "@/routes/auth.routes";
import { dashboardRoutes } from "@/routes/dashboard.routes";
import { configRoutes } from "@/routes/config.routes";
import type { RouteObject } from "react-router-dom";
import { passwordResetRoutes } from "./password-reset.routes";
import { PublicRoute } from "@/components/PublicRoute";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <CenteredLayout />
      </PublicRoute>
    ),
    children: [...authRoutes],
  },
  {
    path: "/recuperar-senha",
    element: (
      <PublicRoute>
        <CenteredLayout />
      </PublicRoute>
    ),
    children: [...passwordResetRoutes],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [...dashboardRoutes],
    handle: { breadcrumb: "Dashboard" },
  },
  {
    path: "/configuracoes",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [...configRoutes],
    handle: { breadcrumb: "Configurações" },
  },
];
