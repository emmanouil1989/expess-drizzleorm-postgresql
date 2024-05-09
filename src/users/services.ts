import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { users as userSchema, NewUser, User } from "../db/index";

export const getUsers = async () => {
  return await db
    .select({
      id: userSchema.id,
      userName: userSchema.username,
      email: userSchema.email,
    })
    .from(userSchema);
};

export const getUserByEmail = async (email: string) => {
  return await db.select().from(userSchema).where(eq(userSchema.email, email));
};

export const getUserBySessionToken = async (sessionToken: string) => {
  return await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.sessionToken, sessionToken));
};

export const getUserById = async (userId: number) => {
  return await db
    .select({
      id: userSchema.id,
      userName: userSchema.username,
      email: userSchema.email,
    })
    .from(userSchema)
    .where(eq(userSchema.id, userId));
};
export const createUser = async (user: NewUser) => {
  return await db
    .insert(userSchema)
    .values({ ...user })
    .returning({
      id: userSchema.id,
      email: userSchema.email,
      userName: userSchema.username,
    });
};

export const updateByUserId = async (id: number, updateUser: User) => {
  return await db
    .update(userSchema)
    .set({ ...updateUser })
    .where(eq(userSchema.id, id))
    .returning({
      id: userSchema.id,
      email: userSchema.email,
      userName: userSchema.username,
    });
};
