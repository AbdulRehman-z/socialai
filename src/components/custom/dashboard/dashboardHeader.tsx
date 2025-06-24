"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { ThemeToggle } from "../themeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { DashboardGlobalSearchCommand } from "./dashboardGlobalSearchCommand";
import { set } from "zod";

export const DashboardHeader = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <DashboardGlobalSearchCommand globalOpen={open} setGlobalOpen={setOpen} />
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-15 justify-between border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Button
            className="w-[240px] h-9 justify-start font-normal text-muted-foreground hover:text-muted-foreground"
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              setOpen((open) => !open)
            }}
          >
            <SearchIcon />
            Search
            <kbd className="ml-auto pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">&#8984;</span>K
            </kbd>
          </Button>
        </div>
        <div className="md:pr-10 pr-5">
          <ThemeToggle />
        </div>
      </header>
    </>
  );
};
