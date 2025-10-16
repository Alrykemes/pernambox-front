import { z } from "zod";

export const ForgetPasswordSchema = z.object({
  email: z.email("Insira um endereço de email válido."),
});

export type ForgetPasswordType = z.infer<typeof ForgetPasswordSchema>;
