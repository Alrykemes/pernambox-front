import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  children: React.ReactNode;
  isSubmitting?: boolean;
  className?: string;
}

export default function SubmitButton({
  children,
  isSubmitting,
  className,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={className}
      aria-disabled={isSubmitting}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : children}
    </Button>
  );
}
