"use client"

import { columns } from "@/components/custom/agents/columns"
import { DataTable } from "@/components/custom/agents/dataTable"
import { EmptyAgentState } from "@/components/custom/emptyAgentState"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export const AgentsView = () => {
  const trpc = useTRPC()
  // the data won't be fetched on the client side(browser), it's already prefetched on the server.
  // so useSuspenseQuery is basically using the cached data already prefetched. If there is not prefetched data, it will fallback to useQuery().
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

  return (
    <div>
      <DataTable columns={columns} data={data} />
      {data.length === 0 && <EmptyAgentState title="Create your first agent" description="Create an agent to join meeting. Each agent will follow your instructions and can interact with participants during the call" />}
    </div>
  )
}
