import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist", "client");
const METADATA_SOURCE = path.join(
	ROOT,
	"src",
	"react-app",
	"wellness",
	"wellnessRouteMetadata.ts",
);
const targetArg = process.argv.find((argument) => argument.startsWith("--target="));
const target = targetArg?.split("=")[1] ?? "production";

if (!["preview", "production"].includes(target)) {
	throw new Error(`Unknown static target: ${target}`);
}

const origins = {
	preview: "https://wujud-sara-wellness-preview.altobi-saud.workers.dev",
	production: "https://wujud.ai",
};
const origin = process.env.WELLNESS_CANONICAL_ORIGIN ?? origins[target];
const robots = target === "preview" ? "noindex, nofollow" : "index, follow";

const metadataTypeScript = await fs.readFile(METADATA_SOURCE, "utf8");
const metadataJavaScript = ts.transpileModule(metadataTypeScript, {
	compilerOptions: {
		module: ts.ModuleKind.ES2022,
		target: ts.ScriptTarget.ES2022,
	},
}).outputText;
const metadataModule = await import(
	`data:text/javascript;base64,${Buffer.from(metadataJavaScript).toString("base64")}`
);
const { WELLNESS_PUBLIC_ROUTES, wellnessRouteMetadata } = metadataModule;

const staticContent = {
	"/": {
		h1: "Build healthier routines, one realistic step at a time.",
		summary:
			"SARA runs simple daily check-ins, helps you choose achievable habits, and adapts your wellness journey as your routine changes.",
		sections: [
			[
				"Try a short check-in with SARA",
				"Answer a few easy questions and see how a daily wellness check-in feels. No signup required and nothing from this demo is saved.",
			],
			[
				"Clear safety boundaries",
				"Wellness SARA offers general wellness support and does not replace professional healthcare.",
			],
		],
	},
	"/how-it-works": {
		h1: "A practical wellness journey that adapts with you",
		summary:
			"SARA helps you understand your current routine, choose realistic priorities, and check in regularly.",
		sections: [
			["Tell SARA what you want to improve", "Start with a simple conversation about your goals and routine."],
			["Build a realistic personal routine", "Choose small actions that fit ordinary days."],
			["Check in and reflect each day", "Use brief, non-judgmental prompts to notice progress."],
			["Adjust your journey as life changes", "Adapt plans without punishment for missed days."],
		],
	},
	"/eight-week-journey": {
		h1: "Your eight-week wellness journey",
		summary:
			"Learn your routine, test small actions and build independence. The journey is flexible and does not guarantee health outcomes.",
		sections: [
			["Week 1 — Understand your routine", "Notice your current rhythm without judgment."],
			["Week 2 — Create one realistic action", "Choose a step small enough for ordinary days."],
			["Week 3 — Improve consistency", "Make the helpful action easier to repeat."],
			["Week 4 — Review barriers and simplify", "Reduce friction instead of adding pressure."],
			["Week 5 — Build on what works", "Add only what your routine can support."],
			["Week 6 — Recover after missed days", "Return gently when plans change, without shame or punishment."],
			["Week 7 — Strengthen independence", "Practice choosing your own next action."],
			["Week 8 — Create a continuation plan", "Keep the tools that fit your real life."],
		],
	},
	"/pricing": {
		h1: "Plans designed for your wellness journey",
		summary:
			"Wellness SARA is currently available through controlled early access. Join the launch list and be the first to know when full plans and pricing become available.",
		sections: [
			["Planned plan features", "Personal wellness profile, daily check-ins, adaptive routine planning, progress reflection, English and Arabic support, and privacy and account controls."],
			["Pricing", "Pricing will be announced after the early-access phase. No payment is required to join the launch list."],
		],
	},
	"/safety": {
		h1: "Safety and privacy",
		summary:
			"Wellness SARA offers general wellness support with clear medical boundaries and meaningful user control.",
		sections: [
			["General wellness only", "SARA supports everyday routines. It does not diagnose conditions, recommend medication or provide treatment."],
			["Qualified professionals", "Wellness SARA does not replace qualified healthcare professionals."],
			["Pause and privacy controls", "You can control reminders, pause your journey and request deletion from your account."],
			["Urgent support", "SARA is not an emergency service. If you need urgent help, contact local emergency services or appropriate qualified support now."],
		],
	},
	"/about": {
		h1: "Built with purpose in Oman",
		summary:
			"Wellness SARA is built by WUJUD.ai, an Oman-based technology initiative focused on practical, human-centered digital experiences.",
		sections: [
			["Our approach", "General wellness and habit support, privacy and consent by design, English and Arabic experience, no diagnosis or treatment, and user-controlled account and data options."],
		],
	},
	"/privacy": {
		h1: "Privacy Policy — Wellness SARA",
		summary:
			"How Wellness SARA by WUJUD.ai handles account data, consent choices, optional operational notifications and user controls.",
		sections: [
			[
				"Optional WhatsApp messaging",
				"WhatsApp is optional and requires explicit opt-in when activated. WhatsApp features are currently inactive until separately enabled.",
			],
			[
				"Your controls",
				"You may withdraw consent in account privacy settings. Stopping WhatsApp messages does not automatically delete your Wellness account.",
			],
			[
				"Separate from business systems",
				"Wellness SARA data is handled separately from archived SARA Business customer records.",
			],
		],
	},
	"/terms": {
		h1: "Terms of Use — Wellness SARA",
		summary:
			"Terms for Wellness SARA early access on WUJUD.ai, including general-wellness scope and clear service boundaries.",
		sections: [
			["General wellness only", "Wellness SARA supports general wellness routines and does not provide diagnosis, treatment, medication advice or emergency services."],
			["No guaranteed outcomes", "WUJUD does not promise specific health outcomes or uninterrupted availability."],
			["Early access limitations", "Payments, paid entitlements and automated AI WhatsApp conversation remain disabled unless explicitly enabled in a future authorized release."],
		],
	},
	"/data-deletion": {
		h1: "Data Deletion Instructions — Wellness SARA",
		summary:
			"How to request deletion of Wellness SARA account data and associated optional contact information.",
		sections: [
			["Signed-in deletion", "Use Account privacy after signing in to request account deletion or pause."],
			["Email request", "Email wujud.sales@gmail.com with subject “Data Deletion Request — Wellness SARA”."],
			["WhatsApp contact data", "Deletion requests cover associated optional WhatsApp contact information where applicable."],
		],
	},
	"/contact": {
		h1: "Contact Wellness SARA",
		summary:
			"Contact Wellness SARA support for account, privacy or data-deletion questions.",
		sections: [
			["Wellness support", "Email wujud.sales@gmail.com with “Wellness SARA support” in the subject line."],
			["Urgent or medical help", "Wellness SARA is not an emergency or medical service. Contact local emergency services when needed."],
		],
	},
};

