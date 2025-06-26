"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

type AgentIdProps = {
  agentId: string;
};

export const AgentIdView = ({ agentId }: AgentIdProps) => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({
    id: agentId
  }))

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};
