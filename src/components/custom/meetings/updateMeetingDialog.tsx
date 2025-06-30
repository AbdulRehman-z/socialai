import { MeetingGetOne } from "@/modules/meetings/server/types"
import { ResponsiveDialog } from "../responsiveDialog"
import { MeetingsForm } from "./meetingsForm"

type UpdateMeetingDialogProps = {
  open: boolean,
  onOpenChange: (open: boolean) => void
  initialValues: MeetingGetOne
}

export const UpdateMeetingDialog = ({ open, onOpenChange, initialValues }: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog title="Update Meeting" description="Update an existing meeting" open={open} onOpenChange={onOpenChange}>
      <MeetingsForm
        onSuccess={() => onOpenChange(false)} // Close the dialog on success
        onCancel={() => onOpenChange(false)} // Close the dialog on cancel
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}
