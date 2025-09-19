import { z } from "zod/v4";

export const SignInSchema = z.object({
  email: z.email("Insira um endereço de email válido."),
  password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres."),
});
