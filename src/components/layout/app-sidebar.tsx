import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ShoppingCart, LayoutGrid, ShoppingBag } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Menu",
      url: "/catalog",
      items: [
        {
          title: "Ver Catálogo",
          url: "/catalog",
          icon: LayoutGrid,
        },
        {
          title: "Carrinho",
          url: "/cart",
          icon: ShoppingBag,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 shadow-md">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold tracking-[0.25em] text-emerald-500 uppercase">
                  Eduardo G.
                </span>
                <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
                  Loja Virtual
                </span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Catálogo Público
          </div>

          <SidebarMenu className="gap-1">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="text-sm font-medium"
                  isActive={location.pathname.startsWith(item.url)}
                >
                  <Link to={item.url}>{item.title}</Link>
                </SidebarMenuButton>

                {item.items.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-2">
                    {item.items.map((subitem) => {
                      const Icon = subitem.icon;
                      const active = location.pathname === subitem.url;

                      return (
                        <SidebarMenuSubItem key={subitem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={active}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Link to={subitem.url}>
                              {Icon && (
                                <Icon
                                  className={`h-4 w-4 ${
                                    active
                                      ? "text-emerald-500"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              )}
                              <span>{subitem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
