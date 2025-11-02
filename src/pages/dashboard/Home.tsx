import { DashboardCard } from "@/components/dashboard/DashboardCard";

import { CategoryPieChart } from "@/components/dashboard/charts/CategoryPieChart";
import { InventoryChart } from "@/components/dashboard/charts/InventoryChart";
import { StockTable } from "@/components/dashboard/tables/StockTable";
import { ShoppingBag } from "lucide-react";

const chartData = [
  { month: "Janeiro", ideal: 186, current: 80 },
  { month: "Fevereiro", ideal: 305, current: 200 },
  { month: "Março", ideal: 237, current: 120 },
  { month: "Abril", ideal: 73, current: 190 },
  { month: "Maio", ideal: 209, current: 130 },
  { month: "Junho", ideal: 214, current: 140 },
];

const chartData2 = [
  { category: "health", quantity: 275, fill: "var(--color-health)" },
  { category: "equipments", quantity: 200, fill: "var(--color-equipments)" },
  { category: "tools", quantity: 187, fill: "var(--color-tools)" },
  { category: "clothing", quantity: 173, fill: "var(--color-clothing)" },
  { category: "other", quantity: 90, fill: "var(--color-other)" },
];

export default function Home() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total de Produtos"
          content="1234"
          footer="+12% no último mês"
          icon={<ShoppingBag className="h-4 w-4 text-orange-500" />}
        />
        <DashboardCard
          title="Total de Produtos"
          content="1234"
          footer="+12% no último mês"
          icon={<ShoppingBag className="h-4 w-4 text-orange-500" />}
        />
        <DashboardCard
          title="Total de Produtos"
          content="1234"
          footer="+12% no último mês"
          icon={<ShoppingBag className="h-4 w-4 text-orange-500" />}
        />
        <DashboardCard
          title="Total de Produtos"
          content="1234"
          footer="+12% no último mês"
          icon={<ShoppingBag className="h-4 w-4 text-orange-500" />}
        />
      </div>
      <div className="grid grid-cols-2 items-stretch gap-6 pt-3">
        <InventoryChart data={chartData} />
        <CategoryPieChart data={chartData2} />
      </div>
      <StockTable />
    </div>
  );
}
