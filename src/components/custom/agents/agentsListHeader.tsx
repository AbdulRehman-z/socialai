"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NewAgentDialog } from "./newAgentDialog"
import { useState } from "react"

export const AgentsListsHeader = () => {
  const [open, onOpenChange] = useState(false)

  return (
    <>
      <NewAgentDialog open={open} onOpenChange={onOpenChange} />
      <div className="px-3 py-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => onOpenChange(!open)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
      </div>
    </>
  )
}
