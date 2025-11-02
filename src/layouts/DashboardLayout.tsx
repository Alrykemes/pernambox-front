import { Header } from "@/components/dashboard/Header";
import { AppSidebar } from "@/components/dashboard/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <Header />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
