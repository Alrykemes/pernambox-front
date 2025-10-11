import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/pages/auth/Login";
import ForgetPassword from "@/pages/password-reset/ForgetPassword";
import NewPassword from "@/pages/password-reset/NewPassword";
import VerifyCode from "@/pages/password-reset/VerifyCode";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/recuperar-senha", element: <ForgetPassword /> },
      { path: "/recuperar-senha/verificar", element: <VerifyCode /> },
      { path: "/recuperar-senha/nova", element: <NewPassword /> },
    ],
  },
];
