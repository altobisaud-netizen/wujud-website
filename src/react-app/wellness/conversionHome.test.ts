import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { heroVisual, outcomeVisuals } from "./lifestyleImagery";
import { copy } from "./locale";

const ROOT = path.resolve("src/react-app/wellness");

describe("conversion homepage claims and imagery", () => {
	it("keeps truthful waitlist and no-save messaging", () => {
		expect(copy.en.chatDemoLabel).toContain("Nothing from this demo is saved");
		expect(copy.ar.chatDemoLabel).toContain("لن يتم حفظ");
		expect(copy.en.saveTitle).toContain("Create your account");
		expect(copy.ar.saveTitle).toContain("أنشئ حسابك");
		expect(copy.en.pricingWaitlist.pricingNote).toContain("early-access phase");
		expect(copy.ar.pricingWaitlist.pricingNote).toContain("الوصول المبكر");
	});

	it("includes inclusive men and women imagery descriptors", () => {
		const all = [heroVisual, ...outcomeVisuals];
		expect(all.some((item) => /woman|hijab/i.test(item.alt.en) && item.hijab)).toBe(true);
		expect(all.some((item) => /woman/i.test(item.alt.en) && item.hijab !== true)).toBe(true);
		expect(all.some((item) => /man/i.test(item.alt.en))).toBe(true);
	});

	it("does not wire Meta, WhatsApp SDK, Clerk, or live AI into wellness root sources", () => {
		const files = fs
			.readdirSync(ROOT)
			.filter(
				(name) =>
					/\.(ts|tsx)$/.test(name) &&
					!name.endsWith(".test.ts") &&
					name !== "SiteHeader.tsx",
			);
		for (const name of files) {
			const source = fs.readFileSync(path.join(ROOT, name), "utf8");
			expect(source).not.toMatch(/@clerk|openai|anthropic|whatsapp-web|meta-sdk/i);
		}
	});
});
