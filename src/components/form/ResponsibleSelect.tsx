import { ControlledField } from "@/components/form/ControlledField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldValues, Path } from "react-hook-form";

type UserDto = {
  userId: string;
  name: string;
  email?: string;
  role?: string;
};

export interface ResponsibleSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  allowedRoles?: string[];
  className?: string;
  usersEndpoint?: string;
}

export function ResponsibleSelect<T extends FieldValues>({
  control,
  name,
  label = "Responsável",
  placeholder = "Selecione um responsável",
  allowedRoles = ["MASTER_ADM", "UNIT_ADM"],
  className,
  usersEndpoint = "/user/all",
}: ResponsibleSelectProps<T>) {
  const { data, isLoading, isError } = useQuery<UserDto[], Error>({
    queryKey: ["user", allowedRoles],
    queryFn: async () => {
      const res = await api.get<UserDto[]>(usersEndpoint);
      console.log(res);
      const json = res.data as UserDto[];
      return json.filter((u) => allowedRoles.includes(u.role ?? ""));
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <ControlledField control={control} name={name} label={label}>
      {(field) => (
        <Select
          value={field.value ?? ""}
          onValueChange={(val) => field.onChange(val)}
        >
          <SelectTrigger className={className ?? "h-12 w-[320px]"}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Responsáveis</SelectLabel>

              {isLoading && (
                <SelectItem value="__loading" disabled>
                  Carregando...
                </SelectItem>
              )}

              {isError && (
                <SelectItem value="__error" disabled>
                  Erro ao carregar responsáveis
                </SelectItem>
              )}

              {!isLoading && !isError && data && data.length === 0 && (
                <SelectItem value="__none" disabled>
                  Nenhum responsável disponível
                </SelectItem>
              )}

              {!isLoading &&
                !isError &&
                data?.map((u) => (
                  <SelectItem key={u.userId} value={u.userId}>
                    {u.name}
                    {u.email ? ` — ${u.email}` : ""}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </ControlledField>
  );
}
