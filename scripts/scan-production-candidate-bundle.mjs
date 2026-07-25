#!/usr/bin/env node
/**
 * Scans a production Wellness build for forbidden origins and secret-like values.
 * Run after: WELLNESS_CANONICAL_ORIGIN=https://wujud.ai npm run build
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist", "client");
const FORBIDDEN = [
	{ id: "staging-wellness-domain", pattern: /staging-wellness\.wujud\.ai/i },
	{ id: "staging-api-domain", pattern: /staging-wellness-api\.wujud\.ai/i },
	{ id: "workers-dev-canonical", pattern: /wujud-website\.[\w-]+\.workers\.dev/i },
	{ id: "localhost-api", pattern: /https?:\/\/127\.0\.0\.1/i },
	{ id: "meta-access-token", pattern: /EAA[A-Za-z0-9]{20,}/ },
	{ id: "live-stripe-key", pattern: /sk_live_/ },
	{ id: "private-key-block", pattern: /BEGIN (RSA |OPENSSH )?PRIVATE KEY/ },
];

function walk(dir) {
	if (!fs.existsSync(dir)) return [];
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) return walk(full);
		if (/\.(js|css|html|json|txt|xml)$/.test(entry.name)) return [full];
		return [];
	});
}

const files = walk(DIST);
if (!files.length) {
	console.error(JSON.stringify({ status: "FAIL", error: "dist/client missing — run production build first" }, null, 2));
	process.exit(1);
}

const hits = [];
for (const file of files) {
	const text = fs.readFileSync(file, "utf8");
	for (const rule of FORBIDDEN) {
		if (rule.pattern.test(text)) {
			hits.push({ file: path.relative(ROOT, file), rule: rule.id });
		}
	}
}

const canonicalHits = [];
for (const file of files.filter((f) => f.endsWith(".html"))) {
	const text = fs.readFileSync(file, "utf8");
	if (/https:\/\/wujud\.ai/.test(text)) canonicalHits.push(path.relative(ROOT, file));
}

const report = {
	status: hits.length ? "FAIL" : "PASS",
	scannedFiles: files.length,
	canonicalOriginPresentInHtml: canonicalHits.length > 0,
	canonicalHtmlSampleCount: canonicalHits.length,
	hits,
};

console.log(JSON.stringify(report, null, 2));
process.exit(hits.length ? 1 : 0);
