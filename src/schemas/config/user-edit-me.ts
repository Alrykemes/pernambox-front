import { z } from "zod";

export const UserEditMeSchema = z.object({
  name: z.string().min(8, "Nome deve ter no minimo 8 caracteres").max(80, "Nome deve ter no máximo 80 caracteres").optional(),
  email: z.string().email("E-mail inválido").optional(),
  phone: z.string().optional(),
  cpf: z.string().min(11, "Cpf Inválido").max(11, "Cpf Inválido").optional(),
  password: z.string().min(1, "Digite sua senha para Salvar"),
});

export type UserEditMeType = z.infer<typeof UserEditMeSchema>;