function escapeHtml(value) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function staticFallback(route) {
	const content = staticContent[route];
	const navigation = WELLNESS_PUBLIC_ROUTES.map((pathName) => {
		const label =
			pathName === "/"
				? "Home"
				: pathName
						.slice(1)
						.split("-")
						.map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
						.join(" ");
		return `<a href="${pathName}">${label}</a>`;
	}).join("");
	const sections = content.sections
		.map(
			([heading, body]) =>
				`<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(body)}</p></section>`,
		)
		.join("");

	return `<main class="static-wellness" id="static-wellness-content">
		<header><a href="/" aria-label="WUJUD wellness home"><strong>WUJUD</strong></a><nav aria-label="Wellness pages">${navigation}</nav></header>
		<article>
			<p class="static-wellness__eyebrow">WUJUD × SARA</p>
			<h1>${escapeHtml(content.h1)}</h1>
			<p class="static-wellness__summary">${escapeHtml(content.summary)}</p>
			${sections}
		</article>
		<footer><p>Wellness SARA by WUJUD.ai · Wellness SARA provides general wellness and habit support. It does not provide medical diagnosis or treatment.</p></footer>
	</main>`;
}

const staticStyle = `<style id="static-wellness-style">
.static-wellness{box-sizing:border-box;max-width:72rem;margin:auto;padding:1.25rem;color:#15213d;font:1rem/1.65 system-ui,sans-serif}.static-wellness *{box-sizing:border-box}.static-wellness header{display:flex;gap:1rem;align-items:center;justify-content:space-between;flex-wrap:wrap;padding-block:1rem;border-bottom:1px solid #ded9ea}.static-wellness nav{display:flex;gap:.75rem;flex-wrap:wrap}.static-wellness a{color:#563a99}.static-wellness article{max-width:52rem;padding-block:3rem}.static-wellness h1{font-size:clamp(2rem,6vw,4rem);line-height:1.05}.static-wellness h2{margin-top:2rem}.static-wellness__eyebrow{color:#7052b6;font-weight:700;letter-spacing:.08em}.static-wellness__summary{font-size:1.2rem}.static-wellness section[lang=ar]{margin-top:3rem;padding:1.5rem;background:#f5f1fb;border-radius:1rem}.static-wellness footer{border-top:1px solid #ded9ea;padding-block:1rem}@media(max-width:420px){.static-wellness{padding:1rem}.static-wellness nav{font-size:.9rem}.static-wellness article{padding-block:2rem}}
</style>`;

