import checkingStock from "@/assets/images/checking-stock.gif";
import Login from "@/pages/auth/Login";

export const authRoutes = [
  {
    path: "/",
    element: <Login />,
    handle: {
      centeredLayout: {
        imgSrc: checkingStock,
        imgAlt: "gif: personagem verificando estoque",
      },
    },
  },
];
