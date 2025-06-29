"use client"

import { Button } from "@/components/ui/button"
import { CircleXIcon, PlusIcon } from "lucide-react"
import { useState } from "react"
import { NewMeetingDialog } from "./newMeetingsDialog"
import { MeetingsSearchFilters } from "./meetingsSearchFilters"
import { StatusFilter } from "../statusFilter"
import { useMeetingsFilters } from "@/hooks/meetings/use-meetings-filters"
import { AgentsIdFilter } from "./agentsIdFilter"

export const MeetingsListsHeader = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [filters, setFilters] = useMeetingsFilters()

  const areFiltersModified = !!filters.agentId || !!filters.agentId
    || !!filters.status

  const resetFilters = () => {
    setFilters({
      page: 1,
      search: "",
      status: null,
      agentId: ""
    })
  }

  return (
    <>
      <NewMeetingDialog open={openDialog} onOpenChange={setOpenDialog} />
      <div className="px-3 pt-5 md:px-8 flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button
            onClick={() => setOpenDialog(!openDialog)}
          >
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <div className="p-1 flex items-center gap-x-4">
          <MeetingsSearchFilters />
          <StatusFilter />
          <AgentsIdFilter />
          {areFiltersModified && <Button size={"sm"} onClick={resetFilters}>
            <CircleXIcon />
            Clear
          </Button>}
        </div>
      </div>
    </>
  )
}
