import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
	CONVERSION_ASSET_PATHS,
	heroVisual,
	LAYOUT_REFERENCE_FORBIDDEN,
	outcomeVisuals,
} from "./lifestyleImagery";

const ROOT = path.resolve(".");

describe("conversion lifestyle assets", () => {
	it("ships required conversion WebP assets under public/", () => {
		for (const assetPath of CONVERSION_ASSET_PATHS.filter((item) => item.endsWith(".webp"))) {
			const disk = path.join(ROOT, "public", assetPath.replace(/^\//, ""));
			expect(fs.existsSync(disk), disk).toBe(true);
		}
	});

	it("uses real hero and outcome image paths in imagery module", () => {
		expect(heroVisual.src).toContain("/images/wellness/conversion/hero-arab-man-woman-outdoor.webp");
		expect(outcomeVisuals).toHaveLength(5);
		expect(outcomeVisuals.some((item) => item.hijab === true)).toBe(true);
		expect(outcomeVisuals.some((item) => item.genderFocus === "men")).toBe(true);
		expect(outcomeVisuals.some((item) => item.genderFocus === "women")).toBe(true);
	});

	it("provides activity-focused alt text for men and women", () => {
		const alts = [heroVisual, ...outcomeVisuals].map((item) => item.alt.en).join(" ");
		expect(alts).toMatch(/Arab man/i);
		expect(alts).toMatch(/Arab woman|woman/i);
		expect(alts).toMatch(/hijab/i);
		expect(alts).not.toMatch(/attractive|sexy|ideal body|before-and-after/i);
	});

	it("does not ship or import the layout-reference mockup", () => {
		const publicDir = path.join(ROOT, "public");
		const walk = (dir: string): string[] => {
			if (!fs.existsSync(dir)) return [];
			return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
				const full = path.join(dir, entry.name);
				return entry.isDirectory() ? walk(full) : [full];
			});
		};
		const leaked = walk(publicDir).filter((file) =>
			LAYOUT_REFERENCE_FORBIDDEN.some((token) => file.toLowerCase().includes(token.toLowerCase())),
		);
		expect(leaked).toEqual([]);

		const wellnessSrc = walk(path.join(ROOT, "src", "react-app", "wellness"))
			.filter(
				(file) =>
					/\.(ts|tsx|css)$/.test(file) &&
					!file.endsWith(".test.ts") &&
					!file.endsWith(path.sep + "lifestyleImagery.ts"),
			)
			.map((file) => fs.readFileSync(file, "utf8"))
			.join("\n");

		for (const token of LAYOUT_REFERENCE_FORBIDDEN) {
			expect(wellnessSrc).not.toContain(token);
		}
	});

	it("renders hero and outcome pictures from the homepage and below-fold modules", () => {
		const home = fs.readFileSync(path.join(ROOT, "src/react-app/wellness/WellnessHomePage.tsx"), "utf8");
		const below = fs.readFileSync(path.join(ROOT, "src/react-app/wellness/BelowFoldWellness.tsx"), "utf8");
		expect(home).toContain("WellnessPicture");
		expect(home).toContain("heroVisual");
		expect(below).toContain("outcomeVisuals");
		expect(below).toContain("WellnessPicture");
	});
});
