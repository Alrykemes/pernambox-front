import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Header } from "@/components/dashboard/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          <DashboardCard
            title="Total de Produtos"
            content="1234"
            footer="+12% no último mês"
          />
          <DashboardCard
            title="Total de Produtos"
            content="1234"
            footer="+12% no último mês"
          />
          <DashboardCard
            title="Total de Produtos"
            content="1234"
            footer="+12% no último mês"
          />
        </div>
      </div>
    </>
  );
}
