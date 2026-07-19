import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
	WELLNESS_PUBLIC_ROUTES,
	metadataFor,
	wellnessRouteMetadata,
} from "./wellnessRouteMetadata";

const read = (file: string) => fs.readFileSync(path.resolve(file), "utf8");

describe("wellness route metadata and static generation", () => {
	it("defines unique valid metadata for every approved public route in both languages", () => {
		expect(WELLNESS_PUBLIC_ROUTES).toHaveLength(8);
		const titles = new Set<string>();
		const descriptions = new Set<string>();

		for (const route of WELLNESS_PUBLIC_ROUTES) {
			const metadata = wellnessRouteMetadata[route];
			expect(metadata.canonicalPath).toBe(route);
			expect(metadata.indexability).toBe("index, follow");
			for (const locale of ["en", "ar"] as const) {
				const localized = metadata[locale];
				expect(localized.title.length).toBeGreaterThan(10);
				expect(localized.description.length).toBeGreaterThan(40);
				expect(localized.ogTitle.length).toBeGreaterThan(8);
				expect(localized.ogDescription.length).toBeGreaterThan(30);
				expect(localized.title).not.toMatch(/diagnos|treatment|weight loss|whatsapp|business/i);
				expect(localized.description).not.toMatch(/guaranteed outcome|weight loss|whatsapp/i);
				titles.add(`${locale}:${localized.title}`);
				descriptions.add(`${locale}:${localized.description}`);
			}
		}

		expect(titles.size).toBe(WELLNESS_PUBLIC_ROUTES.length * 2);
		expect(descriptions.size).toBe(WELLNESS_PUBLIC_ROUTES.length * 2);
	});

	it("normalizes trailing slashes and falls back safely for retired paths", () => {
		expect(metadataFor("/safety/", "en").canonicalPath).toBe("/safety");
		expect(metadataFor("/book-demo", "en").canonicalPath).toBe("/");
	});

	it("generates route-specific static h1s, summaries and bilingual fallback content", () => {
		const generator = read("scripts/generate-wellness-static.mjs");
		for (const route of WELLNESS_PUBLIC_ROUTES) {
			expect(generator).toContain(`"${route}"`);
		}
		expect(generator).toContain('class="static-wellness__summary"');
		expect(generator).toContain('lang="ar" dir="rtl"');
		expect(generator).toContain("SARA supports general wellness only");
		expect(generator).toContain("Account creation is disabled");
		expect(generator).toContain("Week 8 — Create a continuation plan");
		expect(generator).toContain("Formal legal approval is pending");
		expect(generator).toContain("prices, billing terms, refunds");
		expect(generator).toContain("contact your session moderator");
	});

	it("keeps preview noindex while retaining production indexing behavior", () => {
		const generator = read("scripts/generate-wellness-static.mjs");
		const index = read("index.html");
		expect(generator).toMatch(/target === "preview"[\s\S]*"noindex, nofollow"[\s\S]*"index, follow"/);
		expect(generator).toContain('"preview"');
		expect(generator).toContain('"production"');
		expect(index).toContain('<meta name="robots" content="index, follow"');
	});

	it("emits only approved routes into sitemap and disallows crawling on preview", () => {
		const generator = read("scripts/generate-wellness-static.mjs");
		expect(generator).toContain("WELLNESS_PUBLIC_ROUTES.map");
		expect(generator).toContain('"User-agent: *\\nDisallow: /');
		for (const forbidden of ["/book-demo", "/try-sara", "/sign-in", "/screenshots", "/api/"]) {
			expect(wellnessRouteMetadata).not.toHaveProperty(forbidden);
		}
	});
});
