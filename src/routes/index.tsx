import { CenteredLayout } from "@/layouts/CenteredLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import type { RouteObject } from "react-router-dom";
import { authRoutes } from "@/routes/auth.routes";
import { dashboardRoutes } from "@/routes/dashboard.routes";
import { passwordResetRoutes } from "./password-reset.routes";

export const routes: RouteObject[] = [
  {
    element: <CenteredLayout />,
    children: [...authRoutes, ...passwordResetRoutes],
  },
  {
    element: <DashboardLayout />,
    children: [...dashboardRoutes],
  },
];
