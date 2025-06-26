import { agents, db } from "@/db";
import { baseProcedure, createTRPCRouter, protectedBaseProcedure } from "@/trpc/init";
import { agentsGetManySchema, agentsInsertSchema } from "../schema";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({


  getOne: protectedBaseProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const [existingAgent] = await db.select(
      {
        meetings: sql<number>`5`,
        ...getTableColumns(agents)
      }
    ).from(agents).where(eq(agents.id, input.id))
    return existingAgent
  }),


  getMany: protectedBaseProcedure.input(agentsGetManySchema).query(async ({ input, ctx }) => {
    const { page, pageSize, search } = input

    const data = await db.select({
      meetings: sql<number>`5`,
      ...getTableColumns(agents)
    }).
      from(agents)
      .where(and(eq(agents.userId, ctx.auth.user.id),
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
      where(and(eq(agents.userId, ctx.auth.user.id),
        search ? ilike(agents.name, `%${search}%`) : undefined))

    const totalPages = Math.ceil(total.count / pageSize)


    console.log({
      // items: data,
      total: total.count,
      totalPages
    })

    return {
      items: data,
      total: total.count,
      totalPages
    }
  }),


  create: protectedBaseProcedure.input(agentsInsertSchema).mutation(async ({ ctx, input }) => {
    const [data] = await db.insert(agents).values({
      ...input,
      userId: ctx.auth.user.id
    }).returning()

    return data
  })

})
