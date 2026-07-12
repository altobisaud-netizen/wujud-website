import { afterEach, describe, expect, it, vi } from "vitest";
import { createHandoffIdempotency } from "./handoffIdempotency";
import { mapDraftToSaraPayload } from "./handoffMapping";
import { buildCustomerAppHandoffUrl, createSaraApiClient } from "./saraApiClient";
import type { OnboardingDraft } from "./types";

const draft: OnboardingDraft = {
	version: 1,
	step: "review",
	businessName: "Atlas Coffee",
	businessDescription: "Specialty coffee for busy city teams.",
	targetCustomers: ["small-businesses", "other"],
	otherCustomerText: "Independent cafés",
	channels: ["whatsapp", "website-chat"],
	goals: ["leads", "quotation"],
};

afterEach(() => {
	vi.restoreAllMocks();
});

describe("SARA handoff mapping", () => {
	it("maps website IDs to Sara API enums", () => {
		expect(mapDraftToSaraPayload(draft)).toEqual({
			schemaVersion: 1,
			businessName: "Atlas Coffee",
			businessDescription: "Specialty coffee for busy city teams.",
			targetCustomers: ["SMALL_BUSINESSES", "OTHER"],
			targetCustomerOther: "Independent cafés",
			desiredChannels: ["WHATSAPP", "WEBSITE_CHAT"],
			goals: ["GENERATE_LEADS", "PREPARE_QUOTATION_REQUESTS"],
		});
	});

	it("reuses a retry key and rotates it after a failed material edit", () => {
		const idempotency = createHandoffIdempotency();
		const firstKey = idempotency.getKey(draft);
		idempotency.markFailed(draft);

		expect(idempotency.getKey(draft)).toBe(firstKey);
		expect(idempotency.getKey({ ...draft, businessName: "Atlas Roastery" })).not.toBe(firstKey);
	});
});

describe("Sara API client", () => {
	it("posts a draft with the idempotency header", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ success: true, handoffCode: "opaque-code", expiresAt: "2027-01-01T00:00:00.000Z" }), {
				status: 201,
			}),
		);
		vi.stubGlobal("fetch", fetchMock);

		const result = await createSaraApiClient("https://api.example.com/").createOnboardingDraft({
			payload: mapDraftToSaraPayload(draft),
			idempotencyKey: "request-key",
		});

		expect(result).toEqual({ handoffCode: "opaque-code" });
		expect(fetchMock).toHaveBeenCalledWith(
			"https://api.example.com/api/v1/onboarding/drafts",
			expect.objectContaining({
				headers: expect.objectContaining({ "Idempotency-Key": "request-key" }),
			}),
		);
	});

	it("returns a safe typed rate-limit error", async () => {
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 429 })));

		await expect(
			createSaraApiClient("https://api.example.com").createOnboardingDraft({
				payload: mapDraftToSaraPayload(draft),
				idempotencyKey: "request-key",
			}),
		).rejects.toMatchObject({ kind: "rate_limit" });
	});
});

describe("customer-app redirect", () => {
	it("puts only the opaque handoff code in the fragment", () => {
		const redirectUrl = buildCustomerAppHandoffUrl("https://app.example.com", "opaque-code");

		expect(redirectUrl).toBe("https://app.example.com/continue#handoff=opaque-code");
		expect(redirectUrl).not.toContain(draft.businessName);
	});
});
