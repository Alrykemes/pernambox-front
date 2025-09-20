import type { SignInType } from "@/schemas/signIn";
import { SignInSchema } from "@/schemas/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useSignInForm = () => {
  return useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
};
