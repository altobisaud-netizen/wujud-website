/**
 * Cloudflare Pages Function — POST /api/demo
 *
 * Mirrors `src/worker/index.ts` + `src/worker/demoResend.ts` for deployments that use
 * the Pages `functions/` directory instead of a single Worker entry.
 *
 * Keep validation and Resend payload in sync with `src/worker/demoResend.ts`.
 *
 * **Resend "from":** uses `onboarding@resend.dev` until your domain is verified.
 * Then switch to: `WUJUD Website <noreply@wujud.ai>`
 *
 * Set `RESEND_API_KEY` in Pages → Settings → Environment variables (secret).
 */

type DemoPayload = {
	fullName: string;
	companyName: string;
	workEmail: string;
	phoneWhatsapp: string;
	companySize: string;
	interestedIn: string;
	mainChannel: string;
	message: string;
};

type Env = { RESEND_API_KEY?: string };

const INTERESTED = new Set(["Sara", "Qais", "Hawraa", "Not Sure"]);
const CHANNELS = new Set(["WhatsApp", "Instagram", "Website", "CRM", "Other"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimStr(v: unknown): string {
	return typeof v === "string" ? v.trim() : "";
}

function validateDemoPayload(body: unknown): { ok: true; data: DemoPayload } | { ok: false; error: string } {
	if (!body || typeof body !== "object") {
		return { ok: false, error: "Invalid request body" };
	}
	const o = body as Record<string, unknown>;
	const fullName = trimStr(o.fullName);
	const companyName = trimStr(o.companyName);
	const workEmail = trimStr(o.workEmail);
	const phoneWhatsapp = trimStr(o.phoneWhatsapp);
	const companySize = trimStr(o.companySize);
	const interestedIn = trimStr(o.interestedIn);
	const mainChannel = trimStr(o.mainChannel);
	const message = trimStr(o.message);

	if (!fullName) return { ok: false, error: "Full name is required" };
	if (!companyName) return { ok: false, error: "Company name is required" };
	if (!workEmail || !EMAIL_RE.test(workEmail)) return { ok: false, error: "A valid work email is required" };
	if (!phoneWhatsapp) return { ok: false, error: "Phone / WhatsApp is required" };
	if (!companySize) return { ok: false, error: "Company size is required" };
	if (!INTERESTED.has(interestedIn)) return { ok: false, error: 'Invalid "Interested in" selection' };
	if (!CHANNELS.has(mainChannel)) return { ok: false, error: "Invalid main channel selection" };
	if (message.length < 3) return { ok: false, error: "Message is required (at least a few characters)" };

	return {
		ok: true,
		data: {
			fullName,
			companyName,
			workEmail,
			phoneWhatsapp,
			companySize,
			interestedIn,
			mainChannel,
			message,
		},
	};
}

function buildEmailText(data: DemoPayload, submittedAt: string): string {
	return [
		"New WUJUD Demo Request",
		"",
		`Full Name: ${data.fullName}`,
		`Company Name: ${data.companyName}`,
		`Work Email: ${data.workEmail}`,
		`Phone / WhatsApp: ${data.phoneWhatsapp}`,
		`Company Size: ${data.companySize}`,
		`Interested In: ${data.interestedIn}`,
		`Main Channel: ${data.mainChannel}`,
		"",
		"Message:",
		data.message,
		"",
		`Submission time: ${submittedAt}`,
	].join("\n");
}

async function sendDemoRequestEmail(
	apiKey: string,
	data: DemoPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
	const submittedAt = new Date().toISOString();
	const text = buildEmailText(data, submittedAt);

	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from: "WUJUD Website <onboarding@resend.dev>",
			to: ["wujud.sales@gmail.com"],
			subject: "New WUJUD Demo Request",
			text,
		}),
	});

	if (!res.ok) {
		let detail = "";
		try {
			detail = JSON.stringify(await res.json());
		} catch {
			detail = await res.text();
		}
		return { ok: false, error: detail.slice(0, 280) || "Email could not be sent" };
	}

	return { ok: true };
}

function json(data: unknown, status = 200): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
		},
	});
}

export function onRequestOptions(): Response {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
	let body: unknown;
	try {
		body = await context.request.json();
	} catch {
		return json({ success: false, error: "Invalid JSON body" }, 400);
	}

	const validated = validateDemoPayload(body);
	if (!validated.ok) {
		return json({ success: false, error: validated.error }, 400);
	}

	const key = context.env.RESEND_API_KEY;
	if (!key || typeof key !== "string") {
		return json({ success: false, error: "Email service is not configured" }, 500);
	}

	const sent = await sendDemoRequestEmail(key, validated.data);
	if (!sent.ok) {
		return json({ success: false, error: sent.error }, 502);
	}

	return json({ success: true });
}
