"use client";

import { api } from "../../convex/_generated/api";
import { useConvexAuth, useMutation, useQuery } from "convex/react";

export default function StoreUser() {
	const { isAuthenticated } = useConvexAuth();
	const storeUser = useMutation(api.Users.mutation.storeUser);
	const storedUserId = useQuery(api.Users.query.currentUserId);

	async function createUser() {
		const id = await storeUser();
	}

	if (isAuthenticated) {
		if (storedUserId === null) {
			console.log("user does not exist create it.");
			createUser();
		} else {
			console.log("user already exists");
		}
	}

	return <></>;
}
