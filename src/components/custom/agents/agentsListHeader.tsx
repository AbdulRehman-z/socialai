"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { NewAgentDialog } from "./newAgentDialog"
import { useState } from "react"
import { AgentsSearchFilters } from "./agentsSearchFilters"
import { useAgentsFilters } from "@/hooks/agents/use-agents-filters"
import { DEFAULT_PAGE } from "@/lib/constants"

export const AgentsListsHeader = () => {
  const [filters, setFilters] = useAgentsFilters()
  const [open, onOpenChange] = useState(false)

  const areAnyFiltersModified = !!filters.search

  const onClearFilters = () => {
    setFilters({
      ...filters,
      search: "",
      page: DEFAULT_PAGE
    })
  }

  return (
    <>
      <NewAgentDialog open={open} onOpenChange={onOpenChange} />
      <div className="px-3 pt-5 md:px-8 flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => onOpenChange(!open)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className="flex items-center p-1 gap-x-2">
          <AgentsSearchFilters />
          {areAnyFiltersModified &&
            <Button size="sm" variant={"outline"} onClick={onClearFilters} >
              <XCircleIcon />
              Clear
            </Button>
          }
        </div>
      </div>
    </>
  )
}
