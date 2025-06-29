import { AgentsListsHeader } from "@/components/custom/agents/agentsListHeader"
import { GenericError } from "@/components/custom/genericError"
import { GenericLoader } from "@/components/custom/genericLoader"
import { AgentsView } from "@/components/views/agents/agentsView"
import { auth } from "@/lib/auth"
import { loadSearchParams } from "@/modules/agents/server/params"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { SearchParams } from "nuqs"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"


type AgentsPageProps = {
  params: Promise<SearchParams>
}

const AgentsPage = async ({ params }: AgentsPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return redirect("/sign-in")
  }

  const filters = await loadSearchParams(params)
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }))

  return (
    <>
      <AgentsListsHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<GenericLoader title="Loading agents..." description="Hold your horses! This might take few moments" />}>
          {/* NOTE: the reason i use react-error-boundary instead of nextjs native error.tsx way bcz the react-error-boundary can work on small components i mean if we have a lot of components and one of the component somehow happens to throw an error then we get the error for that specific component while the native way of catches the error and suspends the whole page not the component that got wounded!  */}
          <ErrorBoundary fallback={<GenericError title="Error Loading Agents" description="Something goes off the rail ):.Try again" />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

export default AgentsPage
