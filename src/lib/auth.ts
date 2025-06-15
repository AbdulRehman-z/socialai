import { db, schema } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema
    }
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds which equals 5 minutes
    },
  },
});
