import { NavGroup } from "@/components/layouts/DashboardLayout/sidebar/NavGroup";
import { UnitHeader } from "@/components/layouts/DashboardLayout/sidebar/UnitHeader";
import { UserMenu } from "@/components/layouts/DashboardLayout/sidebar/UserMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";
import {
  Handbag,
  Home,
  MapPinHouse,
  Settings,
  Users,
  Warehouse,
} from "lucide-react";
import * as React from "react";

const mainNavItemsAdmin = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Unidades", url: "/dashboard/unidades", icon: MapPinHouse },
  { title: "Estoque", url: "/dashboard/estoque", icon: Warehouse },
  { title: "Produtos", url: "/dashboard/produtos", icon: Handbag },
  { title: "Usuários", url: "/dashboard/usuarios", icon: Users },
];

const mainNavItemsUser = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Unidades", url: "/dashboard/unidades", icon: MapPinHouse },
  { title: "Estoque", url: "/dashboard/estoque", icon: Warehouse },
  { title: "Produtos", url: "/dashboard/produtos", icon: Handbag }
];

const SettingsNavItems = [{ title: "Sistema", url: "#", icon: Settings }];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();
  return user ? (
    <>
      {(user.role === "ADMIN_MASTER" || user.role === "ADMIN") && (
        <Sidebar collapsible="icon" {...props}>
          <SidebarHeader>
            <UnitHeader unit={{ name: "Unidade Olinda", address: "Olinda, PE" }} />
          </SidebarHeader>
          <SidebarContent>
            <NavGroup label="MENU PRINCIPAL" items={mainNavItemsAdmin} />
            <NavGroup label="CONFIGURAÇÕES" items={SettingsNavItems} />
          </SidebarContent>
          <SidebarFooter>{user ? <UserMenu user={user} /> : null}</SidebarFooter>
          <SidebarRail />
        </Sidebar>
      )}
      {user.role === "USER" && (
        <Sidebar collapsible="icon" {...props}>
          <SidebarHeader>
            <UnitHeader unit={{ name: "Unidade Olinda", address: "Olinda, PE" }} />
          </SidebarHeader>
          <SidebarContent>
            <NavGroup label="MENU PRINCIPAL" items={mainNavItemsUser} />
            <NavGroup label="CONFIGURAÇÕES" items={SettingsNavItems} />
          </SidebarContent>
          <SidebarFooter>{user ? <UserMenu user={user} /> : null}</SidebarFooter>
          <SidebarRail />
        </Sidebar>
      )}
    </>
  ) : <></>;
}
