import logo from "@/assets/defesa-civil.png";
import storage from "@/assets/storage.jpg";
import FormWrapper from "@/components/form/FormWrapper";
import { InputField } from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import { useSignInForm } from "@/hooks/useSignInForm";
import type { SignInType } from "@/types/signIn";

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 p-4">
      <div className="absolute top-5 left-0 h-32 w-32 rounded-tr-[50%] rounded-br-[50%] bg-blue-400" />

      <div className="flex min-h-[600px] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div
          className="hidden bg-cover bg-center md:block md:w-1/2"
          style={{ backgroundImage: `url(${storage})` }}
        />

        <div className="flex w-full flex-col gap-20 p-8 md:w-1/2">
          <div className="mb-6 flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="logo" className="w-16" />
              <h1 className="text-3xl font-bold text-orange-500">
                PernambuBox
              </h1>
            </div>
            <p className="text-center text-sm text-gray-400 italic">
              Controle de Estoque Inteligente
            </p>
          </div>

          <FormWrapper form={form} onSubmit={onSubmit}>
            <div className="space-y-4">
              <InputField
                control={form.control}
                name="email"
                label="E-mail"
                type="text"
                placeholder="john.doe@example.com"
              />
              <InputField
                control={form.control}
                name="password"
                label="Senha"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <SubmitButton
              isSubmitting={form.formState.isSubmitting}
              className="mt-6 w-full"
            >
              Entrar
            </SubmitButton>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}
