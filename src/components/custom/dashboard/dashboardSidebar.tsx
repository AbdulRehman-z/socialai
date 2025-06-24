"use client"
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, icons, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardSidebarNavUser from "./dashboardNavUser";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings"
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents"
  }
]

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade"
  }
]

const DashboardSidebar = () => {
  // const pathname = usePathname()
  // console.log(pathname)
  const pathname = "Meetings"
  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex mx-auto py-2">
            <div className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
                <Image src={"/logo.svg"} alt="Social AI" width={32} height={32} />
              </div>
              <div className="grid flex-1 text-left text-lg leading-tight">
                <span className="truncate font-semibold ">
                  Social AI
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="px-3">
        <Separator />
      </div>

      {/* Navigations */}
      <SidebarContent>
        {/* first section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href} className="py-[3px]">
                  <SidebarMenuButton tooltip={item.label} className={cn("h-11", pathname === item.label ? "bg-primary text-sidebar-foreground hover:bg-primary/90" : "")}
                    asChild
                  // isActive={pathname === item.label}
                  >
                    <Link href={item.href}>
                      <item.icon className={cn("size-5", pathname === item.label ? "text-primary-foreground" : "")} />
                      <span className={cn("tracking-tight font-semibold", pathname === item.label ? "text-primary-foreground" : "")}>
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* second section */}
        <div className="px-3">
          <Separator />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton tooltip={item.label} className="h-12" asChild
                    isActive={pathname === item.label}
                  >
                    <Link href={item.href}>
                      <item.icon className={cn("size-5", pathname === item.label ? "text-primary" : "")} />
                      <span className={cn("tracking-tight font-semibold", pathname === item.label ? "text-primary/90" : "")}>
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <DashboardSidebarNavUser />
      </SidebarFooter>
    </Sidebar >
  );
};

export default DashboardSidebar;
