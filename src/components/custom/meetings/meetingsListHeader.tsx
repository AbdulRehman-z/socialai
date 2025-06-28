"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { NewMeetingDialog } from "./newMeetingsDialog"

export const MeetingsListsHeader = () => {
  const [openDialog, setOpenDialog] = useState(false)

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
      </div>
    </>
  )
}
