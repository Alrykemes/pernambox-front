import React, { useMemo, useState } from "react";
import { Package } from "lucide-react";
import clsx from "clsx";

export type ProductRow = {
  id: string;
  product: string;
  sku?: string;
  supplier: string;
  category: string;
  lastEntry: string;
  lastExit: string;
  costValue: number;
  unitValue: number;
  totalStock: number;
  status: "Estável" | "Crítico" | "Instável";
};

const MOCK_PRODUCTS: ProductRow[] = [
  {
    id: "prd-001",
    product: "Cestas Básicas",
    sku: "PRD-001",
    supplier: "Distribuidora Alfa",
    category: "Suprimentos B.",
    lastEntry: "26/04/2025",
    lastExit: "26/04/2025",
    costValue: 48.99,
    unitValue: 48.99,
    totalStock: 48,
    status: "Estável",
  },
  {
    id: "prd-002",
    product: "Kits de primeiros socorros",
    sku: "PRD-002",
    supplier: "Hospital Beta",
    category: "Saúde",
    lastEntry: "26/04/2025",
    lastExit: "26/04/2025",
    costValue: 48.99,
    unitValue: 48.99,
    totalStock: 5,
    status: "Crítico",
  },
  {
    id: "prd-003",
    product: "Capacetes",
    sku: "PRD-003",
    supplier: "Distribuidora Alfa",
    category: "Eletrônicos",
    lastEntry: "26/04/2025",
    lastExit: "26/04/2025",
    costValue: 48.99,
    unitValue: 48.99,
    totalStock: 12,
    status: "Instável",
  },
  {
    id: "prd-004",
    product: "Rádios de comunicação",
    sku: "PRD-004",
    supplier: "Distribuidora Alfa",
    category: "Beleza",
    lastEntry: "26/04/2025",
    lastExit: "26/04/2025",
    costValue: 48.99,
    unitValue: 48.99,
    totalStock: 32,
    status: "Estável",
  },
  {
    id: "prd-005",
    product: "Colchões e colchonetes",
    sku: "PRD-005",
    supplier: "Distribuidora Alfa",
    category: "Eletrônicos",
    lastEntry: "26/04/2025",
    lastExit: "26/04/2025",
    costValue: 48.99,
    unitValue: 48.99,
    totalStock: 48,
    status: "Estável",
  },
  {
    id: "prd-006",
    product: "Soro fisiológico",
    sku: "PRD-006",
    supplier: "Distribuidora Alfa",
    category: "Eletrônicos",
    lastEntry: "26/04/2025",
    lastExit: "26/04/2025",
    costValue: 48.99,
    unitValue: 48.99,
    totalStock: 5,
    status: "Crítico",
  },
  {
    id: "prd-007",
    product: "Cordas",
    sku: "PRD-007",
    supplier: "Distribuidora Alfa",
    category: "Eletrônicos",
    lastEntry: "26/04/2025",
    lastExit: "26/04/2025",
    costValue: 48.99,
    unitValue: 48.99,
    totalStock: 12,
    status: "Instável",
  },
  {
    id: "prd-008",
    product: "Roupas",
    sku: "PRD-008",
    supplier: "Distribuidora Alfa",
    category: "Eletrônicos",
    lastEntry: "26/04/2025",
    lastExit: "26/04/2025",
    costValue: 48.99,
    unitValue: 48.99,
    totalStock: 12,
    status: "Instável",
  },
  {
    id: "prd-009",
    product: "Máscaras",
    sku: "PRD-009",
    supplier: "Distribuidora Alfa",
    category: "Eletrônicos",
    lastEntry: "26/04/2025",
    lastExit: "26/04/2025",
    costValue: 48.99,
    unitValue: 48.99,
    totalStock: 12,
    status: "Instável",
  },
];

export default function InventoryPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    if (!query) return MOCK_PRODUCTS;
    const q = query.toLowerCase();
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.product.toLowerCase().includes(q) ||
        (p.sku ?? "").toLowerCase().includes(q) ||
        p.supplier.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const stats = useMemo(() => {
    const total = MOCK_PRODUCTS.length;
    const outOfStock = MOCK_PRODUCTS.filter((p) => p.totalStock === 0).length;
    const inactive = MOCK_PRODUCTS.filter((p) => p.status === "Instável").length;
    const active = total - inactive;
    return { total, active, inactive, outOfStock };
  }, []);

  const statusClass = (s: ProductRow["status"]) => {
    if (s === "Estável") return "bg-green-100 text-green-800";
    if (s === "Crítico") return "bg-red-100 text-red-800";
    return "bg-yellow-100 text-yellow-800"; // Instável
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <span className="text-sm text-gray-500">Total de Produtos</span>
          <strong className="text-2xl mt-2">{stats.total}</strong>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <span className="text-sm text-gray-500">Produtos em estoque</span>
          <strong className="text-2xl mt-2">{stats.active}</strong>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <span className="text-sm text-gray-500">Produtos fora de estoque</span>
          <strong className="text-2xl mt-2">{stats.inactive}</strong>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <span className="text-sm text-gray-500">Produtos em estoque baixo</span>
          <strong className="text-2xl mt-2">{stats.outOfStock}</strong>
        </div>
      </div>

      {/* Header: title + controls */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Inventário de produtos</h2>
          <p className="text-sm text-gray-500">Gerencie seus itens de estoque e níveis de inventário</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Pesquisar em Estoque"
              className="border rounded-md px-3 py-2 w-72"
            />
          </div>
          <button className="bg-white border px-3 py-2 rounded-md">Exportar</button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md">+ Movimentação</button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3">PRODUTO</th>
              <th className="text-left px-4 py-3">FORNECEDOR</th>
              <th className="text-left px-4 py-3">CATEGORIA</th>
              <th className="text-left px-4 py-3">DT ULT. ENTRADA</th>
              <th className="text-left px-4 py-3">DT ULT. SAÍDA</th>
              <th className="text-right px-4 py-3">VALOR COMPRA</th>
              <th className="text-right px-4 py-3">VALOR UNIT</th>
              <th className="text-right px-4 py-3">ESTOQUE TOTAL</th>
              <th className="text-center px-4 py-3">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center"><Package className="size-4 text-orange-500" /></div>
                    <div>
                      <div className="font-medium">{p.product}</div>
                      <div className="text-xs text-gray-400">{p.sku}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{p.supplier}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">{p.lastEntry}</td>
                <td className="px-4 py-3">{p.lastExit}</td>
                <td className="px-4 py-3 text-right">R${p.costValue.toFixed(2).replace('.', ',')}</td>
                <td className="px-4 py-3 text-right">R${p.unitValue.toFixed(2).replace('.', ',')}</td>
                <td className="px-4 py-3 text-right">{p.totalStock}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusClass(p.status)}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className={clsx("rounded-md border px-3 py-1", {
            "cursor-not-allowed": page === 1,
            "cursor-pointer": page !== 1,
          })}
        >
          Página anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => {
            if (page < totalPages) {
              setPage((p) => p + 1);
            }
          }}
          className={clsx("rounded-md border px-3 py-1", {
            "cursor-not-allowed": page >= totalPages,
            "cursor-pointer": !(page >= totalPages),
          })}
        >
          Próxima página
        </button>
      </div>
    </div>
  );
}
