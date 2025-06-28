"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";


type MeetingIdViewProps = {
  meetingId: string;
};

export const MeetingIdView = ({ meetingId }: MeetingIdViewProps) => {
  const trpc = useTRPC()
  const { data: meeting } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))

  return (
    <div>
      <h1>Meeting</h1>
      <p>This is where you can view your meeting.</p>
      <pre>
        {JSON.stringify(meeting, null, 2)}
      </pre>
    </div>
  );
}
