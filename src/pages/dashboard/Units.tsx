import { HookFormProvider } from "@/components/form/HookFormProvider";
import { InputField } from "@/components/form/InputField";
import { ResponsibleSelect } from "@/components/form/ResponsibleSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import { queryClient } from "@/lib/react-query";
import { DashboardCard } from "@/pages/dashboard/components/DashboardCard";
import { UnitCard } from "@/pages/dashboard/components/UnitCard/UnitCard";
import {
  UnitCreateSchema,
  type UnitCreateType,
} from "@/schemas/dashboard/unit-create";
import type { Unit } from "@/types/unit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UnitPage() {
  const [open, setOpen] = useState(false);
  const { data: units } = useQuery<Unit[]>({
    queryKey: ["units"],
    queryFn: async () => {
      const { data } = await api.get("/unit");
      return data;
    },
  });

  const unitsArray = units ?? [];

  const form = useForm<UnitCreateType>({
    resolver: zodResolver(UnitCreateSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      responsible_id: "",
      address: {
        number: "",
        street: "",
        district: "",
        city: "",
        state: "",
        zipCode: "",
        complement: "",
      },
    },
  });

  const onSubmit = async (data: UnitCreateType) => {
    try {
      const response = await api.post("/unit", data);
      if (response.status === 200 || response.data.success) {
        toast.success("Unidade criada com sucesso!");
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["units"] });
        form.reset();
      } else {
        toast.error("Erro ao criar unidade. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao criar unidade. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2">
        <DashboardCard
          title="Total de Unidades"
          content="3"
          footer="Total de unidades cadastradas"
          icon={<MapPin className="h-4 w-4 text-blue-500" />}
        />
        <DashboardCard
          title="Última Adicionada"
          content="Unidade Olinda"
          footer="Adicionada recentemente"
          icon={<Plus className="h-4 w-4 text-green-500" />}
        />
      </div>
      <div className="flex items-center justify-between pt-6 pb-2">
        <div>
          <h3 className="text-bold">Lista de Unidades</h3>
          <h4 className="text-muted-foreground text-sm">
            Crie e Gerencie suas unidades
          </h4>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-950 hover:bg-blue-900">
              <Plus />
              Adicionar Unidade
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Unidade</DialogTitle>
              <DialogDescription>
                Formulário para adicionar uma nova unidade.
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
                <Button
                  type="submit"
                  className="w-full bg-blue-950 hover:bg-blue-900"
                  disabled={!form.formState.isValid}
                >
                  Criar Unidade
                </Button>
              </div>
            </HookFormProvider>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {unitsArray.map((unit: Unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
}
