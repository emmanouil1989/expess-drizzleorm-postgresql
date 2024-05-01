import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  salt: text("salt").notNull(),
  password: text("password").notNull(),
  sessionToken: text("session_token"),
});

export type NewUser = InferInsertModel<typeof users>;
export type User = InferSelectModel<typeof users>;
