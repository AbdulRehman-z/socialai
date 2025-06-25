import { GenericError } from "@/components/custom/genericError"
import { GenericLoader } from "@/components/custom/genericLoader"
import { AgentsView } from "@/components/views/agents/agentsView"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

const AgentsPage = async () => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<GenericLoader title="Loading agents..." description="Hold your horses! This might take few moments" />}>
        {/* NOTE: the reason i use react-error-boundary instead of nextjs native error.tsx way bcz the react-error-boundary can work on small components i mean if we have a lot of components and one of the component somehow happens to throw an error then we get the error for that specific component while the native way of catches the error and suspends the whole page not the component that got wounded!  */}
        <ErrorBoundary fallback={<GenericError title="Error Loading Agents" description="Something goes off the rail ):.Try again" />}>
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default AgentsPage
