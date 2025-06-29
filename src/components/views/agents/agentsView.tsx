"use client"

import { columns } from "@/components/custom/agents/columns"
import { DataPagination } from "@/components/custom/dataPagination"
import { DataTable } from "@/components/custom/dataTable"
import { GenericEmptyState } from "@/components/custom/genericEmptyState"
import { useAgentsFilters } from "@/hooks/agents/use-agents-filters"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const AgentsView = () => {
  const router = useRouter()
  const [filters, setFilters] = useAgentsFilters()
  const trpc = useTRPC()
  // the data won't be fetched on the client side(browser), it's already prefetched on the server.
  // so useSuspenseQuery is basically using the cached data already prefetched. If there is not prefetched data, it will fallback to useQuery().
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters,
  }))

  return (
    <>
      <DataTable onRowClick={(row) => router.push(`/agents/${row.id}`)} columns={columns} data={data.items} />
      <DataPagination page={filters.page} totalPages={data.totalPages
      } onPageChange={(page) => setFilters({ page })} />
      {data.items.length === 0 && <GenericEmptyState title="Create your first agent" description="Create an agent to join meeting. Each agent will follow your instructions and can interact with participants during the call" dialog="agent" />}
    </>
  )
}
