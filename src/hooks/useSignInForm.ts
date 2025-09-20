import { createUseZodForm } from "@/hooks/useZodForm";
import { SignInSchema } from "@/schemas/signIn";

export const useSignInForm = createUseZodForm(SignInSchema, {
  email: "",
  password: "",
});
