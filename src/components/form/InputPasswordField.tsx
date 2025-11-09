import { ControlledField } from "@/components/form/ControlledField";
import { type InputFieldProps } from "@/components/form/InputField";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import AppButton from "../AppButton";

export function InputPasswordField<T extends FieldValues>({
  control,
  name,
  label = "Senha",
  placeholder = "••••••••",
  className,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <ControlledField control={control} name={name} label={label}>
        {(field) => (
          <Input
            {...field}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            className={cn("h-12 pr-10", className)}
          />
        )}
      </ControlledField>
      <AppButton
        type="button"
        variant="ghost"
        size="sm"
        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-8 right-1 h-8 w-8 p-0"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </AppButton>
    </div>
  );
}
