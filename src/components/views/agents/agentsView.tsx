"use client"

import { GenericError } from "@/components/custom/genericError"
import { GenericLoader } from "@/components/custom/genericLoader"
import { ResponsiveDialog } from "@/components/custom/responsiveDialog"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

export const AgentsView = () => {
  const trpc = useTRPC()

  // the data won't be fetched on the client side(browser), it's already prefetched on the server.
  // so useSuspenseQuery is basically using the cached data already prefetched. If there is not prefetched data, it will fallback to useQuery().
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
