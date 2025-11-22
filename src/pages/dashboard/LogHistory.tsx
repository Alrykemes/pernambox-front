import { useState, useMemo } from "react";
import { z } from "zod";
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

// Dados exemplo
const mockLogs = Array.from({ length: 42 }).map((_, i) => ({
  id: i + 1,
  datetime: "29/04/2025 15:57",
  type: ["Criação", "Atualização", "Deleção"][i % 3],
  target: ["User", "Unidade", "Produto", "Recurso", "Destino", "Origem"][i % 6],
  targetId: 1000 + i,
  responsible: "Juliana Albuquerque",
  responsibleId: 500 + i,
  description: "Alteração realizada no registro associado.",
}));

export function LogHistory() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [targetFilter, setTargetFilter] = useState("Todos");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Controle do modal
  const [selected, setSelected] = useState<any>(null);

  const filteredData = useMemo(() => {
    return mockLogs.filter((item) => {
      const matchesSearch =
        search.length === 0 ||
        item.responsible.toLowerCase().includes(search.toLowerCase()) ||
        item.target.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "Todos" || item.type === typeFilter;

      const matchesTarget =
        targetFilter === "Todos" || item.target === targetFilter;

      return matchesSearch && matchesType && matchesTarget;
    });
  }, [search, typeFilter, targetFilter]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [page, filteredData]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="p-6">
      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Movimentação</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> {selected.id}</p>
              <p><strong>Data/Hora:</strong> {selected.datetime}</p>
              <p><strong>Tipo:</strong> {selected.type}</p>
              <p><strong>Alvo:</strong> {selected.target}</p>
              <p><strong>ID do Alvo:</strong> {selected.targetId}</p>
              <p><strong>Responsável:</strong> {selected.responsible}</p>
              <p><strong>ID do Responsável:</strong> {selected.responsibleId}</p>
              <p><strong>Descrição:</strong> {selected.description}</p>
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
          <CardTitle>Histórico de Movimentações</CardTitle>
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
                <SelectItem value="Criação">Criação</SelectItem>
                <SelectItem value="Atualização">Atualização</SelectItem>
                <SelectItem value="Deleção">Deleção</SelectItem>
              </SelectContent>
            </Select>

            <Select value={targetFilter} onValueChange={setTargetFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Alvo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Unidade">Unidade</SelectItem>
                <SelectItem value="Produto">Produto</SelectItem>
                <SelectItem value="Recurso">Recurso</SelectItem>
                <SelectItem value="Destino">Destino</SelectItem>
                <SelectItem value="Origem">Origem</SelectItem>
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
                {paginated.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.datetime}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.target}</TableCell>
                    <TableCell>{item.responsible}</TableCell>
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

                {paginated.length === 0 && (
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
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Página {page} de {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Anterior
              </Button>

              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Próxima
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}