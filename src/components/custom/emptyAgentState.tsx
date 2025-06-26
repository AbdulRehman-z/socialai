"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { NewAgentDialog } from "./agents/newAgentDialog"
import { EmptyStateSvg } from "./emptyStateSvg"

type EmptyAgentStateProps = {
  title: string,
  description: string
}

export const EmptyAgentState = ({ title, description }: EmptyAgentStateProps) => {
  const [open, onOpenChange] = useState(false)

  return (
    <>
      <NewAgentDialog open={open} onOpenChange={onOpenChange} />
      <div className="flex items-center justify-center py-10 px-8">
        <div className="flex flex-col items-center gap-y-9">
          <EmptyStateSvg width={240} height={240} />
          <div className="flex flex-col items-center justify-center max-w-md mx-auto text-center gap-y-4">
            <h1 className="text-xl font-medium">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button size={"lg"} onClick={() => onOpenChange(true)}>
            Create New Agent
          </Button>
        </div>
      </div>
    </>
  )
}
