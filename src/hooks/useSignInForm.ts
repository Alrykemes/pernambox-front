import { SignInSchema } from "@/schemas/signIn";
import type { SignInType } from "@/types/signIn";
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
