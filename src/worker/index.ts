import { Hono } from "hono";
import { cors } from "hono/cors";
import { sendDemoRequestEmail, validateDemoPayload } from "./demoResend";
import { fetchAssetsWithSecurityHeaders } from "./productionSecurityHeaders";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.use(
	"/api/demo",
	cors({
		origin: "*",
		allowMethods: ["POST", "OPTIONS"],
		allowHeaders: ["Content-Type"],
	}),
);

app.post("/api/demo", async (c) => {
	let body: unknown;
	try {
		body = await c.req.json();
	} catch {
		return c.json({ success: false, error: "Invalid JSON body" }, 400);
	}

	const validated = validateDemoPayload(body);
	if (!validated.ok) {
		return c.json({ success: false, error: validated.error }, 400);
	}

	const key = c.env.RESEND_API_KEY;
	if (!key || typeof key !== "string") {
		return c.json({ success: false, error: "Email service is not configured" }, 500);
	}

	const sent = await sendDemoRequestEmail(key, validated.data);
	if (!sent.ok) {
		return c.json({ success: false, error: sent.error }, 502);
	}

	return c.json({ success: true });
});

/** Non-API routes: serve static assets / SPA index.html (e.g. /privacy). */
app.all("*", async (c) => fetchAssetsWithSecurityHeaders((req) => c.env.ASSETS.fetch(req), c.req.raw));

export default app;
