# Wellness Preview Runtime Advisory

Assessment date: 2026-07-19
Classification: **INCLUDED_IN_WELLNESS_RUNTIME**

## Evidence

- `hono@4.11.1` is a direct dependency.
- `src/worker/index.ts` imports `Hono` and `hono/cors`.
- The Cloudflare Vite build emits the Worker bundle used by the wellness preview.
- Therefore Hono is present in the deployed wellness Worker even though the public wellness pages themselves are static assets and do not call product APIs.
- `npm audit` reports advisories affecting versions below later 4.x releases, including high-severity JWT-related advisories. This Worker does not import Hono JWT middleware, but package presence still requires a reviewed upgrade.

## Scoped upgrade plan (not executed)

1. Assign a runtime owner and review every Hono advisory against the actual imports (`Hono`, `cors`) and Worker routes.
2. Select the smallest current compatible Hono 4.x release that resolves all applicable advisories; do not combine this with unrelated dependency upgrades.
3. Update only `hono` and the lockfile in a separate change.
4. Re-run Worker TypeScript, API validation tests, CORS tests, wellness build/static generation, direct route checks, and the complete preview browser suite.
5. Deploy only to a non-production Worker, verify the Worker bundle/version, and perform a rollback rehearsal.
6. Obtain explicit approval before changing the production Worker.

The frozen Business archive remains unchanged. This issue belongs to the shared website Worker runtime, not only to historical source.
