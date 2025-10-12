import { z } from "zod";

export const VerifyCodeSchema = z.object({
  otpCode: z.string().min(6, {
    message: "Sua senha de uso único deve ter 6 caracteres.",
  }),
});

export type VerifyCodeType = z.infer<typeof VerifyCodeSchema>;
