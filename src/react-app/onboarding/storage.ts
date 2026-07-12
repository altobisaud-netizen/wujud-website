import { createEmptyDraft, ONBOARDING_STORAGE_KEY, type OnboardingDraft, type OnboardingStepId } from "./types";

const VALID_STEPS = new Set<OnboardingStepId>([
	"name",
	"description",
	"customers",
	"channels",
	"goals",
	"review",
	"complete",
	"knowledge",
]);

function isDraft(value: unknown): value is OnboardingDraft {
	if (!value || typeof value !== "object") return false;
	const v = value as Record<string, unknown>;
	return (
		v.version === 1 &&
		typeof v.step === "string" &&
		VALID_STEPS.has(v.step as OnboardingStepId) &&
		typeof v.businessName === "string" &&
		typeof v.businessDescription === "string" &&
		Array.isArray(v.targetCustomers) &&
		typeof v.otherCustomerText === "string" &&
		Array.isArray(v.channels) &&
		Array.isArray(v.goals)
	);
}

export function loadDraft(): OnboardingDraft {
	try {
		const raw = sessionStorage.getItem(ONBOARDING_STORAGE_KEY);
		if (!raw) return createEmptyDraft();
		const parsed: unknown = JSON.parse(raw);
		if (!isDraft(parsed)) return createEmptyDraft();
		return {
			...createEmptyDraft(),
			...parsed,
			targetCustomers: parsed.targetCustomers.filter((x): x is string => typeof x === "string"),
			channels: parsed.channels.filter((x): x is string => typeof x === "string"),
			goals: parsed.goals.filter((x): x is string => typeof x === "string"),
		};
	} catch {
		return createEmptyDraft();
	}
}

export function saveDraft(draft: OnboardingDraft): void {
	try {
		sessionStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(draft));
	} catch {
		/* ignore quota / private mode */
	}
}

export function clearDraft(): void {
	try {
		sessionStorage.removeItem(ONBOARDING_STORAGE_KEY);
	} catch {
		/* ignore */
	}
}
