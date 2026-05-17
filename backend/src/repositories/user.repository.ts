import { db } from "@/db";
import { NewUser, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export class UserRepository {
  create = async (user: NewUser) => {
    const [newUser] = await db.insert(usersTable).values(user).returning();
    return newUser;
  };

  getUsers = async () => {
    const users = await db.select().from(usersTable);
    return users;
  };

  getUserById = async (userId: string) => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));
    return user;
  };
}
