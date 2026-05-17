import { db } from "@/db";
import { conversationsTable, NewConversation } from "@/db/schema";
import { eq } from "drizzle-orm";

export enum Role {
  User = "user",
  Model = "model",
}
export type Message = {
  role: Role;
  text: string;
};

export class ConversationRepository {
  create = async (userId: string) => {
    const conversation: NewConversation = {
      userId,
      title: "New Conversation",
    };
    const [newConversation] = await db
      .insert(conversationsTable)
      .values(conversation)
      .returning();

    return newConversation;
  };

  getConversations = async () => {
    const conversations = await db.select().from(conversationsTable);
    return conversations;
  };

  getConversationById = async (conversationId: string) => {
    const [conversation] = await db
      .select()
      .from(conversationsTable)
      .where(eq(conversationsTable.id, conversationId));

    return conversation;
  };

  getConversationsByUserId = async (userId: string) => {
    const conversations = await db
      .select()
      .from(conversationsTable)
      .where(eq(conversationsTable.userId, userId));
    return conversations;
  };
}
