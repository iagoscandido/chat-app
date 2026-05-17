import { db } from "@/db";
import { messagesTable, NewMessage } from "@/db/schema";
import { Sender } from "@/types";
import { eq } from "drizzle-orm";

export class MessageRepository {
  create = async (conversationId: string, content: string, sender: Sender) => {
    const message: NewMessage = {
      conversationId,
      content,
      sender,
    };
    const [newMessage] = await db
      .insert(messagesTable)
      .values(message)
      .returning();
    return newMessage;
  };

  getMessagesByConversationId = async (conversationId: string) => {
    const messages = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.conversationId, conversationId));
    return messages;
  };

  getRecentMessages = async (conversationId: string, limit: number = 10) => {
    const messages = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.conversationId, conversationId))
      .orderBy(messagesTable.createdAt)
      .limit(limit);

    return messages;
  };
}
