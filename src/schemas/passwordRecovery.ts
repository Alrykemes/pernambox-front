import { z } from "zod/v4";

export const PasswordRecoverySchema = z.object({
  email: z.email("Insira um endereço de email válido."),
});

export type PasswordRecoveryType = z.infer<typeof PasswordRecoverySchema>;
