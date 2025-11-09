import { ControlledField } from "@/components/form/ControlledField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Selecione uma opção",
  options,
  className,
}: SelectFieldProps<T>) {
  return (
    <ControlledField control={control} name={name} label={label}>
      {(field) => (
        <Select onValueChange={field.onChange} value={field.value || ""}>
          <SelectTrigger className={cn("h-12", className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </ControlledField>
  );
}
