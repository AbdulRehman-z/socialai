import { GenericError } from "@/components/custom/genericError";
import { GenericLoader } from "@/components/custom/genericLoader";
import { CallView } from "@/components/views/calls/callView";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type PageProps = {
  params: Promise<{ meetingId: string }>
}


const Page = async ({ params }: PageProps) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return redirect("/sign-in")
  }

  const { meetingId } = await params
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({
    id: meetingId
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        {/* <ErrorBoundary fallback={<GenericError title="Error Loading Meetings" description="Something goes off the rail ): Try again" />}> */}
        <CallView meetingId={meetingId} />
        {/* </ErrorBoundary> */}
      </Suspense>
    </HydrationBoundary >
  );
};


export default Page
