"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"
import { GeneratedAvatar } from "../generateAvatar"
import { AgentGetOne, AgentsGetMany } from "@/modules/agents/server/types"

export const columns: ColumnDef<AgentsGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.name}
            className="size-6"
          />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-muted-foreground max-w-[200px] text-sm truncate capitalize">{row.original.instructions}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingsCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Button variant={"outline"} className="flex items-center [&>svg]:size-3">
        <VideoIcon className="text-blue-700" />
        <span className="">{row.original.meetings} {row.original.meetings > 1 ? "meetings" : "meeting"}</span>
      </Button>
    )
  }
]
