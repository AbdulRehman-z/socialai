import { agents, db } from "@/db";
import { baseProcedure, createTRPCRouter, protectedBaseProcedure } from "@/trpc/init";
import { agentsGetManySchema, agentsInsertSchema, agentsUpdateSchema } from "@/modules/agents/server/schema";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { streamVideo } from "@/lib/stream";
import { Avatar } from "@/components/ui/avatar";
import { generateAvatarUri } from "@/lib/avatar";

export const agentsRouter = createTRPCRouter({
  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // UPDATE
  update: protectedBaseProcedure.input(agentsUpdateSchema).mutation(async ({ input, ctx }) => {
    const { user } = ctx.auth;

    const { id } = input;
    const [updateAgent] = await db.update(agents).set(input).where(and(eq(agents.id, id), eq(agents.userId, user.id))).returning()

    if (!updateAgent) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Agent not found"
      })
    }

    return updateAgent
  }),

  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // REMOVE
  remove: protectedBaseProcedure.input(z.object({ id: z.string() })).mutation(async ({ input, ctx }) => {
    const { user } = ctx.auth;
    const { id } = input;
    const [removedAgent] = await db.delete(agents).where(and(eq(agents.id, id), eq(agents.userId, user.id))).returning();

    if (!removedAgent) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Agent not found"
      })
    }

    return removedAgent
  }),

  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // GET ONE
  getOne: protectedBaseProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const { user } = ctx.auth;

    const [existingAgent] = await db.select(
      {
        meetings: sql<number>`5`,
        ...getTableColumns(agents)
      }
    ).from(agents).where(and(
      eq(agents.id, input.id),
      eq(agents.userId, user.id)
    ))

    if (!existingAgent) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Agent not found"
      })
    }

    return existingAgent
  }),

  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // GET MANY
  getMany: protectedBaseProcedure.input(agentsGetManySchema).query(async ({ input, ctx }) => {
    const { page, pageSize, search } = input
    const { user } = ctx.auth;

    const data = await db.select({
      meetings: sql<number>`5`,
      ...getTableColumns(agents)
    }).
      from(agents)
      .where(and(eq(agents.userId, user.id),
        search ? ilike(agents.name, `%${search}%`) : undefined))
      .orderBy(desc(agents.createdAt), desc(agents.id))
      .limit(pageSize)
    // .offset((page - 1) * pageSize)
    console.log({
      res: (page - 1) * pageSize
    })

    const [total] = await db.select({
      count: count()
    }).
      from(agents).
      where(and(eq(agents.userId, user.id),
        search ? ilike(agents.name, `%${search}%`) : undefined))

    const totalPages = Math.ceil(total.count / pageSize)

    return {
      items: data,
      total: total.count,
      totalPages
    }
  }),

  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // CREATE ONE
  create: protectedBaseProcedure.input(agentsInsertSchema).mutation(async ({ ctx, input }) => {
    const { user } = ctx.auth;

    const [data] = await db.insert(agents).values({
      ...input,
      userId: user.id
    }).returning()

    return data
  })
})
