import { GenericError } from "@/components/custom/genericError";
import { GenericLoader } from "@/components/custom/genericLoader";
import { AgentIdView } from "@/components/views/agents/agentIdView";
import { MeetingIdView } from "@/components/views/meetings/meetingIdView";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type MeetingIdProps = {
  params: Promise<{ meetingId: string }>;
};

const MeetingIdPage = async ({ params }: MeetingIdProps) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return redirect("/sign-in")
  }
  const { meetingId } = await params;
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<GenericLoader title="Loading meeting..." description="Please wait! Almost there" />}>
        <ErrorBoundary fallback={<GenericError title="Error Loading Meeting" description="Please try again later" />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default MeetingIdPage;
