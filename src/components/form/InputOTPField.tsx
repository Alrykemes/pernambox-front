import { ControlledField } from "@/components/form/ControlledField";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";

interface InputOTPFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  wrapperClassName?: string;
  slotClassName?: string;
  length?: number;
}

export function InputOTPField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  wrapperClassName,
  slotClassName,
  length = 6,
}: InputOTPFieldProps<T>) {
  return (
    <ControlledField
      control={control}
      name={name}
      label={label}
      description={description}
    >
      {(field) => (
        <InputOTP
          {...field}
          maxLength={length}
          className={cn("w-full", wrapperClassName)}
        >
          <InputOTPGroup className="flex w-full gap-3">
            {Array.from({ length }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className={cn(
                  "h-12 min-w-0 flex-1 rounded-md border text-center text-lg",
                  slotClassName,
                )}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      )}
    </ControlledField>
  );
}
