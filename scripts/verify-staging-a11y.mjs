#!/usr/bin/env node
/**
 * OPS-008 full operational accessibility matrix (redacted output).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const baseUrl = process.env.STAGING_WEB_BASE_URL ?? "https://staging-wellness.wujud.ai";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

async function browserPath() {
	for (const candidate of [EDGE, CHROME]) {
		try {
			await fs.access(candidate);
			return candidate;
		} catch {
			/* next */
		}
	}
	throw new Error("No Edge/Chrome found");
}

const scenarios = [
	{ id: "homepage-en", path: "/", locale: "en", setup: null },
	{ id: "homepage-ar", path: "/", locale: "ar", setup: null },
	{ id: "waitlist-confirm-invalid", path: "/waitlist/confirm", locale: "ar", setup: null },
	{ id: "waitlist-unsubscribe-invalid", path: "/waitlist/unsubscribe", locale: "ar", setup: null },
	{ id: "waitlist-delete-invalid", path: "/waitlist/delete", locale: "ar", setup: null },
	{ id: "account-privacy-gate", path: "/account/privacy", locale: "en", setup: null },
	{ id: "pricing-unavailable", path: "/pricing", locale: "en", setup: null },
];

const viewports = [
	{ label: "1440", width: 1440, height: 900 },
	{ label: "320", width: 320, height: 800 },
	{ label: "390", width: 390, height: 844 },
	{ label: "430", width: 430, height: 932 },
];

const results = [];
const browser = await chromium.launch({ executablePath: await browserPath(), headless: true });

for (const scenario of scenarios) {
	for (const viewport of viewports) {
		const context = await browser.newContext({
			viewport: { width: viewport.width, height: viewport.height },
			reducedMotion: "reduce",
			locale: scenario.locale === "ar" ? "ar" : "en-US",
		});
		const page = await context.newPage();
		if (scenario.locale) {
			await page.addInitScript((locale) => {
				window.localStorage.setItem("wujud-wellness-locale", locale);
			}, scenario.locale);
		}
		await page.goto(`${baseUrl}${scenario.path}`, { waitUntil: "domcontentloaded", timeout: 90000 });
		const axe = await new AxeBuilder({ page }).analyze();
		const blocking = axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
		const mainCount = await page.locator("main").count();
		const h1Count = await page.locator("h1").count();
		const overflow = await page.evaluate(() => {
			const doc = document.documentElement;
			return doc.scrollWidth > doc.clientWidth + 2;
		});
		results.push({
			scenario: scenario.id,
			viewport: viewport.label,
			blockingCount: blocking.length,
			blockingIds: blocking.map((v) => v.id),
			mainCount,
			h1Count,
			horizontalOverflow: overflow,
			dir: await page.evaluate(() => document.documentElement.dir),
		});
		await context.close();
	}
}

await browser.close();

const failed = results.filter(
	(r) => r.blockingCount > 0 || r.horizontalOverflow || r.mainCount !== 1 || r.h1Count < 1,
);
const report = {
	result: failed.length === 0 ? "FULL_OPERATIONAL_A11Y_PASS" : "REQUIRES_FINAL_STAGING_FIX",
	baseUrl,
	scenariosRun: results.length,
	failedCount: failed.length,
	failures: failed.map((r) => ({
		scenario: r.scenario,
		viewport: r.viewport,
		blockingCount: r.blockingCount,
		blockingIds: r.blockingIds,
		mainCount: r.mainCount,
		h1Count: r.h1Count,
		horizontalOverflow: r.horizontalOverflow,
	})),
};

const out = path.resolve(import.meta.dirname, "..", "docs", "wellness-product", "ops-008-a11y-report.json");
await fs.mkdir(path.dirname(out), { recursive: true });
await fs.writeFile(out, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ result: report.result, failedCount: report.failedCount }, null, 2));
process.exit(failed.length ? 1 : 0);
