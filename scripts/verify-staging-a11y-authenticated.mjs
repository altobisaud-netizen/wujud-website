#!/usr/bin/env node
/**
 * OPS-009 authenticated accessibility matrix.
 * Creates ephemeral Playwright storage via Clerk sign-in token (never committed).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const baseUrl = process.env.STAGING_WEB_BASE_URL ?? "https://staging-wellness.wujud.ai";
const apiBase = process.env.STAGING_API_BASE_URL ?? "https://staging-wellness-api.wujud.ai";
const backendRoot =
	process.env.WELLNESS_BACKEND_ROOT ??
	path.resolve(import.meta.dirname, "..", "..", "wujud-wellness-platform");
const storagePath =
	process.env.AUTH_STORAGE_PATH ??
	path.join(process.env.TEMP ?? process.env.TMP ?? "/tmp", "wujud-ops009-auth-storage.json");

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

async function loadEnvFile(file) {
	try {
		const text = await fs.readFile(file, "utf8");
		for (const line of text.split(/\r?\n/)) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith("#")) continue;
			const idx = trimmed.indexOf("=");
			if (idx === -1) continue;
			const key = trimmed.slice(0, idx).trim();
			let value = trimmed.slice(idx + 1).trim();
			if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
				value = value.slice(1, -1);
			}
			if (!process.env[key]) process.env[key] = value;
		}
	} catch {
		/* optional */
	}
}

async function clerk(pathname, init = {}) {
	const res = await fetch(`https://api.clerk.com/v1${pathname}`, {
		...init,
		headers: {
			Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
			"Content-Type": "application/json",
			...(init.headers ?? {}),
		},
	});
	return res.json().catch(() => ({}));
}

async function sessionJwt(userId) {
	const session = await clerk("/sessions", { method: "POST", body: JSON.stringify({ user_id: userId }) });
	if (!session?.id) return null;
	const token = await clerk(`/sessions/${session.id}/tokens`, { method: "POST", body: "{}" });
	return token?.jwt ?? null;
}

async function resolveConfirmedUserId() {
	const inbox = process.env.INTERNAL_TEST_INBOX;
	if (inbox) {
		const users = await clerk(`/users?email_address=${encodeURIComponent(inbox)}&limit=1`);
		const user = Array.isArray(users) ? users[0] : users?.data?.[0];
		if (user?.id) return user.id;
	}
	const recent = await clerk("/users?limit=10&order_by=-last_active_at");
	const list = Array.isArray(recent) ? recent : recent?.data ?? [];
	let best = { userId: null, score: -1 };
	for (const row of list) {
		if (!row?.id) continue;
		const jwt = await sessionJwt(row.id);
		if (!jwt) continue;
		const profile = await fetch(`${apiBase}/api/v1/me/profile-draft`, {
			headers: { Authorization: `Bearer ${jwt}` },
		}).then((r) => r.json());
		const status = profile?.data?.status;
		const keyCount = Object.keys(profile?.data?.structured ?? {}).length;
		const score = (status === "CONFIRMED" ? 100 : status === "REVIEW_REQUIRED" ? 50 : 0) + keyCount;
		if (score > best.score) best = { userId: row.id, score };
	}
	return best.userId;
}

async function createEphemeralStorageState(browser) {
	await loadEnvFile(path.join(backendRoot, ".env.local"));
	if (!process.env.CLERK_SECRET_KEY) throw new Error("CLERK_SECRET_KEY required");
	const userId = await resolveConfirmedUserId();
	if (!userId) throw new Error("Could not resolve confirmed staging user");
	const tokenRes = await clerk("/sign_in_tokens", { method: "POST", body: JSON.stringify({ user_id: userId }) });
	const ticket = tokenRes?.token;
	if (!ticket) throw new Error("Could not create sign-in token");
	const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
	const page = await context.newPage();
	await page.goto(`${baseUrl}/account/privacy?__clerk_ticket=${encodeURIComponent(ticket)}`, {
		waitUntil: "networkidle",
		timeout: 120000,
	});
	await page.waitForFunction(() => Boolean(window.Clerk?.session), undefined, { timeout: 60000 });
	await page.goto(`${baseUrl}/account/privacy`, { waitUntil: "domcontentloaded", timeout: 90000 });
	await context.storageState({ path: storagePath });
	await context.close();
}

