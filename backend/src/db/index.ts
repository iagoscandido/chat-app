import { DATABASE_URL } from "@/config";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
  connection: {
    connectionString: DATABASE_URL,
  },
});
