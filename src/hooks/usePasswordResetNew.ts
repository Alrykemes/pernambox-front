import {
  PasswordResetNewSchema,
  type PasswordResetNewType,
} from "@/schemas/passwordResetNew";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const usePasswordResetNewForm = () => {
  return useForm<PasswordResetNewType>({
    resolver: zodResolver(PasswordResetNewSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
};

export default usePasswordResetNewForm;
