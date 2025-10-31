import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface DashboardCardProps {
  title: string;
  content: string;
  footer: string;
  icon?: LucideIcon;
}

export function DashboardCard({
  title,
  content,
  footer,
  icon,
}: DashboardCardProps) {
  const Icon = icon;
  return (
    <Card className="h-full px-2 transition-shadow hover:shadow-lg">
      <CardContent className="flex h-full flex-col justify-between gap-1">
        <div className="flex flex-row items-center justify-between pb-2">
          <span className="text-muted-foreground text-sm">{title}</span>
          {Icon && <Icon />}
        </div>
        <span className="text-xl font-bold">{content}</span>
        <span className="truncate text-sm font-medium text-green-500">
          {footer}
        </span>
      </CardContent>
    </Card>
  );
}
