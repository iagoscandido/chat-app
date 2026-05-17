import { Sender } from "@/types.d";
import { GenerateContentResponseUsageMetadata } from "@google/genai";
import { jsonb, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import {
  CREATE,
  CREATE_UPDATE,
  CREATE_UPDATE_DELETE,
  ID,
  IS_ACTIVE,
} from "./helpers";

export const usersTable = pgTable("users", {
  ...ID,
  name: varchar("name", { length: 100 }).notNull(),
  document: varchar("document", { length: 11 }).notNull().unique(),
  ...IS_ACTIVE,
  ...CREATE_UPDATE_DELETE,
});

export const conversationsTable = pgTable("conversations", {
  ...ID,
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  ...CREATE_UPDATE,
});

export const sender = pgEnum("sender", Sender);
export const messagesTable = pgTable("messages", {
  ...ID,
  conversationId: uuid("conversation_id")
    .references(() => conversationsTable.id)
    .notNull(),
  sender: sender("sender").notNull(),
  content: varchar("content", { length: 5000 }).notNull(),
  ...CREATE,
});

export const usageMetadataTable = pgTable("usage_metadata", {
  ...ID,
  usageMetadata: jsonb("usage_metadata")
    .$type<GenerateContentResponseUsageMetadata>()
    .notNull(),
  ...CREATE,
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
export type Conversation = typeof conversationsTable.$inferSelect;
export type NewConversation = typeof conversationsTable.$inferInsert;
export type Message = typeof messagesTable.$inferSelect;
export type NewMessage = typeof messagesTable.$inferInsert;
export type UsageMetadata = typeof usageMetadataTable.$inferSelect;
export type NewUsageMetadata = typeof usageMetadataTable.$inferInsert;
