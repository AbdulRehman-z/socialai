import DashboardInset from "@/components/custom/dashboard/dashboardInset"
import DashboardSidebar from "@/components/custom/dashboard/dashboardSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"

type DashboardLayoutProps = {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <DashboardInset children={children} />
    </SidebarProvider>
  )
}

export default DashboardLayout
