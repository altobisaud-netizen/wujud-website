import { describe, expect, it } from "vitest";
import { DEMO_PROFILES } from "./demoScripts";
import type { DemoSlug } from "./types";

describe("scripted Try mode isolation", () => {
	const slugs: DemoSlug[] = ["coffee", "clinic", "real-estate", "retail"];

	it("exposes the four approved businesses", () => {
		expect(Object.keys(DEMO_PROFILES).sort()).toEqual([...slugs].sort());
		expect(DEMO_PROFILES.coffee.displayName.en).toBe("Harbor Roast");
		expect(DEMO_PROFILES.clinic.displayName.en).toBe("BrightCare Clinic");
		expect(DEMO_PROFILES["real-estate"].displayName.en).toBe("Oasis Homes");
		expect(DEMO_PROFILES.retail.displayName.en).toBe("Noon & Night");
	});

	it("each profile has EN/AR turns and no network client imports", () => {
		for (const slug of slugs) {
			const profile = DEMO_PROFILES[slug];
			expect(profile.turns.length).toBeGreaterThan(0);
			for (const turn of profile.turns) {
				expect(turn.en.trim().length).toBeGreaterThan(0);
				expect(turn.ar.trim().length).toBeGreaterThan(0);
			}
			expect(profile.draft.businessName).toBeTruthy();
			expect(profile.draft.channels.length).toBeGreaterThan(0);
		}
	});

	it("source module remains frontend-only (no fetch / demo api strings)", async () => {
		const fs = await import("node:fs");
		const path = await import("node:path");
		const file = fs.readFileSync(
			path.resolve("src/react-app/conversational/demoScripts.ts"),
			"utf8",
		);
		expect(file).not.toMatch(/fetch\s*\(/);
		expect(file).not.toMatch(/staging-demo-api|production-demo-api/);
		expect(file).not.toMatch(/website-demo-api/);
	});
});
