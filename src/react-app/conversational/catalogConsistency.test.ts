import { describe, expect, it } from "vitest";
import { validateProductCatalog } from "../../content/catalogValidation";
import { WUJUD_PRODUCT_CATALOG } from "../../content/wujudProductCatalog";

describe("WUJUD product catalog", () => {
	it("passes structural validation", () => {
		const result = validateProductCatalog();
		expect(result.errors).toEqual([]);
		expect(result.ok).toBe(true);
	});

	it("keeps approved monthly prices unchanged", () => {
		const starter = WUJUD_PRODUCT_CATALOG.plans.find((p) => p.id === "starter");
		const growth = WUJUD_PRODUCT_CATALOG.plans.find((p) => p.id === "growth");
		expect(starter?.priceMonthlyUsd).toBe(299);
		expect(growth?.priceMonthlyUsd).toBe(799);
	});

	it("exposes unique plan and FAQ ids with EN/AR copy", () => {
		const planIds = WUJUD_PRODUCT_CATALOG.plans.map((p) => p.id);
		expect(new Set(planIds).size).toBe(planIds.length);
		for (const plan of WUJUD_PRODUCT_CATALOG.plans) {
			expect(plan.name.en.trim()).toBeTruthy();
			expect(plan.name.ar.trim()).toBeTruthy();
		}
		const faqIds = WUJUD_PRODUCT_CATALOG.faqs.map((f) => f.id);
		expect(new Set(faqIds).size).toBe(faqIds.length);
		for (const faq of WUJUD_PRODUCT_CATALOG.faqs) {
			expect(faq.question.en.trim()).toBeTruthy();
			expect(faq.question.ar.trim()).toBeTruthy();
			expect(faq.answer.en.trim()).toBeTruthy();
			expect(faq.answer.ar.trim()).toBeTruthy();
		}
	});

	it("uses valid canonical paths", () => {
		const paths = WUJUD_PRODUCT_CATALOG.canonicalPaths;
		expect(paths.pricing).toBe("/pricing");
		expect(paths.faq).toBe("/faq");
		expect(paths.howItWorks).toBe("/how-it-works");
		expect(paths.bookDemo).toBe("/book-demo");
		expect(paths.buildSara).toBe("/build-sara");
		expect(paths.privacy).toBe("/privacy");
		expect(paths.terms).toBe("/terms");
		expect(paths.dataDeletion).toBe("/data-deletion");
	});
});

describe("Pricing and FAQ source consistency", () => {
	it("canonical pages import the same catalog object reference", async () => {
		const fs = await import("node:fs");
		const path = await import("node:path");
		const pricing = fs.readFileSync(
			path.resolve("src/react-app/pages/PricingPage.tsx"),
			"utf8",
		);
		const faq = fs.readFileSync(path.resolve("src/react-app/pages/FaqPage.tsx"), "utf8");
		const panels = fs.readFileSync(
			path.resolve("src/react-app/conversational/panels/CatalogPanels.tsx"),
			"utf8",
		);
		expect(pricing).toMatch(/WUJUD_PRODUCT_CATALOG/);
		expect(faq).toMatch(/WUJUD_PRODUCT_CATALOG/);
		expect(panels).toMatch(/WUJUD_PRODUCT_CATALOG/);
		expect(pricing).not.toMatch(/\$299\/mo.*\$799\/mo/);
		expect(faq).not.toMatch(/const faqs\s*=/);
	});
});
