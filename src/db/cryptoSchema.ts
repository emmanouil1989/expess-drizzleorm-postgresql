import { pgTable, serial, text, varchar, numeric } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
export const crypto = pgTable("crypto", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  symbol: varchar("symbol", { length: 30 }).unique().notNull(),
  price: numeric("price", { precision: 5, scale: 2 }).notNull(),
  iconUrl: text("icon_url").notNull(),
});

export type NewCrypto = InferInsertModel<typeof crypto>;
export type Crypto = InferSelectModel<typeof crypto>;
