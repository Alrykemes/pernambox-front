import { z } from "zod";

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres."),
    confirmPassword: z
      .string()
      .min(8, "A confirmação de senha precisa ter no mínimo 8 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type NewPasswordType = z.infer<typeof NewPasswordSchema>;
