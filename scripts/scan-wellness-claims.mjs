/**
 * Offline claim scan for wellness conversion preview.
 * Distinguishes production source vs test fixtures vs docs.
 * No network. Does not require ripgrep.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const FORBIDDEN = [
	/250,?000/i,
	/\b4\.9\b/,
	/\+42%/i,
	/\+31%/i,
	/\bguaranteed results?\b/i,
	/\bclinically proven\b/i,
	/\bdoctor approved\b/i,
	/\blose weight\b/i,
	/\brapid weight loss\b/i,
	/\bbalanced weight\b/i,
	/\btransform your body\b/i,
	/\bproven health outcomes\b/i,
	/\blimited time\b/i,
	/\bonly today\b/i,
	/\blast chance\b/i,
	/نتائج مضمونة/,
	/مثبت سريرياً/,
	/معتمد من الأطباء/,
	/خسارة وزن سريعة/,
	/لفترة محدودة/,
	/الفرصة الأخيرة/,
	/أكثر من 250 ألف/,
	/تقييم 4\.9/,
];

/** Allowed only when clearly a negation / disclaimer. */
const ALLOWED_GUARANTEED_CONTEXT =
	/(does not promise guaranteed|without promising guaranteed|not promise guaranteed|لا تَعِد بنتائج مضمونة|لا تعد بنتائج مضمونة|دون وعود بنتائج|not guaranteed outcomes|without guaranteed|not guaranteed|لا تَعِد|لا تعد)/i;

function isAllowedClaimLine(line, pattern) {
	if (/guaranteed/i.test(pattern.source) && ALLOWED_GUARANTEED_CONTEXT.test(line)) {
		return true;
	}
	if (/نتائج مضمونة|مضمون/.test(pattern.source)) {
		if (
			/لا تَعِد بنتائج مضمونة|لا تعد بنتائج مضمونة|لا نتائج مضمونة|دون وعود بنتائج|نتائج غير مضمونة|ليست نتائج مضمونة|without guaranteed|not guaranteed/.test(
				line,
			)
		) {
			return true;
		}
	}
	return false;
}

async function walk(dir, filter) {
	const out = [];
	let entries = [];
	try {
		entries = await fs.readdir(dir, { withFileTypes: true });
	} catch {
		return out;
	}
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (["node_modules", ".git", ".wrangler"].includes(entry.name)) continue;
			out.push(...(await walk(full, filter)));
		} else if (filter(full.replace(/\\/g, "/"))) {
			out.push(full);
		}
	}
	return out;
}

function classify(file) {
	const normalized = file.replace(/\\/g, "/");
	if (/\.test\.(ts|tsx|js|mjs)$/.test(normalized) || /\/__tests__\//.test(normalized)) {
		return "test";
	}
	if (/\/docs\//.test(normalized) || /\/ai-workflow\//.test(normalized)) {
		return "docs";
	}
	if (/\/dist\//.test(normalized)) return "dist";
	if (/\/public\//.test(normalized)) return "public";
	if (/\/scripts\/generate-wellness-static/.test(normalized)) return "generator";
	return "source";
}

function findMatches(text, file) {
	const hits = [];
	const lines = text.split(/\r?\n/);
	for (let i = 0; i < lines.length; i += 1) {
		const line = lines[i];
		for (const pattern of FORBIDDEN) {
			if (!pattern.test(line)) continue;
			if (isAllowedClaimLine(line, pattern)) continue;
			hits.push({
				file: path.relative(ROOT, file).replace(/\\/g, "/"),
				line: i + 1,
				pattern: String(pattern),
				snippet: line.trim().slice(0, 180),
				class: classify(file),
			});
		}
	}
	return hits;
}

const sourceFiles = await walk(path.join(ROOT, "src", "react-app", "wellness"), (f) =>
	/\.(ts|tsx|css|html)$/.test(f),
);
const publicFiles = await walk(path.join(ROOT, "public"), (f) => /\.(html|txt|xml|js|css|json)$/.test(f));
const distFiles = await walk(path.join(ROOT, "dist"), (f) => /\.(html|js|css|txt|xml|json)$/.test(f));
const metaFiles = [
	path.join(ROOT, "src", "react-app", "wellness", "wellnessRouteMetadata.ts"),
	path.join(ROOT, "src", "react-app", "wellness", "locale.ts"),
	path.join(ROOT, "index.html"),
	path.join(ROOT, "scripts", "generate-wellness-static.mjs"),
];

const allFiles = [...new Set([...sourceFiles, ...publicFiles, ...distFiles, ...metaFiles])];
const matches = [];
for (const file of allFiles) {
	try {
		const text = await fs.readFile(file, "utf8");
		matches.push(...findMatches(text, file));
	} catch {
		// skip unreadable
	}
}

const productViolations = matches.filter((m) => ["source", "dist", "public", "generator"].includes(m.class));
const testOnly = matches.filter((m) => m.class === "test");
const docsOnly = matches.filter((m) => m.class === "docs");

const report = {
	status: productViolations.length === 0 ? "PASS" : "FAIL",
	scannedFiles: allFiles.length,
	productViolations,
	testOnly,
	docsOnly,
};

console.log(JSON.stringify(report, null, 2));
if (productViolations.length > 0) process.exit(1);
