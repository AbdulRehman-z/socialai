import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ReactNode } from "react"
import { ThemeToggle } from "../themeToggle"
import { TooltipWrapper } from "../tooltipWrapper"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { DashboardHeader } from "./dashboardHeader"

const DashboardInset = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarInset>
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {children}
      </main>
    </SidebarInset>
  )
}

export default DashboardInset
