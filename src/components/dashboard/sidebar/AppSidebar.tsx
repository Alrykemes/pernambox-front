import { NavGroup } from "@/components/dashboard/sidebar/NavGroup";
import { UnitHeader } from "@/components/dashboard/sidebar/UnitHeader";
import { UserMenu } from "@/components/dashboard/sidebar/UserMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Handbag,
  Home,
  MapPinHouse,
  Settings,
  Users,
  Warehouse,
} from "lucide-react";
import * as React from "react";

const user = {
  name: "john doe",
  email: "john-doe@gmail.com",
  avatar: "",
};

const mainNavItems = [
  { title: "Home", url: "#", icon: Home },
  { title: "Unidades", url: "#", icon: MapPinHouse },
  { title: "Estoque", url: "#", icon: Warehouse },
  { title: "Produtos", url: "#", icon: Handbag },
  { title: "Usuários", url: "#", icon: Users },
];

const SettingsNavItems = [{ title: "Sistema", url: "#", icon: Settings }];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <UnitHeader unit={{ name: "Unidade Olinda", address: "Olinda, PE" }} />
      </SidebarHeader>
      <SidebarContent>
        <NavGroup label="MENU PRINCIPAL" items={mainNavItems} />
        <NavGroup label="CONFIGURAÇÕES" items={SettingsNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
