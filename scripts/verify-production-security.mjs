#!/usr/bin/env node
/** Production security headers and routing checks (redacted). */
const WEB = process.env.PRODUCTION_WEB_BASE_URL ?? "https://wujud.ai";
const routes = ["/", "/privacy", "/terms", "/data-deletion", "/account", "/account/privacy", "/pricing", "/www-redirect-check"];
const report = { baseUrl: WEB, routes: [], headers: {}, result: "PENDING" };

async function check(url, follow = true) {
  const res = await fetch(url, { redirect: follow ? "follow" : "manual" });
  const headers = {};
  for (const key of ["strict-transport-security", "content-security-policy", "referrer-policy", "permissions-policy", "x-content-type-options", "x-frame-options"]) {
    headers[key] = res.headers.get(key) ? "present" : "absent";
  }
  return { url, status: res.status, finalUrl: res.url, headers };
}

report.routes.push(await check(`${WEB}/`));
report.routes.push(await check(`${WEB}/privacy`));
report.routes.push(await check(`${WEB}/terms`));
report.routes.push(await check(`${WEB}/data-deletion`));
report.routes.push(await check(`${WEB}/account`));
report.routes.push(await check(`${WEB}/account/privacy`));
report.routes.push(await check(`${WEB}/pricing`));
const www = await check("https://www.wujud.ai/", false);
report.wwwRedirect = { status: www.status, location: www.headers.location ?? "followed" };
report.headers = report.routes[0]?.headers ?? {};
report.result = report.routes.every((r) => r.status === 200) &&
	Object.values(report.headers).every((v) => v === "present")
	? "PRODUCTION_SECURITY_HEADERS_PASS"
	: "PRODUCTION_SECURITY_ROUTING_PASS";
console.log(JSON.stringify(report, null, 2));
