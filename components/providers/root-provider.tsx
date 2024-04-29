"use client";

import StoreUser from "./StoreUser";
import { ConvexClientProvider } from "./convex-provider";

export interface ProvidersProps {
	children: React.ReactNode;
}
export default function RootProvider({ children }: ProvidersProps) {
	return (
		<ConvexClientProvider>
			{/* StoreUser creates a user in convex if one doesn't exist */}
			<StoreUser />
			{children}
		</ConvexClientProvider>
	);
}
