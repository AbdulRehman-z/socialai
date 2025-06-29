import { useMeetingsFilters } from "@/hooks/meetings/use-meetings-filters";
import { MeetingStatus } from "@/modules/meetings/server/types";
import { CheckCircleIcon, CircleXIcon, ClockArrowUpIcon, Loader2Icon, VideoIcon } from "lucide-react";
import { CommandSelect } from "./commandSelect";



const options = [
  {
    id: MeetingStatus.COMPLETED,
    value: MeetingStatus.COMPLETED,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CheckCircleIcon />
        {MeetingStatus.COMPLETED}
      </div>
    )
  },
  {
    id: MeetingStatus.ACTIVE,
    value: MeetingStatus.ACTIVE,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.ACTIVE}
      </div>
    )
  },
  {
    id: MeetingStatus.UPCOMING,
    value: MeetingStatus.UPCOMING,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon />
        {MeetingStatus.UPCOMING}
      </div>
    )
  },
  {
    id: MeetingStatus.CANCELLED,
    value: MeetingStatus.CANCELLED,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.CANCELLED}
      </div>
    )
  },
  {
    id: MeetingStatus.PROCESSING,
    value: MeetingStatus.PROCESSING,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <Loader2Icon />
        {MeetingStatus.PROCESSING}
      </div>
    )
  },
]


export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters()
  return (
    <CommandSelect
      placeholder="Status"
      options={options}
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value={filters.status ?? ""}
    />
  )
}
