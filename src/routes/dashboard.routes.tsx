import Home from "@/pages/dashboard/Home";
import { LogHistory } from "@/pages/dashboard/LogHistory";
import Unit from "@/pages/dashboard/Units";
import Users from "@/pages/dashboard/Users";
import { Navigate } from "react-router-dom";

export const dashboardRoutes = [
  {
    index: true,
    element: <Navigate to="home" replace />,
  },
  {
    path: "home",
    element: <Home />,
    handle: { breadcrumb: "Home" },
  },
  {
    path: "unidades",
    element: <Unit />,
    handle: { breadcrumb: "Unidades" },
  },
  {
    path: "usuarios",
    element: <Users />,
    handle: { breadcrumb: "Usuários" },
  },
  {
    path: "historico",
    element: <LogHistory />,
    handle: { breadcrumb: "Histórico de Alterações" },
  }
];
