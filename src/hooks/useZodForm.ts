import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, type ZodType } from "zod";

export const createUseZodForm = <S extends ZodType<any, any>>(
  schema: S,
  defaults: Partial<z.infer<S>>,
) => {
  return () =>
    useForm<z.infer<S>>({
      resolver: zodResolver(schema as any),
      defaultValues: defaults as any,
    });
};
