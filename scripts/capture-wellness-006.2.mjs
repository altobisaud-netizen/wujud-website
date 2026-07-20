/**
 * Capture chat/imagery balance screenshots (WUJUD-SARA-WELLNESS-006.2).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUTPUT = path.join(ROOT, "ai-workflow", "screenshots", "WUJUD-SARA-WELLNESS-006.2");
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

async function captureDesktop() {
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	await page.goto(BASE_URL, { waitUntil: "networkidle" });
	await page.evaluate(() => localStorage.setItem("wujud-wellness-locale", "ar"));
	await page.reload({ waitUntil: "networkidle" });
	await page.locator(".conversion-hero").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "desktop-1440-01-arabic-three-part-hero.png") });
	await page.locator("#wellness-conversation").screenshot({
		path: path.join(OUTPUT, "desktop-1440-02-chat-active.png"),
	});
	await page.screenshot({ path: path.join(OUTPUT, "desktop-1440-03-hero-chat-balance.png") });
	await page.getByRole("button", { name: "طاقتي" }).click();
	await page.waitForTimeout(650);
	await page.getByRole("button", { name: "نوم غير منتظم" }).click();
	await page.waitForTimeout(500);
	await page.getByRole("button", { name: "هذه الخطة تناسبني" }).click();
	await page.waitForTimeout(500);
	await page.getByRole("button", { name: "نعم، اعرض رحلتي" }).click();
	await page.waitForTimeout(700);
	await page.screenshot({ path: path.join(OUTPUT, "desktop-1440-04-personalized-preview.png") });
	await page.locator("#results").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "desktop-1440-05-outcome-cards.png") });
	await page.locator("#how-it-works").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "desktop-1440-06-how-works.png") });
	await page.locator("#eight-week-journey").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "desktop-1440-07-journey.png") });
	await page.locator("#how-sara-learns").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "desktop-1440-08-learns.png") });
	await page.locator("#pricing").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "desktop-1440-09-pricing.png") });
	await page.locator("#safety").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "desktop-1440-10-safety.png") });
	await page.getByRole("button", { name: "EN", exact: true }).click();
	await page.waitForTimeout(400);
	await page.locator(".conversion-hero").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "desktop-1440-11-english-three-part-hero.png") });
	await page.close();
}

async function captureMobile() {
	const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
	await page.goto(BASE_URL, { waitUntil: "networkidle" });
	await page.evaluate(() => localStorage.setItem("wujud-wellness-locale", "ar"));
	await page.reload({ waitUntil: "networkidle" });
	await page.screenshot({ path: path.join(OUTPUT, "mobile-390-01-arabic-headline.png") });
	await page.locator("#wellness-conversation").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "mobile-390-02-chat-before-image.png") });
	await page.locator(".choice-grid").screenshot({
		path: path.join(OUTPUT, "mobile-390-03-quick-choices.png"),
	});
	await page.getByRole("button", { name: "طاقتي" }).click();
	await page.waitForTimeout(600);
	await page.locator("#wellness-message").fill("أريد طاقة أفضل");
	await page.screenshot({ path: path.join(OUTPUT, "mobile-390-04-typed-answer.png") });
	await page.getByRole("button", { name: "نوم غير منتظم" }).click();
	await page.waitForTimeout(500);
	await page.getByRole("button", { name: "هذه الخطة تناسبني" }).click();
	await page.waitForTimeout(500);
	await page.getByRole("button", { name: "نعم، اعرض رحلتي" }).click();
	await page.waitForTimeout(700);
	await page.screenshot({ path: path.join(OUTPUT, "mobile-390-05-personalized-preview.png") });
	await page.locator(".hero-lifestyle").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "mobile-390-06-hero-image-after-chat.png") });
	await page.locator("#results").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "mobile-390-07-results-cards.png") });
	await page.locator("#pricing").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "mobile-390-08-pricing.png") });
	await page.locator("#safety").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "mobile-390-09-safety.png") });
	await page.getByRole("button", { name: "EN", exact: true }).click();
	await page.waitForTimeout(400);
	await page.locator(".conversion-hero").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUTPUT, "mobile-390-10-english.png") });

	// Order proof: chat y < lifestyle y on mobile
	const order = await page.evaluate(() => {
		const chat = document.querySelector("#wellness-conversation");
		const image = document.querySelector(".hero-lifestyle");
		const chatBox = chat?.getBoundingClientRect();
		const imageBox = image?.getBoundingClientRect();
		return {
			chatTop: chatBox?.top ?? null,
			imageTop: imageBox?.top ?? null,
			chatBeforeImage: (chatBox?.top ?? 0) < (imageBox?.top ?? 0),
		};
	});
	await fs.writeFile(path.join(OUTPUT, "mobile-order-check.json"), JSON.stringify(order, null, 2));
	await page.close();
}

async function axeCheck() {
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	await page.goto(BASE_URL, { waitUntil: "networkidle" });
	await page.addScriptTag({
		url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js",
	});
	const results = await page.evaluate(async () => {
		// @ts-expect-error axe injected
		const axeResults = await window.axe.run(document, {
			runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
		});
		return {
			violations: axeResults.violations.map((v) => ({
				id: v.id,
				impact: v.impact,
				nodes: v.nodes.length,
				help: v.help,
			})),
		};
	});
	const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
	await fs.writeFile(path.join(OUTPUT, "axe-report.json"), JSON.stringify({ serious, all: results.violations }, null, 2));
	await page.close();
	return serious;
}

try {
	await captureDesktop();
	await captureMobile();
	const serious = await axeCheck();
	console.log(
		JSON.stringify(
			{
				status: serious.length === 0 ? "PASS" : "AXE_ISSUES",
				output: OUTPUT,
				seriousCount: serious.length,
				serious,
			},
			null,
			2,
		),
	);
	if (serious.length) process.exitCode = 2;
} finally {
	await browser.close();
}
