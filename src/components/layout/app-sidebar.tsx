import * as React from "react";

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
import { ShoppingCart } from "lucide-react";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Catálogo Público",
      url: "#",
      items: [
        {
          title: "Ver Catálogo",
          url: "/catalog",
        },
        {
          title: "Carrinho",
          url: "/cart",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <a href="#">
              <div
                className="bg-sidebar-primary text-sidebar-foreground
              flex aspect-square size-8 items-center justify-center rounded-lg"
              >
                <ShoppingCart className="size-4 text-white" />
              </div>
              <div>
                <span>E-commerce Shop</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href="{item.url}" className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((subitem) => (
                      <SidebarMenuSubItem key={subitem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subitem.url}>{subitem.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
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