const viewports = [
	{ label: "1440", width: 1440, height: 900 },
	{ label: "320", width: 320, height: 800 },
	{ label: "390", width: 390, height: 844 },
	{ label: "430", width: 430, height: 932 },
];

const scenarios = [
	{ id: "account-privacy-authenticated", path: "/account/privacy", locale: "en", requiresSignedIn: true },
	{ id: "account-privacy-authenticated-ar", path: "/account/privacy", locale: "ar", requiresSignedIn: true },
	{ id: "pricing-unavailable-authenticated", path: "/pricing", locale: "en", requiresSignedIn: false },
	{ id: "homepage-en-authenticated", path: "/", locale: "en", requiresSignedIn: false },
	{ id: "homepage-ar-authenticated", path: "/", locale: "ar", requiresSignedIn: false },
];

const results = [];
const browser = await chromium.launch({ executablePath: await browserPath(), headless: true });
await createEphemeralStorageState(browser);

for (const scenario of scenarios) {
	for (const viewport of viewports) {
		const context = await browser.newContext({
			viewport: { width: viewport.width, height: viewport.height },
			reducedMotion: "reduce",
			locale: scenario.locale === "ar" ? "ar" : "en-US",
			storageState: storagePath,
		});
		const page = await context.newPage();
		await page.addInitScript((locale) => {
			window.localStorage.setItem("wujud-wellness-locale", locale);
		}, scenario.locale);
		await page.goto(`${baseUrl}${scenario.path}`, { waitUntil: "domcontentloaded", timeout: 90000 });
		await page.waitForFunction(() => Boolean(window.Clerk?.session), undefined, { timeout: 60000 }).catch(() => {});
		const signedIn = await page.evaluate(() => Boolean(window.Clerk?.session));
		const axe = await new AxeBuilder({ page }).analyze();
		const blocking = axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
		const mainCount = await page.locator("main").count();
		const h1Count = await page.locator("h1").count();
		const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
		results.push({
			scenario: scenario.id,
			viewport: viewport.label,
			requiresSignedIn: scenario.requiresSignedIn,
			signedIn,
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
await fs.unlink(storagePath).catch(() => {});

const failed = results.filter(
	(r) =>
		(r.requiresSignedIn && !r.signedIn) ||
		r.blockingCount > 0 ||
		r.horizontalOverflow ||
		r.mainCount !== 1 ||
		r.h1Count < 1,
);
const report = {
	result: failed.length === 0 ? "FULL_AUTHENTICATED_A11Y_PASS" : "REQUIRES_FINAL_STAGING_FIX",
	baseUrl,
	scenariosRun: results.length,
	failedCount: failed.length,
	viewports: viewports.map((v) => v.label),
	scenarios: scenarios.map((s) => s.id),
	failures: failed.map((r) => ({
		scenario: r.scenario,
		viewport: r.viewport,
		signedIn: r.signedIn,
		blockingCount: r.blockingCount,
		blockingIds: r.blockingIds,
		mainCount: r.mainCount,
		h1Count: r.h1Count,
		horizontalOverflow: r.horizontalOverflow,
	})),
};

const out = path.resolve(import.meta.dirname, "..", "docs", "wellness-product", "ops-009-a11y-authenticated-report.json");
await fs.mkdir(path.dirname(out), { recursive: true });
await fs.writeFile(out, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ result: report.result, failedCount: report.failedCount }, null, 2));
process.exit(failed.length ? 1 : 0);
