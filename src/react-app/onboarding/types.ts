export const ONBOARDING_STORAGE_KEY = "wujud:sara-onboarding-draft:v1";

export type OnboardingStepId =
	| "name"
	| "description"
	| "customers"
	| "channels"
	| "goals"
	| "review"
	| "complete"
	| "knowledge";

export type OnboardingDraft = {
	version: 1;
	step: OnboardingStepId;
	businessName: string;
	businessDescription: string;
	targetCustomers: string[];
	otherCustomerText: string;
	channels: string[];
	goals: string[];
};

export const QUESTION_STEPS: OnboardingStepId[] = [
	"name",
	"description",
	"customers",
	"channels",
	"goals",
	"review",
];

export function createEmptyDraft(): OnboardingDraft {
	return {
		version: 1,
		step: "name",
		businessName: "",
		businessDescription: "",
		targetCustomers: [],
		otherCustomerText: "",
		channels: [],
		goals: [],
	};
}
