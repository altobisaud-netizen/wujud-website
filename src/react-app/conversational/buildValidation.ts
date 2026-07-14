import {
	CHANNEL_OPTIONS,
	GOAL_OPTIONS,
	TARGET_CUSTOMER_OPTIONS,
} from "../onboarding/options";
import type { OnboardingDraft } from "../onboarding/types";
import type { BuildStep } from "./types";

const CUSTOMER_IDS = new Set(TARGET_CUSTOMER_OPTIONS.map((o) => o.id));
const CHANNEL_IDS = new Set(CHANNEL_OPTIONS.map((o) => o.id));
const GOAL_IDS = new Set(GOAL_OPTIONS.map((o) => o.id));

export function validateBusinessName(value: string): boolean {
	return value.trim().length >= 2 && value.trim().length <= 80;
}

export function validateBusinessDescription(value: string): boolean {
	return value.trim().length >= 10 && value.trim().length <= 1200;
}

export function validateCustomers(ids: string[], otherText: string): boolean {
	if (!ids.length || !ids.every((id) => CUSTOMER_IDS.has(id))) return false;
	if (ids.includes("other") && otherText.trim().length < 2) return false;
	return true;
}

export function validateChannels(ids: string[]): boolean {
	return ids.length > 0 && ids.every((id) => CHANNEL_IDS.has(id));
}

export function validateGoals(ids: string[]): boolean {
	return ids.length > 0 && ids.every((id) => GOAL_IDS.has(id));
}

/** Enough profile answers to show account/continue CTA (locked product decision). */
export function hasUsefulBuildProfile(d: OnboardingDraft): boolean {
	return Boolean(
		validateBusinessName(d.businessName) &&
			validateBusinessDescription(d.businessDescription) &&
			validateCustomers(d.targetCustomers, d.otherCustomerText) &&
			validateChannels(d.channels),
	);
}

export function mergeDraftFields(
	current: OnboardingDraft,
	patch: Partial<OnboardingDraft>,
): OnboardingDraft {
	return {
		...current,
		...patch,
		targetCustomers: patch.targetCustomers ?? current.targetCustomers,
		channels: patch.channels ?? current.channels,
		goals: patch.goals ?? current.goals,
	};
}

export function inferBuildStep(d: OnboardingDraft): BuildStep {
	if (hasUsefulBuildProfile(d) && (d.step === "review" || d.goals.length > 0)) {
		if (d.goals.length === 0) return "goals";
		return "summary";
	}
	if (!validateBusinessName(d.businessName)) return "name";
	if (!validateBusinessDescription(d.businessDescription)) return "description";
	if (!validateCustomers(d.targetCustomers, d.otherCustomerText)) return "customers";
	if (!validateChannels(d.channels)) return "channels";
	if (!validateGoals(d.goals)) return "goals";
	return "summary";
}

export const BUILD_SEQUENCE: BuildStep[] = [
	"name",
	"description",
	"customers",
	"channels",
	"goals",
	"summary",
];
