"use client"

import { ActiveStatus } from "@/components/custom/meetings/activeStatus";
import { CancelledStatus } from "@/components/custom/meetings/cancelledStatus";
import { CompletedStatus } from "@/components/custom/meetings/compeletedStatus";
import { MeetingIdViewHeader } from "@/components/custom/meetings/meetingIdViewHeader";
import { ProcessingStatus } from "@/components/custom/meetings/processingStatus";
import { UpcomingStatus } from "@/components/custom/meetings/upcomingStatus";
import { UpdateMeetingDialog } from "@/components/custom/meetings/updateMeetingDialog";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";
import { getQueryClient } from "@/trpc/server";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";


type MeetingIdViewProps = {
  meetingId: string;
};

export const MeetingIdView = ({ meetingId }: MeetingIdViewProps) => {
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
  const trpc = useTRPC()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: meeting } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))

  const [RemoveConfirmation, confirmRemove] = useConfirm({
    title: "Are you sure you want to remove this meeting?",
    description: `The following action will remove ${meeting.name} meeting.`
  })

  const removeMeeting = useMutation(trpc.meetings.remove.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: meetingId }))
      queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
      router.push("/meetings")
    },
  }))

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove()
    if (!ok) return

    await removeMeeting.mutateAsync({ id: meetingId })
  }

  const activeStatus = meeting.status === "active"
  const completedStatus = meeting.status === "completed"
  const cancelledStatus = meeting.status === "cancelled"
  const upcomingStatus = meeting.status === "upcoming"
  const processingStatus = meeting.status === "processing"


  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        initialValues={meeting}
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
      />
      <div className="flex flex-1 flex-col  md:px-8 sm:px-3 py-4 gap-y-4">
        <MeetingIdViewHeader
          meetingId={meeting.id}
          meetingName={meeting.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)} // Open the update meeting dialog on click
          onRemove={handleRemoveMeeting}
        />
        {completedStatus && <CompletedStatus meetingId={meeting.id} />}
        {cancelledStatus && <CancelledStatus meetingId={meeting.id} />}
        {processingStatus && <ProcessingStatus meetingId={meeting.id} />}
        {activeStatus && <ActiveStatus meetingId={meeting.id} />}
        {upcomingStatus && <UpcomingStatus meetingId={meeting.id} onCancelMeeting={() => { }} isCanceling={false} />}
      </div>
    </>
  );
}
