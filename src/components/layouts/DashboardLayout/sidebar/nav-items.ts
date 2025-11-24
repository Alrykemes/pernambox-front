import {
  Handbag,
  Home,
  MapPinHouse,
  Settings,
  Users,
  Warehouse,
} from "lucide-react";
import type { ComponentType } from "react";
import type { Role } from "@/types/common";

export type NavItem = {
  title: string;
  url: string;
  icon?: ComponentType<any>;
};

export type NavSection = {
  main: NavItem[];
  settings: NavItem[];
};

export const roleToNavItems: Record<Role, NavSection> = {
  ADMIN_MASTER: {
    main: [
      { title: "Home", url: "/dashboard", icon: Home },
      { title: "Unidades", url: "/dashboard/unidades", icon: MapPinHouse },
      { title: "Estoque", url: "/dashboard/estoque", icon: Warehouse },
      { title: "Produtos", url: "/dashboard/produtos", icon: Handbag },
      { title: "Usuários", url: "/dashboard/usuarios", icon: Users },
    ],
    settings: [
      { title: "Sistema", url: "/configuracoes/sistema", icon: Settings },
    ],
  },
  
  ADMIN: {
    main: [
      { title: "Home", url: "/dashboard", icon: Home },
      { title: "Unidades", url: "/dashboard/unidades", icon: MapPinHouse },
      { title: "Estoque", url: "/dashboard/estoque", icon: Warehouse },
      { title: "Produtos", url: "/dashboard/produtos", icon: Handbag },
      { title: "Usuários", url: "/dashboard/usuarios", icon: Users },
    ],
    settings: [
      { title: "Sistema", url: "/configuracoes/sistema", icon: Settings },
    ],
  },

  USER: {
    main: [
      { title: "Home", url: "/dashboard", icon: Home },
      { title: "Unidades", url: "/dashboard/unidades", icon: MapPinHouse },
      { title: "Estoque", url: "/dashboard/estoque", icon: Warehouse },
      { title: "Produtos", url: "/dashboard/produtos", icon: Handbag },
    ],
    settings: [
      { title: "Sistema", url: "/configuracoes/sistema", icon: Settings },
    ],
  },
};

export const getNavItemsForRole = (role: Role): NavSection => {
  return roleToNavItems[role] ?? roleToNavItems.USER;
};
