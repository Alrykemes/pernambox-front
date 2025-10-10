import password from "@/assets/images/password.gif";
import AppButton from "@/components/AppButton";
import { AuthFormShell } from "@/components/AuthFormShell";
import { AuthSideImage } from "@/components/AuthSideImage";
import FormWrapper from "@/components/form/FormWrapper";
import PasswordField from "@/components/form/PasswordField";
import { useResetPassword } from "@/hooks/useResetPassword";
import api from "@/lib/api";
import {
  PasswordResetNewSchema,
  type PasswordResetNewType,
} from "@/schemas/passwordResetNew";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function PasswordResetNew() {
  const { token } = useResetPassword();
  const navigate = useNavigate();

  const form = useForm<PasswordResetNewType>({
    resolver: zodResolver(PasswordResetNewSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  if (!token) navigate("/password-reset/request");

  const onSubmit = async (data: PasswordResetNewType) => {
    const { password, confirmPassword } = data;
    if (!token) {
      toast.error("Token de redefinição não encontrado. Recomece o processo.");
      navigate("/password-reset/request");
      return;
    }
    try {
      console.log(data);
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
      console.error(error);
    }
  };

  return (
    <>
      <AuthSideImage
        src={password}
        alt="gif: imagem representando proteção de senha"
      />
      <AuthFormShell
        title="Mudança de Senha"
        description="Digite sua nova senha e a confirme."
      >
        <FormWrapper form={form} onSubmit={onSubmit}>
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
              onClick={() => navigate("/password-reset/verify")}
              className="bg-white px-12 font-bold text-black hover:bg-blue-700/90 hover:text-white"
            >
              Voltar
            </AppButton>

            <AppButton
              type="submit"
              isLoading={form.formState.isSubmitting}
              disabled={!form.formState.isValid}
              className="min-w-40 bg-orange-500 font-bold text-white hover:bg-orange-600"
              onClick={() => navigate("/")}
            >
              Confirmar
            </AppButton>
          </div>
        </FormWrapper>
      </AuthFormShell>
    </>
  );
}

export default PasswordResetNew;
