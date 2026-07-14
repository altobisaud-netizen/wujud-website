import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src/react-app/conversational");

function walk(dir: string): string[] {
	const out: string[] = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) out.push(...walk(full));
		else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".test.ts")) {
			out.push(full);
		}
	}
	return out;
}

describe("conversational isolation from live APIs", () => {
	it("does not call demo API, Sara API, or Clerk", () => {
		const files = walk(ROOT);
		expect(files.length).toBeGreaterThan(5);
		for (const file of files) {
			const src = fs.readFileSync(file, "utf8");
			expect(src, file).not.toMatch(/staging-demo-api|production-demo-api|website-demo-api/);
			expect(src, file).not.toMatch(/\/api\/v1\/onboarding/);
			expect(src, file).not.toMatch(/@clerk|ClerkProvider/);
			expect(src, file).not.toMatch(/from\s+['"].*sara.*client/i);
		}
	});

	it("Book Demo still posts to /api/demo with the same payload shape", () => {
		const form = fs.readFileSync(
			path.resolve("src/react-app/components/DemoRequestForm.tsx"),
			"utf8",
		);
		expect(form).toMatch(/fetch\(\s*["']\/api\/demo["']/);
		expect(form).toMatch(/method:\s*["']POST["']/);
		for (const key of [
			"fullName",
			"companyName",
			"workEmail",
			"phoneWhatsapp",
			"companySize",
			"interestedIn",
			"mainChannel",
			"message",
		]) {
			expect(form).toContain(key);
		}
	});

	it("App retains legal and build-sara routes", () => {
		const app = fs.readFileSync(path.resolve("src/react-app/App.tsx"), "utf8");
		expect(app).toMatch(/\/build-sara/);
		expect(app).toMatch(/\/privacy/);
		expect(app).toMatch(/\/terms/);
		expect(app).toMatch(/\/data-deletion/);
		expect(app).toMatch(/\/pricing/);
		expect(app).toMatch(/\/faq/);
		expect(app).toMatch(/\/how-it-works/);
		expect(app).toMatch(/\/book-demo/);
		expect(app).toMatch(/ConversationalHomePage/);
	});
});

describe("secret scan (marketing sources)", () => {
	it("does not embed private keys or bearer tokens in conversational/content", () => {
		const targets = [
			...walk(ROOT),
			path.resolve("src/content/wujudProductCatalog.ts"),
			path.resolve("src/content/catalogValidation.ts"),
		];
		for (const file of targets) {
			const src = fs.readFileSync(file, "utf8");
			expect(src, file).not.toMatch(/BEGIN (RSA |OPENSSH )?PRIVATE KEY/);
			expect(src, file).not.toMatch(/sk_live_|sk_test_|whsec_/);
			expect(src, file).not.toMatch(/x-admin-api-key|ADMIN_API_KEY\s*=\s*['"][^'"]+['"]/);
		}
	});
});
