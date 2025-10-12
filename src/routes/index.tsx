import { CenteredLayout } from "@/components/layouts/CenteredLayout";
import type { RouteObject } from "react-router-dom";
import { authRoutes } from "./auth.routes";
import { passwordResetRoutes } from "./password-reset.routes";

export const routes: RouteObject[] = [
  {
    element: <CenteredLayout />,
    children: [...authRoutes, ...passwordResetRoutes],
  },
];
