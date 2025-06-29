import { useMeetingsFilters } from "@/hooks/meetings/use-meetings-filters"
import { CommandSelect } from "../commandSelect"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { GeneratedAvatar } from "../generateAvatar"

export const AgentsIdFilter = () => {
  const [filters, setFilters] = useMeetingsFilters()
  const [agentSearch, setAgentSearch] = useState("")
  const trpc = useTRPC()
  const { data: agents, isLoading } = useQuery(trpc.agents.getMany.queryOptions({
    pageSize: 100,
    search: agentSearch
  }))

  return (
    <CommandSelect
      className="h-9"
      placeholder="Agent Id"
      options={(agents?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2 px-3">
            <GeneratedAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="size-5"
            />
            <span>{agent.name}</span>
          </div>
        )
      }))}
      onSelect={(value) => setFilters({ agentId: value })}
      value={filters.agentId ?? ""}
      isSearchable={isLoading}
      onSearch={setAgentSearch}
    />
  )
}
