import BaseFormField from "@/components/form/BaseFormField";
import { Input } from "@/components/ui/input";
import type { Control, FieldValues, Path } from "react-hook-form";

export interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
}

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: InputFieldProps<T>) {
  return (
    <BaseFormField control={control} name={name} label={label}>
      {(field) => (
        <Input
          id={name}
          placeholder={placeholder}
          type={type}
          {...field}
          className="h-12"
        />
      )}
    </BaseFormField>
  );
}
