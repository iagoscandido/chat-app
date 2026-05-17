import { ConversationRepository } from "@/repositories/conversation.repository";
import { UsageMetadataRepository } from "@/repositories/usage-metadata.repository";
import { Content } from "@google/genai";
import { GeminiService } from "./gemini.service";
import { MessageService } from "./message.service";
import { Sender } from "@/types.d";

export class ConversationService {
  constructor(
    private readonly repository: ConversationRepository,
    private readonly messageService: MessageService,
    private readonly usageMetadataRepository: UsageMetadataRepository,
  ) {
    this.repository = repository;
  }

  create = async (userId: string) => {
    const conversation = await this.repository.create(userId);
    return conversation;
  };

  getConversationsByUserId = async (userId: string) => {
    const conversations =
      await this.repository.getConversationsByUserId(userId);
    return conversations;
  };

  getMessagesByConversationId = async (conversationId: string) => {
    const messages =
      await this.messageService.getMessagesByConversationId(conversationId);
    return messages;
  };

  sendMessage = async (conversationId: string, content: string) => {
    const conversation =
      await this.repository.getConversationById(conversationId);

    if (!conversation) throw new Error("Conversation not found");

    const recentMessages = await this.messageService.getRecentMessages(
      conversation.id,
    );

    const history: Content[] = recentMessages.map((message) => ({
      role: message.sender,
      parts: [{ text: message.content }],
    }));

    const { response, metadata } = await GeminiService.sendMessage(
      history,
      content,
    );

    if (!response || !metadata) {
      throw new Error("No response from Gemini API");
    }

    await this.usageMetadataRepository.save({ usageMetadata: metadata });
    await this.messageService.create(conversationId, content, Sender.USER);
    await this.messageService.create(conversationId, response, Sender.MODEL);

    return response;
  };
}
