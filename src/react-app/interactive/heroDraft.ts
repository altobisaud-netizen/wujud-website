import { loadDraft, saveDraft } from "../onboarding/storage";
import { createEmptyDraft, type OnboardingDraft } from "../onboarding/types";

export type HeroPreviewStep = "name" | "sells" | "channel" | "summary";

export type HeroPreviewState = {
	businessName: string;
	businessDescription: string;
	channel: string;
	step: HeroPreviewStep;
	message: string;
};

const DEFAULT_CHANNEL = "whatsapp";

function pickChannel(channels: string[]): string {
	const first = channels.find((c) => typeof c === "string" && c.trim());
	return first?.trim() || DEFAULT_CHANNEL;
}

function stepFromProfile(name: string, description: string): HeroPreviewStep {
	if (name && description) return "summary";
	if (name) return "sells";
	return "name";
}

function messageForState(state: Omit<HeroPreviewState, "message">): string {
	if (state.step === "summary") {
		return `Nice — here’s a quick preview for ${state.businessName}.`;
	}
	if (state.step === "sells") {
		return `Thanks, ${state.businessName}. What does your business sell or offer?`;
	}
	if (state.step === "channel") {
		return "Where do your customers usually reach you first?";
	}
	return "Hi — I’m SARA. What is your business name?";
}

/**
 * Safely hydrate the homepage hero from the existing onboarding draft.
 * Never calls APIs. Malformed storage is handled by loadDraft().
 */
export function hydrateHeroFromDraft(): HeroPreviewState {
	const draft = loadDraft();
	const businessName = draft.businessName.trim();
	const businessDescription = draft.businessDescription.trim();
	const channel = pickChannel(draft.channels);
	const step = stepFromProfile(businessName, businessDescription);
	const base = { businessName, businessDescription, channel, step };
	return { ...base, message: messageForState(base) };
}

/** Map homepage preview answers into the existing sessionStorage draft shape. */
export function mergeHeroAnswersIntoDraft(input: {
	businessName: string;
	businessDescription: string;
	channel?: string;
}): OnboardingDraft {
	const existing = loadDraft();
	const nextName = input.businessName.trim();
	const nextDescription = input.businessDescription.trim();

	const next: OnboardingDraft = {
		...createEmptyDraft(),
		...existing,
		// Never overwrite newer onboarding values with empty homepage data.
		businessName: nextName || existing.businessName,
		businessDescription: nextDescription || existing.businessDescription,
	};

	if (input.channel?.trim() && !next.channels.includes(input.channel.trim())) {
		next.channels = [...next.channels, input.channel.trim()];
	}

	if (next.businessName && next.businessDescription) {
		next.step = "customers";
	} else if (next.businessName) {
		next.step = "description";
	} else {
		next.step = "name";
	}

	saveDraft(next);
	return next;
}

export function continueToBuildSara(input: {
	businessName: string;
	businessDescription?: string;
	channel?: string;
}): void {
	mergeHeroAnswersIntoDraft({
		businessName: input.businessName,
		businessDescription: input.businessDescription ?? "",
		channel: input.channel,
	});
	window.location.assign("/build-sara");
}
