import { ControlledField } from "@/components/form/ControlledField";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

export interface InputFieldProps<T extends FieldValues>
  extends Omit<ComponentProps<typeof Input>, "name" | "value" | "onChange"> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  className,
  ...rest
}: InputFieldProps<T>) {
  return (
    <ControlledField control={control} name={name} label={label}>
      {(field) => (
        <Input {...field} {...rest} className={cn("h-12", className)} />
      )}
    </ControlledField>
  );
}
