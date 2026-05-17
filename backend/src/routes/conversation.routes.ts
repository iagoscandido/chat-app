import { ConversationController } from "@/controllers/conversation.controller";
import { ConversationRepository } from "@/repositories/conversation.repository";
import { MessageRepository } from "@/repositories/message.repository";
import { UsageMetadataRepository } from "@/repositories/usage-metadata.repository";
import { ConversationService } from "@/services/conversation.service";
import { MessageService } from "@/services/message.service";
import { Router } from "express";

const r = Router();

const repository = new ConversationRepository();

const messageRepository = new MessageRepository();
const messageService = new MessageService(messageRepository);
const usageMetadataRepository = new UsageMetadataRepository();

const service = new ConversationService(
  repository,
  messageService,
  usageMetadataRepository,
);
const controller = new ConversationController(service);

r.post("/:userId", controller.create);
r.get("/:userId", controller.getConversationsByUserId);
r.post("/:conversationId/messages", controller.sendMessage);
r.get("/:conversationId/messages", controller.getMessagesByConversationId);

export { r as conversationRoutes };
