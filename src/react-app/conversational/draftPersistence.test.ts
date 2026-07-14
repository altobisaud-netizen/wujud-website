import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createEmptyDraft, ONBOARDING_STORAGE_KEY } from "../onboarding/types";
import { clearDraft, loadDraft, saveDraft } from "../onboarding/storage";
import { mergeDraftFields } from "./buildValidation";

function installMemorySessionStorage() {
	const store = new Map<string, string>();
	vi.stubGlobal("sessionStorage", {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => {
			store.set(key, value);
		},
		removeItem: (key: string) => {
			store.delete(key);
		},
	});
}

describe("onboarding draft persistence", () => {
	beforeEach(() => {
		installMemorySessionStorage();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("hydrates draft after save and preserves unrelated fields", () => {
		const draft = mergeDraftFields(createEmptyDraft(), {
			businessName: "Harbor Roast",
			businessDescription: "Neighbourhood coffee shop helping guests order drinks.",
			targetCustomers: ["individuals"],
			channels: ["whatsapp"],
			goals: ["answer"],
			otherCustomerText: "tourists",
			step: "review",
		});
		saveDraft(draft);
		expect(sessionStorage.getItem(ONBOARDING_STORAGE_KEY)).toContain("Harbor Roast");
		const loaded = loadDraft();
		expect(loaded.businessName).toBe("Harbor Roast");
		expect(loaded.otherCustomerText).toBe("tourists");
		expect(loaded.channels).toEqual(["whatsapp"]);
		clearDraft();
		expect(loadDraft().businessName).toBe("");
	});
});
