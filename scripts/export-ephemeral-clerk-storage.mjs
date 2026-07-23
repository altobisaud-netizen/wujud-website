#!/usr/bin/env node
/**
 * Build ephemeral Playwright storage state from Clerk localStorage snapshot.
 * Usage: set CLERK_ENV_SNAPSHOT_PATH to JSON file with { clerkEnvironment: string }
 * Output: AUTH_STORAGE_PATH (default %TEMP%/wujud-ops009-auth-storage.json)
 */
import fs from "node:fs/promises";
import path from "node:path";

const snapshotPath = process.env.CLERK_ENV_SNAPSHOT_PATH;
const outPath =
	process.env.AUTH_STORAGE_PATH ??
	path.join(process.env.TEMP ?? process.env.TMP ?? "/tmp", "wujud-ops009-auth-storage.json");
const baseUrl = process.env.STAGING_WEB_BASE_URL ?? "https://staging-wellness.wujud.ai";
const origin = new URL(baseUrl).origin;

if (!snapshotPath) {
	console.error("CLERK_ENV_SNAPSHOT_PATH required");
	process.exit(1);
}

const raw = JSON.parse(await fs.readFile(snapshotPath, "utf8"));
const clerkEnvironment = raw.clerkEnvironment;
if (!clerkEnvironment || typeof clerkEnvironment !== "string") {
	console.error("Invalid snapshot");
	process.exit(1);
}

const locale = raw.locale ?? "en";
const storage = {
	cookies: [],
	origins: [
		{
			origin,
			localStorage: [
				{ name: "__clerk_environment", value: clerkEnvironment },
				{ name: "wujud-wellness-locale", value: locale },
			],
		},
	],
};

await fs.writeFile(outPath, `${JSON.stringify(storage, null, 2)}\n`);
console.log(JSON.stringify({ ok: true, outPath, origin, locale }, null, 2));
