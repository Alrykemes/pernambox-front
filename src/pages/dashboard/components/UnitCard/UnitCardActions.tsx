import { EditUnitDialog } from "@/pages/dashboard/components/UnitCard/EditUnitDialog";
import type { Unit } from "@/types/unit";
import { DeleteUnitDialog } from "./DeleteUnitDialog";

export function UnitCardActions({ unit }: { unit: Unit }) {
  return (
    <div className="flex flex-row-reverse gap-5 text-gray-800">
      <EditUnitDialog unit={unit} />
      <DeleteUnitDialog unitId={unit.id} />
    </div>
  );
}
