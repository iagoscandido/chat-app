import "dotenv/config";

if (!process.env.GEMINI_API_KEY)
  throw new Error("GEMINI_API_KEY is not defined");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not defined");

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT || 3000;

export enum MODELS {
  Gemini3FlashPreview = "gemini-3-flash-preview",
}
