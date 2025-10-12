import { Form } from "@/components/ui/form";
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

interface HookFormProviderProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
}

export function HookFormProvider<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: HookFormProviderProps<T>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className={className}
      >
        {children}
      </form>
    </Form>
  );
}
