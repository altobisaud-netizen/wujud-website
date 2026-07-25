import { describe, expect, it } from "vitest";
import { formatOmrFromBaisa, readOperationalFlags } from "./flags";

describe("WhatsApp production gating", () => {
	it("shows exact English coming-soon copy when WhatsApp flags are off", async () => {
		const { WELLNESS_WHATSAPP_COMING_SOON_COPY } = await import("./WhatsAppOptInSection");
		expect(WELLNESS_WHATSAPP_COMING_SOON_COPY.en).toBe(
			"WhatsApp reminders are coming soon. You can use the complete Wellness SARA experience securely through your account.",
		);
	});

	it("shows exact Arabic coming-soon copy when WhatsApp flags are off", async () => {
		const { WELLNESS_WHATSAPP_COMING_SOON_COPY } = await import("./WhatsAppOptInSection");
		expect(WELLNESS_WHATSAPP_COMING_SOON_COPY.ar).toBe(
			"تذكيرات واتساب ستكون متاحة قريباً. يمكنك استخدام تجربة Wellness SARA الكاملة بأمان من خلال حسابك.",
		);
	});

	it("hides phone entry and send controls unless both WhatsApp flags are enabled", async () => {
		const fs = await import("node:fs");
		const path = await import("node:path");
		const source = fs.readFileSync(path.join(import.meta.dirname, "WhatsAppOptInSection.tsx"), "utf8");
		expect(source).toMatch(/whatsAppOperationalUiEnabled/);
		expect(source).toMatch(/ops-whatsapp-inactive/);
		expect(source).not.toMatch(/if \(!flags\.whatsappEnabled\) return null/);
		expect(source).toMatch(/wellness-whatsapp-phone/);
		expect(source).toMatch(/if \(!operationalUiEnabled\)/);
	});

	it("does not fetch WhatsApp status when production flags are off", async () => {
		const fs = await import("node:fs");
		const path = await import("node:path");
		const source = fs.readFileSync(path.join(import.meta.dirname, "WhatsAppOptInSection.tsx"), "utf8");
		expect(source).toMatch(/if \(!operationalUiEnabled \|\| !flags\.apiBaseUrl\)/);
		expect(source).toMatch(/fetchWhatsAppStatus/);
	});

	it("preserves staging-enabled opt-in implementation behind operational flags", async () => {
		const fs = await import("node:fs");
		const path = await import("node:path");
		const source = fs.readFileSync(path.join(import.meta.dirname, "WhatsAppOptInSection.tsx"), "utf8");
		expect(source).toMatch(/registerWhatsAppOptIn/);
		expect(source).toMatch(/confirmWhatsAppFirstMessage/);
		expect(source).toMatch(/optOutWhatsApp/);
	});
});

describe("operational presentation flags", () => {
	it("defaults operational flags off without Vite env", () => {
		const flags = readOperationalFlags();
		expect(flags.waitlistEnabled).toBe(false);
		expect(flags.authEnabled).toBe(false);
		expect(flags.paymentsEnabled).toBe(false);
		expect(flags.whatsappEnabled).toBe(false);
	});

	it("uses production canonical origin default for metadata", async () => {
		const flags = readOperationalFlags();
		expect(flags.canonicalOrigin).toBe("https://wujud.ai");
	});

	it("does not place phone numbers in API paths", async () => {
		const { registerWhatsAppOptIn } = await import("./api");
		const source = registerWhatsAppOptIn.toString();
		expect(source).not.toMatch(/phone=|query\(/);
	});

	it("formats OMR from server baisa only", () => {
		expect(formatOmrFromBaisa(15000, "en")).toBe("OMR 15");
		expect(formatOmrFromBaisa(15500, "ar")).toContain("ر.ع.");
	});
});

describe("operational UI copy gates", () => {
	it("exposes Save my journey and waitlist CTAs separately", async () => {
		const { copy } = await import("../locale");
		expect(copy.en.saveJourneyCta).toBe("Save my journey");
		expect(copy.ar.saveJourneyCta).toBe("احفظ رحلتك");
		expect(copy.en.waitlistCta).toBe("Notify me at launch");
		expect(copy.ar.waitlistCta).toBe("أبلغني عند الإطلاق");
		expect(copy.en.paymentCta).toBe("Start my eight-week journey");
		expect(copy.ar.paymentCta).toBe("ابدأ رحلتي لمدة 8 أسابيع");
	});

	it("does not hardcode a commercial OMR price in locale", async () => {
		const { copy } = await import("../locale");
		const blob = JSON.stringify(copy);
		expect(blob).not.toMatch(/\bOMR\s*\d/);
		expect(blob).not.toMatch(/\d+\s*ر\.ع/);
		expect(copy.en.sections.pricingNote).toBe("Price under review");
		expect(copy.ar.sections.pricingNote).toBe("السعر قيد المراجعة");
	});
});

describe("product isolation for operational client", () => {
	it("does not import business-product packages or messaging SDKs", async () => {
		const fs = await import("node:fs");
		const path = await import("node:path");
		const root = path.resolve(import.meta.dirname);
		const files = fs
			.readdirSync(root)
			.filter((f) => (f.endsWith(".ts") || f.endsWith(".tsx")) && !f.endsWith(".test.ts"))
			.map((f) => fs.readFileSync(path.join(root, f), "utf8"))
			.join("\n");
		expect(files).not.toMatch(/from\s+['"][^'"]*customer-app|whatsapp-web\.js|meta-sdk/i);
		expect(files).not.toMatch(/VITE_SARA_API_BASE_URL/);
		const clerkFiles = fs
			.readdirSync(root)
			.filter((f) =>
				["WellnessClerkProvider.tsx", "WellnessAuthPanel.tsx", "useWellnessSessionToken.ts"].includes(f),
			)
			.map((f) => fs.readFileSync(path.join(root, f), "utf8"))
			.join("\n");
		expect(clerkFiles).toMatch(/@clerk\/clerk-react/);
	});
});
