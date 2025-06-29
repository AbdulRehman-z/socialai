import { Input } from "@/components/ui/input"
import { useMeetingsFilters } from "@/hooks/meetings/use-meetings-filters"
import { SearchIcon } from "lucide-react"

export const MeetingsSearchFilters = () => {
  const [filters, setFilters] = useMeetingsFilters()

  return (
    <div className="relative">
      <Input
        className="h-9 w-[200px] pl-7"
        placeholder="Search meetings..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
    </div>
  )
}
