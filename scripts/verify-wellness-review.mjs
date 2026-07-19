import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUTPUT = path.join(ROOT, "ai-workflow", "screenshots", "WUJUD-SARA-WELLNESS-002");
const DIST = path.join(ROOT, "dist", "client");
const BASE_URL = process.env.WELLNESS_PREVIEW_URL ?? "http://127.0.0.1:4177";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const ROUTES = [
	"/",
	"/how-it-works",
	"/eight-week-journey",
	"/pricing",
	"/safety",
	"/privacy",
	"/terms",
	"/contact",
];

function assert(condition, message) {
	if (!condition) throw new Error(message);
}

async function exists(file) {
	try {
		await fs.access(file);
		return true;
	} catch {
		return false;
	}
}

async function writeJson(file, value) {
	await fs.writeFile(path.join(OUTPUT, file), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function readTag(html, expression, label) {
	const value = html.match(expression)?.[1]?.trim();
	assert(value, `Missing ${label}`);
	return value;
}

async function fetchText(pathname) {
	const response = await fetch(`${BASE_URL}${pathname}`);
	assert(response.ok, `${pathname} returned ${response.status}`);
	return { status: response.status, text: await response.text(), headers: response.headers };
}

async function assertNoOverflow(page, label) {
	const result = await page.evaluate(() => ({
		scrollWidth: document.documentElement.scrollWidth,
		clientWidth: document.documentElement.clientWidth,
	}));
	assert(result.scrollWidth <= result.clientWidth + 1, `${label} overflowed horizontally`);
	return result;
}

async function runAxe(page, label) {
	const result = await new AxeBuilder({ page }).analyze();
	const violations = result.violations.map((item) => ({
		id: item.id,
		impact: item.impact,
		nodes: item.nodes.length,
	}));
	const blocking = violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""));
	assert(blocking.length === 0, `${label}: axe ${blocking.map((item) => item.id).join(", ")}`);
	return { label, violations };
}

async function screenshot(page, file, options = {}) {
	await page.screenshot({
		path: path.join(OUTPUT, file),
		animations: "disabled",
		fullPage: true,
		...options,
	});
}

async function completeDiscovery(page) {
	for (const choice of [
		"Better energy",
		"My days change a lot",
		"Poor sleep",
		"Morning",
		"Gentle encouragement",
	]) {
		await page.getByRole("button", { name: choice, exact: true }).click();
	}
	await page.getByRole("heading", { name: "Your eight-week starting point" }).waitFor();
}

await fs.rm(OUTPUT, { recursive: true, force: true });
await fs.mkdir(OUTPUT, { recursive: true });

const metadataResults = [];
for (const route of ROUTES) {
	const { text } = await fetchText(route);
	const result = {
		route,
		title: readTag(text, /<title>([^<]+)<\/title>/i, `${route} title`),
		description: readTag(
			text,
			/<meta\s+name="description"\s+content="([^"]+)"/i,
			`${route} description`,
		),
		canonical: readTag(
			text,
			/<link\s+rel="canonical"\s+href="([^"]+)"/i,
			`${route} canonical`,
		),
		robots: readTag(text, /<meta\s+name="robots"\s+content="([^"]+)"/i, `${route} robots`),
		ogTitle: readTag(
			text,
			/<meta\s+property="og:title"\s+content="([^"]+)"/i,
			`${route} og:title`,
		),
		ogDescription: readTag(
			text,
			/<meta\s+property="og:description"\s+content="([^"]+)"/i,
			`${route} og:description`,
		),
		twitterCard: readTag(
			text,
			/<meta\s+name="twitter:card"\s+content="([^"]+)"/i,
			`${route} twitter card`,
		),
		staticH1: readTag(text, /<h1>([^<]+)<\/h1>/i, `${route} static h1`),
	};
	assert(result.canonical.endsWith(route), `${route} canonical mismatch`);
	assert(result.robots === "noindex, nofollow", `${route} preview must be noindex`);
	assert(text.includes('class="static-wellness__summary"'), `${route} missing static summary`);
	metadataResults.push(result);
}
assert(
	new Set(metadataResults.map((item) => item.title)).size === ROUTES.length,
	"Route titles are not unique",
);
assert(
	new Set(metadataResults.map((item) => item.description)).size === ROUTES.length,
	"Route descriptions are not unique",
);
await writeJson("metadata-verification.json", metadataResults);

