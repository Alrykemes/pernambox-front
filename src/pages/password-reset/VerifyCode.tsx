import security from "@/assets/images/security.gif";
import AppButton from "@/components/AppButton";
import { AuthFormShell } from "@/components/AuthFormShell";
import { AuthSideImage } from "@/components/AuthSideImage";
import FormWrapper from "@/components/form/FormWrapper";
import OTPField from "@/components/form/OTPField";
import api from "@/lib/api";
import type { VerifyCodeType } from "@/schemas/password-reset/verifyCode";
import { VerifyCodeSchema } from "@/schemas/password-reset/verifyCode";
import { useResetPasswordStore } from "@/stores/resetPasswordStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function VerifyCode() {
  const navigate = useNavigate();

  const { userId, setToken } = useResetPasswordStore();

  const form = useForm<VerifyCodeType>({
    resolver: zodResolver(VerifyCodeSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { otpCode: "" },
  });

  if (!userId) navigate("/recuperar-senha");

  const onSubmit = async (data: VerifyCodeType) => {
    try {
      const response = await api.post("/auth/password-reset/validate-otp", {
        otpCode: data.otpCode,
        userId,
      });

      if (response.data.success && response.data.token) {
        setToken(response.data.token);
        toast.success("Código verificado!");
        navigate("/recuperar-senha/nova");
      } else {
        toast.error("Código inválido!");
      }
    } catch (error) {
      toast.error("Erro ao verificar código. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <>
      <AuthSideImage src={security} alt="gif: imagem representando segurança" />
      <AuthFormShell
        title="Verificação de E-mail"
        description="Digite o código de 6 dígitos enviado para seu e-mail."
      >
        <FormWrapper form={form} onSubmit={onSubmit}>
          <OTPField
            control={form.control}
            name="otpCode"
            label="Código de Verificação"
          />
          <div className="mt-6 flex justify-between gap-4">
            <AppButton
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
        </FormWrapper>
      </AuthFormShell>
    </>
  );
}

export default VerifyCode;
