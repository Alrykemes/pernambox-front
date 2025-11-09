import checkingBoxes from "@/assets/images/checking-boxes.gif";
import password from "@/assets/images/password.gif";
import security from "@/assets/images/security.gif";
import ForgetPassword from "@/pages/password-reset/ForgetPassword";
import NewPassword from "@/pages/password-reset/NewPassword";
import VerifyCode from "@/pages/password-reset/VerifyCode";

export const passwordResetRoutes = [
  {
    path: "recuperar-senha",
    element: <ForgetPassword />,
    handle: {
      centeredLayout: {
        imgSrc: checkingBoxes,
        imgAlt: "gif: personagem verificando caixas",
        formTitle: "Recuperação de Senha",
        formDescription: "Digite seu e-mail e enviaremos instruções.",
      },
    },
  },
  {
    path: "recuperar-senha/verificar",
    element: <VerifyCode />,
    handle: {
      centeredLayout: {
        imgSrc: security,
        imgAlt: "gif: imagem representando segurança",
        formTitle: "Verificação de E-mail",
        formDescription:
          "Digite o código de 6 dígitos enviado para seu e-mail.",
      },
    },
  },
  {
    path: "recuperar-senha/nova",
    element: <NewPassword />,
    handle: {
      centeredLayout: {
        imgSrc: password,
        imgAlt: "gif: imagem representando proteção de senha",
        formTitle: "Mudança de Senha",
        formDescription: "Digite sua nova senha e a confirme.",
      },
    },
  },
];
