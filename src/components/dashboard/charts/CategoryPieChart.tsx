import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

interface CategoryPieChartProps {
  data: { category: string; quantity: number; fill: string }[];
}

const chartConfig = {
  health: {
    label: "Saúde",
    color: "var(--chart-1)",
  },
  equipments: {
    label: "Equipamentos",
    color: "var(--chart-2)",
  },
  tools: {
    label: "Ferramentas",
    color: "var(--chart-3)",
  },
  clothing: {
    label: "Vestuário",
    color: "var(--chart-4)",
  },
  other: {
    label: "Outros",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
    <div>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Categorias</CardTitle>
          <CardDescription>Janeiro - Junho 2025</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <Pie data={data} dataKey="quantity" />
              <ChartLegend
                content={<ChartLegendContent nameKey="category" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
