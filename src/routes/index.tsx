import { CenteredLayout } from "@/components/layouts/CenteredLayout";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { authRoutes } from "@/routes/auth.routes";
import { dashboardRoutes } from "@/routes/dashboard.routes";
import type { RouteObject } from "react-router-dom";
import { passwordResetRoutes } from "./password-reset.routes";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <CenteredLayout />,
    children: [...authRoutes],
  },
  {
    path: "/recuperar-senha",
    element: <CenteredLayout />,
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
];
