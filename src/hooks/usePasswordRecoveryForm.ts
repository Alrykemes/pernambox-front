import type { PasswordRecoveryType } from "@/schemas/passwordRecovery";
import { PasswordRecoverySchema } from "@/schemas/passwordRecovery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const usePasswordRecoveryForm = () => {
  return useForm<PasswordRecoveryType>({
    resolver: zodResolver(PasswordRecoverySchema),
    defaultValues: {
      email: "",
    },
  });
};
