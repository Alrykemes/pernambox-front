import { z } from "zod";

export const ProductUpdateSchema = z.object({
  id: z.string().uuid({ error: "ID do produto inválido." }),
  validity: z
    .string()
    .min(1, { error: "A validade é obrigatória." }),
  quantity: z
    .string()
    .min(1, { error: "A quantidade é obrigatória." })
    .refine(
      (val) => {
        const num = Number(val);
        return !Number.isNaN(num) && Number.isInteger(num) && num > 0;
      },
      { error: "A quantidade deve ser um número inteiro maior que zero." },
    ),
  refProductId: z
    .string()
    .uuid({ error: "Selecione um produto base válido." }),
  originId: z
    .string()
    .min(1, { error: "Selecione uma origem válida." }),
});

export type ProductUpdateType = z.infer<typeof ProductUpdateSchema>;

