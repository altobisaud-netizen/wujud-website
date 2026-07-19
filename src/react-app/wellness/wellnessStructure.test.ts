import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const read = (file: string) => fs.readFileSync(path.resolve(file), "utf8");

describe("wellness website structure", () => {
	it("exposes every required direct route", () => {
		const app = read("src/react-app/App.tsx");
		const index = read("index.html");
		for (const route of [
			"/how-it-works",
			"/eight-week-journey",
			"/pricing",
			"/safety",
			"/privacy",
			"/terms",
			"/contact",
		]) {
			expect(app).toContain(route);
		}
		expect(app).toContain("WellnessHomePage");
		expect(app).not.toMatch(/SaraOnboardingPage|ConversationalHomePage|BookDemoPage/);
		expect(index).toContain("Your Daily Wellness Companion");
		expect(index).not.toMatch(/AI Employees for Modern Businesses|AI sales employee/);
	});

	it("shows account creation only after the personalized preview", () => {
		const home = read("src/react-app/wellness/WellnessHomePage.tsx");
		const locale = read("src/react-app/wellness/locale.ts");
		const previewBranch = home.indexOf('discovery.stage !== "preview"');
		const saveCta = home.indexOf("t.saveCta");
		expect(previewBranch).toBeGreaterThan(-1);
		expect(saveCta).toBeGreaterThan(previewBranch);
		expect(locale).toContain("Prototype — account creation is not connected");
	});

	it("has keyboard labels, complete-response live region and reduced motion support", () => {
		const home = read("src/react-app/wellness/WellnessHomePage.tsx");
		const header = read("src/react-app/wellness/SiteHeader.tsx");
		const css = read("src/react-app/wellness/wellness.css");
		const globalCss = read("src/react-app/index.css");
		expect(home).toContain('htmlFor="wellness-message"');
		expect(home).toContain('aria-live="polite"');
		expect(home).toContain('aria-atomic="true"');
		expect(home).toContain('type="button"');
		expect(header).toContain("aria-pressed");
		expect(css).toContain("@media (prefers-reduced-motion: reduce)");
		expect(css).toContain("@media (max-width: 420px)");
		expect(globalCss).toContain("overflow-x: hidden");
	});

	it("lazy-loads below-fold wellness content", () => {
		const home = read("src/react-app/wellness/WellnessHomePage.tsx");
		expect(home).toMatch(/lazy\(\(\) => import\(["']\.\/BelowFoldWellness["']\)\)/);
		expect(home).toContain("<Suspense");
	});

	it("contains visible safety, privacy, pricing and human-support copy in both languages", () => {
		const belowFold = read("src/react-app/wellness/BelowFoldWellness.tsx");
		const info = read("src/react-app/wellness/WellnessInfoPage.tsx");
		expect(belowFold).toContain("does not replace qualified healthcare professionals");
		expect(belowFold).toContain("لا تحل سارة محل المختصين الصحيين المؤهلين");
		expect(belowFold).toContain("No current professional network claimed");
		expect(belowFold).toContain("Placeholder — commercial review");
		expect(info).toContain("frontend preview does not create users");
		expect(info).toContain("لا ينشئ هذا النموذج مستخدمين");
	});
});
