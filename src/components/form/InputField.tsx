import BaseFormField from "@/components/form/BaseFormField";
import { Input } from "@/components/ui/input";
import type { Control, FieldValues, Path } from "react-hook-form";

export interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

export default function InputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  className,
}: InputFieldProps<T>) {
  return (
    <BaseFormField control={control} name={name} label={label}>
      {(field) => (
        <Input
          id={name}
          placeholder={placeholder}
          type={type}
          className={className}
          {...field}
        />
      )}
    </BaseFormField>
  );
}
