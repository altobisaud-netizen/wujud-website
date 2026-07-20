/**
 * Capture asset-enhanced conversion homepage screenshots (local preview).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUTPUT = path.join(ROOT, "ai-workflow", "screenshots", "WUJUD-SARA-WELLNESS-006");
const BASE_URL = process.env.WELLNESS_PREVIEW_URL ?? "http://127.0.0.1:4176";
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

await fs.mkdir(OUTPUT, { recursive: true });
const browser = await chromium.launch({ executablePath: await browserPath(), headless: true });

async function capture(viewport, prefix) {
	const page = await browser.newPage({ viewport });
	await page.goto(BASE_URL, { waitUntil: "networkidle" });
	await page.evaluate(() => localStorage.setItem("wujud-wellness-locale", "ar"));
	await page.reload({ waitUntil: "networkidle" });
	await page.screenshot({ path: path.join(OUTPUT, `${prefix}-01-arabic-hero.png`) });
	await page.locator("#wellness-conversation").screenshot({
		path: path.join(OUTPUT, `${prefix}-02-chat-initial.png`),
	});
	await page.getByRole("button", { name: "طاقتي" }).click();
	await page.waitForTimeout(600);
	await page.screenshot({ path: path.join(OUTPUT, `${prefix}-03-energy-flow.png`) });
	await page.getByRole("button", { name: "نوم غير منتظم" }).click();
	await page.waitForTimeout(500);
	await page.getByRole("button", { name: "هذه الخطة تناسبني" }).click();
	await page.waitForTimeout(500);
	await page.getByRole("button", { name: "نعم، اعرض رحلتي" }).click();
	await page.waitForTimeout(700);
	await page.screenshot({ path: path.join(OUTPUT, `${prefix}-04-personalized-preview.png`) });
	await page.locator("#results").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, `${prefix}-05-results.png`) });
	await page.locator(".hero-lifestyle").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, `${prefix}-06-lifestyle-image.png`) });
	await page.locator("#how-it-works").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, `${prefix}-07-how-works.png`) });
	await page.locator("#eight-week-journey").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, `${prefix}-08-journey.png`) });
	await page.locator("#how-sara-learns").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, `${prefix}-09-learns.png`) });
	await page.locator("#pricing").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, `${prefix}-10-pricing.png`) });
	await page.locator("#safety").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, `${prefix}-11-safety.png`) });
	await page.getByRole("button", { name: "EN", exact: true }).click();
	await page.waitForTimeout(400);
	await page.locator(".conversion-hero").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, `${prefix}-12-english-hero.png`) });
	await page.close();
}

try {
	await capture({ width: 1440, height: 900 }, "desktop-1440");
	await capture({ width: 390, height: 844 }, "mobile-390");
	console.log(JSON.stringify({ status: "PASS", output: OUTPUT }, null, 2));
} finally {
	await browser.close();
}
