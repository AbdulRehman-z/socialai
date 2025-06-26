import { GenericError } from "@/components/custom/genericError";
import { GenericLoader } from "@/components/custom/genericLoader";
import { AgentIdView } from "@/components/views/agents/agentIdView";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type AgentIdPageProps = {
  params: Promise<{ agentId: string }>
};

const AgentIdPage = async ({ params }: AgentIdPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return redirect("/sign-in")
  }

  const { agentId } = await params;
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({
    id: agentId
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<GenericLoader title="Loading agent..." description="Please wait! Almost there" />}>
        <ErrorBoundary fallback={<GenericError title="Error Loading Agent" description="Please try again later" />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};


export default AgentIdPage;
