import checkingStock from "@/assets/images/checking-stock.gif";
import AppButton from "@/components/AppButton";
import { AuthFormShell } from "@/components/AuthFormShell";
import { AuthSideImage } from "@/components/AuthSideImage";
import CheckboxField from "@/components/form/CheckBoxField";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import PasswordField from "@/components/form/PasswordField";
import LogoHeader from "@/components/LogoHeader";
import { useAuthStore } from "@/store/authStore";
import { LoginSchema, type LoginType } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const { login } = useAuthStore();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: LoginType) => {
    try {
      await login(data.email, data.password, data.rememberMe ?? false);
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
            <CheckboxField
              control={form.control}
              name="rememberMe"
              label="Lembrar-me"
            />
            <Link
              to="/password-reset/request"
              className="translate-y-0.5 text-sm text-orange-500 hover:underline"
            >
              Esqueceu sua senha?
            </Link>
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
