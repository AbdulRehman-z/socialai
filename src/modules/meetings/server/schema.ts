import { DEFAULT_PAGE, MIN_PAGE_SIZE, MAX_PAGE_SIZE, DEFAULT_PAGE_SIZE } from "@/lib/constants"
import z from "zod"

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  agentId: z.string().min(1, {
    message: "Agent ID is required"
  })
})


export const meetingsGetManySchema = z.object({
  page: z.number().default(DEFAULT_PAGE),
  pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE),
  search: z.string().nullish()
})


export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
})
