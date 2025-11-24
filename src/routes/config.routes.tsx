import SystemConfig from "@/pages/config/SystemConfig";
import UserProfile from "@/pages/config/UserProfile";
import { Navigate } from "react-router-dom";

export const configRoutes = [
  {
    index: true,
    element: <Navigate to="sistema" replace />,
  },
  {
    path: "perfil",
    element: <UserProfile />,
    handle: { breadcrumb: "Meu Perfil" },
  },
  {
    path: "sistema",
    element: <SystemConfig />,
    handle: { breadcrumb: "Sistema" },
  }
];