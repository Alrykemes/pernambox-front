import type { AppButtonProps } from "@/components/AppButton";
import AppButton from "@/components/AppButton";
import { useFormContext } from "react-hook-form";

type FormButtonProps = Omit<AppButtonProps, "isLoading">;

export function FormButton(props: FormButtonProps) {
  const form = useFormContext();
  const isSubmitting = form.formState.isSubmitting;
  return <AppButton {...props} isLoading={isSubmitting} />;
}
