import security from "@/assets/images/security.gif";
import AppButton from "@/components/AppButton";
import { AuthFormShell } from "@/components/AuthFormShell";
import { AuthSideImage } from "@/components/AuthSideImage";
import FormWrapper from "@/components/form/FormWrapper";
import OTPField from "@/components/form/OTPField";
import type { PasswordResetVerifyType } from "@/schemas/passwordResetVerify";
import { PasswordResetVerifySchema } from "@/schemas/passwordResetVerify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function PasswordResetVerify() {
  const navigate = useNavigate();

  const form = useForm<PasswordResetVerifyType>({
    resolver: zodResolver(PasswordResetVerifySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { pin: "" },
  });

  const onSubmit = async (data: PasswordResetVerifyType) => {
    try {
      console.log(data);
      toast.success("Código de verificação enviado com sucesso.");
    } catch (error) {
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
            name="pin"
            label="Código de Verificação"
          />
          <div className="mt-6 flex justify-between gap-4">
            <AppButton
              variant="outline"
              disabled={form.formState.isSubmitting}
              onClick={() => navigate("/password-reset/request")}
              className="bg-white px-12 font-bold text-black hover:bg-blue-700/90 hover:text-white"
            >
              Voltar
            </AppButton>

            <AppButton
              type="submit"
              isLoading={form.formState.isSubmitting}
              disabled={!form.formState.isValid}
              className="min-w-40 bg-orange-500 font-bold text-white hover:bg-orange-600"
              onClick={() => navigate("/password-reset/new")}
            >
              Verificar
            </AppButton>
          </div>
        </FormWrapper>
      </AuthFormShell>
    </>
  );
}

export default PasswordResetVerify;
