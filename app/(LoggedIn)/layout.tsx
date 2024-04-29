"use client";

import { useConvexAuth } from "convex/react";
import { SignIn } from "@clerk/clerk-react";

export default function LoggedInLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isAuthenticated, isLoading } = useConvexAuth();

	if (isLoading) {
		//* This needs to be here otherwise unauthenticated calls will be made through convex query
		return <div className="h-full flex items-center justify-center">Loading...</div>;
	}

	if (!isAuthenticated && !isLoading) {
		return (
			<div className="h-full flex items-center justify-center p-6">
				<SignIn />
			</div>
		);
	}

	return <>{children}</>;
}
