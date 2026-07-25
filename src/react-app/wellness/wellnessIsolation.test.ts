import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve("src/react-app/wellness");

function walk(dir: string): string[] {
	const out: string[] = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) out.push(...walk(full));
		else if (/\.(ts|tsx|css)$/.test(entry.name) && !entry.name.endsWith(".test.ts")) {
			out.push(full);
		}
	}
	return out;
}

const forbiddenBusinessTerms = [
	/SaraOnboardingPage/,
	/ConversationalHomePage/,
	/saraApiClient/,
	/\/api\/v1\/onboarding/,
	/customer-app/,
	/website-demo-api/,
	/BusinessProfile/,
	/KnowledgeItem/,
	/SalesBehaviorProfile/,
	/ChannelSelectionProfile/,
	/from\s+["'][^"']*\/(conversational|onboarding|components)[^"']*["']/i,
	/\/api\/[^"']*(contact|conversation|message|lead|follow.?up)/i,
	/from\s+["'][^"']*whatsapp-web\.js|meta-sdk/i,
	/graph\.facebook\.com/i,
	/@clerk\/(clerk-react|backend|nextjs)/i,
	/VITE_SARA_API_BASE_URL/,
	/fetch\s*\(\s*[`'"][^`'"]*(sara-api|customer-app|rubbelx)/i,
];

const wellnessClerkAllowlist = /(?:operational\/(?:WellnessClerkProvider|WellnessAuthPanel|PrivacyAccountPage|useWellnessSessionToken|WhatsAppOptInSection|api|flags)|SiteHeader)\.tsx?$/;

describe("wellness product isolation", () => {
	it("imports and calls none of the archived SARA Business stack", () => {
		const files = walk(ROOT);
		expect(files.length).toBeGreaterThan(5);
		for (const file of files) {
			const source = fs.readFileSync(file, "utf8");
			const allowWellnessClerk = wellnessClerkAllowlist.test(file.replace(/\\/g, "/"));
			for (const forbidden of forbiddenBusinessTerms) {
				if (allowWellnessClerk && forbidden.source.includes("clerk")) continue;
				expect(source, `${file} must not match ${forbidden}`).not.toMatch(forbidden);
			}
		}
	});

	it("does not embed secrets or live AI SDK configuration", () => {
		for (const file of walk(ROOT)) {
			const source = fs.readFileSync(file, "utf8");
			expect(source, file).not.toMatch(/BEGIN (RSA |OPENSSH )?PRIVATE KEY/);
			expect(source, file).not.toMatch(/sk_(live|test)_[A-Za-z0-9]+|whsec_[A-Za-z0-9]+/);
			expect(source, file).not.toMatch(/OPENAI|ANTHROPIC|GEMINI|_API_KEY\s*=/);
		}
	});

	it("avoids medical, body-comparison and extreme diet claims", () => {
		const source = walk(ROOT)
			.map((file) => fs.readFileSync(file, "utf8"))
			.join("\n");
		expect(source).not.toMatch(/\b(diagnoses|prescribes|cures|treats)\b/i);
		expect(source).not.toMatch(/before[- ]and[- ]after|ideal body|summer body/i);
		expect(source).not.toMatch(
			/\b(try|follow|use|start|recommend)\s+(a\s+)?(crash diet|extreme diet|starvation|strict calorie target)/i,
		);
		expect(source).not.toMatch(/\b(we|wujud|sara)\s+(will\s+)?guarantees?\s+(health|weight|medical)/i);
		expect(source).toContain("does not diagnose medical conditions");
		expect(source).toContain("لا تشخّص سارة الحالات الطبية");
	});
});
