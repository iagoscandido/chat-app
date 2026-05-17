import { IConversation, IMessage } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const fetchConversations = async (userId: string): Promise<IConversation[]> => {
  const response = await fetch(`${API_BASE_URL}/conversations/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch conversations");
  return response.json();
};

export const createConversation = async (userId: string): Promise<{ conversationId: string }> => {
  const response = await fetch(`${API_BASE_URL}/conversations/${userId}`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to create conversation");
  return response.json();
};

export const fetchMessages = async (conversationId: string): Promise<IMessage[]> => {
  const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`);
  if (!response.ok) throw new Error("Failed to fetch messages");
  return response.json();
};

export const sendMessage = async (conversationId: string, content: string): Promise<{ response: string }> => {
  const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error("Failed to send message");
  return response.json();
};
