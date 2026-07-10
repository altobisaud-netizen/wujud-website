import type { OnboardingDraft } from "./types";

export type HandoffIdempotency = {
	getKey: (draft: OnboardingDraft) => string;
	markFailed: (draft: OnboardingDraft) => void;
	reset: () => void;
};

function createUuid(): string {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
		return crypto.randomUUID();
	}

	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
		const random = Math.floor(Math.random() * 16);
		const value = character === "x" ? random : (random & 0x3) | 0x8;
		return value.toString(16);
	});
}

function materialFingerprint(draft: OnboardingDraft): string {
	return JSON.stringify({
		businessName: draft.businessName.trim(),
		businessDescription: draft.businessDescription.trim(),
		targetCustomers: draft.targetCustomers,
		otherCustomerText: draft.otherCustomerText.trim(),
		channels: draft.channels,
		goals: draft.goals,
	});
}

export function createHandoffIdempotency(): HandoffIdempotency {
	let key = createUuid();
	let failedFingerprint: string | null = null;

	return {
		getKey(draft) {
			if (failedFingerprint !== null && failedFingerprint !== materialFingerprint(draft)) {
				key = createUuid();
				failedFingerprint = null;
			}
			return key;
		},
		markFailed(draft) {
			failedFingerprint = materialFingerprint(draft);
		},
		reset() {
			key = createUuid();
			failedFingerprint = null;
		},
	};
}
