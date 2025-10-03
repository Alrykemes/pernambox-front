import { z } from "zod/v4";

export const PasswordResetVerifySchema = z.object({
  pin: z.string().min(6, {
    message: "Sua senha de uso único deve ter 6 caracteres.",
  }),
});

export type PasswordResetVerifyType = z.infer<typeof PasswordResetVerifySchema>;
