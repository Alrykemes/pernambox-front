import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import InputField, { type InputFieldProps } from "./InputField";

export default function PasswordField<T extends FieldValues>({
  control,
  name,
  label = "Senha",
  placeholder = "••••••••",
  type = "password",
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative h-12 pb-24">
      <InputField
        control={control}
        name={name}
        label={label}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        className="h-12 pr-12"
      />

      <div className="absolute top-8 right-0 flex items-center pr-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          onClick={() => setShowPassword(!showPassword)}
          className="h-8 w-8 p-0"
        >
          {showPassword ? (
            <EyeOff className="text-muted-foreground h-4 w-4" />
          ) : (
            <Eye className="text-muted-foreground h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
