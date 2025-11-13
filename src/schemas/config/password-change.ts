import { z } from "zod";

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Campo obrigatório"),
  newPassword: z.string().min(6, "Mínimo de 6 caracteres"),
  confirmNewPassword: z.string().min(6, "Mínimo de 6 caracteres"),
}).refine(
  (data) => data.newPassword === data.confirmNewPassword,
  { message: "As senhas não coincidem", path: ["confirmarNovaSenha"] }
);

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;