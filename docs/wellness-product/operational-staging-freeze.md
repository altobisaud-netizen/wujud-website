# Operational staging freeze — WUJUD Wellness frontend (OPS-009)

**Status:** TECHNICALLY READY — PILOT AUTHORIZATION REQUIRED  
**Governance:** PENDING GOVERNANCE APPROVAL (backend: `closed-pilot-authorization.md`)  
**Recorded:** 2026-07-23 (OPS-009 completion)  
**Branch:** `feature/wujud-wellness-operational-accounts`  
**Commit:** `1354b98`

## Railway

| Item | Value |
|------|--------|
| Service | `wellness-web-staging` |
| URL | `https://staging-wellness.wujud.ai` |

## Accessibility

| Matrix | Result | Evidence |
|--------|--------|----------|
| Unauthenticated operational | PASS (`FULL_OPERATIONAL_A11Y_PASS`) | `ops-008-a11y-report.json` |
| Authenticated Clerk session | PASS (`FULL_AUTHENTICATED_A11Y_PASS`) | `ops-009-a11y-authenticated-report.json` |

Authenticated matrix uses ephemeral Clerk sign-in token storage (never committed). Pricing route loads without Clerk hydration; auth-gated checks apply only to `/account/privacy`.

### Authenticated routes × viewports

| Route | Locales | Viewports |
|-------|---------|-----------|
| `/account/privacy` | en, ar | 1440, 320, 390, 430 |
| `/pricing` | en | 1440, 320, 390, 430 |
| `/` | en, ar | 1440, 320, 390, 430 |

## Frontend quality gates (OPS-009)

| Gate | Result |
|------|--------|
| Unit tests | PASS — 119/119 |
| Production build | PASS |
| Secret scan (marketing sources) | PASS — 4/4 isolation tests |
| Clean-clone reproducibility | PASS — build + 119 tests |

## Payment gate

`VITE_WELLNESS_PAYMENTS_ENABLED=false`; pricing remains preview/unavailable.

## Governance

**Recommendation:** TECHNICALLY READY — PILOT AUTHORIZATION REQUIRED

Closed operational staging pilot authorization is **pending** governance approval. Authoritative authorization record: backend repository `docs/operational-foundation/closed-pilot-authorization.md`.

This freeze does **not** authorize production deployment, public launch, or merge to `main`.
