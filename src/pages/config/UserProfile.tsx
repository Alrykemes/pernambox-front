import { HookFormProvider, InputField, InputPasswordField } from "@/components/form";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfilePhoto } from "@/hooks/use-profile-photo";
import { authApi } from "@/lib/api";
import { ChangePasswordSchema, type ChangePasswordType } from "@/schemas/config/password-change";
import { UserEditMeSchema, type UserEditMeType } from "@/schemas/config/user-edit-me";
import { useAuthStore } from "@/stores/auth-store";
import type { User } from "@/types/common";
import { getInitials } from "@/utils/getInitials";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@radix-ui/react-avatar";
import { useMutation } from "@tanstack/react-query";
import { LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UserProfile() {
  const {user, setUser} = useAuthStore.getState();
  const [editing, setEditing] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const { setUser: setUserAuth } = useAuthStore();
  const profilePhotoUrl = useProfilePhoto(user?.imageProfileName ?? null);
  const hasPhoto = Boolean(profilePhotoUrl);

  const formEditPassword = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      userId: user?.userId,
      password: "",
      newPassword: "",
      confirmNewPassword: undefined
    },
  });

  const formEditMe = useForm({
    resolver: zodResolver(UserEditMeSchema),
    defaultValues: {
      userId: user?.userId ?? '',
      name: user?.name ?? '',
      email: user?.email ?? '',
      cpf: user?.cpf ?? '',
      phone: user?.phone ?? '',
      password: "",
      imageProfile: ""
    },
  });

  useEffect(() => {
    console.log(user?.cpf);
    formEditMe.reset({
      userId: user?.userId ?? '',
      name: user?.name ?? '',
      email: user?.email ?? '',
      cpf: user?.cpf ?? '',
      phone: user?.phone ?? '',
      password: "",
      imageProfile: ""
    }
    )
  }, [user]);

  const updateUser = useMutation({
    mutationFn: async (payload: {
      userId: string;
      name?: string;
      cpf?: string;
      email?: string;
      phone?: string;
      password: string;
      imageProfile?: string;
      file?: File | undefined;
    }) => {

      if (payload.file) {
        const formData = new FormData();
        formData.append("files", payload.file);

        const uploadResponse = await authApi.post("/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const imageName = uploadResponse.data.fileNames[0];

        payload.imageProfile = imageName;
      }

      const payloadUpdate = {
        ...payload,
        file: undefined
      }

      console.log(payloadUpdate);

      const { data } = await authApi.put("/user/update/me", payloadUpdate);
      console.log(data);
      setUserAuth(data);
      setUser(data);
      return data;
    },
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      formEditMe.reset({
        userId: user?.userId,
        name: user?.name,
        email: user?.email,
        cpf: user?.cpf,
        phone: user?.phone,
        password: "",
        file: undefined
      });

      setEditing(false);
      setPasswordEntered(false);
    },
    onError: (err) => {
      console.error("Erro ao atualizar usuário:", err);
      toast.error("Erro ao atualizar usuário. Verifique os dados.");
      throw err;
    },
  });

  const updatePassword = useMutation({
    mutationFn: async (payload: {
      userId: string;
      password: string;
      newPassword: string;
    }) => {
      const { data } = await authApi.put("/user/update/me", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Senha Alterada com Sucesso!");
      formEditPassword.reset({
        userId: user?.userId,
        password: "",
        newPassword: "",
        confirmNewPassword: ""
      });
    },
    onError: (err) => {
      console.error("Erro ao atualizar usuário:", err);
      toast.error("Erro ao atualizar usuário. Verifique os dados.");
      throw err;
    },
  });

  const editInfo = async (payload: UserEditMeType) => {
    return updateUser.mutate(payload);
  };

  const editPassword = async (payload: ChangePasswordType) => {
    return updatePassword.mutate(payload);
  };

  const password = formEditMe.watch("password");

  if (!password && password) setPasswordEntered(true);

  return (
    <div className="flex justify-center bg-gray-50 p-8">
      <Card className="w-full shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Configurações da sua Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile-info" className="gap-4 w-full items-center justify-center">
            <TabsList className="h-14 lg:w-154 sm:w-102">
              <TabsTrigger value="profile-info">Informações Pessoais</TabsTrigger>
              <TabsTrigger value="profile-security">Segurança</TabsTrigger>
            </TabsList>
            <TabsContent value="profile-info">
              <div className="flex flex-col items-center space-y-3 mb-6">
                <div className="text-center">
                  <p className="font-medium text-gray-800">Foto do Perfil</p>
                </div>
                <Avatar className="w-40 h-40">
                  {hasPhoto ? <AvatarImage className="rounded-full" src={profilePhotoUrl ?? ''} alt="Foto de perfil" />
                    : <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>}
                </Avatar>
              </div>
              <HookFormProvider form={formEditMe} onSubmit={editInfo} className="space-y-4 md:w-110 lg:w-180 xl:w-230">
                <div className="grid gap-2">
                  <FormField
                    control={formEditMe.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Escolha sua Foto do Perfil</FormLabel>

                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            disabled={!editing}
                            onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <InputField control={formEditMe.control} disabled={!editing} name="name" label="Nome e Sobrenome" defaultValue={user?.name} />
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
                    <InputPasswordField
                      control={formEditMe.control}
                      name="password"
                      label="Confime com sua senha"
                      placeholder="••••••••"
                      type="password"
                      autoComplete="current-password"
                    />
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
            </TabsContent>

            <TabsContent value="profile-security">
              <HookFormProvider form={formEditPassword} onSubmit={editPassword} className="space-y-4 md:w-110 lg:w-180 xl:w-230">
                {/* current password */}
                <div>
                  <InputPasswordField
                    control={formEditPassword.control}
                    name="password"
                    label="Senha Atual"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>

                {/* new password */}
                <div>
                  <InputPasswordField
                    control={formEditPassword.control}
                    name="newPassword"
                    label="Nova Senha"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>

                {/* confirm new password */}
                <div>
                  <InputPasswordField
                    control={formEditPassword.control}
                    name="confirmNewPassword"
                    label="Confime sua Nova senha"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button className="cursor-pointer">
                    Alterar Senha <LockKeyhole />
                  </Button>
                </div>
              </HookFormProvider>
            </TabsContent>
          </Tabs>
        </CardContent >
      </Card >
    </div>
  );
}
