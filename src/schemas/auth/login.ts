import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Insira um endereço de email válido."),
  password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres."),
  rememberMe: z.boolean().optional(),
});

export type LoginType = z.infer<typeof LoginSchema>;
