import { HookFormProvider } from "@/components/form/HookFormProvider";
import { InputField } from "@/components/form/InputField";
import { ResponsibleSelect } from "@/components/form/ResponsibleSelect";
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
import {
  UnitCreateSchema,
  type UnitCreateType,
} from "@/schemas/dashboard/unit-create";
import { UnitEditSchema, type UnitEditType } from "@/schemas/dashboard/unit-edit";
import type { Unit } from "@/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function EditUnitDialog({ unit }: { unit: Unit }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<UnitEditType>({
    resolver: zodResolver(UnitEditSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: unit.name ?? "",
      phone: unit.phone ?? "",
      email: unit.email ?? "",
      responsible_id: unit.responsible?.userId ?? "",
      active: unit.active ? "true" : "false",
      address: {
        number: unit.address?.number ?? "",
        street: unit.address?.street ?? "",
        district: unit.address?.district ?? "",
        city: unit.address?.city ?? "",
        state: unit.address?.state ?? "",
        zipCode: unit.address?.zipCode ?? "",
        complement: unit.address?.complement ?? "",
      },
    },
  });

  const onSubmit = async (data: UnitCreateType) => {
    try {
      const response = await authApi.patch(`/unit/update/${unit.id}`, data);
      if (response.status === 200) {
        toast.success("Unidade atualizada com sucesso");
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["units"] });
      } else {
        toast.error("Erro ao atualizar unidade");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar unidade");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        <Button className="cursor-pointer" variant="ghost">
          <SquarePen className="h-5 w-5 cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Unidade</DialogTitle>
          <DialogDescription>
            Faça alterações nesta unidade aqui. Clique em salvar quando
            terminar.
          </DialogDescription>
        </DialogHeader>

        <HookFormProvider form={form} onSubmit={onSubmit}>
          <div className="space-y-4">
            <InputField
              control={form.control}
              name="name"
              label="Nome"
              placeholder="Unidade Olinda"
            />
            <InputField
              control={form.control}
              name="phone"
              label="Telefone"
              placeholder="(81) 99999-9999"
            />
            <InputField
              control={form.control}
              name="email"
              label="E-mail"
              placeholder="john@example.com"
            />

            <ResponsibleSelect
              control={form.control}
              name="responsible_id"
              label="Responsável"
              placeholder="Selecione um responsável"
            />

            <SelectField
              control={form.control}
              name="active"
              label="Status"
              options={[
                { value: "true", label: "Ativo" },
                { value: "false", label: "Inativo" },
              ]}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                control={form.control}
                name="address.number"
                label="Número"
                placeholder="123"
              />
              <InputField
                control={form.control}
                name="address.zipCode"
                label="CEP"
                placeholder="50000-000"
              />
            </div>

            <InputField
              control={form.control}
              name="address.street"
              label="Rua"
              placeholder="Av. Brasil"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                control={form.control}
                name="address.district"
                label="Bairro"
                placeholder="Centro"
              />
              <InputField
                control={form.control}
                name="address.city"
                label="Cidade"
                placeholder="Recife"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                control={form.control}
                name="address.state"
                label="Estado"
                placeholder="Pernambuco"
              />
              <InputField
                control={form.control}
                name="address.complement"
                label="Complemento"
                placeholder="Apto 101"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-full bg-blue-950 hover:bg-blue-900"
                disabled={!form.formState.isValid}
              >
                Salvar
              </Button>
            </div>
          </div>
        </HookFormProvider>
      </DialogContent>
    </Dialog>
  );
}
