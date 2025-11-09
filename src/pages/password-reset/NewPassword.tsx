import AppButton from "@/components/AppButton";
import { HookFormProvider } from "@/components/form/HookFormProvider";
import { InputPasswordField } from "@/components/form/InputPasswordField";
import { useResetPasswordStore } from "@/stores/reset-password-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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

export default function NewPassword() {
  const navigate = useNavigate();
  const token = useResetPasswordStore((state) => state.token);
  const newPassword = useResetPasswordStore((state) => state.newPassword);

  const form = useForm<NewPasswordType>({
    resolver: zodResolver(NewPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!token) navigate("/recuperar-senha");
  }, [token, navigate]);

  const onSubmit = async (data: NewPasswordType) => {
    const { password } = data;
    try {
      // backend must return success
      const response = await newPassword(password);
      if (response.success) {
        toast.success("Senha alterada com sucesso!");
        navigate("/");
      } else {
        toast.error("Erro ao alterar senha. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro de comunicação. Tente novamente mais tarde.");
    }
  };

  return (
    <div>
      <section>
        <HookFormProvider form={form} onSubmit={onSubmit}>
          <div className="space-y-3">
            <InputPasswordField
              control={form.control}
              name="password"
              label="Senha"
              placeholder="••••••••"
              type="password"
            />
            <InputPasswordField
              control={form.control}
              name="confirmPassword"
              label="Confirmar Senha"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div className="mt-6 flex justify-between gap-4">
            <AppButton
              type="button"
              variant="outline"
              disabled={form.formState.isSubmitting}
              onClick={() => navigate("/recuperar-senha")}
              className="bg-white px-12 font-bold text-black hover:bg-blue-700/90 hover:text-white"
            >
              Voltar
            </AppButton>

            <AppButton
              type="submit"
              isLoading={form.formState.isSubmitting}
              disabled={!form.formState.isValid}
              className="min-w-40 bg-orange-500 font-bold text-white hover:bg-orange-600"
            >
              Confirmar
            </AppButton>
          </div>
        </HookFormProvider>
      </section>
    </div>
  );
}
