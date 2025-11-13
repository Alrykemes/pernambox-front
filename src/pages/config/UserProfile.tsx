import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// ajusta o caminho conforme teu projeto

// --- Zod Schemas ---

const userSchema = z.object({
  nome: z.string().min(1, "Campo obrigatório"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().optional(),
  confirmarSenha: z.string().optional(),
}).refine(
  (data) => !data.senha || data.senha === data.confirmarSenha,
  { message: "As senhas não coincidem", path: ["confirmarSenha"] }
);

const alterarSenhaSchema = z.object({
  senhaAntiga: z.string().min(1, "Campo obrigatório"),
  novaSenha: z.string().min(6, "Mínimo de 6 caracteres"),
  confirmarNovaSenha: z.string().min(6, "Mínimo de 6 caracteres"),
}).refine(
  (data) => data.novaSenha === data.confirmarNovaSenha,
  { message: "As senhas não coincidem", path: ["confirmarNovaSenha"] }
);

// --- Componente Principal ---
export default function PerfilUsuario() {
  const [editando, setEditando] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nome: "João da Silva",
      email: "joao@email.com",
      senha: "",
      confirmarSenha: "",
    },
  });

  const senha = watch("senha");
  const confirmarSenha = watch("confirmarSenha");

  // Detecta digitação de senha
  if (!senhaDigitada && senha) setSenhaDigitada(true);

  const onSubmit = async (data: any) => {
    // Simula requisição
    await new Promise((r) => setTimeout(r, 1000));

    console.log("Dados enviados:", data);

    // Atualiza placeholders e reseta tudo
    reset({
      nome: data.nome,
      email: data.email,
      senha: "",
      confirmarSenha: "",
    });
    setEditando(false);
    setSenhaDigitada(false);
  };

  // Formulário do modal de alteração de senha
  const {
    register: regModal,
    handleSubmit: handleSubmitModal,
    reset: resetModal,
    formState: { errors: errorsModal },
  } = useForm({
    resolver: zodResolver(alterarSenhaSchema),
    defaultValues: {
      senhaAntiga: "",
      novaSenha: "",
      confirmarNovaSenha: "",
    },
  });

  const onSubmitModal = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Alteração de senha:", data);
    resetModal();
    setModalAberto(false);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-xl font-semibold">Perfil do Usuário</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nome */}
        <div>
          <Label>Nome</Label>
          <Input
            disabled={!editando}
            {...register("nome")}
            placeholder="Nome"
          />
          {errors.nome && (
            <p className="text-sm text-red-500">{errors.nome.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label>Email</Label>
          <Input
            disabled={!editando}
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Campo de senha só aparece em modo de edição */}
        {editando && (
          <>
            <div>
              <Label>Senha</Label>
              <Input
                type="password"
                {...register("senha")}
                placeholder="Digite sua senha"
              />
            </div>

            <div>
              <Label>Confirmar Senha</Label>
              <Input
                type="password"
                {...register("confirmarSenha")}
                placeholder="Confirme sua senha"
              />
              {errors.confirmarSenha && (
                <p className="text-sm text-red-500">
                  {errors.confirmarSenha.message}
                </p>
              )}
            </div>
          </>
        )}

        <div className="flex gap-2">
          {!editando ? (
            <>
              <Button type="button" onClick={() => setEditando(true)}>
                Editar
              </Button>
              <Dialog open={modalAberto} onOpenChange={setModalAberto}>
                <DialogTrigger asChild>
                  <Button variant="secondary">Alterar Senha</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Alterar Senha</DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSubmitModal(onSubmitModal)} className="space-y-3">
                    <div>
                      <Label>Senha Atual</Label>
                      <Input type="password" {...regModal("senhaAntiga")} />
                      {errorsModal.senhaAntiga && (
                        <p className="text-sm text-red-500">
                          {errorsModal.senhaAntiga.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Nova Senha</Label>
                      <Input type="password" {...regModal("novaSenha")} />
                      {errorsModal.novaSenha && (
                        <p className="text-sm text-red-500">
                          {errorsModal.novaSenha.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Confirmar Nova Senha</Label>
                      <Input type="password" {...regModal("confirmarNovaSenha")} />
                      {errorsModal.confirmarNovaSenha && (
                        <p className="text-sm text-red-500">
                          {errorsModal.confirmarNovaSenha.message}
                        </p>
                      )}
                    </div>

                    <DialogFooter>
                      <Button type="submit">Salvar</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <Button
                type="submit"
                disabled={!senhaDigitada}
              >
                Salvar
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setEditando(false);
                  setSenhaDigitada(false);
                  reset();
                }}
              >
                Cancelar
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}