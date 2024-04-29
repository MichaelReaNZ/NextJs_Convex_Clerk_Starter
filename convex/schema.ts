import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { Table } from "convex-helpers/server";

export const Users = Table("users", {
	name: v.string(),
	tokenIdentifier: v.string(),
});

export default defineSchema({
	users: Users.table.index("by_token", ["tokenIdentifier"]), //*Created in storeUser //TODO: look into another way to do this, via Clerk Webhook
});
