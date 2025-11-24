import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";

export interface AppButtonProps extends ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
}

export default function AppButton({
  children,
  isLoading = false,
  loadingText = "Carregando...",
  className,
  disabled,
  type = "button",
  onClick,
  ...rest
}: AppButtonProps) {
  return (
    <Button
      {...rest}
      type={type}
      onClick={onClick}
      className={cn("h-12 cursor-pointer", className)}
      aria-disabled={isLoading || disabled}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
