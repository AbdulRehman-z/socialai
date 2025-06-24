import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ReactNode } from "react"
import { ThemeToggle } from "../themeToggle"
import { TooltipWrapper } from "../tooltipWrapper"

const DashboardInset = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-15 justify-between border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </div>
        <div className="pr-10">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {children}
      </main>
    </SidebarInset>
  )
}

export default DashboardInset
