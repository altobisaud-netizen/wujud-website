import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { copy } from "./locale";
import { heroVisual, outcomeVisuals } from "./lifestyleImagery";

const read = (file: string) => fs.readFileSync(path.resolve(file), "utf8");

describe("chat and imagery balance (006.2)", () => {
	it("uses a three-part desktop hero with chat as the largest column", () => {
		const css = read("src/react-app/wellness/wellness.css");
		expect(css).toMatch(
			/\.conversion-hero\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*3fr\)\s+minmax\(0,\s*3fr\)\s+minmax\(0,\s*4fr\)/s,
		);
		expect(css).toContain(".conversion-chat");
		expect(css).toMatch(/\.conversion-chat[\s\S]*?box-shadow:/);
	});

	it("stacks headline then chat then lifestyle image when three columns would be cramped", () => {
		const css = read("src/react-app/wellness/wellness.css");
		expect(css).toMatch(/@media \(max-width: 1099px\)/);
		expect(css).toMatch(/\.conversion-hero > \.hero-copy\s*\{[^}]*order:\s*1;/s);
		expect(css).toMatch(/\.conversion-hero > \.conversion-chat[\s\S]*?order:\s*2;/);
		expect(css).toMatch(/\.conversion-hero > \.hero-lifestyle\s*\{[^}]*order:\s*3;/s);
		expect(css).toMatch(/\.phone-shell[\s\S]*?order:\s*2;/);
		expect(css).toMatch(/\.hero-lifestyle\s*\{[^}]*order:\s*3;/s);
	});

	it("keeps chat before the hero lifestyle image on mobile conversion layout", () => {
		const home = read("src/react-app/wellness/WellnessHomePage.tsx");
		const copyIndex = home.indexOf('className="hero-copy"');
		const chatIndex = home.indexOf("conversion-chat");
		const lifestyleIndex = home.indexOf('className="hero-lifestyle"');
		expect(copyIndex).toBeGreaterThan(-1);
		expect(chatIndex).toBeGreaterThan(lifestyleIndex);
		expect(lifestyleIndex).toBeGreaterThan(copyIndex);
		// DOM: copy → lifestyle → chat; CSS reorders chat before lifestyle on narrow viewports.
		const css = read("src/react-app/wellness/wellness.css");
		expect(css).toMatch(/@media \(max-width: 760px\)[\s\S]*?\.phone-shell[\s\S]*?order:\s*2;/);
		expect(css).toMatch(/@media \(max-width: 760px\)[\s\S]*?\.hero-lifestyle\s*\{[^}]*order:\s*3;/s);
	});

	it("keeps approved Arabic and English hero conversion copy", () => {
		expect(copy.ar.heroEyebrow).toBe("مدربك الخاص للعافية بالذكاء الاصطناعي");
		expect(copy.ar.heroTitle).toContain("ابنِ عادات صحية أفضل");
		expect(copy.ar.heroBody).toContain("متابعات يومية");
		expect(copy.ar.heroPrimaryCta).toBe("ابدأ رحلة العافية");
		expect(copy.ar.heroSecondaryCta).toBe("كيف تعمل سارا");
		expect(copy.en.heroEyebrow).toBe("Your private AI wellness coach");
		expect(copy.en.heroTitle).toContain("Build healthier routines");
		expect(copy.en.heroPrimaryCta).toBe("Start your wellness journey");
		expect(copy.en.heroSecondaryCta).toBe("See how SARA works");
	});

	it("labels the chat as a sample check-in demo with privacy and no live status", () => {
		expect(copy.ar.chatStatus).toBe("متابعة نموذجية");
		expect(copy.ar.chatSubtitle).toContain("مدربك الخاص");
		expect(copy.ar.chatDemoLabel).toContain("لن يتم حفظ");
		expect(copy.en.chatStatus).toBe("Sample check-in");
		expect(copy.en.chatDemoLabel).toContain("Nothing from this demo is saved");
		const home = read("src/react-app/wellness/WellnessHomePage.tsx");
		expect(home).not.toMatch(/متصلة الآن|online|live AI|connected/i);
		expect(home).toContain("role=\"region\"");
		expect(home).toContain("t.demoCta");
	});

	it("uses the approved hero lifestyle alt text and outcome goals framing", () => {
		expect(heroVisual.alt.ar).toBe("رجل وامرأة عربيان يستمتعان بنشاط يومي في بيئة خارجية هادئة");
		expect(heroVisual.alt.en).toBe("An Arab man and woman enjoying a calm everyday outdoor activity");
		expect(copy.ar.sections.outcomesTitle).toBe("دعم لأهداف العافية اليومية");
		expect(copy.en.sections.outcomesTitle).toBe("Support for everyday wellness goals");
		expect(copy.ar.sections.outcomesEyebrow).toMatch(/كيف تساعدك/);
		expect(outcomeVisuals).toHaveLength(5);
	});

	it("removes Articles from navigation until a real articles route exists", () => {
		const header = read("src/react-app/wellness/SiteHeader.tsx");
		expect(header).not.toContain("t.nav.articles");
		expect(header).not.toMatch(/Articles|المقالات/);
		expect(header).toContain("t.nav.about");
		expect(header).toContain('href="/about"');
	});

	it("keeps reduced-motion support for typing and active status animation", () => {
		const css = read("src/react-app/wellness/wellness.css");
		expect(css).toContain("status-dot--active");
		expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*status-dot--active/);
		const home = read("src/react-app/wellness/WellnessHomePage.tsx");
		expect(home).toContain("prefersReducedMotion");
	});

	it("does not imply body ideals or verified customer results from imagery", () => {
		const imagery = read("src/react-app/wellness/lifestyleImagery.ts");
		const below = read("src/react-app/wellness/BelowFoldWellness.tsx");
		const joined = `${imagery}\n${below}`;
		expect(joined).not.toMatch(/before-and-after|ideal body|transformation|customer success|verified results/i);
		expect(joined).not.toMatch(/\+\d+%/);
	});
});
