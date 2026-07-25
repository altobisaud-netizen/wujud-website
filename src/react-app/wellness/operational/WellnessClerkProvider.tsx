import { ClerkProvider } from "@clerk/clerk-react";
import type { ReactNode } from "react";
import { readOperationalFlags } from "./flags";

const publishableKey = import.meta.env.VITE_WELLNESS_CLERK_PUBLISHABLE_KEY ?? "";

/**
 * Isolated Clerk provider for the WUJUD Wellness application only.
 * When the key is absent, children render without auth UI (safe unavailable state).
 */
export function WellnessClerkProvider({ children }: { children: ReactNode }) {
	const flags = readOperationalFlags();
	if (!flags.authEnabled || !publishableKey) {
		return children;
	}
	return (
		<ClerkProvider
			publishableKey={publishableKey}
			afterSignOutUrl="/"
			signInFallbackRedirectUrl="/account/privacy"
			signUpFallbackRedirectUrl="/account/privacy"
		>
			{children}
		</ClerkProvider>
	);
}
