import fs from "node:fs";
import { chromium } from "playwright-core";

const BASE = process.env.WELLNESS_PREVIEW_URL ?? "http://127.0.0.1:4181";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const exe = fs.existsSync(EDGE) ? EDGE : CHROME;
const OUT = "ai-workflow/screenshots/WUJUD-SARA-WELLNESS-006.2/hierarchy-network-axe.json";

const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const reqs = [];
page.on("request", (r) => reqs.push(r.url()));
await page.goto(BASE, { waitUntil: "networkidle" });
await page.evaluate(() => localStorage.setItem("wujud-wellness-locale", "ar"));
await page.reload({ waitUntil: "networkidle" });

const desk = await page.evaluate(() => {
	const hero = document.querySelector(".conversion-hero");
	const cols = getComputedStyle(hero).gridTemplateColumns;
	const copy = document.querySelector(".hero-copy")?.getBoundingClientRect().width ?? 0;
	const image = document.querySelector(".hero-lifestyle")?.getBoundingClientRect().width ?? 0;
	const chat = document.querySelector("#wellness-conversation")?.getBoundingClientRect().width ?? 0;
	const chatTop = document.querySelector("#wellness-conversation")?.getBoundingClientRect().top ?? 9999;
	const total = copy + image + chat || 1;
	return {
		cols,
		copyPct: +((copy / total) * 100).toFixed(1),
		imagePct: +((image / total) * 100).toFixed(1),
		chatPct: +((chat / total) * 100).toFixed(1),
		chatInViewport: chatTop < innerHeight,
		robots: document.querySelector('meta[name="robots"]')?.content,
	};
});

await page.addScriptTag({
	url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js",
});
const axeSerious = await page.evaluate(async () => {
	const r = await window.axe.run(document, {
		runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
	});
	return r.violations
		.filter((v) => v.impact === "serious" || v.impact === "critical")
		.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }));
});

const mobile = [];
for (const w of [320, 390, 430]) {
	const p = await browser.newPage({ viewport: { width: w, height: 844 } });
	await p.goto(BASE, { waitUntil: "networkidle" });
	await p.evaluate(() => localStorage.setItem("wujud-wellness-locale", "ar"));
	await p.reload({ waitUntil: "networkidle" });
	mobile.push(
		await p.evaluate((width) => {
			const chatY =
				document.querySelector("#wellness-conversation").getBoundingClientRect().top + scrollY;
			const imageY = document.querySelector(".hero-lifestyle").getBoundingClientRect().top + scrollY;
			const choiceH = Math.min(
				...[...document.querySelectorAll(".choice-grid button")].map((b) =>
					b.getBoundingClientRect().height,
				),
			);
			return {
				w: width,
				chatBeforeImage: chatY < imageY,
				chatInViewport:
					document.querySelector("#wellness-conversation").getBoundingClientRect().top <
					innerHeight,
				overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
				choiceMinH: choiceH,
			};
		}, w),
	);
	await p.close();
}

const p2 = await browser.newPage({ viewport: { width: 1000, height: 800 } });
await p2.goto(BASE, { waitUntil: "networkidle" });
const stack = await p2.evaluate(() => {
	const hero = document.querySelector(".conversion-hero");
	const cols = getComputedStyle(hero).gridTemplateColumns;
	const chatY =
		document.querySelector("#wellness-conversation").getBoundingClientRect().top + scrollY;
	const imageY = document.querySelector(".hero-lifestyle").getBoundingClientRect().top + scrollY;
	const copyY = document.querySelector(".hero-copy").getBoundingClientRect().top + scrollY;
	return { cols, orderOk: copyY < chatY && chatY < imageY };
});
await p2.close();

const productApiHits = reqs.filter((u) =>
	/openai|anthropic|whatsapp|facebook\.com|clerk|stripe|google-analytics|gtag\/js/i.test(u),
);
const out = { desk, mobile, stack, axeSerious, productApiHits };
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
if (axeSerious.length || productApiHits.length || !stack.orderOk) process.exitCode = 2;