function replaceHead(html, route, metadata) {
	const locale = metadata.en;
	const canonicalUrl = new URL(metadata.canonicalPath, origin).toString();
	const tags = `
	<title>${escapeHtml(locale.title)}</title>
	<meta name="description" content="${escapeHtml(locale.description)}" />
	<meta name="robots" content="${robots}" />
	<link rel="canonical" href="${canonicalUrl}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="${canonicalUrl}" />
	<meta property="og:title" content="${escapeHtml(locale.ogTitle)}" />
	<meta property="og:description" content="${escapeHtml(locale.ogDescription)}" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="${escapeHtml(locale.ogTitle)}" />
	<meta name="twitter:description" content="${escapeHtml(locale.ogDescription)}" />
	<meta name="wujud-route" content="${route}" />
	<meta name="wujud-static-target" content="${target}" />`;

	return html
		.replace(/<title>[\s\S]*?<\/title>/i, "")
		.replace(/<meta\s+name=["']description["'][\s\S]*?>/i, "")
		.replace(/<meta\s+name=["']robots["'][\s\S]*?>/i, "")
		.replace(/<link\s+rel=["']canonical["'][\s\S]*?>/i, "")
		.replace(/<meta\s+property=["']og:[^"']+["'][\s\S]*?>/gi, "")
		.replace(/<meta\s+name=["']twitter:[^"']+["'][\s\S]*?>/gi, "")
		.replace("</head>", `${tags}\n${staticStyle}\n</head>`);
}

const baseHtml = await fs.readFile(path.join(DIST, "index.html"), "utf8");

for (const route of WELLNESS_PUBLIC_ROUTES) {
	const routeHtml = replaceHead(baseHtml, route, wellnessRouteMetadata[route])
		.replace(/<div id="root"><\/div>/, `<div id="root">${staticFallback(route)}</div>`)
		.replace(/<noscript>[\s\S]*?<\/noscript>/i, "");
	const output = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, `${route.slice(1)}.html`);
	await fs.writeFile(output, routeHtml, "utf8");
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${WELLNESS_PUBLIC_ROUTES.map((route) => `  <url><loc>${new URL(route, origin)}</loc></url>`).join("\n")}
</urlset>
`;
await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

const robotsText =
	target === "preview"
		? "User-agent: *\nDisallow: /\n\n# Non-production preview deployment\n"
		: `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", origin)}\n`;
await fs.writeFile(path.join(DIST, "robots.txt"), robotsText, "utf8");

const report = {
	target,
	origin,
	robots,
	routes: WELLNESS_PUBLIC_ROUTES.map((route) => ({
		path: route,
		file: route === "/" ? "index.html" : `${route.slice(1)}.html`,
		title: wellnessRouteMetadata[route].en.title,
		h1: staticContent[route].h1,
	})),
};
await fs.writeFile(
	path.join(DIST, "wellness-static-report.json"),
	JSON.stringify(report, null, 2),
	"utf8",
);
console.log(JSON.stringify(report, null, 2));
