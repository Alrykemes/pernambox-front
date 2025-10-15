import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/pages/Login";
import PasswordResetNew from "@/pages/PasswordResetNew";
import PasswordResetRequest from "@/pages/PasswordResetRequest";
import PasswordResetVerify from "@/pages/PasswordResetVerify";
import UnitsManagement from './pages/UnitsManagement';
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/password-reset/request", element: <PasswordResetRequest /> },
      { path: "/password-reset/verify", element: <PasswordResetVerify /> },
      { path: "/password-reset/new", element: <PasswordResetNew /> },
      { path: "/units-management", element: <UnitsManagement/> },
    ],
  },
];
