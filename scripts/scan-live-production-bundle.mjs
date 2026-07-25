#!/usr/bin/env node
/** Scan live https://wujud.ai bundles for Clerk key type and forbidden refs. */
const BASE = process.env.PRODUCTION_WEB_BASE_URL ?? "https://wujud.ai";
const html = await fetch(BASE).then((r) => r.text());
const assets = [...html.matchAll(/\/assets\/[^"']+\.js/g)].slice(0, 8).map((m) => m[0]);
const report = { baseUrl: BASE, assetsScanned: 0, clerkKeyType: null, clerkKeyPrefix: null, forbidden: [], apiRefs: [] };
for (const asset of assets) {
	const text = await fetch(`${BASE}${asset}`).then((r) => r.text());
	report.assetsScanned += 1;
	const clerk = text.match(/pk_(live|test)_[A-Za-z0-9_-]+/);
	if (clerk && !report.clerkKeyType) {
		report.clerkKeyType = clerk[1];
		report.clerkKeyPrefix = `${clerk[0].slice(0, 15)}…`;
	}
	for (const [id, pattern] of [
		["staging-wellness-domain", /staging-wellness\.wujud\.ai/i],
		["workers-dev-canonical", /wujud-website\.[\w-]+\.workers\.dev/i],
	]) {
		if (pattern.test(text)) report.forbidden.push({ asset, id });
	}
	const api = text.match(/https:\/\/[a-z0-9.-]*wellness[a-z0-9.-]*/i);
	if (api) report.apiRefs.push(api[0]);
}
report.apiRefs = [...new Set(report.apiRefs)];
console.log(JSON.stringify(report, null, 2));
