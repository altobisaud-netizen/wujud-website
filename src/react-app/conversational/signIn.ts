/**
 * Sign-in boundary — marketing site never embeds Clerk.
 * Uses VITE_CUSTOMER_APP_URL when configured.
 */

export type SignInTarget =
	| { kind: "ready"; url: string }
	| { kind: "unavailable"; reason: "missing_env" | "invalid_url" };

function readCustomerAppUrl(): string {
	const raw = import.meta.env.VITE_CUSTOMER_APP_URL;
	return typeof raw === "string" ? raw.trim() : "";
}

export function resolveSignInTarget(): SignInTarget {
	const value = readCustomerAppUrl();
	if (!value) return { kind: "unavailable", reason: "missing_env" };
	try {
		const url = new URL(value);
		if (url.protocol !== "https:" && url.protocol !== "http:") {
			return { kind: "unavailable", reason: "invalid_url" };
		}
		return { kind: "ready", url: url.toString().replace(/\/+$/, "") };
	} catch {
		return { kind: "unavailable", reason: "invalid_url" };
	}
}

export function openSignIn(): SignInTarget {
	const target = resolveSignInTarget();
	if (target.kind === "ready" && typeof window !== "undefined") {
		window.location.assign(target.url);
	}
	return target;
}
