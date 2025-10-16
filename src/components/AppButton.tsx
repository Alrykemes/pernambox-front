import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AppButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "destructive"
    | "secondary"
    | "link";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function AppButton({
  children,
  isLoading,
  disabled,
  className,
  variant = "default",
  type = "button",
  onClick,
}: AppButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={cn("h-12 cursor-pointer", className)}
      variant={variant}
      aria-disabled={isLoading || disabled}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Carregando...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
