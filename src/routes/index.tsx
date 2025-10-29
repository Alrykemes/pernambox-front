import { CenteredLayout } from "@/layouts/CenteredLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import type { RouteObject } from "react-router-dom";
import { authRoutes } from "./auth.routes";
import { dashboard } from "./dashboard";
import { passwordResetRoutes } from "./password-reset.routes"; 
import { unitsRoutes } from "./units.routes";
import { employeesRoutes } from "./employee.routes";

export const routes: RouteObject[] = [
  {
    element: <CenteredLayout />,
    children: [...authRoutes, ...passwordResetRoutes],
  },
  {
    element: <DashboardLayout />,
    children: [...dashboard, ...unitsRoutes, ...employeesRoutes],
  },
];
