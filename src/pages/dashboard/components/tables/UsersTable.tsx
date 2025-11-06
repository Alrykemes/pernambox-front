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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/types/user";
import { Pencil, Trash } from "lucide-react";

interface UsersTableProps {
  users?: User[] | null;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

function getInitials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const initials =
    parts.length === 1
      ? parts[0].slice(0, 2)
      : (parts[0][0] ?? "") + (parts[parts.length - 1][0] ?? "");
  return initials.toUpperCase();
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Usuários</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Lista de usuários.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground text-xs">
                USUÁRIO
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                CONTATO
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                PERMISSÃO
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                STATUS
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                AÇÃO
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!users || users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground py-8 text-center"
                >
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.userId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {/* Avatar (fallback to initials) */}
                      {u.avatar ? (
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            // fallback to initials if image fails
                            (
                              e.currentTarget as HTMLImageElement
                            ).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-700">
                          {getInitials(u.name)}
                        </div>
                      )}

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
                      {u.role}
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

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Editar ${u.name}`}
                        onClick={() => onEdit?.(u)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

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
                              Esta ação não pode ser desfeita. Isso excluirá
                              essa unidade e removerá todos os seus dados.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete?.(u)}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
