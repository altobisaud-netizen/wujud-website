import { describe, expect, it } from "vitest";
import { buildWhatsAppWaMeUrl, WHATSAPP_INBOUND_CTA_COPY } from "./WhatsAppInboundCta";

describe("WhatsApp inbound-first CTA", () => {
	it("uses START prefill for English wa.me links", () => {
		expect(buildWhatsAppWaMeUrl("+96890000000", "en")).toBe(
			"https://wa.me/96890000000?text=START",
		);
	});

	it("uses Arabic prefill for Arabic wa.me links", () => {
		expect(buildWhatsAppWaMeUrl("+96890000000", "ar")).toBe(
			`https://wa.me/96890000000?text=${encodeURIComponent("ابدأ")}`,
		);
	});

	it("does not claim proactive reminders are active", () => {
		expect(WHATSAPP_INBOUND_CTA_COPY.en.disclaimer).toMatch(/Proactive reminders are unavailable/i);
		expect(WHATSAPP_INBOUND_CTA_COPY.ar.disclaimer).toMatch(/التذكيرات الاستباقية غير متاحة/i);
	});

	it("states user initiates the conversation", () => {
		expect(WHATSAPP_INBOUND_CTA_COPY.en.body).toMatch(/You start the conversation/i);
		expect(WHATSAPP_INBOUND_CTA_COPY.ar.body).toMatch(/تبدأ أنت المحادثة/i);
	});
});
