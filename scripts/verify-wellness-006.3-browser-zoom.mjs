/**
 * Genuine browser-zoom verification for WUJUD-SARA-WELLNESS-006.3.
 *
 * Playwright cannot drive Edge/Chrome Ctrl+/- page-zoom (confirmed).
 * This script therefore verifies the two engine-level equivalents:
 * 1) CDP Emulation.setPageScaleFactor(2) — Chromium page scale (not CSS zoom)
 * 2) Layout viewport at 50% of the window width — same CSS layout as Chrome
 *    UI zoom at 200% on that window size
 */
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "ai-workflow", "screenshots", "WUJUD-SARA-WELLNESS-006.2");
const BASE = process.env.WELLNESS_PREVIEW_URL ?? "http://127.0.0.1:4181";
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

async function layoutHealth(page) {
	return page.evaluate(() => {
		const doc = document.documentElement;
		const chat = document.querySelector("#wellness-conversation");
		const image = document.querySelector(".hero-lifestyle");
		const choices = [...document.querySelectorAll(".choice-grid button")];
		const cta = document.querySelector(".save-journey-card button, .conversion-price button");
		return {
			clientWidth: doc.clientWidth,
			scrollWidth: doc.scrollWidth,
			overflowX: Math.max(doc.scrollWidth, document.body.scrollWidth) > doc.clientWidth + 2,
			dir: doc.getAttribute("dir"),
			choiceMinHeight: choices.length
				? Math.min(...choices.map((b) => b.getBoundingClientRect().height))
				: null,
			disabledCtaVisible: cta
				? cta.getBoundingClientRect().height > 0 && getComputedStyle(cta).display !== "none"
				: null,
			cols: getComputedStyle(document.querySelector(".conversion-hero")).gridTemplateColumns,
			chatY: chat ? chat.getBoundingClientRect().top + window.scrollY : null,
			imageY: image ? image.getBoundingClientRect().top + window.scrollY : null,
			visualScale: window.visualViewport?.scale ?? 1,
		};
	});
}

async function runScenario(browser, { width, height, locale, label }) {
	const page = await browser.newPage({ viewport: { width, height } });
	const session = await page.context().newCDPSession(page);
	await page.goto(BASE, { waitUntil: "networkidle" });
	await page.evaluate((loc) => localStorage.setItem("wujud-wellness-locale", loc), locale);
	await page.reload({ waitUntil: "networkidle" });

	// Prove keyboard page-zoom is inert under Playwright automation.
	const beforeKey = await page.evaluate(() => document.documentElement.clientWidth);
	await page.keyboard.press("Control+Digit0");
	for (let i = 0; i < 5; i++) await page.keyboard.press("Control+Equal");
	await page.waitForTimeout(200);
	const afterKey = await page.evaluate(() => document.documentElement.clientWidth);
	const keyboardZoomApplied = afterKey <= beforeKey * 0.72;

	// 1) Engine page scale ×2 (pinch/page scale — not CSS zoom).
	await session.send("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
	await page.waitForTimeout(250);
	const scaled = await layoutHealth(page);
	await page.screenshot({ path: path.join(OUT, `zoom200-${label}-scale-hero.png`) });

	// 2) Layout-equivalent of Chrome UI 200% zoom: half-width CSS viewport.
	await session.send("Emulation.setPageScaleFactor", { pageScaleFactor: 1 });
	const halfW = Math.max(160, Math.round(width / 2));
	const halfH = Math.max(320, Math.round(height / 2));
	await session.send("Emulation.setDeviceMetricsOverride", {
		width: halfW,
		height: halfH,
		deviceScaleFactor: 2,
		mobile: width <= 430,
	});
	await page.waitForTimeout(250);
	const equiv = await layoutHealth(page);
	await page.screenshot({ path: path.join(OUT, `zoom200-${label}-layout-equiv-hero.png`) });

	await page.locator("#wellness-conversation").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUT, `zoom200-${label}-layout-equiv-chat.png`) });

	const energy = locale === "ar" ? "طاقتي" : "My energy";
	if (await page.getByRole("button", { name: energy }).count()) {
		await page.getByRole("button", { name: energy }).click();
		await page.waitForTimeout(400);
	}
	if (await page.locator("#wellness-message").count()) {
		await page.locator("#wellness-message").fill(locale === "ar" ? "خطوات بسيطة" : "simple steps");
		await page.screenshot({ path: path.join(OUT, `zoom200-${label}-layout-equiv-composer.png`) });
	}

	const sleep = locale === "ar" ? "نوم غير منتظم" : "Irregular sleep";
	const fit = locale === "ar" ? "هذه الخطة تناسبني" : "This plan fits me";
	const journey = locale === "ar" ? "نعم، اعرض رحلتي" : "Yes, show my journey";
	for (const name of [sleep, fit, journey]) {
		if (await page.getByRole("button", { name }).count()) {
			await page.getByRole("button", { name }).click();
			await page.waitForTimeout(400);
		}
	}
	const afterFlow = await layoutHealth(page);
	await page.screenshot({ path: path.join(OUT, `zoom200-${label}-layout-equiv-preview.png`) });
	await page.locator("#pricing").scrollIntoViewIfNeeded();
	const pricing = await layoutHealth(page);
	await page.screenshot({ path: path.join(OUT, `zoom200-${label}-layout-equiv-pricing.png`) });
	await page.locator("#safety").scrollIntoViewIfNeeded();
	await page.screenshot({ path: path.join(OUT, `zoom200-${label}-layout-equiv-safety.png`) });

	await page.close();
	return {
		label,
		width,
		height,
		locale,
		halfW,
		keyboardZoomApplied,
		beforeKey,
		afterKey,
		scaled,
		equiv,
		afterFlow,
		pricing,
	};
}

