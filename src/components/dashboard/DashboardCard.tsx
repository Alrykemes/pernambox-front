import { ShoppingBag } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface DashboardCardProps {
  title: string;
  content: string;
  footer: string;
}

export function DashboardCard({ title, content, footer }: DashboardCardProps) {
  return (
    <Card className="h-full min-h-[200px] transition-shadow hover:shadow-lg p-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-barber-gray text-sm font-medium">
          {title}
        </CardTitle>
        <ShoppingBag className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold">{content}</span>
      </CardContent>
      <CardFooter>
        <span className="text-barber-gray text-sm font-medium ">{footer}</span>
      </CardFooter>
    </Card>
  );
}
