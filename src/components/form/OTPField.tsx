// components/form/OTPField.tsx
import BaseFormField from "@/components/form/BaseFormField";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";

export interface OTPFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  wrapperClassName?: string;
  slotClassName?: string;
  length?: number;
}

export default function OTPField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  wrapperClassName,
  slotClassName,
  length = 6,
}: OTPFieldProps<T>) {
  return (
    <BaseFormField control={control} name={name} label={label} description={description}>
      {(field) => (
        <InputOTP {...field} maxLength={length} className={cn("w-full", wrapperClassName)}>
          <InputOTPGroup className="flex w-full gap-3">
            {Array.from({ length }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className={cn(
                  "flex-1 min-w-0 h-12 rounded-md border text-center text-lg",
                  slotClassName
                )}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      )}
    </BaseFormField>
  );
}
