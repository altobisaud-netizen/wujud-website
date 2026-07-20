/**
 * Prove layout-reference PNG is evidence-only and conversion assets ship correctly.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_CONVERSION = path.join(ROOT, "public", "images", "wellness", "conversion");
const LAYOUT_NAME = "wujud_sara_conversion_layout_reference";

const REQUIRED_WEBP = [
	"hero-arab-man-woman-outdoor.webp",
	"wellness-sleep-routine.webp",
	"wellness-daily-energy-man.webp",
	"wellness-balanced-meal.webp",
	"wellness-calm-hijabi-woman.webp",
	"wellness-consistent-movement-man.webp",
];

function assert(condition, message) {
	if (!condition) throw new Error(message);
}

async function walk(dir) {
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
			out.push(...(await walk(full)));
		} else {
			out.push(full);
		}
	}
	return out;
}

for (const name of REQUIRED_WEBP) {
	await fs.access(path.join(PUBLIC_CONVERSION, name));
}

const leaked = [];
for (const root of [path.join(ROOT, "public"), path.join(ROOT, "dist"), path.join(ROOT, "src")]) {
	for (const file of await walk(root)) {
		const base = path.basename(file).toLowerCase();
		if (base.includes("layout_reference") || base.includes("layout-reference") || base.includes(LAYOUT_NAME)) {
			leaked.push(path.relative(ROOT, file));
		}
	}
}
assert(leaked.length === 0, `layout reference leaked: ${leaked.join(", ")}`);

const sourceFiles = (await walk(path.join(ROOT, "src"))).filter((f) =>
	/\.(ts|tsx|css|html|js|mjs)$/.test(f),
);
const refs = [];
for (const file of sourceFiles) {
	const text = await fs.readFile(file, "utf8");
	if (
		text.includes(LAYOUT_NAME) ||
		text.includes("conversion_layout_reference") ||
		(/layout-reference\.png/.test(text) && !file.includes("layoutReference") && !file.endsWith(".test.ts"))
	) {
		// Allow mentions only in isolation test files
		if (
			!/\.test\.(ts|tsx)$/.test(file) &&
			!file.includes("check-wellness") &&
			!file.includes("layout-reference") &&
			!file.endsWith("lifestyleImagery.ts")
		) {
			refs.push(path.relative(ROOT, file));
		}
	}
}
assert(refs.length === 0, `layout reference referenced by source: ${refs.join(", ")}`);

console.log(
	JSON.stringify(
		{
			status: "PASS",
			requiredWebp: REQUIRED_WEBP,
			leaked: [],
			sourceReferences: [],
		},
		null,
		2,
	),
);
