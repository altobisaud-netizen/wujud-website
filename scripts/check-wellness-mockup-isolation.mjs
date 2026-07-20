/**
 * Prove the Arabic design mockup is evidence-only and not shipped.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MOCKUP_NAME = "design-reference-arabic-mockup.png";
const ALLOWED_DIR = path.join(
	ROOT,
	"ai-workflow",
	"screenshots",
	"WUJUD-SARA-WELLNESS-005",
);

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

const allowedPath = path.join(ALLOWED_DIR, MOCKUP_NAME);
await fs.access(allowedPath);

const forbiddenRoots = [
	path.join(ROOT, "public"),
	path.join(ROOT, "dist"),
	path.join(ROOT, "src"),
];

const leaked = [];
for (const root of forbiddenRoots) {
	for (const file of await walk(root)) {
		if (path.basename(file) === MOCKUP_NAME || /ChatGPT_Image_Jul_20__2026/i.test(file)) {
			leaked.push(path.relative(ROOT, file));
		}
	}
}
assert(leaked.length === 0, `mockup leaked into app paths: ${leaked.join(", ")}`);

const sourceFiles = (await walk(path.join(ROOT, "src"))).filter((f) =>
	/\.(ts|tsx|css|html|js|mjs)$/.test(f),
);
const references = [];
for (const file of sourceFiles) {
	const text = await fs.readFile(file, "utf8");
	if (
		text.includes(MOCKUP_NAME) ||
		text.includes("ChatGPT_Image_Jul_20__2026") ||
		text.includes("design-reference-arabic-mockup")
	) {
		references.push(path.relative(ROOT, file));
	}
}
assert(references.length === 0, `mockup referenced by source: ${references.join(", ")}`);

console.log(
	JSON.stringify(
		{
			status: "PASS",
			mockupPath: path.relative(ROOT, allowedPath).replace(/\\/g, "/"),
			leaked: [],
			sourceReferences: [],
			note: "Mockup is evidence-only under ai-workflow/screenshots/WUJUD-SARA-WELLNESS-005/",
		},
		null,
		2,
	),
);