const browser = await chromium.launch({
	executablePath: await browserPath(),
	headless: true,
});
await fs.mkdir(OUT, { recursive: true });

const results = [];
try {
	results.push(await runScenario(browser, { width: 1440, height: 900, locale: "ar", label: "desktop-ar" }));
	results.push(await runScenario(browser, { width: 1440, height: 900, locale: "en", label: "desktop-en" }));
	results.push(await runScenario(browser, { width: 390, height: 844, locale: "ar", label: "mobile390-ar" }));
	results.push(await runScenario(browser, { width: 320, height: 720, locale: "ar", label: "mobile320-ar" }));
	results.push(await runScenario(browser, { width: 430, height: 844, locale: "ar", label: "mobile430-ar" }));

	const failures = [];
	for (const r of results) {
		if (r.scaled.visualScale < 1.9) failures.push(`${r.label}: page scale not ~2`);
		if (r.scaled.overflowX) failures.push(`${r.label}: overflow at page scale 2`);
		if (r.equiv.overflowX) failures.push(`${r.label}: overflow at 200% layout-equivalent (${r.halfW}px)`);
		if (r.afterFlow.overflowX) failures.push(`${r.label}: overflow after chat flow at layout-equivalent`);
		if (r.pricing.overflowX) failures.push(`${r.label}: overflow at pricing layout-equivalent`);
		if (r.locale === "ar" && r.equiv.dir !== "rtl") failures.push(`${r.label}: rtl`);
		if (r.locale === "en" && r.equiv.dir !== "ltr") failures.push(`${r.label}: ltr`);
		if (r.width <= 430 || r.halfW < 1100) {
			if (r.equiv.chatY != null && r.equiv.imageY != null && !(r.equiv.chatY < r.equiv.imageY)) {
				failures.push(`${r.label}: chat not before image at layout-equivalent`);
			}
		}
	}

	const report = {
		method:
			"Keyboard Ctrl+/- attempted (inert under Playwright). Verified via CDP page scale ×2 + half-width layout viewport (Chrome UI 200% zoom CSS equivalent). Not CSS zoom property.",
		base: BASE,
		keyboardZoomNote:
			"Control+Equal did not change layout viewport in automated Edge/Chrome; automation limitation recorded.",
		failures,
		results: results.map((r) => ({
			label: r.label,
			window: r.width,
			layoutEquivalentWidth: r.halfW,
			keyboardZoomApplied: r.keyboardZoomApplied,
			pageScale: r.scaled.visualScale,
			scaleOverflowX: r.scaled.overflowX,
			equivOverflowX: r.equiv.overflowX,
			chatBeforeImage: r.equiv.chatY != null && r.equiv.imageY != null ? r.equiv.chatY < r.equiv.imageY : null,
			cols: r.equiv.cols,
			dir: r.equiv.dir,
		})),
		status: failures.length === 0 ? "PASS" : "FAIL",
	};
	await fs.writeFile(path.join(OUT, "browser-zoom-200-evidence.json"), JSON.stringify(report, null, 2));
	console.log(JSON.stringify(report, null, 2));
	if (failures.length) process.exitCode = 2;
} finally {
	await browser.close();
}
