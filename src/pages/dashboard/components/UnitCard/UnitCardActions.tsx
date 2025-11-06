import { EditUnitDialog } from "@/pages/dashboard/components/UnitCard/EditUnitDialog";
import type { Unit } from "@/types/unit";
import { DeleteUnitDialog } from "./DeleteUnitDialog";
import type { User } from "@/types/user";

export function UnitCardActions({ unit, user }: { unit: Unit, user: User }) {
  const { role } = user;
  return (
    <div className="flex flex-row-reverse gap-5 text-gray-800">
      {role == "ADMIN" && (
        <>
          <EditUnitDialog unit={unit} />
          <DeleteUnitDialog unitId={unit.id} />
        </>
      )}
    </div>
  );
}
