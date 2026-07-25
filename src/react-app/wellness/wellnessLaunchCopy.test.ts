import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { copy } from "./locale";
import { WELLNESS_PUBLIC_ROUTES } from "./wellnessRouteMetadata";

const PROHIBITED_PUBLIC_PHRASES = [
	/\bprototype\b/i,
	/\bproduct-review\b/i,
	/\bproduct review\b/i,
	/\bfrontend preview\b/i,
	/\binternal preview\b/i,
	/\bto be confirmed\b/i,
	/\bnot launched\b/i,
	/\bno live network\b/i,
	/\bplaceholder pricing\b/i,
	/\bSign in coming soon\b/i,
	/\bPrice under review\b/i,
	/WUJUD wellness product-review preview/i,
	/نموذج تجريبي/i,
	/معاينة للمنتج/i,
	/قيد المراجعة/i,
	/تسجيل الدخول قريباً/i,
];

const PUBLIC_SURFACE_FILES = [
	"src/react-app/wellness/locale.ts",
	"src/react-app/wellness/WellnessHomePage.tsx",
	"src/react-app/wellness/BelowFoldWellness.tsx",
	"src/react-app/wellness/WellnessInfoPage.tsx",
	"src/react-app/wellness/SiteHeader.tsx",
	"src/react-app/wellness/WellnessFooter.tsx",
	"src/react-app/wellness/wellnessRouteMetadata.ts",
	"src/react-app/wellness/conversation.ts",
	"scripts/generate-wellness-static.mjs",
];

const read = (file: string) => fs.readFileSync(path.resolve(file), "utf8");

describe("wellness launch-ready public copy", () => {
	it("does not expose prohibited QA or build-status phrases on public surfaces", () => {
		const source = PUBLIC_SURFACE_FILES.map(read).join("\n");
		for (const pattern of PROHIBITED_PUBLIC_PHRASES) {
			expect(source).not.toMatch(pattern);
		}
	});

	it("uses the pricing waitlist experience instead of empty tiers", () => {
		const belowFold = read("src/react-app/wellness/BelowFoldWellness.tsx");
		const locale = read("src/react-app/wellness/locale.ts");
		expect(belowFold).toContain("PricingWaitlistSection");
		expect(locale).toContain("Planned plan features");
		expect(belowFold).not.toMatch(/price-card--featured/);
	});

	it("includes about/trust copy in both languages", () => {
		expect(copy.en.about.title).toBe("Built with purpose in Oman");
		expect(copy.ar.about.title).toBe("صُنعت بقصد في عُمان");
		expect(copy.en.footer.disclaimer).toContain("does not provide medical diagnosis or treatment");
		expect(copy.ar.footer.disclaimer).toContain("لا يقدم تشخيصاً أو علاجاً طبياً");
	});

	it("defines SARA concretely and labels the demo accurately", () => {
		expect(copy.en.saraDefinition).toContain("AI wellness coach");
		expect(copy.en.demoCta).toBe("Try SARA now");
		expect(copy.ar.demoCta).toBe("جرّب سارا الآن");
		expect(copy.en.chatDemoLabel).toContain("Nothing from this demo is saved");
	});

	it("includes complete Arabic pricing waitlist strings", () => {
		expect(copy.ar.pricingWaitlist.primaryCta).toBe("انضم إلى قائمة الإطلاق");
		expect(copy.ar.pricingWaitlist.features).toHaveLength(6);
	});

	it("registers about in public routes and metadata", () => {
		expect(WELLNESS_PUBLIC_ROUTES).toContain("/about");
		const app = read("src/react-app/App.tsx");
		expect(app).toContain('"/about": "about"');
	});
});
