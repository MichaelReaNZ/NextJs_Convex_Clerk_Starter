import { v } from "convex/values";
import { internalQuery, query } from "../_generated/server";
import { getCurrentUser } from "./functions";
import { Doc } from "../_generated/dataModel";

export const currentUserId = query({
	handler: async (ctx) => {
		try {
			const user = await getCurrentUser(ctx.db, ctx.auth);
			return user._id;
		} catch (error) {
			console.log("error from currentUserId:", error);
			return null;
		}
	},
});

export const getUserById = internalQuery({
	args: {
		userId: v.id("users"),
	},
	handler: async (ctx, args) => {
		const user: Doc<"users"> | null = await ctx.db.get(args.userId);
		return user;
	},
});
