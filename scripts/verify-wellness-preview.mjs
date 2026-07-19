import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUTPUT = path.join(ROOT, "ai-workflow", "screenshots", "WUJUD-SARA-WELLNESS-001");
const BASE_URL = process.env.WELLNESS_PREVIEW_URL ?? "http://127.0.0.1:4175";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

async function exists(file) {
	try {
		await fs.access(file);
		return true;
	} catch {
		return false;
	}
}

function assert(condition, message) {
	if (!condition) throw new Error(message);
}

async function assertNoOverflow(page, label) {
	const dimensions = await page.evaluate(() => ({
		scrollWidth: document.documentElement.scrollWidth,
		clientWidth: document.documentElement.clientWidth,
	}));
	assert(
		dimensions.scrollWidth <= dimensions.clientWidth + 1,
		`${label}: horizontal overflow ${dimensions.scrollWidth} > ${dimensions.clientWidth}`,
	);
	return dimensions;
}

async function runAxe(page, label) {
	const result = await new AxeBuilder({ page }).analyze();
	const blocking = result.violations.filter((violation) =>
		["serious", "critical"].includes(violation.impact ?? ""),
	);
	return {
		label,
		violations: result.violations.map((violation) => ({
			id: violation.id,
			impact: violation.impact,
			nodes: violation.nodes.length,
		})),
		blocking,
	};
}

async function screenshot(page, name, options = {}) {
	await page.screenshot({
		path: path.join(OUTPUT, name),
		animations: "disabled",
		...options,
	});
}

async function completeDiscovery(page) {
	for (const label of [
		"My days change a lot",
		"Poor sleep",
		"Morning",
		"Gentle encouragement",
	]) {
		await page.getByRole("button", { name: label, exact: true }).click();
	}
	await page.getByRole("heading", { name: "Your eight-week starting point" }).waitFor();
}

await fs.mkdir(OUTPUT, { recursive: true });
const executablePath = (await exists(EDGE)) ? EDGE : CHROME;
assert(await exists(executablePath), "No installed Edge/Chrome executable found");

const browser = await chromium.launch({ executablePath, headless: true });
const consoleErrors = [];
const apiRequests = [];
const externalRequests = [];
const axeResults = [];
const routeResults = [];
const responsiveResults = [];

