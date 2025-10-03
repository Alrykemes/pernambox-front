import {
  PasswordResetRequestSchema,
  type PasswordResetRequestType,
} from "@/schemas/passwordResetRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const usePasswordResetRequestForm = () => {
  return useForm<PasswordResetRequestType>({
    resolver: zodResolver(PasswordResetRequestSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });
};

export default usePasswordResetRequestForm;
