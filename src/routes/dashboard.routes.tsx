import Home from "@/pages/dashboard/Home";
import Unit from "@/pages/dashboard/Unit";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <Home />,
  },
  {
    path: "/dashboard/unidades",
    element: <Unit />,
  },
];
