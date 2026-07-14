import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

describe("sign-in boundary", () => {
	beforeEach(() => {
		vi.resetModules();
	});

	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("reports unavailable when env is missing", async () => {
		vi.stubEnv("VITE_CUSTOMER_APP_URL", "");
		const { resolveSignInTarget } = await import("./signIn");
		expect(resolveSignInTarget()).toEqual({ kind: "unavailable", reason: "missing_env" });
	});

	it("returns ready URL without trailing slash when configured", async () => {
		vi.stubEnv("VITE_CUSTOMER_APP_URL", "https://app.example.com/");
		const { resolveSignInTarget } = await import("./signIn");
		expect(resolveSignInTarget()).toEqual({
			kind: "ready",
			url: "https://app.example.com",
		});
	});

	it("rejects invalid URLs", async () => {
		vi.stubEnv("VITE_CUSTOMER_APP_URL", "not-a-url");
		const { resolveSignInTarget } = await import("./signIn");
		expect(resolveSignInTarget()).toEqual({ kind: "unavailable", reason: "invalid_url" });
	});
});
