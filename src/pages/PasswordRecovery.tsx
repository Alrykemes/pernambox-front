import checkingStock from "@/assets/images/checking-boxes.gif";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePasswordRecoveryForm } from "@/hooks/usePasswordRecoveryForm";
import type { PasswordRecoveryType } from "@/schemas/passwordRecovery";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PasswordRecovery() {
  const form = usePasswordRecoveryForm();
  const navigate = useNavigate();
  const onSubmit = async (data: PasswordRecoveryType) => {
    try {
      console.log(data);
      toast.success("Instruções enviadas! Verifique seu e-mail.");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={checkingStock}
          className="h-120 w-120 max-w-full object-contain"
          loading="lazy"
          alt="Animação: verificação de caixas"
        />
      </div>
      <main className="p-6">
        <div>
          <h1 className="mb-4 text-3xl font-bold text-orange-500">
            Recuperação de Senha
          </h1>
          <p className="mb-8 max-w-md text-gray-600">
            Digite seu email abaixo e enviaremos instruções para criar uma nova
            senha
          </p>
        </div>
        <div className="w-full max-w-md">
          <Card className="border-l-8 border-l-blue-600 bg-blue-100/80 shadow-lg">
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
                Após confirmar seu e-mail, você receberá um link seguro para
                definir uma nova senha. Verifique também sua pasta de spam.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 w-full">
          <FormWrapper form={form} onSubmit={onSubmit}>
            <InputField
              control={form.control}
              name="email"
              label="E-mail Cadastrado"
              type="email"
              placeholder="john.doe@example.com"
              className="h-12"
            />
            <div className="mt-6 flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-12 bg-white px-12 font-bold text-black hover:bg-blue-700/90 hover:text-white"
                onClick={() => navigate("/")}
              >
                Cancelar
              </Button>
              <SubmitButton
                isSubmitting={form.formState.isSubmitting}
                className="h-12 bg-orange-500 font-bold text-white hover:bg-orange-600"
              >
                Enviar Solicitação
              </SubmitButton>
            </div>
          </FormWrapper>
        </div>
      </main>
    </div>
  );
}