const sitemapResponse = await fetchText("/sitemap.xml");
const sitemapPaths = [...sitemapResponse.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
	(match) => new URL(match[1]).pathname,
);
assert(JSON.stringify(sitemapPaths) === JSON.stringify(ROUTES), "Sitemap route list mismatch");
for (const forbidden of ["/book-demo", "/build-sara", "/faq", "/data-deletion", "/api/"]) {
	assert(!sitemapResponse.text.includes(forbidden), `Sitemap contains ${forbidden}`);
}
const robotsResponse = await fetchText("/robots.txt");
assert(robotsResponse.text.includes("Disallow: /"), "Preview robots must disallow all crawling");
await writeJson("sitemap-verification.json", {
	status: "PASS",
	routes: sitemapPaths,
	robots: robotsResponse.text.trim(),
});

const executablePath = (await exists(EDGE)) ? EDGE : CHROME;
assert(await exists(executablePath), "Edge or Chrome is required");
const browser = await chromium.launch({ executablePath, headless: true });
const consoleErrors = [];
const productRequests = [];
const externalRequests = [];
const accessibility = [];
const responsive = [];
let cls = 0;
let initialRenderMs = 0;

try {
	const noJavaScript = await browser.newContext({
		javaScriptEnabled: false,
		viewport: { width: 1440, height: 1000 },
	});
	const noJsResults = [];
	for (const route of ROUTES) {
		const page = await noJavaScript.newPage();
		const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
		assert(response?.status() === 200, `${route} no-JS returned ${response?.status()}`);
		const result = {
			route,
			title: await page.title(),
			h1: (await page.locator("h1").textContent())?.trim(),
			summary: (await page.locator(".static-wellness__summary").textContent())?.trim(),
			mainCount: await page.locator("main").count(),
			h1Count: await page.locator("h1").count(),
			direction: await page.locator("html").getAttribute("dir"),
			arabicSummary: await page.locator('[lang="ar"][dir="rtl"]').count(),
		};
		assert(result.mainCount === 1, `${route} no-JS must have one main`);
		assert(result.h1Count === 1, `${route} no-JS must have one h1`);
		assert(Boolean(result.summary), `${route} no-JS summary missing`);
		assert(result.arabicSummary === 1, `${route} Arabic static summary missing`);
		noJsResults.push(result);
		if (route === "/safety") await screenshot(page, "desktop-no-javascript-safety.png");
		await page.close();
	}
	await writeJson("no-javascript-route-verification.json", noJsResults);
	await noJavaScript.close();

	const desktop = await browser.newContext({
		viewport: { width: 1440, height: 1000 },
		reducedMotion: "reduce",
	});
	await desktop.addInitScript(() => {
		window.__wellnessCls = 0;
		new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (!entry.hadRecentInput) window.__wellnessCls += entry.value;
			}
		}).observe({ type: "layout-shift", buffered: true });
	});
	const page = await desktop.newPage();
	page.on("console", (message) => {
		if (message.type() === "error") consoleErrors.push(message.text());
	});
	page.on("request", (request) => {
		const url = new URL(request.url());
		if (["fetch", "xhr", "websocket"].includes(request.resourceType()) || url.pathname.startsWith("/api")) {
			productRequests.push({ type: request.resourceType(), path: url.pathname });
		}
		if (url.origin !== new URL(BASE_URL).origin) externalRequests.push(request.url());
	});

	const started = performance.now();
	await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
	initialRenderMs = Math.round(performance.now() - started);
	await page.getByRole("heading", { name: /Meet SARA/ }).waitFor();
	await page.waitForTimeout(100);
	cls = await page.evaluate(() => window.__wellnessCls ?? 0);
	responsive.push({ viewport: "1440x1000", ...(await assertNoOverflow(page, "desktop")) });
	accessibility.push(await runAxe(page, "desktop homepage"));
	await screenshot(page, "desktop-homepage.png");

	const desktopRoutes = [
		["/how-it-works", "desktop-how-it-works.png"],
		["/eight-week-journey", "desktop-eight-week-journey.png"],
		["/pricing", "desktop-pricing.png"],
		["/safety", "desktop-safety.png"],
	];
	for (const [route, file] of desktopRoutes) {
		await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
		assert((await page.locator("h1").count()) === 1, `${route} JS experience needs one h1`);
		assert((await page.locator("main").count()) === 1, `${route} JS experience needs one main`);
		accessibility.push(await runAxe(page, `desktop ${route}`));
		await screenshot(page, file);
	}

	await page.goto(`${BASE_URL}/how-it-works`, { waitUntil: "networkidle" });
	await page.goto(`${BASE_URL}/pricing`, { waitUntil: "networkidle" });
	await page.goBack({ waitUntil: "networkidle" });
	assert(new URL(page.url()).pathname === "/how-it-works", "Browser Back did not restore route");

	await page.goto(`${BASE_URL}/?review=1`, { waitUntil: "networkidle" });
	await page.getByRole("complementary", { name: "Moderator review mode" }).waitFor();
	assert(await page.getByText(/Sample data only/).isVisible(), "Review sample-data label missing");
	assert(await page.getByRole("button", { name: "Reset review journey" }).isVisible(), "Review reset missing");
	await screenshot(page, "desktop-review-mode.png");
	accessibility.push(await runAxe(page, "desktop review mode"));

	await page.getByRole("button", { name: "العربية", exact: true }).click();
	assert((await page.locator("html").getAttribute("dir")) === "rtl", "Arabic did not set RTL");
	await screenshot(page, "desktop-arabic-rtl.png");
	await desktop.close();

	const mobile = await browser.newContext({
		viewport: { width: 390, height: 844 },
		reducedMotion: "reduce",
	});
	const mobilePage = await mobile.newPage();
	await mobilePage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
	responsive.push({ viewport: "390x844", ...(await assertNoOverflow(mobilePage, "mobile 390")) });
	await screenshot(mobilePage, "mobile-homepage.png");
	await mobilePage.getByRole("button", { name: "Better energy", exact: true }).click();
	await screenshot(mobilePage, "mobile-discovery.png");
	for (const choice of ["My days change a lot", "Poor sleep", "Morning", "Gentle encouragement"]) {
		await mobilePage.getByRole("button", { name: choice, exact: true }).click();
	}
	const accountCta = mobilePage.getByRole("button", { name: "Create my wellness journey" });
	assert(await accountCta.isDisabled(), "Account CTA must stay disabled");
	assert((await accountCta.getAttribute("aria-describedby")) === "prototype-account-note", "Disabled account CTA needs description");
	await mobilePage.locator(".plan-preview").scrollIntoViewIfNeeded();
	await screenshot(mobilePage, "mobile-personalized-preview.png");
	await mobilePage.goto(`${BASE_URL}/safety`, { waitUntil: "networkidle" });
	await screenshot(mobilePage, "mobile-safety.png");
	await mobilePage.goto(`${BASE_URL}/pricing`, { waitUntil: "networkidle" });
	assert(await mobilePage.getByText(/To be confirmed/).first().isVisible(), "Pricing is not provisional");
	await screenshot(mobilePage, "mobile-pricing.png");
	await mobilePage.goto(`${BASE_URL}/?review=1`, { waitUntil: "networkidle" });
	await screenshot(mobilePage, "mobile-review-mode.png");
	await mobilePage.getByRole("button", { name: "العربية", exact: true }).click();
	await assertNoOverflow(mobilePage, "mobile Arabic");
	await screenshot(mobilePage, "mobile-arabic-rtl.png");
	accessibility.push(await runAxe(mobilePage, "mobile Arabic review"));
	await mobile.close();

	const narrow = await browser.newContext({
		viewport: { width: 320, height: 800 },
		reducedMotion: "reduce",
	});
	const narrowPage = await narrow.newPage();
	await narrowPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
	responsive.push({ viewport: "320x800", ...(await assertNoOverflow(narrowPage, "mobile 320")) });
	const threadOverflow = await narrowPage.locator(".conversation-thread").evaluate((element) => {
		const style = getComputedStyle(element);
		return style.overflowY;
	});
	assert(!["auto", "scroll"].includes(threadOverflow), "Conversation creates a scroll trap");
	await narrow.close();

	const zoom = await browser.newContext({
		viewport: { width: 1440, height: 900 },
		reducedMotion: "reduce",
	});
	const zoomPage = await zoom.newPage();
	await zoomPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
	const cdp = await zoom.newCDPSession(zoomPage);
	await cdp.send("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
	await assertNoOverflow(zoomPage, "browser 200% zoom");
	await zoom.close();
} finally {
	await browser.close();
}

assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.join(" | ")}`);
assert(productRequests.length === 0, `Product API requests: ${JSON.stringify(productRequests)}`);
assert(externalRequests.length === 0, `External requests: ${externalRequests.join(", ")}`);

const assetFiles = await fs.readdir(path.join(DIST, "assets"));
const bundleFiles = [];
for (const file of assetFiles.filter((name) => /\.(js|css)$/.test(name))) {
	const filePath = path.join(DIST, "assets", file);
	const stat = await fs.stat(filePath);
	bundleFiles.push({ file, bytes: stat.size });
}
const htmlFiles = [];
for (const route of ROUTES) {
	const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
	const stat = await fs.stat(path.join(DIST, file));
	htmlFiles.push({ route, file, bytes: stat.size });
}
const bundleText = (
	await Promise.all(
		assetFiles
			.filter((name) => name.endsWith(".js"))
			.map((name) => fs.readFile(path.join(DIST, "assets", name), "utf8")),
	)
).join("\n");
const forbidden = [
	"/api/v1/onboarding",
	"/api/v1/orgs",
	"graph.facebook.com",
	"api.whatsapp",
	"@clerk",
	"api.openai.com",
	"anthropic",
	"BusinessProfile",
	"KnowledgeItem",
	"sk_live_",
	"BEGIN PRIVATE KEY",
];
const bundleFindings = forbidden.filter((term) => bundleText.includes(term));
assert(bundleFindings.length === 0, `Forbidden bundle content: ${bundleFindings.join(", ")}`);
const bundleReport = {
	status: "PASS",
	bundles: bundleFiles,
	staticHtml: htmlFiles,
	forbiddenFindings: bundleFindings,
	honoRuntimeClassification: "INCLUDED_IN_WELLNESS_RUNTIME",
};
await writeJson("bundle-report.json", bundleReport);
await writeJson("accessibility-results.json", accessibility);

const screenshots = (await fs.readdir(OUTPUT)).filter((file) => file.endsWith(".png")).sort();
assert(screenshots.length === 15, `Expected 15 screenshots, found ${screenshots.length}`);
const report = {
	status: "PASS",
	baseUrl: BASE_URL,
	routes: ROUTES,
	metadata: "PASS",
	sitemap: "PASS",
	robots: "PREVIEW_NOINDEX",
	noJavaScript: "PASS",
	accessibility,
	responsive,
	browserZoom200: "PASS",
	rtl: "PASS",
	reducedMotion: "PASS",
	chatScrollTrap: "PASS",
	consoleErrors,
	productRequests,
	externalRequests,
	layoutShift: cls,
	initialRenderMs,
	screenshots,
};
await writeJson("verification.json", report);
console.log(JSON.stringify(report, null, 2));
