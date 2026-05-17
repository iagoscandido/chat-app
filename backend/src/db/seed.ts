import { db } from "@/db";
import {
  conversationsTable,
  NewConversation,
  NewUser,
  usersTable,
} from "./schema";

const USER_ID = "00000000-0000-0000-0000-000000000001";
const CONVERSATION_ID = "00000000-0000-0000-0000-000000000002";

const seedUsers = async (): Promise<string> => {
  const user: NewUser = {
    id: USER_ID,
    name: "John Doe",
    document: "12345678901",
  };

  try {
    const [newUser] = await db
      .insert(usersTable)
      .values(user)
      .onConflictDoNothing()
      .returning();
    if (!newUser) {
      console.log(`User with ID ${USER_ID} already exists or was not created.`);
      return USER_ID;
    }
    return newUser.id;
  } catch (e) {
    throw new Error(`Error creating user: ${e}`);
  }
};
const seedConversations = async (): Promise<string> => {
  const conversation: NewConversation = {
    id: CONVERSATION_ID,
    userId: USER_ID,
    title: "Conversation Test",
  };
  try {
    const [newConversation] = await db
      .insert(conversationsTable)
      .values(conversation)
      .onConflictDoNothing()
      .returning();
    if (!newConversation) {
      console.log(
        `Conversation with ID ${CONVERSATION_ID} already exists or was not created.`,
      );
      return CONVERSATION_ID;
    }
    return newConversation.id;
  } catch (e) {
    throw new Error(`Error creating conversation: ${e}`);
  }
};

const main = async () => {
  const seedUser = await seedUsers();
  console.log(`User: ${seedUser} created or verified successfully`);
  const seedConversation = await seedConversations();
  console.log(
    `Conversation: ${seedConversation} created or verified successfully`,
  );
  process.exit(0);
};

main();
