import { db } from "../db/db";
import { NewCrypto, crypto as cryptoSchema } from "../db";
import { eq } from "drizzle-orm";

export const getAllCryptos = async () => {
  const allCyrptos = await db.select().from(cryptoSchema);
  return allCyrptos;
};

export const getCryptoByid = async (id: number) => {
  return await db.select().from(cryptoSchema).where(eq(cryptoSchema.id, id));
};

export const getCyptoByName = async (name: string) => {
  return await db
    .select()
    .from(cryptoSchema)
    .where(eq(cryptoSchema.name, name));
};

export const getCryptoBySymbol = async (symbol: string) => {
  return await db
    .select()
    .from(cryptoSchema)
    .where(eq(cryptoSchema.symbol, symbol));
};
export const createCrypto = async (newCrypto: NewCrypto) => {
  return await db.insert(cryptoSchema).values(newCrypto).returning();
};

export const updateCrypto = async (id: number, updateCrypto: NewCrypto) => {
  return await db
    .update(cryptoSchema)
    .set(updateCrypto)
    .where(eq(cryptoSchema.id, id))
    .returning();
};

export const deleteCrypto = async (id: number) => {
  return await db.delete(cryptoSchema).where(eq(cryptoSchema.id, id));
};
