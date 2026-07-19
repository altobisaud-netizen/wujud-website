# WUJUD SARA Wellness Website Pivot Report

Cycle: WUJUD-SARA-WELLNESS-001
Branch: `feature/wujud-sara-wellness`
Baseline: `4463829` (last approved conversational WUJUD homepage)

## Status
Complete — frontend-only wellness preview. No production merge or deploy performed here.

## SARA Business archive
- Marked FROZEN in `docs/archive/sara-business/`.
- Local-only refs preserve stable baselines:
  - Website: branch `archive/sara-business-2026-07-19` and tag `sara-business-freeze-2026-07-19` at `4463829`.
  - Sara API: branch/tag `*-2026-07-19` at `c5ff7c8`.
- Historical Business source retained in Git; no history rewrite.
- Business homepage follow-up note preserved in a named website stash.

## New brand
WUJUD = wellness platform. SARA = daily AI wellness companion. Warm white, soft lavender/purple, muted green progress, deep navy text, rounded conversation bubbles, no clinical/robot/body-transformation imagery.

## Homepage
Prompt-first bilingual homepage: WUJUD header, wellness nav, hero headline, SARA opening message, six goal quick-choices, labelled composer, no signup required initially.

## Conversational discovery
Deterministic frontend-only six-stage flow (goal, routine, challenge, support time, coaching style, preview). No live AI. Medical/urgent free text returns a safety boundary and does not advance discovery.

## Eight-week program
All eight weeks rendered without guaranteed-outcome claims.

## Daily companion
Morning, daytime, evening and non-judgmental missed-day recovery examples.

## Safety and boundaries
Visible general-wellness limits, no diagnosis/medication, no replacement of professionals, user reminder/pause/delete control, wellness data separated from archived SARA Business.

## Human support
Prospective, truthful language; no claim of an operational live professional network.

## Pricing prototype
Placeholder plans labelled for commercial review; no finalized prices; no Business pricing reused.

## English and Arabic
Full EN/العربية switch, RTL, natural Arabic copy, safe handling of mixed English names.

## Accessibility
Zero axe serious/critical violations across reviewed states (initial homepage, personalized preview, all seven direct routes, Arabic mobile). Keyboard labels, visible focus, aria-live for complete SARA responses, reduced motion, skip link.

## Performance
Initial render makes no API/external request. Below-fold content and direct pages are code-split and lazy-loaded.

## Product isolation
No Business SARA API, customer-app org API, onboarding handoff, Meta/WhatsApp, Clerk, live AI SDK, or Business models/data. Verified in source and built bundle.

## Tests
68 Vitest tests pass; TypeScript clean; scoped ESLint clean; production build succeeds; `git diff --check` clean; secret scan clean.

## Screenshots
15 desktop/mobile screenshots plus `verification.json` under `ai-workflow/screenshots/WUJUD-SARA-WELLNESS-001/`.

## Deviations
Account CTA intentionally disabled/prototype-only (no account backend). System font stack used instead of a remote web font so the initial homepage makes zero external requests.

## Unresolved issues
- Archived Hono Worker dependency has a high-severity advisory; upgrade before any production deployment.
- Archive refs and uncommitted Sara API work remain local-only.
- Legal/privacy/safety/commercial-pricing/route-retirement decisions need named-owner approval before a public cutover.

## Final recommendation
READY FOR WELLNESS WEBSITE PREVIEW