try {
	const desktop = await browser.newContext({
		viewport: { width: 1440, height: 1000 },
		colorScheme: "light",
		reducedMotion: "reduce",
	});
	const page = await desktop.newPage();
	page.on("console", (message) => {
		if (message.type() === "error") consoleErrors.push(message.text());
	});
	page.on("request", (request) => {
		const url = new URL(request.url());
		if (url.pathname.startsWith("/api") || ["fetch", "xhr", "websocket"].includes(request.resourceType())) {
			apiRequests.push({ url: request.url(), type: request.resourceType() });
		}
		if (
			url.origin !== new URL(BASE_URL).origin &&
			!["fonts.googleapis.com", "fonts.gstatic.com"].includes(url.hostname)
		) {
			externalRequests.push(request.url());
		}
	});

	await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
	await page.getByRole("heading", { name: /Meet SARA/ }).waitFor();
	assert(await page.getByLabel("Tell SARA what you would like to improve").isVisible(), "Composer label missing");
	assert(!(await page.getByRole("button", { name: "Create my wellness journey" }).isVisible().catch(() => false)), "Account CTA appeared before preview");
	responsiveResults.push({ viewport: "1440x1000", ...(await assertNoOverflow(page, "desktop")) });
	await screenshot(page, "desktop-initial.png");
	axeResults.push(await runAxe(page, "desktop initial homepage"));

	await page.keyboard.press("Tab");
	const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
	assert(Boolean(focusedTag), "Keyboard focus did not move");

	await page.getByRole("button", { name: "Better energy", exact: true }).click();
	await page
		.locator(".conversation-thread")
		.getByText("What does your current routine feel like most days?")
		.waitFor();
	await screenshot(page, "desktop-energy-discovery.png");
	await completeDiscovery(page);
	assert(await page.getByRole("button", { name: "Create my wellness journey" }).isVisible(), "Account CTA missing after preview");
	await page.locator(".plan-preview").scrollIntoViewIfNeeded();
	await screenshot(page, "desktop-personalized-preview.png");
	await page.locator(".save-journey-card").screenshot({
		path: path.join(OUTPUT, "desktop-account-cta.png"),
		animations: "disabled",
	});

	for (const [selector, name] of [
		[".daily-section", "desktop-daily-companion.png"],
		[".journey-section", "desktop-eight-week-journey.png"],
		[".safety-section", "desktop-safety-privacy.png"],
		[".pricing-section", "desktop-pricing.png"],
	]) {
		const section = page.locator(selector);
		await section.scrollIntoViewIfNeeded();
		await section.screenshot({ path: path.join(OUTPUT, name), animations: "disabled" });
	}
	axeResults.push(await runAxe(page, "desktop personalized preview"));

	for (const route of [
		"/how-it-works",
		"/eight-week-journey",
		"/pricing",
		"/safety",
		"/privacy",
		"/terms",
		"/contact",
	]) {
		const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
		await page.reload({ waitUntil: "networkidle" });
		const heading = await page.locator("h1").first().textContent();
		assert(response?.status() === 200, `${route} did not return 200`);
		assert(Boolean(heading?.trim()), `${route} has no h1`);
		routeResults.push({ route, status: response.status(), heading: heading.trim() });
		axeResults.push(await runAxe(page, `direct route ${route}`));
	}
	await desktop.close();

	const mobile = await browser.newContext({
		viewport: { width: 390, height: 844 },
		colorScheme: "light",
		reducedMotion: "reduce",
	});
	const mobilePage = await mobile.newPage();
	mobilePage.on("console", (message) => {
		if (message.type() === "error") consoleErrors.push(message.text());
	});
	await mobilePage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
	responsiveResults.push({ viewport: "390x844", ...(await assertNoOverflow(mobilePage, "mobile 390")) });
	await screenshot(mobilePage, "mobile-initial-chat.png");
	await mobilePage.locator(".conversation-shell").screenshot({
		path: path.join(OUTPUT, "mobile-goal-choices.png"),
		animations: "disabled",
	});
	await mobilePage.getByRole("button", { name: "Better energy", exact: true }).click();
	await completeDiscovery(mobilePage);
	await mobilePage.locator(".plan-preview").screenshot({
		path: path.join(OUTPUT, "mobile-personalized-plan.png"),
		animations: "disabled",
	});
	await mobilePage.locator(".daily-card--1").scrollIntoViewIfNeeded();
	await mobilePage.locator(".daily-card--1").screenshot({
		path: path.join(OUTPUT, "mobile-daily-check-in.png"),
		animations: "disabled",
	});
	await mobilePage.locator(".daily-card--4").scrollIntoViewIfNeeded();
	await mobilePage.locator(".daily-card--4").screenshot({
		path: path.join(OUTPUT, "mobile-missed-day-recovery.png"),
		animations: "disabled",
	});
	await mobilePage.locator(".safety-section").scrollIntoViewIfNeeded();
	await mobilePage.locator(".safety-section").screenshot({
		path: path.join(OUTPUT, "mobile-safety.png"),
		animations: "disabled",
	});

	await mobilePage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
	await mobilePage.getByRole("button", { name: "العربية", exact: true }).click();
	assert((await mobilePage.locator("html").getAttribute("dir")) === "rtl", "Arabic did not set html dir=rtl");
	await mobilePage.getByText(/تعرّف على سارة/).waitFor();
	await assertNoOverflow(mobilePage, "mobile Arabic RTL");
	await screenshot(mobilePage, "mobile-arabic-rtl.png");
	axeResults.push(await runAxe(mobilePage, "mobile Arabic homepage"));
	await mobile.close();

	const narrow = await browser.newContext({
		viewport: { width: 320, height: 800 },
		reducedMotion: "reduce",
	});
	const narrowPage = await narrow.newPage();
	await narrowPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
	responsiveResults.push({ viewport: "320x800", ...(await assertNoOverflow(narrowPage, "mobile 320")) });
	const threadOverflow = await narrowPage.locator(".conversation-thread").evaluate((element) => {
		const style = getComputedStyle(element);
		return { overflowY: style.overflowY, clientHeight: element.clientHeight, scrollHeight: element.scrollHeight };
	});
	assert(
		threadOverflow.overflowY !== "scroll" && threadOverflow.overflowY !== "auto",
		"Conversation creates an internal scroll trap",
	);
	await narrow.close();

	const zoomed = await browser.newContext({
		viewport: { width: 720, height: 900 },
		reducedMotion: "reduce",
	});
	const zoomPage = await zoomed.newPage();
	await zoomPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
	await zoomPage.evaluate(() => {
		document.documentElement.style.zoom = "2";
	});
	await assertNoOverflow(zoomPage, "200% zoom");
	await zoomed.close();

	const blocking = axeResults.flatMap((result) => result.blocking);
	assert(blocking.length === 0, `Axe found serious/critical violations: ${blocking.map((v) => v.id).join(", ")}`);
	assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.join(" | ")}`);
	assert(apiRequests.length === 0, `Unexpected API/fetch/XHR requests: ${JSON.stringify(apiRequests)}`);
	assert(externalRequests.length === 0, `Unexpected external requests: ${externalRequests.join(", ")}`);

	const files = (await fs.readdir(OUTPUT)).filter((file) => file.endsWith(".png")).sort();
	assert(files.length === 15, `Expected 15 screenshots, found ${files.length}`);
	const report = {
		status: "PASS",
		baseUrl: BASE_URL,
		screenshots: files,
		consoleErrors,
		apiRequests,
		externalRequests,
		routes: routeResults,
		responsive: responsiveResults,
		axe: axeResults.map(({ label, violations }) => ({ label, violations })),
		reducedMotion: true,
		zoom200: "PASS",
		rtl: "PASS",
		chatScrollTrap: "PASS",
	};
	await fs.writeFile(path.join(OUTPUT, "verification.json"), JSON.stringify(report, null, 2), "utf8");
	console.log(JSON.stringify(report, null, 2));
} finally {
	await browser.close();
}
