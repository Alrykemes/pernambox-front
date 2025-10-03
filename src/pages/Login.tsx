import checkingStock from "@/assets/images/checking-stock.gif";
import AppButton from "@/components/AppButton";
import { AuthFormShell } from "@/components/AuthFormShell";
import { AuthSideImage } from "@/components/AuthSideImage";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import PasswordField from "@/components/form/PasswordField";
import LogoHeader from "@/components/LogoHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useLoginForm from "@/hooks/useLoginForm";
import api from "@/lib/api";
import type { LoginType } from "@/schemas/login";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const form = useLoginForm();
  const onSubmit = async (data: LoginType) => {
    try {
      console.log(data);
      const response = await api.post("/auth/login", data);
      console.log(response.data);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AuthSideImage
        src={checkingStock}
        alt="gif: personagem verificando estoque"
      />
      <AuthFormShell>
        <LogoHeader />
        <FormWrapper form={form} onSubmit={onSubmit}>
          <div className="space-y-4">
            <InputField
              control={form.control}
              name="email"
              label="E-mail"
              placeholder="john.doe@example.com"
              type="email"
            />

            <PasswordField
              control={form.control}
              name="password"
              label="Senha"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember" className="mr-2" />
              <Label htmlFor="remember" className="text-sm">
                Lembrar-me
              </Label>
            </div>
            <div>
              <Link
                to="/password-reset/request"
                className="ml-4 text-sm text-orange-500 hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>
          <AppButton
            type="submit"
            isLoading={form.formState.isSubmitting}
            disabled={!form.formState.isValid}
            className="mt-6 h-12 w-full bg-orange-500 font-bold text-white hover:bg-orange-600"
            aria-label="botão de entrar no sistema"
          >
            Entrar
          </AppButton>
        </FormWrapper>
      </AuthFormShell>
    </>
  );
}

export default Login;
