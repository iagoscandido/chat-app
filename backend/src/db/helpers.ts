import { boolean, timestamp, uuid } from "drizzle-orm/pg-core";

export const CREATE = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
};

export const CREATE_UPDATE = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at"),
};

export const CREATE_UPDATE_DELETE = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
};

export const IS_ACTIVE = {
  isActive: boolean("is_active").default(true).notNull(),
};

export const ID = {
  id: uuid("id").defaultRandom().primaryKey(),
};
