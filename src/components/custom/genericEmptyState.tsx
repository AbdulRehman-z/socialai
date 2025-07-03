import { useState } from "react";
import { Button } from "../ui/button";
import { NewAgentDialog } from "./agents/newAgentDialog";
import { EmptyStateSvg } from "./emptyStateSvg";
import { NewMeetingDialog } from "./meetings/newMeetingsDialog";
import { UpcomingStateSvg } from "./upcomingStateSvg";
import { CancelledStateSvg } from "./cancelledStateSvg";
import { ProcessingStateSvg } from "./processingStateSvg";
import { CompletedStateSvg } from "./completedStateSvg";

type GenericEmptyStateProps = {
  title: string;
  description: string;
  type?: "agent" | "meeting" | "upcoming" | "processing" | "cancelled" | "active"
  | "completed"
};

export const GenericEmptyState = ({ title, description, type }: GenericEmptyStateProps) => {
  const [open, onOpenChange] = useState(false);

  return (
    <>
      {type === "agent" && <NewAgentDialog open={open} onOpenChange={onOpenChange} />}
      {type === "meeting" && <NewMeetingDialog open={open} onOpenChange={onOpenChange} />}
      <div className="flex items-center justify-center py-10 px-8">
        <div className="flex flex-col items-center gap-y-1">
          {type === "agent" || type === "meeting" && <EmptyStateSvg width={240} height={240} />}
          {type === "upcoming" && <UpcomingStateSvg width={240} height={240} />}
          {type === "processing" && <ProcessingStateSvg width={240} height={240} />}
          {type === "cancelled" && <CancelledStateSvg width={240} height={240} />}
          {type === "completed" && <CompletedStateSvg width={240} height={240} />}
          {type === "active" && <UpcomingStateSvg width={240} height={240} />}
          <div className="flex flex-col items-center justify-center max-w-md mx-auto text-center gap-y-2">
            <h1 className="text-xl font-medium">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {type === "agent" && <Button size={"lg"} onClick={() => onOpenChange(true)}>
            Create New Agent
          </Button>}
          {type === "meeting" && <Button size={"lg"} onClick={() => onOpenChange(true)}>
            Create New Meeting
          </Button>}
        </div>
      </div>
    </>
  )
}
