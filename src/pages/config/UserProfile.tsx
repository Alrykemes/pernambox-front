import { HookFormProvider, InputField } from "@/components/form";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { ChangePasswordSchema, type ChangePasswordType } from "@/schemas/config/password-change";
import { UserEditMeSchema, type UserEditMeType } from "@/schemas/config/user-edit-me";
import { useAuthStore } from "@/stores/auth-store";
import type { User } from "@/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@radix-ui/react-avatar";
import { useMutation } from "@tanstack/react-query";
import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(useAuthStore().user);
  const [editing, setEditing] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const formEditMe = useForm({
    resolver: zodResolver(UserEditMeSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      cpf: user?.cpf,
      phone: user?.phone,
      password: "",
    },
  });


  const updateUser = useMutation({
    mutationFn: async (payload: {
      userId?: string;
      name?: string;
      cpf?: string;
      email?: string;
      phone?: string;
    }) => {
      const { data } = await api.put("/user/update/me", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      formEditMe.reset({
        name: user?.name,
        email: user?.email,
        cpf: user?.cpf,
        phone: user?.phone,
        password: "",
      });
      setEditing(false);
      setPasswordEntered(false);
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
  const handleEdit = async (payload: UserEditMeType) => {
    // retorna a promise para que o UsersTable possa await e fechar o dialog só em sucesso
    return updateUser.mutate(payload);
  };

  const password = formEditMe.watch("password");

  if (!password && password) setPasswordEntered(true);


  // Formulário do modal de alteração de senha
  const {
    register: regModal,
    handleSubmit: handleSubmitModal,
    reset: resetModal,
    formState: { errors: errorsModal },
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Perfil do Usuário
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center space-y-3 mb-6">
            <Avatar className="w-40 h-40">
              <AvatarImage className="rounded-full" src="https://randomuser.me/api/portraits/women/68.jpg" alt="Foto de perfil" />
              <AvatarFallback>JA</AvatarFallback>
            </Avatar>
            <div className="flex items-center justify-center">
              <Input
                id="profileImage"
                type="file"
                disabled={true}
              />
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <HookFormProvider form={formEditMe} onSubmit={handleEdit} className="space-y-4">

              <div className="grid gap-2">
                <InputField control={formEditMe.control} disabled={!editing} name="name" label="Nome e Sobrenome" id="name" defaultValue={user?.name} />
              </div>

              <div className="grid gap-2">
                <InputField control={formEditMe.control} disabled={!editing} name="email" label="Email" defaultValue={user?.email} />
              </div>

              <div className="grid gap-2">
                <InputField control={formEditMe.control} disabled={!editing} name="cpf" label="CPF" defaultValue={user?.cpf} />
              </div>

              <div className="grid gap-2">
                <InputField control={formEditMe.control} disabled={!editing} name="phone" label="Número de Telefone" defaultValue={user?.phone} />
              </div>

              {editing && (
                <div className="grid gap-2">
                  <InputField control={formEditMe.control} disabled={!editing} name="password" label="Confime com sua senha" defaultValue="*********" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                {!editing ? (
                  <Button className="cursor-pointer bg-gray-500" onClick={() => { setEditing(true) }}>
                    Editar
                  </Button>
                ) :
                  <Button className="cursor-pointer bg-red-500" onClick={() => { /* Meter uma função de rest aqui */setEditing(false) }}>
                    Cancelar
                  </Button>
                }
                <Button className="cursor-pointer bg-green-500" disabled={!editing} onClick={() => { /* Meter uma função de Submit */ }}>
                  Salvar
                </Button>
              </div>
            </HookFormProvider>

            <div className="grid gap-2">
              <Button className="cursor-pointer">
                Alterar Senha <LockKeyhole />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
