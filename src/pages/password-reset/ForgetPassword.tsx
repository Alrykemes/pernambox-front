import AppButton from "@/components/AppButton";
import { FormButton } from "@/components/form/FormButton";
import { HookFormProvider } from "@/components/form/HookFormProvider";
import { InputField } from "@/components/form/InputField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResetPasswordStore } from "@/stores/reset-password-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export const ForgetPasswordSchema = z.object({
  email: z.email("Insira um endereço de email válido."),
});
export type ForgetPasswordType = z.infer<typeof ForgetPasswordSchema>;

export default function ForgetPassword() {
  const navigate = useNavigate();
  const requestPasswordReset = useResetPasswordStore(
    (state) => state.requestPasswordReset,
  );
  const setUserId = useResetPasswordStore((state) => state.setUserId);

  const form = useForm<ForgetPasswordType>({
    resolver: zodResolver(ForgetPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgetPasswordType) => {
    useResetPasswordStore.getState().setEmail(data.email);

    try {
      const response = await requestPasswordReset(data.email);
      if (response.success) {
        navigate("/recuperar-senha/verificar", { replace: true });
        if (response?.userId) setUserId(response.userId);
        toast.success(
          "Foram enviadas instruções para seu email. O código expirará em 15 minutos.",
        );
      }
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 404) {
        toast.success(
          "Se esse e-mail existir em nosso sistema, enviamos instruções para ele. O código expirará em 15 minutos.",
        );
        return;
      }
      toast.error("Erro de comunicação. Tente novamente mais tarde.");
    }
  };

  return (
    <div>
      <section>
        <Card className="mb-12 border-l-8 border-l-blue-600 bg-blue-100/80 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-700">
              <Info className="text-blue-600" />
              <h2 className="text-xl font-bold text-blue-700">
                Como funciona?
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700">
              Após confirmar seu e-mail, você receberá um link seguro.
            </p>
          </CardContent>
        </Card>
      </section>
      <section>
        <HookFormProvider form={form} onSubmit={onSubmit}>
          <InputField
            control={form.control}
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            label="E-mail Cadastrado"
            autoFocus
            autoComplete="email"
          />

          <div className="mt-6 flex justify-between gap-4">
            <AppButton
              type="button"
              variant="outline"
              disabled={form.formState.isSubmitting}
              onClick={() => navigate("/", { replace: true })}
              className="bg-white px-12 font-bold text-black hover:bg-blue-700/90 hover:text-white"
            >
              Cancelar
            </AppButton>

            <FormButton
              type="submit"
              disabled={!form.formState.isValid}
              className="min-w-40 bg-orange-500 font-bold text-white hover:bg-orange-600"
            >
              Continuar
            </FormButton>
          </div>
        </HookFormProvider>
      </section>
    </div>
  );
}
