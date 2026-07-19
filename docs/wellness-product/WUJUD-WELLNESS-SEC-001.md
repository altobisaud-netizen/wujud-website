# WUJUD-WELLNESS-SEC-001 â€” Upgrade and validate wellness Worker Hono runtime

Status: **PLANNED â€” NOT STARTED**
Created: 2026-07-19
Prerequisite for: any production wellness website deployment
Out of scope for: moderated product-review commits and preview redeploys in WUJUD-SARA-WELLNESS-002

## Problem

`hono@4.11.1` is a direct dependency of the Wujud website Worker (`src/worker/index.ts`) and is present in the wellness preview Worker bundle. Current advisories affect older 4.x releases. Classification from the product-review cycle:

**INCLUDED_IN_WELLNESS_RUNTIME**

The public wellness pages are static assets and do not call product APIs. The Worker still ships Hono for asset/API hosting, so the advisory remains a production blocker.

## Required outcome

Upgrade only Hono (and the lockfile) to the smallest current compatible 4.x release that resolves applicable advisories, then validate the shared Worker without changing frozen SARA Business product behaviour beyond the runtime dependency.

## Scope

In scope:

- review advisories against actual imports (`Hono`, `cors`) and routes
- upgrade `hono` only
- regenerate lockfile for that upgrade
- Worker TypeScript, CORS/API validation, wellness build/static generation, direct route checks, and preview browser suite
- dry-run and non-production deploy only
- documented rollback to the previous Worker version

Out of scope:

- broad dependency upgrades
- production `wujud-website` deploy without separate approval
- Sara API / customer-app / Meta / WhatsApp / Business database changes
- legal, pricing, or account-system work

## Acceptance

- [ ] Advisory review recorded against used Hono features
- [ ] Hono upgraded and lockfile updated in an isolated change
- [ ] All required verification passes
- [ ] Non-production Worker verified
- [ ] Rollback version recorded
- [ ] Explicit approval obtained before production deploy

## Reference

- `docs/wellness-product/runtime-advisory.md`
- Preview freeze: `docs/wellness-product/product-review/review-build.md`
