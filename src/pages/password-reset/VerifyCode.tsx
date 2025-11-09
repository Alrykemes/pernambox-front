import AppButton from "@/components/AppButton";
import { HookFormProvider } from "@/components/form/HookFormProvider";
import { InputOTPField } from "@/components/form/InputOTPField";
import { useResetPasswordStore } from "@/stores/reset-password-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export const VerifyCodeSchema = z.object({
  otpCode: z.string().min(6, {
    message: "Seu código de uso único deve ter 6 caracteres.",
  }),
});
export type VerifyCodeType = z.infer<typeof VerifyCodeSchema>;

export default function VerifyCode() {
  const navigate = useNavigate();
  const { userId, email, validateOTPCode, requestPasswordReset, lastSentAt } =
    useResetPasswordStore();

  const [cooldown, setCooldown] = useState(0);

  const form = useForm<VerifyCodeType>({
    resolver: zodResolver(VerifyCodeSchema),
    mode: "onChange",
    defaultValues: { otpCode: "" },
  });

  useEffect(() => {
    if (!email) navigate("/recuperar-senha");
  }, [email, navigate]);

  useEffect(() => {
    if (!lastSentAt) return;
    const diff = 60 - Math.floor((Date.now() - lastSentAt) / 1000);
    if (diff > 0) setCooldown(diff);

    const interval = setInterval(
      () => setCooldown((prev) => (prev > 0 ? prev - 1 : 0)),
      1000,
    );
    return () => clearInterval(interval);
  }, [lastSentAt]);

  const onSubmit = async (data: VerifyCodeType) => {
    try {
      if (!userId) {
        toast.error(
          "Ainda processando a solicitação. Tente novamente em alguns segundos.",
        );
        return;
      }

      const response = await validateOTPCode(data.otpCode, userId);

      if (response.success && response.token) {
        toast.success("Código verificado!");
        navigate("/recuperar-senha/nova");
      } else {
        toast.error("Código inválido!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao verificar código. Tente novamente.");
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("E-mail não encontrado. Volte e tente novamente.");
      return;
    }
    if (cooldown > 0) {
      toast.info(`Aguarde ${cooldown}s antes de reenviar.`);
      return;
    }

    try {
      const response = await requestPasswordReset(email);
      if (response.success) {
        toast.success(
          "Se esse e-mail existir em nosso sistema, enviamos instruções para ele. O código expirará em 15 minutos.",
        );
      } else {
        toast.error("Erro ao reenviar código. Tente novamente mais tarde.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro de comunicação. Tente novamente mais tarde.");
    }
  };

  return (
    <div>
      <section>
        <HookFormProvider form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <InputOTPField
              control={form.control}
              name="otpCode"
              label="Código de Verificação"
            />
            <AppButton type="button" onClick={handleResendCode}>
              Reenviar código
            </AppButton>
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
              onClick={() => navigate("/recuperar-senha/nova")}
            >
              Verificar
            </AppButton>
          </div>
        </HookFormProvider>
      </section>
    </div>
  );
}
