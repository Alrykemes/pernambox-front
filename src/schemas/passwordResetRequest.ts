import { z } from "zod/v4";

export const PasswordResetRequestSchema = z.object({
  email: z.email("Insira um endereço de email válido."),
});

export type PasswordResetRequestType = z.infer<
  typeof PasswordResetRequestSchema
>;
