import { HookFormProvider } from "@/components/form/HookFormProvider";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authApi } from "@/lib/api";
import { queryClient } from "@/lib/react-query";
import {
  UserCreateSchema,
  type UserCreateType,
} from "@/schemas/dashboard/user-create";
import type { User } from "@/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus, UsersIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DashboardCard } from "./components/DashboardCard";
import { UsersTable } from "./components/tables/UsersTable";
import { useAuthStore } from "@/stores/auth-store";
import clsx from "clsx";

interface UserStats {
  total: number;
  admins: number;
  actives: number;
  deactiveds: number;
}

interface PageUserResponseDto {
  previousPage: number;
  currentPage: number;
  nextPage: number;
  totalPages: number;
  size: number;
  content: User[];
}

export default function Users() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const { user } = useAuthStore.getState();

  const { data: userStats, isLoading: statsLoading } = useQuery<UserStats>({
    queryKey: ["userStats"],
    queryFn: async () => {
      const { data } = await authApi.get("/user/stats");
      return data as UserStats;
    },
    staleTime: 1000 * 30,
  });

  const { data: usersPage, isLoading } = useQuery<
    PageUserResponseDto,
    Error,
    PageUserResponseDto,
    readonly ["users", number, number]
  >({
    queryKey: ["users", page, size] as const,
    queryFn: async () => {
      const { data } = await authApi.get(`/user/all?page=${page}&size=${size}`);
      return data as PageUserResponseDto;
    },
    staleTime: 1000 * 10,
  });

  const users = usersPage?.content ?? [];

  const form = useForm<UserCreateType>({
    resolver: zodResolver(UserCreateSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      phone: "",
      role: "USER",
    },
  });

  const createUser = useMutation({
    mutationFn: async (payload: UserCreateType) => {
      const res = await authApi.post("/user/create", payload);
      return res;
    },
    onSuccess: (res) => {
      toast.success("Usuário criado com sucesso!");
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Erro ao criar usuário. Tente novamente.");
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      return authApi.delete(`/user/${userId}`);
    },
    onSuccess: () => {
      toast.success("Usuário excluído");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
    },
    onError: () => {
      toast.error("Falha ao excluir usuário");
    },
  });

  const handleCreateSubmit = (data: UserCreateType) => {
    createUser.mutate(data);
  };

  const handleDelete = (user: User) => {
    deleteUser.mutate(user.userId);
  };

  const updateUser = useMutation({
    mutationFn: async (payload: {
      userId: string;
      name: string;
      cpf: string;
      email: string;
      phone: string;
      role: string;
      active: boolean;
    }) => {
      const { data } = await authApi.put("/user/admin/update", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso!");
      // atualiza tabela e cards
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
    },
    onError: (err) => {
      console.error("Erro ao atualizar usuário:", err);
      // não fechar modal aqui — o UsersTable só fecha quando o onEdit promise resolve
      // informe o usuário sobre o erro
      toast.error("Erro ao atualizar usuário. Verifique os dados.");
      throw err; // re-throw para quem chamou (UsersTable) ser notificado se quiser
    },
  });

  // handler passado para UsersTable.
  // UsersTable chama onEdit(payload) e espera que retorne uma Promise se for async.
  const handleEdit = async (payload: {
    userId: string;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    role: string;
    active: boolean;
  }) => {
    // retorna a promise para que o UsersTable possa await e fechar o dialog só em sucesso
    return updateUser.mutateAsync(payload);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total de Usuários"
          icon={<UsersIcon className="h-4 w-4 text-blue-500" />}
          content={userStats ? String(userStats.total) : "Carregando..."}
        />
        <DashboardCard
          title="Total de Administradores"
          icon={<UsersIcon className="h-4 w-4 text-purple-500" />}
          content={userStats ? String(userStats.admins) : "Carregando..."}
        />
        <DashboardCard
          title="Total de Usuários Ativos"
          icon={<UsersIcon className="h-4 w-4 text-green-500" />}
          content={userStats ? String(userStats.actives) : "Carregando..."}
        />
        <DashboardCard
          title="Total de Usuários Inativos"
          icon={<UsersIcon className="h-4 w-4 text-red-500" />}
          content={userStats ? String(userStats.deactiveds) : "Carregando..."}
        />
      </div>

      <div className="flex items-center justify-between pt-6 pb-2">
        <div>
          <h3 className="text-bold">Lista de Unidades</h3>
          <h4 className="text-muted-foreground text-sm">
            Crie e Gerencie suas unidades
          </h4>
        </div>

        <div className="flex items-center gap-4 pt-6 pb-2">

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-950 hover:bg-blue-900 cursor-pointer">
                <Plus />
                Criar Usuário
              </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                <DialogDescription>
                  Formulário para adicionar um novo usuário.
                </DialogDescription>
              </DialogHeader>

              <HookFormProvider form={form} onSubmit={handleCreateSubmit}>
                <div className="space-y-4">
                  <InputField
                    control={form.control}
                    name="name"
                    label="Nome"
                    placeholder="John Doe"
                  />
                  <InputField
                    control={form.control}
                    name="cpf"
                    label="CPF"
                    placeholder="00000000000"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      control={form.control}
                      name="email"
                      label="E-mail"
                      placeholder="john@example.com"
                    />
                    <InputField
                      control={form.control}
                      name="phone"
                      label="Telefone"
                      placeholder="(81) 99999-9999"
                    />
                  </div>

                  <SelectField
                    control={form.control}
                    name="role"
                    label="Permissão"
                    options={
                      user?.role === "ADMIN_MASTER" ?
                        [
                          { value: "ADMIN_MASTER", label: "Administrador Geral" },
                          { value: "ADMIN", label: "Administrador" },
                          { value: "USER", label: "Funcionário" },
                        ] : [
                          { value: "ADMIN", label: "Administrador" },
                          { value: "USER", label: "Funcionário" },
                        ]
                    }
                  />

                  <Button
                    type="submit"
                    className="w-full bg-blue-950 hover:bg-blue-900"
                    disabled={
                      !form.formState.isValid || createUser.status === "pending"
                    }
                  >
                    {createUser.status === "pending"
                      ? "Criando..."
                      : "Criar Usuário"}
                  </Button>
                </div>
              </HookFormProvider>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="text-muted-foreground py-8 text-center">
            Carregando usuários...
          </div>
        ) : isLoading ? (
          <div className="py-8 text-center text-red-500">
            Erro ao carregar usuários
          </div>
        ) : (
          <UsersTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <div className="mt-4 flex items-center justify-between">
          <button
            disabled={page === 1 || isLoading}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className={clsx("rounded-md border px-3 py-1", {
              "cursor-not-allowed": (page === 1 || isLoading),
              "cursor-pointer": page !== 1
            })}
          >
            Página anterior
          </button>

          <span>
            Página {usersPage?.currentPage ?? page + 1} de{" "}
            {usersPage?.totalPages ?? 1}
          </span>

          <button
            disabled={
              isLoading ||
              (usersPage
                ? usersPage.currentPage >= usersPage.totalPages
                : false)
            }
            onClick={() => {
              if (!usersPage || usersPage.currentPage < usersPage.totalPages) {
                setPage((p) => p + 1);
              }
            }}
            className={clsx("rounded-md border px-3 py-1", {
              "cursor-not-allowed": isLoading || (usersPage ? usersPage.currentPage >= usersPage.totalPages : false),
              "cursor-pointer": !(usersPage ? usersPage.currentPage >= usersPage.totalPages : false),
            })}
          >
            Próxima página
          </button>
        </div>
      </div>
    </div >
  );
}
