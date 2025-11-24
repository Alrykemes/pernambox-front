import {
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { useProfilePhoto } from "@/hooks/use-profile-photo";
import { getInitials } from "@/utils/getInitials";
import type { User } from "@/types/common";

interface UserRowProps {
  u: User;
  user: User | null;
  openEditDialog: (user: User) => void;
  handleDeleteClick: (user: User) => void;
  deletingId: string | null;
}

export function UserRow({
  u,
  user,
  openEditDialog,
  handleDeleteClick,
  deletingId,
}: UserRowProps) {
  const profileUrl = useProfilePhoto(u?.imageProfileName ?? null);

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            {profileUrl ? (
              <AvatarImage
                className="rounded-full"
                src={profileUrl}
                alt="Foto de perfil"
              />
            ) : (
              <AvatarFallback>{getInitials(u.name)}</AvatarFallback>
            )}
          </Avatar>

          <div className="flex flex-col text-left">
            <span className="font-medium">{u.name}</span>
            <span className="text-muted-foreground text-xs">
              {u.cpf ?? ""}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{u.email}</span>
          <span className="text-muted-foreground text-xs">
            {u.phone ?? ""}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="inline-block rounded-md bg-slate-100 px-2 py-1 text-sm font-medium">
          {u.role === "ADMIN_MASTER"
            ? "Administrador Geral"
            : u.role === "ADMIN"
              ? "Administrador"
              : "Funcionário"}
        </div>
      </TableCell>

      <TableCell>
        {u.active ? (
          <div className="inline-block rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-900">
            Ativo
          </div>
        ) : (
          <div className="inline-block rounded-md bg-amber-100 px-2 py-1 text-sm font-medium text-amber-900">
            Inativo
          </div>
        )}
      </TableCell>

      {u.userId === user?.userId && (
        <TableCell>
          <div className="w-18">
            <div className="flex items-center justify-center rounded-md bg-blue-100 px-2 py-1 text-sm font-medium text-black-900">
              Você
            </div>
          </div>
        </TableCell>
      )}

      {(
        (u.role === "ADMIN_MASTER" && user?.role === "ADMIN_MASTER") ||
        (u.role === "ADMIN" || u.role === "USER")
      ) &&
        u.userId !== user?.userId && (
          <TableCell>
            <div className="flex items-center gap-2">
              {/* Edit */}
              <button
                type="button"
                aria-label={`Editar ${u.name}`}
                onClick={() => openEditDialog(u)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100"
              >
                <Pencil className="h-4 w-4" />
              </button>

              {/* Delete */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Trash className="h-5 w-5 cursor-pointer" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá este usuário.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>

                    <AlertDialogAction
                      onClick={() => handleDeleteClick(u)}
                      disabled={deletingId === u.userId}
                    >
                      {deletingId === u.userId ? "Excluindo..." : "Continuar"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TableCell>
        )}
    </TableRow>
  );
}