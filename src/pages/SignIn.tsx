import checkingStock from "@/assets/images/checking-stock.gif";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import PasswordField from "@/components/form/PasswordField";
import SubmitButton from "@/components/form/SubmitButton";
import LogoHeader from "@/components/LogoHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSignInForm } from "@/hooks/useSignInForm";
import type { SignInType } from "@/schemas/signIn";
import { Link } from "react-router-dom";

export default function SignIn() {
  const form = useSignInForm();
  const onSubmit = async (data: SignInType) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center lg:w-1/2">
        <LogoHeader />
        <div className="w-full max-w-md p-8">
          <FormWrapper form={form} onSubmit={onSubmit}>
            <div className="space-y-4">
              <InputField
                control={form.control}
                name="email"
                label="E-mail"
                type="text"
                placeholder="john.doe@example.com"
                className="h-12"
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
                  to="/password-recovery"
                  className="ml-4 text-sm text-orange-500 hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>
            <SubmitButton
              isSubmitting={form.formState.isSubmitting}
              className="mt-6 h-12 w-full bg-orange-500 font-bold text-white hover:bg-orange-600"
            >
              Entrar
            </SubmitButton>
          </FormWrapper>
        </div>
      </div>

      <div className="hidden w-1/2 items-center justify-center lg:flex">
        <img
          src={checkingStock}
          alt="Animação: verificação de estoque"
          className="h-100 w-100 object-contain"
          loading="lazy"
        />
      </div>
    </>
  );
}
