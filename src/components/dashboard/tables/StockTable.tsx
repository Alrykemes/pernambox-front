import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package } from "lucide-react";

export function StockTable() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Status do estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Lista de estoque atual.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground text-xs">
                PRODUTO
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                CÓDIGO
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                CATEGORIA
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                ESTOQUE TOTAL
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                STATUS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-red-200 p-2">
                    <Package />
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className="font-bold text-black">Cestas Básicas</h3>
                    <span className="text-muted-foreground">#APL-5237</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>PLR-001</TableCell>
              <TableCell>Suprimentos B.</TableCell>
              <TableCell className="flex flex-col">
                <span className="text-muted-foreground">45 unidades</span>
                <Progress value={160} max={150} className="w-[60%]" />
              </TableCell>
              <TableCell>
                <div className="rounded-md bg-green-200 p-2 font-medium text-green-900">
                  Estável
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
