# Operational staging freeze — WUJUD Wellness frontend (OPS-007)

**Status:** Technically ready — pilot authorization required  
**Recorded:** 2026-07-22 (OPS-007)  
**Branch:** `feature/wujud-wellness-operational-accounts`

## Railway

| Item | Value |
|------|--------|
| Project | `wujud-wellness-staging` |
| Service | `wellness-web-staging` |
| URL | `https://staging-wellness.wujud.ai` |
| Deployment | `1f708654-decf-422d-b6b8-f56c3b6d8df1` |

## Build variables

| Variable | Value |
|------|--------|
| `VITE_WELLNESS_API_BASE_URL` | `https://staging-wellness-api.wujud.ai` |
| `VITE_WELLNESS_WAITLIST_ENABLED` | `true` |
| `VITE_WELLNESS_AUTH_ENABLED` | `true` |
| `VITE_WELLNESS_PAYMENTS_ENABLED` | `false` |

## Waitlist result pages

Dedicated routes (not homepage fallback):

- `/waitlist/confirm`
- `/waitlist/unsubscribe`
- `/waitlist/delete`

Arabic + English, RTL, token stripped from URL after read.

## Tests

- Vitest: 119 passed
- Live staging smoke: dedicated waitlist pages HTTP 200, Clerk on `/account/privacy`, payments unavailable on `/pricing`

## Accessibility

Playwright + axe smoke on `/` and `/account/privacy` — script requires `browser.newContext()` fix for full OPS-007 matrix; manual Playwright pass on waitlist routes (1 h1, 1 main, RTL).

## Payment gate

Checkout and entitlements remain disabled in UI flags.

## Known limitations

- Full Clerk account E2E (sign-up code entry) not automated in OPS-007
- Full axe matrix across all operational screens pending script update

## Governance

Closed operational staging pilot authorization still required from product owner.
