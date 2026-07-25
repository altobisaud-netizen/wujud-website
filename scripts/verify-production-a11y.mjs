#!/usr/bin/env node
/** Production unauthenticated a11y matrix for https://wujud.ai */
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const baseUrl = process.env.PRODUCTION_WEB_BASE_URL ?? "https://wujud.ai";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

async function browserPath() {
  for (const candidate of [EDGE, CHROME]) {
    try { await fs.access(candidate); return candidate; } catch {}
  }
  throw new Error("No Edge/Chrome found");
}

const scenarios = [
  { id: "homepage-en", path: "/", locale: "en" },
  { id: "homepage-ar", path: "/", locale: "ar" },
  { id: "account-privacy-gate", path: "/account/privacy", locale: "en" },
  { id: "account-privacy-gate-ar", path: "/account/privacy", locale: "ar" },
  { id: "pricing-unavailable", path: "/pricing", locale: "en" },
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
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce", locale: scenario.locale === "ar" ? "ar" : "en-US" });
    const page = await context.newPage();
    await page.addInitScript((locale) => window.localStorage.setItem("wujud-wellness-locale", locale), scenario.locale);
    await page.goto(`${baseUrl}${scenario.path}`, { waitUntil: "domcontentloaded", timeout: 90000 });
    if (scenario.path === "/account/privacy") await page.waitForSelector("h1", { timeout: 15000 });
    const axe = await new AxeBuilder({ page }).analyze();
    const blocking = axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    const mainCount = await page.locator("main").count();
    const h1Count = await page.locator("h1").count();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
    results.push({ scenario: scenario.id, viewport: viewport.label, blockingCount: blocking.length, blockingIds: blocking.map((v) => v.id), mainCount, h1Count, horizontalOverflow: overflow, dir: await page.evaluate(() => document.documentElement.dir) });
    await context.close();
  }
}
await browser.close();
const failed = results.filter((r) => r.blockingCount > 0 || r.horizontalOverflow || r.mainCount !== 1 || r.h1Count < 1);
const report = { result: failed.length === 0 ? "FULL_OPERATIONAL_A11Y_PASS" : "REQUIRES_FIX", baseUrl, scenariosRun: results.length, failedCount: failed.length, failures: failed.map(({ scenario, viewport, blockingCount, blockingIds, mainCount, h1Count, horizontalOverflow }) => ({ scenario, viewport, blockingCount, blockingIds, mainCount, h1Count, horizontalOverflow })) };
const out = path.resolve(import.meta.dirname, "..", "docs", "wellness-product", "ops-010-production-a11y-report.json");
await fs.mkdir(path.dirname(out), { recursive: true });
await fs.writeFile(out, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ result: report.result, failedCount: report.failedCount }, null, 2));
process.exit(failed.length ? 1 : 0);
