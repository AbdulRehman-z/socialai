import { config } from "@/lib/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const pool = postgres(config.env.DATABASE_URL, { max: 1 })

export const db = drizzle(pool)

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
    });

  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await pool.end()
    process.exit(process.exitCode || 0);
  }
}

await main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
})
