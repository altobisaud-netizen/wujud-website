import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ONBOARDING_STORAGE_KEY, createEmptyDraft, type OnboardingDraft } from "../onboarding/types";
import { hydrateHeroFromDraft, mergeHeroAnswersIntoDraft } from "./heroDraft";

function installMemorySessionStorage() {
	const store = new Map<string, string>();
	const memory = {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => {
			store.set(key, value);
		},
		removeItem: (key: string) => {
			store.delete(key);
		},
		clear: () => store.clear(),
		key: (index: number) => Array.from(store.keys())[index] ?? null,
		get length() {
			return store.size;
		},
	};
	vi.stubGlobal("sessionStorage", memory);
	return memory;
}

function writeDraft(partial: Partial<OnboardingDraft>) {
	const draft: OnboardingDraft = { ...createEmptyDraft(), ...partial };
	sessionStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(draft));
	return draft;
}

describe("interactive homepage hero draft bridge", () => {
	beforeEach(() => {
		installMemorySessionStorage();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("hydrates an empty draft as the initial name step", () => {
		const state = hydrateHeroFromDraft();
		expect(state.step).toBe("name");
		expect(state.businessName).toBe("");
		expect(state.businessDescription).toBe("");
		expect(state.message).toMatch(/business name/i);
	});

	it("hydrates a valid existing draft into the personalized summary state", () => {
		writeDraft({
			businessName: "Harbor Roast",
			businessDescription: "Specialty coffee shop",
			channels: ["whatsapp"],
			targetCustomers: ["Retail customers"],
			goals: ["Qualify leads"],
			step: "goals",
		});
		const state = hydrateHeroFromDraft();
		expect(state.step).toBe("summary");
		expect(state.businessName).toBe("Harbor Roast");
		expect(state.businessDescription).toBe("Specialty coffee shop");
		expect(state.channel).toBe("whatsapp");
		expect(state.message).toContain("Harbor Roast");
	});

	it("recovers safely from a malformed draft", () => {
		sessionStorage.setItem(ONBOARDING_STORAGE_KEY, "{not-json");
		const state = hydrateHeroFromDraft();
		expect(state.step).toBe("name");
		expect(state.businessName).toBe("");
	});

	it("persists business name and description into the existing draft shape", () => {
		const draft = mergeHeroAnswersIntoDraft({
			businessName: "Harbor Roast",
			businessDescription: "Specialty coffee shop",
			channel: "whatsapp",
		});
		expect(draft.version).toBe(1);
		expect(draft.businessName).toBe("Harbor Roast");
		expect(draft.businessDescription).toBe("Specialty coffee shop");
		expect(draft.channels).toContain("whatsapp");
		const raw = sessionStorage.getItem(ONBOARDING_STORAGE_KEY);
		expect(raw).toBeTruthy();
		expect(raw).toContain("Harbor Roast");
	});

	it("preserves unrelated onboarding answers when homepage updates profile fields", () => {
		writeDraft({
			businessName: "Old Name",
			businessDescription: "Old description",
			targetCustomers: ["Small businesses"],
			otherCustomerText: "B2B buyers",
			channels: ["email"],
			goals: ["Book meetings"],
			step: "review",
		});
		const draft = mergeHeroAnswersIntoDraft({
			businessName: "Harbor Roast",
			businessDescription: "Specialty coffee shop",
			channel: "whatsapp",
		});
		expect(draft.targetCustomers).toEqual(["Small businesses"]);
		expect(draft.otherCustomerText).toBe("B2B buyers");
		expect(draft.goals).toEqual(["Book meetings"]);
		expect(draft.channels).toEqual(["email", "whatsapp"]);
		expect(draft.businessName).toBe("Harbor Roast");
	});

	it("does not overwrite existing values with empty homepage input", () => {
		writeDraft({
			businessName: "Harbor Roast",
			businessDescription: "Specialty coffee shop",
			channels: ["whatsapp"],
			step: "customers",
		});
		const draft = mergeHeroAnswersIntoDraft({
			businessName: "   ",
			businessDescription: "",
		});
		expect(draft.businessName).toBe("Harbor Roast");
		expect(draft.businessDescription).toBe("Specialty coffee shop");
	});

	it("does not invent authentication or organization ids", () => {
		const draft = mergeHeroAnswersIntoDraft({
			businessName: "BrightCare Clinic",
			businessDescription: "Family clinic",
		});
		expect(JSON.stringify(draft)).not.toMatch(/organizationId|auth|token|clerk/i);
	});

	it("shows sells step on return visit when only the business name exists", () => {
		writeDraft({
			businessName: "Oasis Homes",
			businessDescription: "",
			step: "description",
		});
		const state = hydrateHeroFromDraft();
		expect(state.step).toBe("sells");
		expect(state.message).toContain("Oasis Homes");
	});
});
