export enum Sender {
  USER = "user",
  MODEL = "model",
}

export interface IConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  id: string;
  conversationId: string;
  sender: Sender;
  content: string;
  createdAt: string;
}

export interface IUser {
  id: string;
  name: string;
}
