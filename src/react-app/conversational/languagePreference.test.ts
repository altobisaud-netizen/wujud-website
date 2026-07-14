import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadPreferredLocale, savePreferredLocale } from "./languagePreference";

describe("language preference", () => {
	beforeEach(() => {
		const store = new Map<string, string>();
		vi.stubGlobal("localStorage", {
			getItem: (key: string) => store.get(key) ?? null,
			setItem: (key: string, value: string) => {
				store.set(key, value);
			},
			removeItem: (key: string) => {
				store.delete(key);
			},
		});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("persists locale without conversation content", () => {
		expect(loadPreferredLocale("en")).toBe("en");
		savePreferredLocale("ar");
		expect(loadPreferredLocale("en")).toBe("ar");
		expect(localStorage.getItem("wujud:preferred-locale:v1")).toBe("ar");
	});
});
