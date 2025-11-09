import logo from "@/assets/images/logo.png";
import { NavGroup } from "@/components/layouts/DashboardLayout/sidebar/NavGroup";
import { UserMenu } from "@/components/layouts/DashboardLayout/sidebar/UserMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";
import * as React from "react";
import { useMemo } from "react";
import { getNavItemsForRole } from "./nav-items";

type Props = React.ComponentProps<typeof Sidebar>;

export function AppSidebar(props: Props) {
  const { user } = useAuthStore();
  if (!user) return null;

  const { main, settings } = useMemo(
    () => getNavItemsForRole(user.role),
    [user.role],
  );

  const sidebarMainLabel = "MENU PRINCIPAL";
  const sidebarSettingsLabel = "CONFIGURAÇÕES";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mx-4 flex items-center justify-center border-b py-4">
        <img src={logo} alt="Logo" height={60} width={60} />
      </SidebarHeader>

      <SidebarContent>
        <NavGroup label={sidebarMainLabel} items={main} />
        <NavGroup label={sidebarSettingsLabel} items={settings} />
      </SidebarContent>

      <SidebarFooter>
        <UserMenu user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
