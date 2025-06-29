import { GenericError } from "@/components/custom/genericError";
import { GenericLoader } from "@/components/custom/genericLoader";
import { MeetingsListsHeader } from "@/components/custom/meetings/meetingsListHeader";
import { MeetingsView } from "@/components/views/meetings/meetingView";
import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/meetings/server/params";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type MeetingsPageParams = {
  params: Promise<SearchParams>
}

const MeetingsPage = async ({ params }: MeetingsPageParams) => {
  const filters = await loadSearchParams(params)

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return redirect("/sign-in")
  }

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({
    ...filters
  }))

  return (
    <>
      <MeetingsListsHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<GenericLoader title="Loading meetings..." description="Hold your horses! This might take few moments" />}>
          <ErrorBoundary fallback={<GenericError title="Error Loading Meetings" description="Something goes off the rail ):.Try again" />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

export default MeetingsPage;
