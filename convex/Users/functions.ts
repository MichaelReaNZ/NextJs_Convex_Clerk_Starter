import { Auth, GenericDatabaseReader } from "convex/server";
import { DataModel, Id } from "../_generated/dataModel";
import { ConvexError } from "convex/values";

export async function getUserId(ctx: {
  db: GenericDatabaseReader<DataModel>;
  auth: Auth;
}): Promise<Id<"users">> {
  const authInfo = await ctx.auth.getUserIdentity();
  if (!authInfo) {
    throw new ConvexError("User must be logged in. :)");
  }
  // return authInfo.tokenIdentifier;
  const user = await getUserByToken(ctx.db, authInfo.tokenIdentifier);
  if (!user) {
    throw new ConvexError("User not found");
  }
  return user._id;
}

export const getCurrentUser = async (
  db: GenericDatabaseReader<DataModel>,
  auth: Auth
) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error(
      "Unauthenticated call to get current user. This should never happen."
    );
  }
  const user = await getUserByToken(db, identity.tokenIdentifier);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const getUserByToken = async (
  db: GenericDatabaseReader<DataModel>,
  tokenIdentifier: string
) => {
  const user = await db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
    .unique();

  return user;
};

export const getUserById = async (
  db: GenericDatabaseReader<DataModel>,
  id: Id<"users">
) => {
  const user = await db.get(id);

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const checkAuthenticated = async (auth: Auth) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("User is not authenticated.");
  }
};
