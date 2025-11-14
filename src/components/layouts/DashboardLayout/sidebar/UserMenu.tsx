import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import api from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import type { User } from "@/types/common";
import { getInitials } from "@/utils/getInitials";
import { Bell, ChevronsUpDown, CircleUser, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const logout = useAuthStore((state) => state.logout);
  const [imageProfileLink, setImageProfileLink] = useState("");

  const getImageProfileLink = async (imageName: string) => {
    setImageProfileLink((await api.get(`/files/url/${imageName}`)).data);
  }

  if (user) {
    console.log(user.imageProfileName)
    if (user.imageProfileName) {
      getImageProfileLink(user.imageProfileName);
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem >
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="w-8 h-8">
                {imageProfileLink.length > 0 ? <AvatarImage className="rounded-full" src={imageProfileLink} alt="Foto de perfil" />
                  : <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="w-8 h-8">
                  {imageProfileLink.length > 0 ? <AvatarImage className="rounded-full" src={imageProfileLink} alt="Foto de perfil" />
                    : <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={
                  () => {
                    navigate("/configurações/perfil");
                  }
                }>
                <CircleUser />
                Minha Conta
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
              >
                <Bell />
                Notificações
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
