import { ControlledField } from "@/components/form/ControlledField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

export interface CheckboxFieldProps<T extends FieldValues>
  extends Omit<
    ComponentProps<typeof Checkbox>,
    "checked" | "onCheckedChange" | "name"
  > {
  control: Control<T>;
  name: Path<T>;
  label: string;
  className?: string;
}

export function CheckboxField<T extends FieldValues>({
  control,
  name,
  label,
  className,
  ...rest
}: CheckboxFieldProps<T>) {
  const id = String(name).replace(/\./g, "_");

  return (
    <ControlledField control={control} name={name}>
      {(field) => (
        <div className={cn("flex items-center space-x-2", className)}>
          <Checkbox
            id={id}
            checked={field.value}
            onCheckedChange={field.onChange}
            {...rest}
          />
          <Label htmlFor={id} className="text-sm">
            {label}
          </Label>
        </div>
      )}
    </ControlledField>
  );
}
