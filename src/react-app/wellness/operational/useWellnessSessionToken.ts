import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";

/** Returns a bearer token for the independent wellness API when Clerk is active. */
export function useWellnessSessionToken() {
	const { getToken, isLoaded, isSignedIn } = useAuth();
	return useCallback(async () => {
		if (!isLoaded || !isSignedIn) return null;
		return getToken();
	}, [getToken, isLoaded, isSignedIn]);
}
