import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { meetingsInsertSchema } from "@/modules/meetings/server/schema"
import { MeetingGetOne } from "@/modules/meetings/server/types"
import { useTRPC } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { CommandSelect } from "../commandSelect"
import { GeneratedAvatar } from "../generateAvatar"
import { NewAgentDialog } from "../agents/newAgentDialog"

type MeetingFormProps = {
  onSuccess?: (id?: string) => void,
  onCancel?: () => void,
  initialValues?: MeetingGetOne
}

export const MeetingsForm = ({ initialValues, onCancel, onSuccess }: MeetingFormProps) => {
  const [showNewAgentDialog, setShowNewAgentDialog] = useState(false)
  const [agentSearch, setAgentSearch] = useState("")
  const router = useRouter()
  const trpc = useTRPC()
  const queryClient = useQueryClient()


  const agents = useQuery(trpc.agents.getMany.queryOptions({
    pageSize: 100,
    search: agentSearch
  }))

  const createMeeting = useMutation(trpc.meetings.create.mutationOptions({
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(
        trpc.meetings.getMany.queryOptions({})
      )

      if (initialValues?.id) {
        await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: initialValues.id }))
      }

      onSuccess?.()
      router.push(`/meetings/${data.id}`)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  }))


  const updateMeeting = useMutation(trpc.meetings.update.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        trpc.meetings.getMany.queryOptions({})
      )

      if (initialValues?.id) {
        await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: initialValues.id }))
      }
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  }))


  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? ""
    }
  })

  const isEdit = !!initialValues?.id
  const isPending = createMeeting.isPending || updateMeeting.isPending

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      console.log("updating")
      updateMeeting.mutate({ ...values, id: initialValues.id })
    } else {
      console.log("creating")
      createMeeting.mutate(values)
    }
  }

  return (
    <>
      <NewAgentDialog open={showNewAgentDialog} onOpenChange={setShowNewAgentDialog} />
      <Form {...form}>
        <form className="space-y-4 flex flex-col gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="h-10" {...field} placeholder="e.g Suziku" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items || []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="size-5"
                          />
                          <span>{agent.name}</span>
                        </div>
                      )
                    }))}
                    isSearchable={agents.isPending}
                    placeholder="Search agent..."
                    value={field.value}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                  />
                </FormControl>
                <FormDescription>
                  Not found what you are looking for?
                  <button className="text-primary/90 ml-1" type="button" onClick={() => setShowNewAgentDialog(true)}>
                    Create New Agent</button>
                </FormDescription>
                <FormMessage />
              </FormItem>

            )}
          />
          <div className="flex justify-between items-center">
            {onCancel && <Button disabled={isPending} type="button" variant={"outline"} onClick={() => onCancel()}>
              Cancel
            </Button>
            }
            <Button type="submit" disabled={isPending}>
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
