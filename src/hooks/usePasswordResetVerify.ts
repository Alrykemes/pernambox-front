import {
  PasswordResetVerifySchema,
  type PasswordResetVerifyType,
} from "@/schemas/passwordResetVerify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const passwordResetVerify = () => {
  return useForm<PasswordResetVerifyType>({
    resolver: zodResolver(PasswordResetVerifySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      pin: "",
    },
  });
};

export default passwordResetVerify;
