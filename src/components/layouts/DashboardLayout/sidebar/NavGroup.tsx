import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import type { NavSection } from "./nav-items";

interface NavGroupProps {
  label: string;
  items: NavSection["main" | "settings"];
}

export function NavGroup({ label, items }: NavGroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="">
                <NavLink to={item.url} className="flex items-center gap-2 pl-4">
                  {Icon && <Icon aria-hidden className="h-4 w-4" />}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
