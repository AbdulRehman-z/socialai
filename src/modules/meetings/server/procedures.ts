import { agents, db, meetings } from "@/db";
import { agentsGetManySchema } from "@/modules/agents/server/schema";
import { createTRPCRouter, protectedBaseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { sql, getTableColumns, eq, and, ilike, desc, count } from "drizzle-orm";
import z from "zod";
import { meetingsGetManySchema, meetingsInsertSchema, meetingsUpdateSchema } from "./schema";

export const meetingsRouter = createTRPCRouter({
  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // CREATE ONE
  create: protectedBaseProcedure.input(meetingsInsertSchema).mutation(async ({ ctx, input }) => {
    const [data] = await db.insert(meetings).values({
      ...input,
      userId: ctx.auth.user.id
    }).returning()

    return data
  }),

  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // UPDATE
  update: protectedBaseProcedure.input(meetingsUpdateSchema).mutation(async ({ input, ctx }) => {

    console.log({ input })
    const [updateAgent] = await db.update(meetings)
      .set(input)
      .where(and(eq(meetings.id, input.id),
        eq(meetings.userId, ctx.auth.user.id))).returning()

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
  // GET ONE
  getOne: protectedBaseProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    console.log({ input })

    const [existingMeeting] = await db.select(
      {
        ...getTableColumns(meetings)
      }
    ).from(meetings).where(eq(meetings.id, input.id))

    if (!existingMeeting) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Meeting not found"
      })
    }

    return existingMeeting
  }),

  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // GET MANY
  getMany: protectedBaseProcedure.input(meetingsGetManySchema).query(async ({ input, ctx }) => {
    const { page, pageSize, search, agentId, status } = input

    const data = await db.select({
      ...getTableColumns(meetings),
      agent: agents,
      duration: sql<number | null>`
        CASE
          WHEN ended_at IS NOT NULL AND started_at IS NOT NULL
          THEN EXTRACT(EPOCH FROM (ended_at - started_at))
          ELSE NULL
        END
      `.as("duration")
    }).
      from(meetings).
      innerJoin(agents, eq(meetings.agentId, agents.id)).
      where(and(eq(meetings.userId, ctx.auth.user.id),
        agentId ? eq(meetings.agentId, agentId) : undefined,
        status ? eq(meetings.status, status) : undefined,
        search ? ilike(meetings.name, `%${search}%`) : undefined))
      .orderBy(desc(meetings.createdAt), desc(meetings.id))
      .limit(pageSize)
    // .offset((page - 1) * pageSize)
    console.log({
      res: (page - 1) * pageSize
    })

    const [total] = await db.select({
      count: count()
    }).
      from(meetings).
      innerJoin(agents, eq(meetings.agentId, agents.id)).
      where(and(eq(meetings.userId, ctx.auth.user.id),
        agentId ? eq(meetings.agentId, agentId) : undefined,
        search ? ilike(meetings.name, `%${search}%`) : undefined))

    const totalPages = Math.ceil(total.count / pageSize)

    return {
      items: data,
      total: total.count,
      totalPages
    }
  }),

  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // REMOVE
  remove: protectedBaseProcedure.input(z.object({ id: z.string() })).mutation(async ({ input, ctx }) => {
    const [removeMeeting] = await db.delete(meetings)
      .where(and(eq(meetings.id, input.id),
        eq(meetings.userId, ctx.auth.user.id))).returning()

    if (!removeMeeting) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to delete"
      })
    }

    return removeMeeting
  }),
})
