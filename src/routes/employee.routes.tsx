import type { RouteObject } from "react-router-dom";
import EmployeeManagement from "@/pages/employee/EmployeeManagement";

export const employeesRoutes: RouteObject[] = [
  {
    path: "/usuarios",
    element: <EmployeeManagement />,
  },

];