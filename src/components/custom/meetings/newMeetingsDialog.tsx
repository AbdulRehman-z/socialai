import { ResponsiveDialog } from "../responsiveDialog"
import { MeetingsForm } from "./meetingsForm"

type NewAgentDialogProps = {
  open: boolean,
  onOpenChange: (open: boolean) => void
}

export const NewMeetingDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog title="New Meeting" description="Create a new meeting" open={open} onOpenChange={onOpenChange}>
      <MeetingsForm
        onSuccess={() =>
          onOpenChange(false)
        }
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}
