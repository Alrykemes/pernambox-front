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
import type { User } from "@/types/common";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

import { HookFormProvider } from "@/components/form/HookFormProvider";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useProfilePhoto } from "@/hooks/use-profile-photo";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";

const UserUpdateSchema = z.object({
  userId: z.string().nonempty(),
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  cpf: z.string().length(11, "O CPF deve conter 11 dígitos"),
  email: z.email("Email inválido"),
  phone: z.string().min(8).max(15),
  role: z.enum(["ADMIN_MASTER", "ADMIN", "USER"]),
  active: z.enum(["true", "false"]),
});
type UserUpdateType = z.infer<typeof UserUpdateSchema>;

interface UsersTableProps {
  users?: User[] | null;
  onEdit?: (payload: {
    userId: string;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    role: string;
    active: boolean;
  }) => Promise<any> | void;
  onDelete?: (user: User) => Promise<any> | void;
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
  const [editOpen, setEditOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [submittingEdit, setSubmittingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const editForm = useForm<UserUpdateType>({
    resolver: zodResolver(UserUpdateSchema),
    mode: "onChange",
    defaultValues: {
      userId: "",
      name: "",
      cpf: "",
      email: "",
      phone: "",
      role: "USER",
      active: "true",
    },
  });

  const openEditDialog = (u: User) => {
    editForm.reset({
      userId: u.userId,
      name: u.name ?? "",
      cpf: u.cpf ?? "",
      email: u.email ?? "",
      phone: u.phone ?? "",
      role: (u.role as "ADMIN_MASTER" | "ADMIN" | "USER") ?? "USER",
      active: u.active ? "true" : "false",
    });
    setEditingUserId(u.userId);
    setEditOpen(true);
  };

  const handleEditSubmit = async (data: UserUpdateType) => {
    if (!onEdit) {
      toast.error("Handler de edição não fornecido.");
      return;
    }

    setSubmittingEdit(true);
    try {
      const payload = {
        userId: data.userId,
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        phone: data.phone,
        role: data.role,
        active: data.active === "true",
      };

      const result = onEdit(payload);
      if (result instanceof Promise) await result;

      toast.success("Usuário atualizado com sucesso.");
      editForm.reset();
      setEditOpen(false);
      setEditingUserId(null);
    } catch (err) {
      console.error("Falha ao atualizar usuário:", err);
      toast.error("Erro ao atualizar usuário. Verifique os dados.");
    } finally {
      setSubmittingEdit(false);
    }
  };

  const handleDeleteClick = async (u: User) => {
    if (!onDelete) return;
    try {
      setDeletingId(u.userId);
      const res = onDelete(u);
      if (res instanceof Promise) await res;
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
      toast.error("Falha ao excluir usuário.");
    } finally {
      setDeletingId(null);
    }
  };

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
            ) : (users.map((u) => (
              <TableRow key={u.userId}>
                <TableCell>
                  <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        {Boolean(useProfilePhoto(u?.imageProfileName ?? null)) ? <AvatarImage className="rounded-full" src={useProfilePhoto(u?.imageProfileName ?? null) ?? ''} alt="Foto de perfil" />
                          : <AvatarFallback>{getInitials(u?.name)}</AvatarFallback>}
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
                    {/* Edit (abre dialog local) */}
                    <button
                      type="button"
                      aria-label={`Editar ${u.name}`}
                      onClick={() => openEditDialog(u)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    {/* Delete dialog (usa onDelete prop) */}
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
                            Esta ação não pode ser desfeita. Isso excluirá
                            este usuário.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteClick(u)}
                            disabled={deletingId === u.userId}
                          >
                            {deletingId === u.userId
                              ? "Excluindo..."
                              : "Continuar"}
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

      {/* DIALOG DE EDIÇÃO (único, controlado por state) */}
      <Dialog
        open={editOpen}
        onOpenChange={(v) => {
          if (!v) {
            editForm.reset();
            setEditingUserId(null);
          }
          setEditOpen(v);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>

          <HookFormProvider form={editForm} onSubmit={handleEditSubmit}>
            {/* userId escondido */}
            <input type="hidden" {...editForm.register("userId")} />

            <div className="space-y-4">
              <InputField
                control={editForm.control}
                name="name"
                label="Nome"
                placeholder="John Doe"
              />
              <InputField
                control={editForm.control}
                name="cpf"
                label="CPF"
                placeholder="00000000000"
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  control={editForm.control}
                  name="email"
                  label="E-mail"
                  placeholder="john@example.com"
                />
                <InputField
                  control={editForm.control}
                  name="phone"
                  label="Telefone"
                  placeholder="(81) 99999-9999"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  control={editForm.control}
                  name="role"
                  label="Permissão"
                  options={[
                    { value: "ADMIN", label: "Administrador" },
                    { value: "USER", label: "Funcionário" },
                  ]}
                />

                <SelectField
                  control={editForm.control}
                  name="active"
                  label="Status"
                  options={[
                    { value: "true", label: "Ativo" },
                    { value: "false", label: "Inativo" },
                  ]}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-blue-950 hover:bg-blue-900"
                  disabled={submittingEdit || !editForm.formState.isValid}
                >
                  {submittingEdit ? "Salvando..." : "Salvar alterações"}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditOpen(false);
                    editForm.reset();
                    setEditingUserId(null);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </HookFormProvider>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
