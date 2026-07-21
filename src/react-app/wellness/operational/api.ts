import { readOperationalFlags } from "./flags";

export type BackendFlags = {
	waitlistEnabled: boolean;
	authEnabled: boolean;
	profileStorageEnabled: boolean;
	paymentsEnabled: boolean;
	entitlementsEnabled: boolean;
};

export type PublicPlan = {
	code: string;
	nameEn: string;
	nameAr: string;
	descriptionEn: string;
	descriptionAr: string;
	billingType: "ONE_TIME";
	currency: "OMR";
	priceBaisa: number | null;
	status: "DRAFT" | "APPROVED" | "ACTIVE" | "RETIRED";
	version: number;
	paymentCtaEnabled: boolean;
};

export type ConsentPolicyPublic = {
	id: string;
	type: string;
	version: string;
	locale: string;
	title: string;
	summaryText: string;
	documentHash: string;
};

type ApiResult<T> =
	| { ok: true; data: T; requestId: string }
	| { ok: false; status: number; code: string; message: string; requestId?: string };

function newRequestId(): string {
	try {
		return crypto.randomUUID();
	} catch {
		return `req_${Date.now()}`;
	}
}

async function apiFetch<T>(
	path: string,
	init: RequestInit & { idempotencyKey?: string } = {},
): Promise<ApiResult<T>> {
	const { apiBaseUrl } = readOperationalFlags();
	if (!apiBaseUrl) {
		return { ok: false, status: 0, code: "API_UNAVAILABLE", message: "Wellness API base URL is not configured" };
	}
	const requestId = newRequestId();
	const headers = new Headers(init.headers);
	headers.set("Accept", "application/json");
	headers.set("X-Request-Id", requestId);
	if (init.body && !headers.has("Content-Type")) {
		headers.set("Content-Type", "application/json");
	}
	if (init.idempotencyKey) {
		headers.set("Idempotency-Key", init.idempotencyKey);
	}
	try {
		const res = await fetch(`${apiBaseUrl}${path}`, { ...init, headers });
		const json = (await res.json().catch(() => ({}))) as {
			success?: boolean;
			requestId?: string;
			data?: T;
			error?: { code?: string; message?: string };
		};
		if (!res.ok || json.success === false) {
			return {
				ok: false,
				status: res.status,
				code: json.error?.code ?? "REQUEST_FAILED",
				message: json.error?.message ?? "Request failed",
				requestId: json.requestId ?? requestId,
			};
		}
		return { ok: true, data: json.data as T, requestId: json.requestId ?? requestId };
	} catch {
		return { ok: false, status: 0, code: "NETWORK_ERROR", message: "Unable to reach wellness API" };
	}
}

export async function fetchBackendFlags(): Promise<ApiResult<BackendFlags>> {
	return apiFetch<BackendFlags>("/api/v1/flags");
}

export async function fetchActivePlans(): Promise<ApiResult<{ plans: PublicPlan[] }>> {
	return apiFetch<{ plans: PublicPlan[] }>("/api/v1/plans");
}

export async function fetchConsentPolicies(locale: "ar" | "en"): Promise<ApiResult<{ policies: ConsentPolicyPublic[] }>> {
	return apiFetch<{ policies: ConsentPolicyPublic[] }>(`/api/v1/consent/policies?locale=${locale}`);
}

export async function joinWaitlist(input: {
	email: string;
	preferredLanguage: "ar" | "en";
	firstName?: string;
	consentPolicyVersion: string;
}): Promise<ApiResult<{ message: string }>> {
	return apiFetch<{ message: string }>("/api/v1/waitlist", {
		method: "POST",
		idempotencyKey: `waitlist:${input.email.trim().toLowerCase()}`,
		body: JSON.stringify({
			email: input.email,
			preferredLanguage: input.preferredLanguage,
			firstName: input.firstName || undefined,
			launchNotificationConsent: true,
			consentPolicyVersion: input.consentPolicyVersion,
		}),
	});
}

export async function createCheckoutSession(
	token: string,
	planCode: "EIGHT_WEEK_JOURNEY",
): Promise<ApiResult<{ id: string; status: string; redirectUrl: string | null; amountBaisa: number; currency: string }>> {
	return apiFetch("/api/v1/checkout/sessions", {
		method: "POST",
		idempotencyKey: `checkout:${planCode}:${Date.now()}`,
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify({ planCode }),
	});
}

export async function saveProfileDraft(
	token: string,
	body: {
		structured: {
			primaryGoal: string;
			routineChallenge: string;
			preferredSupportTiming: string;
			preferredCoachingStyle: string;
			language: "ar" | "en";
			timezone?: string;
		};
		acceptedPolicyIds: string[];
	},
): Promise<
	ApiResult<{
		id: string;
		status: string;
		version: number;
		structured: Record<string, unknown>;
	}>
> {
	return apiFetch("/api/v1/me/profile-draft", {
		method: "PUT",
		headers: { Authorization: `Bearer ${token}` },
		idempotencyKey: `draft:${body.structured.primaryGoal}:${Date.now()}`,
		body: JSON.stringify(body),
	});
}

/** @deprecated use saveProfileDraft */
export const createProfileDraft = saveProfileDraft;

export async function confirmProfileDraft(
	token: string,
	version: number,
	opts?: { structured?: Record<string, unknown> },
): Promise<ApiResult<{ id: string; status: string; confirmedAt?: string }>> {
	return apiFetch(`/api/v1/me/profile-draft/confirm`, {
		method: "POST",
		headers: { Authorization: `Bearer ${token}` },
		idempotencyKey: `confirm:${version}`,
		body: JSON.stringify({ version, structured: opts?.structured }),
	});
}

export type UserConsentView = {
	policyType?: string;
	version?: string;
	decision: string;
	acceptedAt?: string | null;
	withdrawnAt?: string | null;
};

export async function fetchMyConsents(token: string): Promise<ApiResult<{ consents: UserConsentView[] }>> {
	return apiFetch("/api/v1/me/consents", {
		headers: { Authorization: `Bearer ${token}` },
	});
}

export async function withdrawConsent(
	token: string,
	policyType: string,
): Promise<ApiResult<{ ok: boolean }>> {
	return apiFetch(`/api/v1/me/consents/${encodeURIComponent(policyType)}/withdraw`, {
		method: "POST",
		headers: { Authorization: `Bearer ${token}` },
	});
}

export async function fetchMyProfileDraft(
	token: string,
): Promise<
	ApiResult<{ id: string; status: string; version: number; structured: Record<string, unknown> }>
> {
	return apiFetch("/api/v1/me/profile-draft", {
		headers: { Authorization: `Bearer ${token}` },
	});
}

export async function pauseAccount(token: string): Promise<ApiResult<{ ok: boolean }>> {
	return apiFetch("/api/v1/me/pause", {
		method: "POST",
		headers: { Authorization: `Bearer ${token}` },
	});
}

export async function requestAccountDeletion(token: string): Promise<ApiResult<{ id: string; status: string }>> {
	return apiFetch("/api/v1/me/deletion-request", {
		method: "POST",
		headers: { Authorization: `Bearer ${token}` },
	});
}

function authFetch<T>(path: string, token: string, init: RequestInit = {}) {
	return apiFetch<T>(path, {
		...init,
		headers: { ...(init.headers ?? {}), Authorization: `Bearer ${token}` },
	});
}

export { authFetch };
