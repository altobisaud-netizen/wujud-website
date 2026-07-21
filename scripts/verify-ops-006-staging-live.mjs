#!/usr/bin/env node
/**
 * OPS-006 non-email live verification against staging-wellness.wujud.ai
 */
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.STAGING_WEB_BASE_URL ?? "https://staging-wellness.wujud.ai";
const API = process.env.STAGING_API_BASE_URL ?? "https://staging-wellness-api.wujud.ai";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const OUT = path.resolve(import.meta.dirname, "..", "ai-workflow", "screenshots", "OPS-006-STAGING-LIVE");

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

function assert(condition, message) {
	if (!condition) throw new Error(message);
}

async function axeCheck(page, label) {
	const result = await new AxeBuilder({ page }).analyze();
	const blocking = result.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? ""));
	return { label, blocking: blocking.length, ids: blocking.map((v) => v.id) };
}

const report = {
	baseUrl: BASE,
	apiUrl: API,
	routes: [],
	axe: [],
	network: { forbidden: [], external: [] },
	consoleErrors: [],
	overflow: {},
	hashRoutes: [],
	status: "PENDING",
};

await fs.mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: await browserPath(), headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const requests = [];
page.on("request", (req) => requests.push(req.url()));
page.on("console", (msg) => {
	if (msg.type() === "error") report.consoleErrors.push(msg.text().slice(0, 200));
});

try {
	// Route refresh checks
	for (const route of ["/", "/pricing", "/safety", "/account/privacy", "/privacy", "/terms"]) {
		const res = await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
		report.routes.push({ route, status: res?.status() ?? 0 });
		assert((res?.status() ?? 0) === 200, `${route} not 200`);
	}

	// Hash routes (SPA)
	for (const hash of ["#/sign-in", "#/sign-up"]) {
		await page.goto(`${BASE}/${hash}`, { waitUntil: "domcontentloaded" });
		const hasClerkOrAuth = await page.locator(".ops-auth-panel, .cl-rootBox, [class*='cl-']").count();
		report.hashRoutes.push({ hash, authUiPresent: hasClerkOrAuth > 0 });
	}

	// Homepage wellness build + locales + deterministic chat
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 90000 });
	await page.evaluate(() => localStorage.setItem("wujud-wellness-locale", "ar"));
	await page.reload({ waitUntil: "networkidle" });
	assert(await page.locator("#wellness-conversation").count(), "missing SARA chat");
	await page.getByRole("button", { name: "طاقتي" }).click();
	await page.waitForTimeout(500);
	await page.getByRole("button", { name: "نوم غير منتظم" }).click();
	await page.waitForTimeout(500);
	report.axe.push(await axeCheck(page, "homepage-ar-1440"));
	await page.getByRole("button", { name: "EN", exact: true }).click();
	await page.waitForTimeout(400);
	report.axe.push(await axeCheck(page, "homepage-en-1440"));

	// Responsive overflow
	for (const [w, h, label] of [
		[320, 800, "320"],
		[390, 844, "390"],
		[430, 932, "430"],
	]) {
		await page.setViewportSize({ width: w, height: h });
		await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
		const dims = await page.evaluate(() => ({
			scrollWidth: document.documentElement.scrollWidth,
			clientWidth: document.documentElement.clientWidth,
			dir: document.documentElement.getAttribute("dir"),
		}));
		report.overflow[label] = dims;
		assert(dims.scrollWidth <= dims.clientWidth + 2, `overflow at ${label}`);
		report.axe.push(await axeCheck(page, `homepage-${label}`));
	}

	// Arabic RTL on privacy page
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto(`${BASE}/account/privacy`, { waitUntil: "networkidle" });
	await page.evaluate(() => localStorage.setItem("wujud-wellness-locale", "ar"));
	await page.reload({ waitUntil: "networkidle" });
	const rtl = await page.evaluate(() => document.documentElement.getAttribute("dir"));
	assert(rtl === "rtl", "privacy page not RTL in Arabic");
	report.axe.push(await axeCheck(page, "privacy-ar-390"));

	// Network isolation
	const forbidden = requests.filter((url) =>
		/openai|anthropic|graph\.facebook|whatsapp|customer-app|sara.?api|thawani|stripe\.com/i.test(url),
	);
	report.network.forbidden = [...new Set(forbidden)];
	assert(forbidden.length === 0, `forbidden requests: ${forbidden.join(", ")}`);

	const blockingAxe = report.axe.filter((a) => a.blocking > 0);
	assert(blockingAxe.length === 0, `axe blocking: ${JSON.stringify(blockingAxe)}`);
	assert(report.consoleErrors.length === 0, `console errors: ${report.consoleErrors.join(" | ")}`);

	report.status = "PASS";
} catch (error) {
	report.status = "FAIL";
	report.error = error instanceof Error ? error.message : String(error);
	process.exitCode = 1;
} finally {
	await context.close();
	await browser.close();
	await fs.writeFile(path.join(OUT, "ops-006-staging-live.json"), JSON.stringify(report, null, 2));
	console.log(JSON.stringify(report, null, 2));
}
