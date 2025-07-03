"use client"

import { CallProvider } from "@/components/custom/calls/callProvider";
import { GenericError } from "@/components/custom/genericError";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const CallView = ({ meetingId }: { meetingId: string }) => {
  const trpc = useTRPC()
  const { data: meeting } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))

  if (meeting.status === "completed") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GenericError
          title="Meeting has ended"
          description="Sorry! you can no longer join this meeting "
        />
      </div>
    )
  }

  return (
    <CallProvider
      meetingId={meetingId}
      meetingName={meeting?.name}
    />
  );
};
