import { ConversationService } from "@/services/conversation.service";
import { Request, Response } from "express";

export class ConversationController {
  constructor(private service: ConversationService) {
    this.service = service;
  }
  create = async (req: Request<{ userId: string }>, res: Response) => {
    const { userId } = req.params;

    const { id } = await this.service.create(userId);

    return res.status(201).send({ conversationId: id });
  };

  getConversationsByUserId = async (
    req: Request<{ userId: string }>,
    res: Response,
  ) => {
    const { userId } = req.params;

    const conversations = await this.service.getConversationsByUserId(userId);
    return res.status(200).send(conversations);
  };

  getMessagesByConversationId = async (
    req: Request<{ conversationId: string }>,
    res: Response,
  ) => {
    const { conversationId } = req.params;

    const messages =
      await this.service.getMessagesByConversationId(conversationId);

    return res.status(200).send(messages);
  };

  sendMessage = async (
    req: Request<{ conversationId: string }>,
    res: Response,
  ) => {
    const { conversationId } = req.params;
    const { content } = req.body;

    const response = await this.service.sendMessage(conversationId, content);
    return res.status(200).send({ response: response });
  };
}
