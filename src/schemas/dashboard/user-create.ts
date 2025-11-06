import { z } from "zod";

export const UserCreateSchema = z.object({
  name: z.string().min(5, {
    error: "O nome da unidade deve ter no mínimo 5 caracteres.",
  }),
  cpf: z.string().length(11, {
    error: "O CPF deve ter 11 caracteres.",
  }),
  email: z.email({
    error: "Insira um endereço de email válido.",
  }),
  phone: z
    .string()
    .min(8, {
      error: "O telefone deve ter no mínimo 8 caracteres.",
    })
    .max(15, {
      error: "O telefone deve ter no máximo 15 caracteres.",
    }),
  role: z.enum(["ADMIN", "USER"], {
    error: "Selecione um papel válido para o usuário.",
  }),
});

export type UserCreateType = z.infer<typeof UserCreateSchema>;
