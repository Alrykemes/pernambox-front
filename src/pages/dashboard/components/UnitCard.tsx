import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api";
import type { Unit } from "@/types/unit";
import { Building2, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { EditUnitDialog } from "./UnitCard/EditUnitDialog";

interface UnitCardProps {
  unit: Unit;
}

export function UnitCard({
  unit: { id, name, phone, email, responsible, address },
}: UnitCardProps) {
  const queryClient = useQueryClient();

  const handleUnitDelete = async () => {
    try {
      await api.delete(`/unit/${id}`);
      toast.success("Unidade excluída");
      // refresh units list
      queryClient.invalidateQueries({ queryKey: ["units"] });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir unidade");
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex gap-2">
          <div className="rounded-sm bg-blue-300 p-2">
            <Building2 className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <CardTitle className="">{name}</CardTitle>
            <CardDescription className="text-sm">
              {address.city} - {address.state}
            </CardDescription>
          </div>
        </div>
        <span className="rounded-full bg-green-500 px-3 py-0.5 text-sm">
          Operacional
        </span>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-base font-bold">Endereço:</span>
          <span className="text-muted-foreground">
            {address.street}, {address.number} - {address.district},{" "}
            {address.city} - {address.state}, {address.zipCode}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-base font-bold">Responsável:</span>
          <span className="text-muted-foreground">
            {responsible?.name ?? "-"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-base font-bold">Contato:</span>
          <span className="text-muted-foreground">{phone}</span>
          <span className="text-muted-foreground">{email}</span>
        </div>

        <div className="flex flex-row-reverse gap-5 text-gray-800">
          {/* Edit Dialog (opens edit form pre-filled) */}
          <EditUnitDialog
            unit={{ id, name, phone, email, responsible, address }}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost">
                <Trash className="h-5 w-5 cursor-pointer" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso excluirá essa unidade e
                  removerá todos os seus dados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleUnitDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
