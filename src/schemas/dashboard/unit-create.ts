import { z } from "zod";

export const AddressSchema = z.object({
  number: z.string().min(1, { error: "Número é obrigatório" }),
  street: z.string().min(1, { error: "Rua é obrigatória" }),
  district: z.string().min(1, { error: "Bairro é obrigatório" }),
  city: z.string().min(1, { error: "Cidade é obrigatória" }),
  state: z.string().min(2, { error: "Estado é obrigatório" }),
  zipCode: z.string().length(8, { error: "CEP deve ter 8 caracteres" }),
  complement: z.string().optional(),
});

export const UnitCreateSchema = z.object({
  name: z.string().min(5, {
    error: "O nome da unidade deve ter no mínimo 5 caracteres.",
  }),
  phone: z
    .string()
    .min(8, {
      error: "O telefone deve ter no mínimo 8 caracteres.",
    })
    .max(15, {
      error: "O telefone deve ter no máximo 15 caracteres.",
    }),
  email: z.email({
    error: "Insira um endereço de email válido.",
  }),
  responsible_id: z.uuid({ error: "ID do responsável inválido" }),
  address: AddressSchema,
});

export type UnitCreateType = z.infer<typeof UnitCreateSchema>;
