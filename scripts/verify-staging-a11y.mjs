#!/usr/bin/env node
/**
 * Accessibility smoke for operational wellness pages using axe-core/playwright.
 * Requires a deployed staging base URL in STAGING_WEB_BASE_URL.
 */
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const baseUrl = process.env.STAGING_WEB_BASE_URL;
if (!baseUrl) {
	console.error("STAGING_WEB_BASE_URL is required");
	process.exit(1);
}

const paths = ["/", "/account/privacy"];
const viewports = [
	{ width: 320, height: 800, label: "320" },
	{ width: 390, height: 844, label: "390" },
	{ width: 430, height: 932, label: "430" },
	{ width: 1440, height: 900, label: "1440" },
];

const results = [];

const browser = await chromium.launch({ headless: true });
for (const path of paths) {
	for (const viewport of viewports) {
		const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
		await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
		const axe = await new AxeBuilder({ page }).analyze();
		const serious = axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
		results.push({ path, viewport: viewport.label, seriousCount: serious.length, ids: serious.map((v) => v.id) });
		await page.close();
	}
}
await browser.close();

const failed = results.filter((r) => r.seriousCount > 0);
console.log(JSON.stringify({ baseUrl, results, failedCount: failed.length }, null, 2));
process.exit(failed.length ? 1 : 0);
