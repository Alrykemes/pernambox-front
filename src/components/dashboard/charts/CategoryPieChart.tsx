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
import { Pie, PieChart, ResponsiveContainer } from "recharts";

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
    <Card>
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
        <CardDescription>Janeiro - Junho 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="quantity"
                cx="50%"
                cy="50%"
                innerRadius="30%"
                outerRadius="60%"
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                label={false}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="category" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
