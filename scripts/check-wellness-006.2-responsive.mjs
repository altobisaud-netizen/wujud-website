import fs from "node:fs";
import { chromium } from "playwright-core";

const BASE = process.env.WELLNESS_PREVIEW_URL ?? "http://127.0.0.1:4177";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const exe = fs.existsSync(EDGE) ? EDGE : CHROME;
const OUT = "ai-workflow/screenshots/WUJUD-SARA-WELLNESS-006.2/responsive-check.json";

const browser = await chromium.launch({ executablePath: exe, headless: true });
const widths = [320, 390, 430];
const out = [];

for (const w of widths) {
	const page = await browser.newPage({ viewport: { width: w, height: 844 } });
	await page.goto(BASE, { waitUntil: "networkidle" });
	await page.evaluate(() => localStorage.setItem("wujud-wellness-locale", "ar"));
	await page.reload({ waitUntil: "networkidle" });
	const metrics = await page.evaluate(() => {
		const chat = document.querySelector("#wellness-conversation");
		const image = document.querySelector(".hero-lifestyle");
		const doc = document.documentElement;
		const chatY = chat ? chat.getBoundingClientRect().top + window.scrollY : null;
		const imageY = image ? image.getBoundingClientRect().top + window.scrollY : null;
		const chatTop = chat?.getBoundingClientRect().top ?? 9999;
		return {
			overflowX: doc.scrollWidth > doc.clientWidth + 1,
			chatY,
			imageY,
			chatBeforeImage: chatY != null && imageY != null && chatY < imageY,
			chatInFirstViewport: chatTop < window.innerHeight,
		};
	});
	await page.evaluate(() => {
		document.documentElement.style.zoom = "2";
	});
	await page.waitForTimeout(250);
	const zoom200OverflowX = await page.evaluate(
		() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
	);
	out.push({ width: w, ...metrics, zoom200OverflowX });
	await page.close();
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const reqs = [];
page.on("request", (r) => reqs.push(r.url()));
await page.goto(BASE, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "طاقتي" }).click();
await page.waitForTimeout(900);
const bad = reqs.filter((u) =>
	/openai|anthropic|whatsapp|facebook\.com|graph\.facebook|clerk|stripe|google-analytics|gtag\/js/i.test(u),
);
await page.emulateMedia({ reducedMotion: "reduce" });
await page.reload({ waitUntil: "networkidle" });
await page.getByRole("button", { name: "طاقتي" }).click();
await page.waitForTimeout(80);
const typingVisible = await page.locator(".typing-indicator").count();
const payload = { responsive: out, productApiHits: bad, reducedMotionTypingBubbles: typingVisible };
console.log(JSON.stringify(payload, null, 2));
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
await browser.close();
