import { DEFAULT_PAGE } from "@/lib/constants"
import { MeetingStatus } from "@/modules/meetings/server/types"
import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryState, useQueryStates } from "nuqs"

export const useMeetingsFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
    status: parseAsStringEnum(Object.values(MeetingStatus)).withOptions({ clearOnDefault: true }),
    agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  })
}
