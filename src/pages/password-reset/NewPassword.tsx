import AppButton from "@/components/AppButton";
import { HookFormProvider } from "@/components/form/HookFormProvider";
import PasswordField from "@/components/form/PasswordField";
import api from "@/lib/api";
import {
  NewPasswordSchema,
  type NewPasswordType,
} from "@/schemas/password-reset/new-password";
import { useResetPasswordStore } from "@/stores/reset-password-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function NewPassword() {
  const navigate = useNavigate();

  const { token } = useResetPasswordStore();

  const form = useForm<NewPasswordType>({
    resolver: zodResolver(NewPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!token) navigate("/recuperar-senha");
  }, [token, navigate]);

  const onSubmit = async (data: NewPasswordType) => {
    const { password } = data;
    try {
      const response = await api.patch(
        "/auth/password-reset",
        {
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(response);
      toast.success("Senha alterada com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao alterar senha. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <>
      <HookFormProvider form={form} onSubmit={onSubmit}>
        <div className="space-y-3">
          <PasswordField
            control={form.control}
            name="password"
            label="Senha"
            placeholder="••••••••"
            type="password"
          />
          <PasswordField
            control={form.control}
            name="confirmPassword"
            label="Confirmar Senha"
            placeholder="••••••••"
            type="password"
          />
        </div>
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
          >
            Confirmar
          </AppButton>
        </div>
      </HookFormProvider>
    </>
  );
}
