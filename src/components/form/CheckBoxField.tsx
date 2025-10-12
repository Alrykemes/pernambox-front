import { ControlledField } from "@/components/form/ControlledField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";

export interface CheckboxFieldProps<T extends FieldValues> {
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
}: CheckboxFieldProps<T>) {
  return (
    <ControlledField control={control} name={name}>
      {(field) => (
        <div className={cn("flex items-center space-x-2", className)}>
          <Checkbox
            id={name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <Label htmlFor={name} className="text-sm">
            {label}
          </Label>
        </div>
      )}
    </ControlledField>
  );
}
