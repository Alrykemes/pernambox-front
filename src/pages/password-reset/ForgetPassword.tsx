import checkingBoxes from "@/assets/images/checking-boxes.gif";
import AppButton from "@/components/AppButton";
import { AuthFormShell } from "@/components/AuthFormShell";
import { AuthSideImage } from "@/components/AuthSideImage";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";
import {
  type ForgetPasswordType,
  ForgetPasswordSchema,
} from "@/schemas/password-reset/forgetPassword";
import { useResetPasswordStore } from "@/stores/resetPasswordStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ForgetPassword() {
  const navigate = useNavigate();

  const { setUserId } = useResetPasswordStore();

  const form = useForm<ForgetPasswordType>({
    resolver: zodResolver(ForgetPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgetPasswordType) => {
    try {
      const response = await api.post("/auth/password-reset", data);
      if (response.data.success) {
        setUserId(response.data.userId);
        toast.success("Instruções enviadas! Verifique seu e-mail.");
        navigate("/recuperar-senha/verificar");
      }
    } catch (error) {
      toast.error("Erro ao enviar instruções. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <>
      <AuthSideImage
        src={checkingBoxes}
        alt="gif: personagem verificando caixas"
      />
      <AuthFormShell
        title="Recuperação de Senha"
        description="Digite seu e-mail e enviaremos instruções."
      >
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

        <FormWrapper form={form} onSubmit={onSubmit}>
          <InputField
            control={form.control}
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            label="E-mail Cadastrado"
          />

          <div className="mt-6 flex justify-between gap-4">
            <AppButton
              variant="outline"
              disabled={form.formState.isSubmitting}
              onClick={() => navigate("/")}
              className="bg-white px-12 font-bold text-black hover:bg-blue-700/90 hover:text-white"
            >
              Cancelar
            </AppButton>

            <AppButton
              type="submit"
              isLoading={form.formState.isSubmitting}
              disabled={!form.formState.isValid}
              className="min-w-40 bg-orange-500 font-bold text-white hover:bg-orange-600"
            >
              Continuar
            </AppButton>
          </div>
        </FormWrapper>
      </AuthFormShell>
    </>
  );
}

export default ForgetPassword;
