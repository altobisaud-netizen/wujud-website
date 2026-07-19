import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { shouldEnableReviewMode } from "./reviewMode";

function locationAt(url: string): Location {
	return new URL(url) as unknown as Location;
}

describe("preview-only wellness review mode", () => {
	it("enables only when explicitly requested on development or the named preview", () => {
		expect(
			shouldEnableReviewMode(
				locationAt("https://wujud-sara-wellness-preview.altobi-saud.workers.dev/?review=1"),
				false,
			),
		).toBe(true);
		expect(shouldEnableReviewMode(locationAt("http://localhost:4175/?review=1"), true)).toBe(true);
		expect(
			shouldEnableReviewMode(
				locationAt("https://wujud-sara-wellness-preview.altobi-saud.workers.dev/"),
				false,
			),
		).toBe(false);
	});

	it("is ignored on production even when the query parameter is present", () => {
		expect(
			shouldEnableReviewMode(
				locationAt("https://wujud-website.altobi-saud.workers.dev/?review=1"),
				false,
			),
		).toBe(false);
	});

	it("contains no persistence, analytics, external requests or participant results", () => {
		const source = fs.readFileSync(
			path.resolve("src/react-app/wellness/WellnessReviewMode.tsx"),
			"utf8",
		);
		expect(source).toContain("Sample data only");
		expect(source).toContain("Reset review journey");
		expect(source).toContain("local marker");
		expect(source).not.toMatch(/fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/);
		expect(source).not.toMatch(/participant result|successful interview|conversion rate/i);
	});
});
