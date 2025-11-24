import { useState, useMemo, type ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { LogHistory, Target, TypeLog } from "@/types/common";
import { authApi } from "@/lib/api";
import clsx from "clsx";
import { formatLocalDateTime } from "@/utils/formatLocalDateTime";

interface PageLogHistoryResponseDto {
  previousPage: number;
  currentPage: number;
  nextPage: number;
  totalPages: number;
  size: number;
  content: LogHistory[];
}

export function LogHistory() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [targetFilter, setTargetFilter] = useState("Todos");

  const [page, setPage] = useState(1);
  const [size] = useState(10);

  // Controle do modal
  const [selected, setSelected] = useState<LogHistory | null>(null);

  const { data: logHistoryPage, isLoading } = useQuery<
    PageLogHistoryResponseDto,
    Error,
    PageLogHistoryResponseDto,
    readonly ["logHistories", number, number]
  >({
    queryKey: ["logHistories", page, size] as const,
    queryFn: async () => {
      const { data } = await authApi.get(`/log-history?page=${page}&size=${size}`);
      return data as PageLogHistoryResponseDto;
    },
    staleTime: 1000 * 10,
  });

  const logHistories = logHistoryPage?.content ?? [];

  const filteredData = useMemo(() => {
    return logHistories.filter((item) => {
      const matchesSearch =
        search.length === 0 ||
        item.responsibleUser.name.toLowerCase().includes(search.toLowerCase()) ||
        item.logHistoryTarget.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toString().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "Todos" || item.logHistoryType === typeFilter;

      const matchesTarget =
        targetFilter === "Todos" || item.logHistoryTarget === targetFilter;

      return matchesSearch && matchesType && matchesTarget;
    });
  }, [search, typeFilter, targetFilter, logHistories]);

  const getLogHistoryTypeLabel = (type: TypeLog): ReactNode => {
    return type === "CREATE" ? (
      <div className="inline-block rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-900">
        Criação
      </div>
    ) : type === "UPDATE" ? (
      <div className="inline-block rounded-md bg-amber-100 px-2 py-1 text-sm font-medium text-amber-900">
        Atualização
      </div>
    ) : type === "DELETE" ? (
      <div className="inline-block rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-900">
        Deleção
      </div>
    ) : (
      <div className="inline-block rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-black-900">
        Inválido
      </div>
    )
  }

  const getLogHistoryTargetLabel = (target: Target): ReactNode => {
    return target === "UNIT" ? (
      <div className="inline-block rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-black-900">
        Unidade
      </div>
    ) : target === "USER" ? (
      <div className="inline-block rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-black-900">
        Usuário
      </div>
    ) : target === "PRODUCT" ? (
      <div className="inline-block rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-black-900">
        Produto
      </div>
    ) : target === "RESOURCE" ? (
      <div className="inline-block rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-black-900">
        Recurso
      </div>
    ) : target === "RESOURCE_PRODUCT" ? (
      <div className="inline-block rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-black-900">
        Produto em Recurso
      </div>
    ) : target === "ORIGIN" ? (
      <div className="inline-block rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-black-900">
        Origem
      </div>
    ) : target === "DESTINATION" ? (
      <div className="inline-block rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-black-900">
        Destino
      </div>
    ) : (
      <div className="inline-block rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-black-900">
        Inválido
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Alteração</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> {selected.id}</p>
              <p><strong>Data/Hora:</strong> {formatLocalDateTime(selected.dateTime)}</p>
              <p><strong>Descrição:</strong> {selected.description}</p>
              <p><strong>Tipo:</strong> {getLogHistoryTypeLabel(selected.logHistoryType)}</p>
              <p><strong>ID do Alvo:</strong> {selected.targetId}</p>
              <p><strong>Alvo:</strong> {getLogHistoryTargetLabel(selected.logHistoryTarget)}</p>
              <p><strong>ID do Responsável:</strong> {selected.responsibleUser.userId}</p>
              <p><strong>Responsável:</strong> {selected.responsibleUser.name}</p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Conteúdo Principal */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Histórico de Alterações</CardTitle>
          <p className="text-sm text-muted-foreground">
            Logs de todas as atividades
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Filtros */}
          <div className="flex items-center gap-3 flex-wrap">
            <Input
              placeholder="Pesquisar"
              className="w-60"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="CREATE">Criação</SelectItem>
                <SelectItem value="UPDATE">Atualização</SelectItem>
                <SelectItem value="DELETE">Deleção</SelectItem>
              </SelectContent>
            </Select>

            <Select value={targetFilter} onValueChange={setTargetFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Alvo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="UNIT">Unidade</SelectItem>
                <SelectItem value="PRODUCT">Produto</SelectItem>
                <SelectItem value="RESOURCE">Recurso</SelectItem>
                <SelectItem value="DESTINATION">Destino</SelectItem>
                <SelectItem value="ORIGIN">Origem</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Alvo</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{formatLocalDateTime(item.dateTime)}</TableCell>
                    <TableCell>{getLogHistoryTypeLabel(item.logHistoryType)}</TableCell>
                    <TableCell>{getLogHistoryTargetLabel(item.logHistoryTarget)}</TableCell>
                    <TableCell>{item.responsibleUser.name}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setSelected(item)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      Nenhum registro encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Paginação */}
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
              Página {logHistoryPage?.currentPage ?? page + 1} de{" "}
              {logHistoryPage?.totalPages ?? 1}
            </span>

            <button
              disabled={
                isLoading ||
                (logHistoryPage
                  ? logHistoryPage.currentPage >= logHistoryPage.totalPages
                  : false)
              }
              onClick={() => {
                if (!logHistoryPage || logHistoryPage.currentPage < logHistoryPage.totalPages) {
                  setPage((p) => p + 1);
                }
              }}
              className={clsx("rounded-md border px-3 py-1", {
                "cursor-not-allowed": isLoading || (logHistoryPage ? logHistoryPage.currentPage >= logHistoryPage.totalPages : false),
                "cursor-pointer": !(logHistoryPage ? logHistoryPage.currentPage >= logHistoryPage.totalPages : false),
              })}
            >
              Próxima página
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}