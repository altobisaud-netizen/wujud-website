import { describe, expect, it } from "vitest";
import { hasArabicScript, isClearBuildIntent, routeFreeText, routeQuickAction } from "./routeIntent";

describe("routeQuickAction", () => {
	it("maps each quick action directly", () => {
		expect(routeQuickAction("build")).toBe("BUILD_AGENT");
		expect(routeQuickAction("try")).toBe("TRY_DEMO");
		expect(routeQuickAction("pricing")).toBe("PRICING");
		expect(routeQuickAction("how")).toBe("PRODUCT_QUESTION");
		expect(routeQuickAction("book")).toBe("BOOK_DEMO");
	});
});

describe("routeFreeText precedence", () => {
	it("routes pricing first", () => {
		for (const t of ["price", "pricing", "cost", "plan", "How much does SARA cost?", "كم سعر الاشتراك؟"]) {
			expect(routeFreeText(t)).toBe("PRICING");
		}
	});

	it("routes security and privacy before product/build", () => {
		for (const t of [
			"Is my information secure?",
			"Is my business information secure?",
			"privacy policy",
			"هل معلوماتي آمنة؟",
		]) {
			expect(routeFreeText(t)).toBe("PRODUCT_QUESTION");
		}
	});

	it("routes setup-duration and how-it-works to product help, not Build", () => {
		for (const t of [
			"How long does setup take?",
			"Is setup difficult?",
			"What information do I need to create SARA?",
			"How does WUJUD work?",
			"كم تستغرق عملية الإعداد؟",
			"كيف تعمل سارة؟",
		]) {
			expect(routeFreeText(t)).toBe("PRODUCT_QUESTION");
		}
	});

	it("routes book and account before try/build", () => {
		expect(routeFreeText("book a meeting")).toBe("BOOK_DEMO");
		expect(routeFreeText("حجز موعد")).toBe("BOOK_DEMO");
		expect(routeFreeText("sign in")).toBe("ACCOUNT_HELP");
	});

	it("routes try demos", () => {
		expect(routeFreeText("try sara")).toBe("TRY_DEMO");
		expect(routeFreeText("demo")).toBe("TRY_DEMO");
		expect(routeFreeText("تجربة")).toBe("TRY_DEMO");
	});

	it("routes only clear build intent to BUILD_AGENT", () => {
		for (const t of [
			"Build my SARA",
			"Create a sales agent for my company",
			"I want to set up my own agent",
			"ابني سارة لنشاطي",
			"أريد إنشاء موظف مبيعات",
		]) {
			expect(routeFreeText(t)).toBe("BUILD_AGENT");
			expect(isClearBuildIntent(t)).toBe(true);
		}
	});

	it("does not treat vague create/setup/business phrases as Build", () => {
		for (const t of [
			"How long does setup take?",
			"What information do I need to create SARA?",
			"Is setup difficult?",
			"Is my business information secure?",
			"How does WUJUD work?",
			"my business",
			"AI agent",
		]) {
			expect(routeFreeText(t)).not.toBe("BUILD_AGENT");
			expect(isClearBuildIntent(t)).toBe(false);
		}
	});

	it("clarifies ambiguous and empty input", () => {
		expect(routeFreeText("")).toBe("CLARIFY");
		expect(routeFreeText("hello")).toBe("CLARIFY");
		expect(routeFreeText("مرحبا")).toBe("CLARIFY");
		expect(routeFreeText("help")).toBe("CLARIFY");
	});

	it("detects Arabic script without requiring UI locale", () => {
		expect(hasArabicScript("كيف تعمل سارة؟")).toBe(true);
		expect(hasArabicScript("How does it work?")).toBe(false);
	});
});
