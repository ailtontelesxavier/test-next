/** @format */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "./nav";
import { BackpackIcon } from "@radix-ui/react-icons";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  Lock,
  File,
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPermissionSubmenuOpen, setIsPermissionSubmenuOpen] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
  const router = useRouter();

  const links = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: "Users",
      href: "/app/users",
      icon: UsersRound,
      variant: "ghost",
    },
    {
      title:'Juridico',
      href: '/app/juridico',
      icon: BackpackIcon,
      variant: 'ghost',
      submenu: [
        {
          title:"Dashboard",
          href:"/app/permissions/gestao-permissao",
          icon: LayoutDashboard,
          variante: "ghost"
        },
        {
          title:"Negociação de Credito",
          href:"/app/permissions/gestao-permissao-user",
          icon: File,
          variante: "ghost"
        },
        {
          title:"Relatórios",
          href:"/app/permissions/gestao-permissao-user",
          icon: File,
          variante: "ghost"
        },
      ]
    },
    {
      title: "Permission",
      href: "#",
      icon: Lock,
      variant: "ghost",
      submenu: [
        {
          title:"Gestao Perfil",
          href:"/app/permissions/gestao-permissao",
          icon: File,
          variante: "ghost"
        },
        {
          title:"Perfil por Usuario",
          href:"/app/permissions/gestao-permissao-user",
          icon: File,
          variante: "ghost"
        },
        {
          title: "Perfil",
          href: "/app/permissions/perfil",
          icon: File,
          variant: "ghost",
        },
        {
          title: "Permissoes",
          href: "/app/permissions/permission",
          icon: File,
          variant: "ghost",
        },
        {
          title: "Module",
          href: "/app/permissions/module",
          icon: File,
          variant: "ghost",
        },
      ],
    },
    {
      title: "Ordrs",
      href: "/orders",
      icon: ShoppingCart,
      variant: "ghost",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      variant: "ghost",
    },
  ];

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  function togglePermissionSubmenu() {
    setIsPermissionSubmenuOpen(!isPermissionSubmenuOpen);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7 ">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={links.map((link) => ({
          ...link,
          isActive: router.pathname === link.href,
          submenu: link.submenu?.map((sublink) => ({
            ...sublink,
            isActive: router.pathname === sublink.href,
          })),
        }))}
      />
    </div>
  );
}
