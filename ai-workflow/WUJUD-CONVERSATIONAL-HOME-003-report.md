# WUJUD Conversational Homepage Implementation Report

**Ticket:** WUJUD-CONVERSATIONAL-HOME-003  
**Repository:** Wujud-website  
**Branch:** `feature/conversational-homepage-design`  
**Date:** 2026-07-14  

## Status

Complete

## Existing handoff status

- Draft key: `wujud:sara-onboarding-draft:v1` (sessionStorage)
- Continue boundary: `continueAfterBuildSummary()` → `{ kind: "local_route", path: "/build-sara" }`
- Secure handoff client intentionally not wired (no Sara API calls)
- Clerk remains out of the marketing site

## Homepage shell

Prompt-first `/` with WUJUD.ai branding, human SARA portrait, approved headline and introduction, central composer, five quick actions, and four business starters. White / navy / purple identity.

## Conversation workspace

In-page transition to workspace with public mode label, thread, rich blocks, composer, desktop rail, mobile mode menu, and confirmation before leaving Build or Try progress.

## Intent routing

Deterministic `routeQuickAction` / `routeFreeText` with English and Arabic keywords. Ambiguous input → clarification choices. No LLM classifier.

## Build mode

Structured sequence (name → description → customers → channels → goals → summary), field validation against existing option enums, continuous draft persistence, refresh restore, unrelated-field preservation. Summary CTA: “Continue building SARA” → `/build-sara` via local boundary only.

## Try mode

Scripted businesses only: Harbor Roast, BrightCare Clinic, Oasis Homes, Noon & Night. Future states designed in UI. No live demo or Sara clients.

## Product catalog

`src/content/wujudProductCatalog.ts` is the single source of truth. `catalogValidation.ts` enforces unique IDs, EN/AR copy, canonical paths, availability statuses, and prices **$299 / $799 / Custom**.

## Pricing and FAQ

Conversation cards and `/pricing`, `/faq`, `/how-it-works` consume the same catalog objects.

## Book Demo

Reuses `DemoRequestForm` → `POST /api/demo` in conversation and on `/book-demo`.

## Sign-in boundary

`VITE_CUSTOMER_APP_URL` via `resolveSignInTarget`. Missing/invalid → safe unavailable state. No Clerk.

## English and Arabic

Visible language control, `document.dir`, Arabic UI copy, catalog AR content, locale preference key `wujud:preferred-locale:v1` (no conversation content).

## Accessibility

Keyboard navigation, visible focus, composer labels, `aria-live="polite"` for completed responses, mode-switch dialog semantics (focus trap + Escape), 44px targets, reduced-motion CSS. axe: 0 serious/critical under reduced motion. 320px / 390px overflow addressed.

## Performance

Initial shell makes no API requests. Lazy: Try panel, catalog panels, below-fold interactive examples. Main client JS ≈ 425 KB (gzip ≈ 132 KB).

## Tests

49 Vitest tests covering router, Build validation/persistence, mode switch, Try isolation, catalog, Pricing/FAQ consistency, sign-in env, continue boundary, API isolation, Book Demo contract, and secret patterns.

## Screenshots

`ai-workflow/screenshots/WUJUD-CONVERSATIONAL-HOME-003/` (desktop 1440 + mobile 390 required set).

## Existing functionality verification

`/build-sara`, `/privacy`, `/terms`, `/data-deletion`, `DemoRequestForm`, onboarding draft, and production Worker config (`wrangler.json` → `wujud-website`) unchanged.

## Files created (implementation)

- `src/content/wujudProductCatalog.ts`, `catalogValidation.ts`
- `src/react-app/conversational/**`
- `src/react-app/pages/{Pricing,Faq,HowItWorks,BookDemo}Page.tsx`

## Files modified (supporting)

- `src/react-app/App.tsx`, `index.html`, `vite-env.d.ts`
- `src/react-app/interactive/interactive-homepage.css`
- `vitest.config.ts` (test include paths)

## Deviations

- Interactive homepage sections demoted below the fold (lazy), not deleted
- Continue remains local `/build-sara` until secure handoff ships
- Screenshot capture scripts kept local / untracked (not committed)

## Unresolved issues

None blocking preview.

## Final recommendation (implementation cycle)

READY FOR PREVIEW COMMIT
