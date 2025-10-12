import AppButton from "@/components/AppButton";
import { CheckboxField } from "@/components/form/CheckBoxField";
import { HookFormProvider } from "@/components/form/HookFormProvider";
import { InputField } from "@/components/form/InputField";
import PasswordField from "@/components/form/PasswordField";
import LogoHeader from "@/components/LogoHeader";
import { LoginSchema, type LoginType } from "@/schemas/auth/login";
import { useAuthStore } from "@/stores/authStore";
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
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe ?? false,
      });
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente.",
      );
      console.error(error);
    }
  };

  return (
    <>
      <LogoHeader />
      <HookFormProvider form={form} onSubmit={onSubmit}>
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
            to="/recuperar-senha"
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
      </HookFormProvider>
    </>
  );
}

export default Login;
