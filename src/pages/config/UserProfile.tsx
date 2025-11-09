import api from "@/lib/api";
import { queryClient } from "@/lib/react-query";
import {
  UserCreateSchema,
  type UserCreateType,
} from "@/schemas/dashboard/user-create";
import type { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UserProfile() {

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
      const { data } = await api.put("/user/admin/update", payload);
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
        
      </div>

      <div className="flex items-center justify-between pt-6 pb-2">
        <div>
          <h3 className="text-bold">Lista de Unidades</h3>
          <h4 className="text-muted-foreground text-sm">
            Crie e Gerencie suas unidades
          </h4>
        </div>

        <div className="flex items-center gap-4 pt-6 pb-2">


        </div>
      </div>

      <div>

      </div>
    </div>
  );
}
