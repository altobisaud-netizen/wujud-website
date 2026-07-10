import type { OnboardingDraft } from "./types";

/** Canonical Sara API draft body (camelCase). */
export type SaraOnboardingDraftPayload = {
	schemaVersion: 1;
	businessName: string;
	businessDescription: string;
	targetCustomers: string[];
	targetCustomerOther: string | null;
	desiredChannels: string[];
	goals: string[];
};

const CUSTOMER_MAP: Record<string, string> = {
	individuals: "INDIVIDUALS",
	"small-businesses": "SMALL_BUSINESSES",
	"large-companies": "LARGE_COMPANIES",
	government: "GOVERNMENT_ENTITIES",
	schools: "SCHOOLS_UNIVERSITIES",
	contractors: "CONTRACTORS_CONSULTANTS",
	retail: "RETAIL_CUSTOMERS",
	other: "OTHER",
};

const CHANNEL_MAP: Record<string, string> = {
	whatsapp: "WHATSAPP",
	instagram: "INSTAGRAM",
	"website-chat": "WEBSITE_CHAT",
	"facebook-messenger": "FACEBOOK_MESSENGER",
	email: "EMAIL",
};

const GOAL_MAP: Record<string, string> = {
	leads: "GENERATE_LEADS",
	qualify: "QUALIFY_CUSTOMERS",
	answer: "ANSWER_QUESTIONS",
	recommend: "RECOMMEND_PRODUCTS",
	book: "BOOK_MEETINGS",
	"follow-up": "FOLLOW_UP",
	quotation: "PREPARE_QUOTATION_REQUESTS",
	support: "IMPROVE_CUSTOMER_SUPPORT",
};

function mapValues(values: string[], mapping: Record<string, string>): string[] {
	return values.map((value) => mapping[value]).filter((value): value is string => Boolean(value));
}

export function mapDraftToSaraPayload(draft: OnboardingDraft): SaraOnboardingDraftPayload {
	const otherCustomerText = draft.otherCustomerText.trim();
	const targetCustomers = mapValues(draft.targetCustomers, CUSTOMER_MAP);

	return {
		schemaVersion: 1,
		businessName: draft.businessName.trim(),
		businessDescription: draft.businessDescription.trim(),
		targetCustomers,
		targetCustomerOther:
			targetCustomers.includes("OTHER") && otherCustomerText ? otherCustomerText : null,
		desiredChannels: mapValues(draft.channels, CHANNEL_MAP),
		goals: mapValues(draft.goals, GOAL_MAP),
	};
}
