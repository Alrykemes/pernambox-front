import AuthLayout from "@/layouts/AuthLayout";
import PasswordRecovery from "@/pages/PasswordRecovery";
import SignIn from "@/pages/SignIn";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "/password-recovery", element: <PasswordRecovery /> },
    ],
  },
  // {
  //   element: <DashboardLayout sidebar={<Sidebar />} children={} />,
  //   children: [
  //     { path: "/dashboard", element: <Dashboard /> },
  //   ],
  // },
];
