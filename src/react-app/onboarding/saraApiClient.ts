import type { SaraOnboardingDraftPayload } from "./handoffMapping";

const REQUEST_TIMEOUT_MS = 20_000;

export type SaraApiErrorKind = "validation" | "conflict" | "rate_limit" | "unavailable" | "network";

export class SaraApiError extends Error {
	readonly kind: SaraApiErrorKind;

	constructor(kind: SaraApiErrorKind) {
		super(kind);
		this.name = "SaraApiError";
		this.kind = kind;
	}
}

export type CreateOnboardingDraftArgs = {
	payload: SaraOnboardingDraftPayload;
	idempotencyKey: string;
	signal?: AbortSignal;
};

export type CreateOnboardingDraftResult = {
	handoffCode: string;
};

type DraftResponse = {
	success?: unknown;
	handoffCode?: unknown;
	handoff_code?: unknown;
	draft?: { handoffCode?: unknown };
	expiresAt?: unknown;
};

function normalizedBaseUrl(baseUrl: string): string {
	return baseUrl.replace(/\/+$/, "");
}

function errorKindForStatus(status: number): SaraApiErrorKind {
	if (status === 400 || status === 422) return "validation";
	if (status === 409) return "conflict";
	if (status === 429) return "rate_limit";
	return "unavailable";
}

export function createSaraApiClient(baseUrl = import.meta.env.VITE_SARA_API_BASE_URL ?? "") {
	async function createOnboardingDraft({
		payload,
		idempotencyKey,
		signal,
	}: CreateOnboardingDraftArgs): Promise<CreateOnboardingDraftResult> {
		if (!baseUrl) throw new SaraApiError("unavailable");

		const controller = new AbortController();
		const timeout = globalThis.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
		const abortFromCaller = () => controller.abort();
		signal?.addEventListener("abort", abortFromCaller, { once: true });

		try {
			const response = await fetch(`${normalizedBaseUrl(baseUrl)}/api/v1/onboarding/drafts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Idempotency-Key": idempotencyKey,
				},
				body: JSON.stringify(payload),
				signal: controller.signal,
			});

			if (!response.ok) throw new SaraApiError(errorKindForStatus(response.status));

			const body: DraftResponse = await response.json();
			const handoffCode =
				typeof body.handoffCode === "string"
					? body.handoffCode
					: typeof body.handoff_code === "string"
						? body.handoff_code
						: typeof body.draft?.handoffCode === "string"
							? body.draft.handoffCode
							: null;
			if (!handoffCode) throw new SaraApiError("unavailable");

			return { handoffCode };
		} catch (error) {
			if (error instanceof SaraApiError) throw error;
			if (error instanceof DOMException && error.name === "AbortError") {
				throw new SaraApiError(signal?.aborted ? "network" : "unavailable");
			}
			throw new SaraApiError("network");
		} finally {
			globalThis.clearTimeout(timeout);
			signal?.removeEventListener("abort", abortFromCaller);
		}
	}

	return { createOnboardingDraft };
}

export const saraApiClient = createSaraApiClient();

export function createOnboardingDraft(args: CreateOnboardingDraftArgs): Promise<CreateOnboardingDraftResult> {
	return saraApiClient.createOnboardingDraft(args);
}

export function buildCustomerAppHandoffUrl(customerAppUrl: string, handoffCode: string): string {
	const customerUrl = new URL(customerAppUrl);
	customerUrl.pathname = `${customerUrl.pathname.replace(/\/$/, "")}/continue`;
	customerUrl.search = "";
	customerUrl.hash = `handoff=${encodeURIComponent(handoffCode)}`;
	return customerUrl.toString();
}
