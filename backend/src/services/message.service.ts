import { MessageRepository } from "@/repositories/message.repository";
import { Sender } from "@/types";

export class MessageService {
  constructor(private readonly repository: MessageRepository) {
    this.repository = repository;
  }

  create = async (userId: string, text: string, sender: Sender) => {
    const message = await this.repository.create(userId, text, sender);
    return message;
  };

  getMessagesByConversationId = async (conversationId: string) => {
    const messages =
      await this.repository.getMessagesByConversationId(conversationId);
    return messages;
  };

  getRecentMessages = async (conversationId: string) => {
    const messages = await this.repository.getRecentMessages(conversationId);
    return messages;
  };
}
