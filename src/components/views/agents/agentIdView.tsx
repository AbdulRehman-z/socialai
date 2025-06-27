"use client"

import { AgentIdViewHeader } from "@/components/custom/agents/agentIdViewHeader";
import { UpdateAgentDialog } from "@/components/custom/agents/updateAgentDialog";
import { GeneratedAvatar } from "@/components/custom/generateAvatar";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";
import { QueryClient, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type AgentIdProps = {
  agentId: string;
};

export const AgentIdView = ({ agentId }: AgentIdProps) => {
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);
  const queryClient = useQueryClient()
  const router = useRouter()
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({
    id: agentId
  }))
  const [RemoveConfirmation, confirmRemove] = useConfirm({
    title: "Are you sure you want to remove this agent?",
    description: `The following action will remove ${data.meetings} associated meetings.`
  })

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}))
        router.push("/agents")
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove()
    console.log({ ok })
    if (!ok) return
    await removeAgent.mutateAsync({ id: agentId })
  }

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        initialValues={data}
        onOpenChange={setUpdateAgentDialogOpen}
      />
      <div className="flex-1 p-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentName={data.name}
          agentId={data.id}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="bg-sidebar/50 rounded-lg ">
          <div className="flex flex-col justify-start px-3 md:px-6 py-4 md:py-5">
            <div className="py-4 flex gap-y-3 gap-x-3 items-center">
              <GeneratedAvatar
                seed={data.name}
                variant="botttsNeutral"
                className="size-10"
              />
              <span className="text-lg">{data.name}</span>
            </div>
            <Badge className="gap-x-2  px-3 [&>svg]:size-5" variant={"outline"}>
              <VideoIcon className="text-primary" />
              <p>{data.meetings} {data.meetings === 1 ? "Meeting" : "Meetings"}</p>
            </Badge>
            <div className="flex flex-col gap-y-4 py-7">
              <p className="text-xl">Instructions</p>
              <p className="text-muted-foreground">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
