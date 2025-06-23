"use client"

import { IoMdNotificationsOutline } from "react-icons/io";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { CreditCardIcon, LogOutIcon, Menu, UserCircle } from "lucide-react"
import { authClient } from "@/lib/auth-client";
import { getInitials } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { error } from "better-auth/api";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";

const DashboardSidebarNavUser = () => {
  const session = authClient.useSession()
  const { isMobile } = useSidebar()
  const router = useRouter()
  const { isPending, data, refetch, error } = session

  const signOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in")
      }
    })
  }

  if (isPending) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[180px]" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
      </div>
    )
  }

  if (error) {
    return <Button onClick={() => {
      refetch()
    }} disabled={isPending} size={"lg"} variant={"outline"}>
      Reload User
    </Button>
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={data?.user.image!} alt={data?.user.name} />
                <AvatarFallback className="rounded-lg font-semibold bg-primary text-primary-foreground">{getInitials(data?.user.name ?? "")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{data?.user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {data?.user.email}
                </span>
              </div>
              <Menu className="ml-auto size-4" />
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
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={data?.user.image!} alt={data?.user.name} />
                  <AvatarFallback className="rounded-lg font-semibold bg-primary text-primary-foreground">{getInitials(data?.user.name ?? "")}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{data?.user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {data?.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IoMdNotificationsOutline />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()} >
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default DashboardSidebarNavUser
