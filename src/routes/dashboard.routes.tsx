import Home from "@/pages/dashboard/Home";
import Unit from "@/pages/dashboard/Unit";
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
];
