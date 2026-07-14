/**
 * Integration boundary for continuing after conversational Build summary.
 * Today: local draft is already persisted; navigate to /build-sara.
 * Later: replace `continueAfterBuildSummary` with secure-handoff client
 * without rebuilding conversation UI.
 */

export type ContinueAfterBuildResult =
	| { kind: "local_route"; path: "/build-sara" }
	| { kind: "handoff_redirect"; url: string }
	| { kind: "unavailable"; reason: string };

export type ContinueAfterBuildOptions = {
	/**
	 * Future hook — when true and handoff client is wired, use secure handoff.
	 * Kept false in this cycle (no live API).
	 */
	preferSecureHandoff?: boolean;
};

export function continueAfterBuildSummary(
	options: ContinueAfterBuildOptions = {},
): ContinueAfterBuildResult {
	// Secure handoff is intentionally not invoked on the marketing site yet.
	void options.preferSecureHandoff;
	return { kind: "local_route", path: "/build-sara" };
}

export function executeContinueAfterBuild(result: ContinueAfterBuildResult): void {
	if (typeof window === "undefined") return;
	if (result.kind === "local_route") {
		window.location.assign(result.path);
		return;
	}
	if (result.kind === "handoff_redirect") {
		window.location.assign(result.url);
	}
}
