/** Production security headers applied to static/SPA responses. */
export function productionSecurityHeaders(): Record<string, string> {
  const api = "https://wellness-api-production-production.up.railway.app";
  const clerkHosts = [
    "https://clerk.wujud.ai",
    "https://accounts.wujud.ai",
    "https://*.clerk.accounts.dev",
    "https://clerk.com",
    "https://*.clerk.com",
  ].join(" ");
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self' https://accounts.wujud.ai https://clerk.wujud.ai",
    "script-src 'self' 'unsafe-inline' https://clerk.wujud.ai https://accounts.wujud.ai https://*.clerk.accounts.dev https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    `connect-src 'self' ${api} ${clerkHosts} https://challenges.cloudflare.com`,
    "frame-src https://accounts.wujud.ai https://clerk.wujud.ai https://*.clerk.accounts.dev https://challenges.cloudflare.com",
  ].join("; ");
  return {
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Content-Security-Policy": csp,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "X-Frame-Options": "DENY",
  };
}

export async function fetchAssetsWithSecurityHeaders(
  assetsFetch: (request: Request) => Promise<Response>,
  request: Request,
): Promise<Response> {
  const response = await assetsFetch(request);
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(productionSecurityHeaders())) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
