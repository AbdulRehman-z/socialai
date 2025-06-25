import { agents, db } from "@/db";
import { baseProcedure, createTRPCRouter, protectedBaseProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getOne: protectedBaseProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const [existingAgent] = await db.select().from(agents).where(eq(agents.id, input.id))
    return existingAgent
  }),
  getMany: protectedBaseProcedure.query(async () => {
    const data = await db.select().from(agents)
    // throw new TRPCError({ code: "BAD_REQUEST" })
    return data
  }),
  create: protectedBaseProcedure.input(agentsInsertSchema).mutation(async ({ ctx, input }) => {
    const [data] = await db.insert(agents).values({
      ...input,
      userId: ctx.auth.user.id
    }).returning()

    return data
  })

})
