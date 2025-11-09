import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface UnitCardHeaderProps {
  name: string;
  city: string;
  state: string;
}

export function UnitCardHeader({ name, city, state }: UnitCardHeaderProps) {
  return (
    <CardHeader className="flex justify-between">
      <div className="flex gap-2">
        <div className="rounded-sm bg-blue-300 p-2">
          <Building2 className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription className="text-sm">
            {city} - {state}
          </CardDescription>
        </div>
      </div>
      {/* <span className="rounded-full bg-green-500 px-3 py-0.5 text-sm">
        Operacional
      </span> */}
    </CardHeader>
  );
}
