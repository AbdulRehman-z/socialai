import { agents, db, meetings } from "@/db";
import { agentsGetManySchema } from "@/modules/agents/server/schema";
import { createTRPCRouter, protectedBaseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { sql, getTableColumns, eq, and, ilike, desc, count } from "drizzle-orm";
import z from "zod";
import { meetingsGetManySchema, meetingsInsertSchema, meetingsUpdateSchema } from "./schema";
import { generateAvatarUri } from "@/lib/avatar";
import { streamVideo } from "@/lib/stream";

export const meetingsRouter = createTRPCRouter({
  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // GENERATE TOKEN
  generateToken: protectedBaseProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx.auth;

    await streamVideo.upsertUsers([{
      id: user.id,
      name: user.name,
      image: user.image ?? generateAvatarUri({ seed: user.name, variant: "initials" }),
      role: "admin",
    }])

    const expirationTime = Math.floor(Date.now() / 1000) + 3600 // 1 hour
    const issuedAt = Math.floor(Date.now() / 1000) - 60

    const token = streamVideo.generateUserToken({
      user_id: user.id,
      exp: expirationTime,
      validity_in_seconds: issuedAt
    })

    console.log({ token })
    return token
  }),

  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // CREATE ONE
  create: protectedBaseProcedure.input(meetingsInsertSchema).mutation(async ({ ctx, input }) => {
    const { user } = ctx.auth
    const [createdMeeting] = await db.insert(meetings).values({
      ...input,
      userId: user.id
    }).returning()

    const call = streamVideo.video.call("default", createdMeeting.id)
    await call.create({
      data: {
        created_by_id: user.id,
        custom: {
          meetingId: createdMeeting.id,
          meetingName: createdMeeting.name
        },
        settings_override: {
          transcription: {
            language: "en",
            mode: "auto-on",
            closed_caption_mode: "auto-on"
          },
          recording: {
            mode: "auto-on",
            quality: "1080p"
          }
        },
      }
    })

    const [existingAgent] = await db.select().from(agents).
      where(eq(agents.id, createdMeeting.agentId))

    if (!existingAgent) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Agent not found"
      })
    }

    await streamVideo.upsertUsers([{
      id: existingAgent.id,
      name: existingAgent.name,
      role: "user",
      image: generateAvatarUri({
        seed: existingAgent.name,
        variant: "botttsNeutral"
      })
    }])

    return createdMeeting
  }),

  //////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // UPDATE
  update: protectedBaseProcedure.input(meetingsUpdateSchema).mutation(async ({ input, ctx }) => {
    const { user } = ctx.auth

    const [updateAgent] = await db.update(meetings)
      .set(input)
      .where(and(eq(meetings.id, input.id),
        eq(meetings.userId, user.id))).returning()

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
  getOne: protectedBaseProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const { user } = ctx.auth

    const [existingMeeting] = await db.select(
      {
        ...getTableColumns(meetings),
        agents: agents,
        duration: sql<number>`EXTRACT(EPOCH FROM (ended_at-started_at))`.as("duration")
      }
    ).from(meetings).
      innerJoin(agents, eq(meetings.agentId, agents.id)).
      where(
        and(eq(meetings.id, input.id),
          eq(meetings.userId, user.id))
      )

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
    const { user } = ctx.auth
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
      where(and(eq(meetings.userId, user.id),
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
    const { user } = ctx.auth;

    const [removeMeeting] = await db.delete(meetings)
      .where(and(eq(meetings.id, input.id),
        eq(meetings.userId, user.id))).returning()

    if (!removeMeeting) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to delete"
      })
    }

    return removeMeeting
  }),
})
