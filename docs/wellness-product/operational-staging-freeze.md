# Operational staging freeze — WUJUD Wellness frontend (OPS-009)

**Status:** Technically ready — pilot authorization required  
**Recorded:** 2026-07-23 (OPS-009 completion)  
**Branch:** `feature/wujud-wellness-operational-accounts`

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

Closed operational staging pilot authorization still required from product owner.
