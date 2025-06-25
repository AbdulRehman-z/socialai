import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
import { inferOutput } from "@trpc/tanstack-react-query";

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"]
