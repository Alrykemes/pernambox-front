// components/dashboard/UnitCard/UnitCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { InfoBlock } from "@/pages/dashboard/components/UnitCard/InfoBlock";
import { UnitCardActions } from "@/pages/dashboard/components/UnitCard/UnitCardActions";
import { UnitCardHeader } from "@/pages/dashboard/components/UnitCard/UnitCardHeader";
import type { Unit } from "@/types/unit";
import type { User } from "@/types/user";

export function UnitCard({ unit, user }: { unit: Unit, user: User}) {
  const { name, phone, email, responsible, address } = unit;

  return (
    <Card>
      <UnitCardHeader name={name} city={address.city} state={address.state} />

      <CardContent className="flex flex-col gap-4">
        <InfoBlock label="Endereço">
          {address.street}, {address.number} - {address.district},{" "}
          {address.city} - {address.state}, {address.zipCode}
        </InfoBlock>

        <InfoBlock label="Responsável">{responsible?.name ?? "-"}</InfoBlock>
        <InfoBlock label="Contato">
          {phone} <br /> {email}
        </InfoBlock>

        <UnitCardActions unit={unit} user={user} />
      </CardContent>
    </Card>
  );
}
