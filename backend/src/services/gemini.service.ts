import { GEMINI_API_KEY, MODELS } from "@/config";
import { NPC_SYSTEM_INSTRUCTION } from "@/prompts";
import type { Content } from "@google/genai";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export class GeminiService {
  static sendMessage = async (history: Content[], message: string) => {
    const chat = ai.chats.create({
      model: MODELS.Gemini3FlashPreview,
      history,
      config: {
        systemInstruction: NPC_SYSTEM_INSTRUCTION(),
        maxOutputTokens: 1024 * 10,
      },
    });

    const { text, usageMetadata } = await chat.sendMessage({ message });

    const response = text;
    const metadata = usageMetadata;

    return { response, metadata };
  };
}
