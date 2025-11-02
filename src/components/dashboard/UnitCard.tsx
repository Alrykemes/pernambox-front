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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import type { Unit } from "@/types/unit";
import { MapPin, PackageOpen, SquarePen, Trash, Users } from "lucide-react";
import { Button } from "../ui/button";

interface UnitCardProps {
  unit: Unit;
}

export function UnitCard({
  unit: { id, name, phone, email, responsible, address },
}: UnitCardProps) {
  const handleUnitDelete = async () => {
    const response = await api.delete("/unit", { data: { id } });
    console.log(response);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex gap-2">
          <div className="rounded-sm bg-blue-300 p-3">
            <MapPin className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <CardTitle className="">{name}</CardTitle>
            <CardDescription className="text-sm">
              {/* city */}
              Olinda
            </CardDescription>
          </div>
        </div>
        {/* status */}
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
          {/* responsible */}
          <span className="text-muted-foreground">{responsible.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold">Contato:</span>
          <span className="text-muted-foreground">{phone}</span>
          <span className="text-muted-foreground">{email}</span>
        </div>
        <div className="flex justify-between border-t py-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <PackageOpen className="h-5 w-5 text-gray-600" />
              <span className="ml-2 font-bold text-gray-600">
                Total de Itens:
              </span>
            </div>
            <span className="font-bold">456</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-600" />
              <span className="ml-2 font-bold text-gray-600">
                Total de Usuários:
              </span>
            </div>
            <span className="font-bold">23</span>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-5 text-gray-800">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <SquarePen className="h-5 w-5 cursor-pointer" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Unidade</DialogTitle>
                <DialogDescription>
                  Faça alterações nesta unidade aqui. Clique em salvar quando
                  terminar.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

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
