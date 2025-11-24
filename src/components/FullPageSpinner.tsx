import { Loader2 } from "lucide-react";

export function FullPageSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Loader2 color="orange" className="h-12 w-12 animate-spin" />
    </div>
  );
}
