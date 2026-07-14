import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("HOME-005 UX source contracts", () => {
	it("marks Build as primary CTA and softens empty Send", () => {
		const home = fs.readFileSync(
			path.resolve("src/react-app/conversational/ConversationalHomePage.tsx"),
			"utf8",
		);
		expect(home).toMatch(/conv__chip--primary/);
		expect(home).toMatch(/conv__chip--secondary/);
		expect(home).toMatch(/conv__chip--tertiary/);
		expect(home).toMatch(/conv__send--soft/);
		expect(home).toMatch(/shouldHideBuildDockComposer/);
		expect(home).toMatch(/<main className="conv__work-shell">/);
		expect(home).toMatch(/workspaceHeading/);
		expect(home).toMatch(/hasArabicScript/);
	});

	it("collapses below-fold examples behind a details summary", () => {
		const below = fs.readFileSync(
			path.resolve("src/react-app/conversational/BelowFoldExamples.tsx"),
			"utf8",
		);
		expect(below).toMatch(/<details/);
		expect(below).toMatch(/conv__examples-summary/);
		expect(below).not.toMatch(/<main/);
	});

	it("wires Continue validation hints with aria-describedby", () => {
		const build = fs.readFileSync(
			path.resolve("src/react-app/conversational/panels/BuildPanel.tsx"),
			"utf8",
		);
		const locale = fs.readFileSync(
			path.resolve("src/react-app/conversational/locale.ts"),
			"utf8",
		);
		expect(build).toMatch(/buildHints/);
		expect(build).toMatch(/aria-describedby/);
		expect(locale).toMatch(/Enter your business name to continue/);
		expect(locale).toMatch(/أدخل اسم النشاط للمتابعة/);
	});
});
