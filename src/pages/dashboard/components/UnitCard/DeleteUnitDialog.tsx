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
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteUnitDialog({ unitId }: { unitId: string }) {
  const queryClient = useQueryClient();

  const handleUnitDelete = async () => {
    try {
      await authApi.delete(`/unit/delete/${unitId}`);
      toast.success("Unidade excluída");
      // refresh units list
      queryClient.invalidateQueries({ queryKey: ["units"] });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir unidade");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer" asChild>
        <Button className="cursor-pointer" variant="ghost">
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
          <AlertDialogCancel className="cursor-pointer" >Cancelar</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleUnitDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
