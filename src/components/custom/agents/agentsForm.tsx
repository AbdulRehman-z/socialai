import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { agentsInsertSchema } from "@/modules/agents/server/schema"
import { AgentGetOne } from "@/modules/agents/server/types"
import { useTRPC } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { GeneratedAvatar } from "../generateAvatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

type AgentFormProps = {
  onSuccess?: () => void,
  onCancel?: () => void,
  initialValues?: AgentGetOne
}

export const AgentForm = ({ initialValues, onCancel, onSuccess }: AgentFormProps) => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const createAgent = useMutation(trpc.agents.create.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        trpc.agents.getMany.queryOptions({})
      )

      if (initialValues?.id) {
        await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialValues.id }))
      }
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  }))


  const updateAgent = useMutation(trpc.agents.update.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        trpc.agents.getMany.queryOptions({})
      )

      if (initialValues?.id) {
        await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialValues.id }))
      }
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  }))


  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? ""
    }
  })

  const isEdit = !!initialValues?.id
  const isPending = createAgent.isPending || updateAgent.isPending

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      updateAgent.mutate({ ...values, id: initialValues.id })
    } else {
      createAgent.mutate(values)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4 flex flex-col gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch("name")}
          className="size-15 border"
          variant="botttsNeutral"
        />
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
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea className="h-30" {...field} placeholder="An exceptional math instructor holding deep understandings in trignometory,vectors and linear algebra. " />
              </FormControl>
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
  )

}
