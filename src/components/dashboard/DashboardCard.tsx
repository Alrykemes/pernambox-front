import { ShoppingBag } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface DashboardCardProps {
  title: string;
  content: string;
  footer: string;
}

export function DashboardCard({ title, content, footer }: DashboardCardProps) {
  return (
    <Card className="px-2 transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <span className="text-muted-foreground text-sm">{title}</span>
          <ShoppingBag className="h-4 w-4 text-orange-500" />
        </div>
        <span className="text-xl font-bold">{content}</span>
        <span className="text-sm font-medium text-green-500">{footer}</span>
      </CardContent>
    </Card>
  );
}
