import AppButton from "@/components/AppButton";
import {
  CheckboxField,
  HookFormProvider,
  InputField,
  InputPasswordField,
} from "@/components/form";
import { FormButton } from "@/components/form/FormButton";
import SystemLogo from "@/pages/auth/components/SystemLogo";
import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.email("Insira um endereço de email válido."),
  password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres."),
  rememberMe: z.boolean().optional(),
});
export type LoginType = z.infer<typeof LoginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

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
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente.",
      );
    }
  };

  return (
    <div>
      <SystemLogo />
      <section>
        <HookFormProvider form={form} onSubmit={onSubmit}>
          <div className="space-y-4">
            <InputField
              control={form.control}
              name="email"
              label="E-mail"
              placeholder="john.doe@example.com"
              type="email"
              autoFocus
              autoComplete="email"
            />

            <InputPasswordField
              control={form.control}
              name="password"
              label="Senha"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
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
          <FormButton
            type="submit"
            disabled={!form.formState.isValid || !form.formState.isDirty}
            className="mt-6 h-12 w-full bg-orange-500 font-bold text-white hover:bg-orange-600"
            aria-label="Entrar no sistema"
          >
            Entrar
          </FormButton>
          <AppButton
            type="button"
            disabled={true}
            className="mt-6 h-12 w-full bg-orange-500 font-bold text-white hover:bg-orange-600"
            aria-label="botão de entrar no sistema"
          >
            <KeyRound />
            Entrar com SSO
          </AppButton>
        </HookFormProvider>
      </section>
    </div>
  );
}
