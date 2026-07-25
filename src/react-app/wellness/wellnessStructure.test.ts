import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const read = (file: string) => fs.readFileSync(path.resolve(file), "utf8");

describe("wellness website structure", () => {
	it("routes account privacy controls through /account/privacy", () => {
		const app = read("src/react-app/App.tsx");
		expect(app).toContain('path === "/account" || path === "/account/privacy"');
		expect(app).toContain('window.history.replaceState(null, "", "/account/privacy")');
		expect(app).toContain("PrivacyAccountPage");
	});

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
			"/data-deletion",
			"/contact",
		]) {
			expect(app).toContain(route);
		}
		expect(app).toContain("WellnessHomePage");
		expect(app).not.toMatch(/SaraOnboardingPage|ConversationalHomePage|BookDemoPage/);
		expect(index).toContain("عادات صحية أسهل");
		expect(index).not.toMatch(/AI Employees for Modern Businesses|AI sales employee/);
	});

	it("shows waitlist CTA only after the personalized preview", () => {
		const home = read("src/react-app/wellness/WellnessHomePage.tsx");
		const locale = read("src/react-app/wellness/locale.ts");
		const previewBranch = home.indexOf('discovery.stage === "preview"');
		const saveCta = home.indexOf("t.saveCta");
		expect(previewBranch).toBeGreaterThan(-1);
		expect(saveCta).toBeGreaterThan(previewBranch);
		expect(locale).toContain("Prototype — account creation is not connected");
		expect(locale).toContain("Interactive preview — your answers are not saved");
	});

	it("defaults to Arabic-first presentation", () => {
		const home = read("src/react-app/wellness/WellnessHomePage.tsx");
		const index = read("index.html");
		expect(home).toContain('return "ar"');
		expect(index).toContain('lang="ar"');
		expect(index).toContain('dir="rtl"');
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
		expect(header).toContain("t.nav.signIn");
		expect(read("src/react-app/wellness/locale.ts")).toContain("Sign in coming soon");
		expect(header).toContain('href="#wellness-conversation"');
		expect(css).toContain("@media (prefers-reduced-motion: reduce)");
		expect(css).toContain("@media (max-width: 430px)");
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
		const locale = read("src/react-app/wellness/locale.ts");
		expect(belowFold).toContain("does not diagnose medical conditions");
		expect(belowFold).toContain("لا تشخّص سارة الحالات الطبية");
		expect(belowFold).toContain("Subscriptions are not available yet");
		expect(locale).toContain("السعر قيد المراجعة");
		expect(locale).toContain("does not promise guaranteed results");
		expect(info).toContain("Optional WhatsApp operational messaging");
		expect(info).toContain("WhatsApp activation status");
		expect(info).toContain("currently inactive until separately enabled");
		expect(info).toContain("Wellness SARA by WUJUD.ai");
	});

	it("avoids fake social proof and fixed purchase prices on the conversion surface", () => {
		const home = read("src/react-app/wellness/WellnessHomePage.tsx");
		const below = read("src/react-app/wellness/BelowFoldWellness.tsx");
		const locale = read("src/react-app/wellness/locale.ts");
		const source = `${home}\n${below}\n${locale}`;
		expect(source).not.toMatch(/250,?000/);
		expect(source).not.toMatch(/4\.9\s*\/\s*5/);
		expect(source).not.toMatch(/\+42%|\+31%/);
		expect(source).not.toMatch(/59\s*ر\.?\s*س|59\s*SAR/i);
		expect(source).not.toMatch(/clinically proven|guaranteed weight|lose weight quickly/i);
	});

	it("prioritizes live chat before lifestyle imagery on mobile conversion layout", () => {
		const css = read("src/react-app/wellness/wellness.css");
		expect(css).toMatch(/\.phone-shell[\s\S]*?order:\s*2;/);
		expect(css).toMatch(/\.hero-lifestyle\s*\{[^}]*order:\s*3;/s);
		expect(css).not.toMatch(/@media \(max-width: 1060px\)[\s\S]*?\.hero-lifestyle\s*\{[^}]*order:\s*2;/s);
	});

	it("does not reference Instagram in Wellness launch surfaces", () => {
		const walk = (dir: string): string[] =>
			fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
				const full = path.join(dir, entry.name);
				if (entry.isDirectory()) return walk(full);
				if (!/\.(ts|tsx|css)$/.test(full) || /\.test\.(ts|tsx)$/.test(full)) return [];
				return [full];
			});
		const wellnessRoot = path.resolve("src/react-app/wellness");
		const source = walk(wellnessRoot)
			.map((file) => fs.readFileSync(file, "utf8"))
			.join("\n");
		expect(source).not.toMatch(/instagram/i);
	});
});
