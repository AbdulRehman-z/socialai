import { Input } from "@/components/ui/input"
import { useAgentsFilters } from "@/hooks/agents/use-agents-filters"
import { SearchIcon } from "lucide-react"



export const AgentsSearchFilters = () => {
  const [filters, setFilters] = useAgentsFilters()

  return (
    <div className="relative">
      <Input
        className="h-9 w-[200px] pl-7"
        placeholder="Search agents..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
    </div>
  )
}
