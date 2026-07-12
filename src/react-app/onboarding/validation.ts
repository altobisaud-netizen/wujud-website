import type { OnboardingDraft, OnboardingStepId } from "./types";

export type FieldError = string | null;

export function validateBusinessName(value: string): FieldError {
	const trimmed = value.trim();
	if (trimmed.length < 2) return "Enter at least 2 characters.";
	if (trimmed.length > 100) return "Keep this under 100 characters.";
	return null;
}

export function validateBusinessDescription(value: string): FieldError {
	const trimmed = value.trim();
	if (trimmed.length < 10) return "Add a bit more detail (at least 10 characters).";
	if (trimmed.length > 600) return "Keep this under 600 characters.";
	return null;
}

export function validateCustomers(draft: OnboardingDraft): FieldError {
	if (draft.targetCustomers.length === 0) return "Select at least one customer type.";
	if (draft.targetCustomers.includes("other") && draft.otherCustomerText.trim().length < 2) {
		return "Please describe your other customer type.";
	}
	return null;
}

export function validateChannels(draft: OnboardingDraft): FieldError {
	if (draft.channels.length === 0) return "Select at least one channel.";
	return null;
}

export function validateGoals(draft: OnboardingDraft): FieldError {
	if (draft.goals.length === 0) return "Select at least one goal.";
	return null;
}

export function validateStep(step: OnboardingStepId, draft: OnboardingDraft): FieldError {
	switch (step) {
		case "name":
			return validateBusinessName(draft.businessName);
		case "description":
			return validateBusinessDescription(draft.businessDescription);
		case "customers":
			return validateCustomers(draft);
		case "channels":
			return validateChannels(draft);
		case "goals":
			return validateGoals(draft);
		default:
			return null;
	}
}
