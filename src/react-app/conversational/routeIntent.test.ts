import { describe, expect, it } from "vitest";
import { routeFreeText, routeQuickAction } from "./routeIntent";

describe("routeQuickAction", () => {
	it("maps each quick action directly", () => {
		expect(routeQuickAction("build")).toBe("BUILD_AGENT");
		expect(routeQuickAction("try")).toBe("TRY_DEMO");
		expect(routeQuickAction("pricing")).toBe("PRICING");
		expect(routeQuickAction("how")).toBe("PRODUCT_QUESTION");
		expect(routeQuickAction("book")).toBe("BOOK_DEMO");
	});
});

describe("routeFreeText", () => {
	it("routes English pricing keywords", () => {
		for (const t of ["price", "pricing", "cost", "plan", "What is the pricing?"]) {
			expect(routeFreeText(t)).toBe("PRICING");
		}
	});

	it("routes Arabic pricing keywords", () => {
		for (const t of ["اشتراك", "سعر", "أسعار", "كم سعر الباقة؟"]) {
			expect(routeFreeText(t)).toBe("PRICING");
		}
	});

	it("routes English build keywords", () => {
		for (const t of ["build", "create", "my business", "AI agent"]) {
			expect(routeFreeText(t)).toBe("BUILD_AGENT");
		}
	});

	it("routes Arabic build keywords", () => {
		for (const t of ["ابني", "إنشاء", "نشاطي", "ابني موظفة مبيعات"]) {
			expect(routeFreeText(t)).toBe("BUILD_AGENT");
		}
	});

	it("routes English and Arabic try keywords", () => {
		expect(routeFreeText("try sara")).toBe("TRY_DEMO");
		expect(routeFreeText("demo")).toBe("TRY_DEMO");
		expect(routeFreeText("example")).toBe("TRY_DEMO");
		expect(routeFreeText("تجربة")).toBe("TRY_DEMO");
		expect(routeFreeText("جرب")).toBe("TRY_DEMO");
	});

	it("routes product/FAQ and account help", () => {
		expect(routeFreeText("how does it work")).toBe("PRODUCT_QUESTION");
		expect(routeFreeText("faq about whatsapp")).toBe("PRODUCT_QUESTION");
		expect(routeFreeText("كيف يعمل")).toBe("PRODUCT_QUESTION");
		expect(routeFreeText("sign in")).toBe("ACCOUNT_HELP");
		expect(routeFreeText("حسابي")).toBe("ACCOUNT_HELP");
	});

	it("routes book demo keywords", () => {
		expect(routeFreeText("book a meeting")).toBe("BOOK_DEMO");
		expect(routeFreeText("حجز موعد")).toBe("BOOK_DEMO");
	});

	it("clarifies ambiguous and empty input", () => {
		expect(routeFreeText("")).toBe("CLARIFY");
		expect(routeFreeText("   ")).toBe("CLARIFY");
		expect(routeFreeText("hello")).toBe("CLARIFY");
		expect(routeFreeText("مرحبا")).toBe("CLARIFY");
	});

	it("handles mixed English/Arabic when keywords present", () => {
		expect(routeFreeText("Need سعر please")).toBe("PRICING");
		expect(routeFreeText("أريد build my agent")).toBe("BUILD_AGENT");
	});
});
