import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid"
import { user } from "./auth-schema";
import { agents } from "./agent-schema";

export const status = pgEnum("status", [
  "upcoming",
  "completed",
  "active",
  "cancelled",
  "processing"
])

export const meetings = pgTable("meetings", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  agentId: text("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
  status: status("status").notNull().default("upcoming"),
  transcription: text("transcription"),
  summary: text("summary"),
  recordedUrl: text("recorded_url"),
  startedAt: timestamp("started_at", { withTimezone: true }),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})
