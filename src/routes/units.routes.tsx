import type { RouteObject } from "react-router-dom";
import UnitsManagement from "@/pages/units/UnitsManagement"; 

export const unitsRoutes: RouteObject[] = [
  {
    path: "/unidades",
    element: <UnitsManagement />,
  },
];