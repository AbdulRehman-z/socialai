import { AgentGetOne } from "@/modules/agents/types"
import { ResponsiveDialog } from "../responsiveDialog"
import { AgentForm } from "./agentsForm"

type UpdateAgentDialogProps = {
  open: boolean,
  onOpenChange: (open: boolean) => void
  initialValues: AgentGetOne
}

export const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog title="Update Agent" description="Update an existing agent" open={open} onOpenChange={onOpenChange}>
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}
