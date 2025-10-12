import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { ReactNode } from "react";
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";

interface ControlledFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  id?: string;
  label?: string;
  description?: string;
  children: (field: ControllerRenderProps<T> & { id: string }) => ReactNode;
}

export function ControlledField<T extends FieldValues>({
  control,
  name,
  id,
  label,
  description,
  children,
}: ControlledFieldProps<T>) {
  const fieldId = id ?? name;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={fieldId}>{label}</FormLabel>}
          <FormControl>{children({ ...field, id: fieldId })}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
