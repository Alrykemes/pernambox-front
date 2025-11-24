import { EditUnitDialog } from "@/pages/dashboard/components/UnitCard/EditUnitDialog";
import type { Unit } from "@/types/common";
import { DeleteUnitDialog } from "./DeleteUnitDialog";
import type { User } from "@/types/common";

export function UnitCardActions({ unit, user }: { unit: Unit, user: User }) {
  const { role } = user;
  return (
    <div className="flex flex-row-reverse gap-5 text-gray-800">
      {role == "ADMIN_MASTER" && (
        <>
          <DeleteUnitDialog unitId={unit.id} />
          <EditUnitDialog unit={unit} />
        </>
      )}
    </div>
  );
}
