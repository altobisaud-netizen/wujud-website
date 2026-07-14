# WUJUD Conversational Homepage Final UX Fix Report

**Ticket:** WUJUD-CONVERSATIONAL-HOME-005  
**Branch:** `feature/conversational-homepage-design`  
**Date:** 2026-07-14  

## Status
Complete

## Routing corrections
Deterministic precedence is now: pricing → security/privacy → product/how/setup → book → account → try → **clear build only** → clarify.

Verified:
- “How long does setup take?” / “كم تستغرق عملية الإعداد؟” → product help (not Build)
- “Is my information secure?” / “هل معلوماتي آمنة؟” → product help (not Clarify)
- Clear build phrases (EN/AR) still enter Build
- Vague `setup` / `create` / `business` product questions no longer force Build

## Build input hierarchy
Global dock composer is hidden during structured Build steps (`name`…`goals`) and returns on summary. Continue buttons expose requirement hints via `aria-describedby` (e.g. “Enter your business name to continue.”).

## 200% zoom
Layout guards added (`min-width: 0`, wrap, `max-width: 100%`, overflow-x clip on root shell). Measured overflow is **0** at 320, 390, and 200% zoom (desktop + mobile simulation), EN and AR.

## Primary-action hierarchy
- Build my SARA → `conv__chip--primary` (filled purple)
- Try SARA → outlined secondary
- Pricing / How / Book → tertiary
- Empty Send uses soft/disabled styling so it no longer overpowers Build

## Accessibility landmarks
Workspace uses a single `<main>`, a page-level (visually hidden) `<h1>`, labelled thread and composer regions. Below-fold examples no longer inject nested `<main>` or immediate tablists. axe on reviewed states: **0 violations**.

## Mobile polish
Portrait centered; more space above the dock; below-fold demos collapsed into one “Explore how SARA works” disclosure (0 tabs until expanded).

## Arabic behavior
Arabic script in an English UI sets **content locale** to Arabic for catalog replies without flipping the chrome locale. Explicit EN / العربية control unchanged. Security/setup Arabic queries route to help with Arabic catalog copy.

## Local cleanup
| Item | Action |
|---|---|
| HOME-002 screenshots | Deleted |
| capture-conversational-shots*.mjs | Deleted |
| HOME-004 review shots + product-review.md | Retained (untracked evidence) |
| HOME-005 screenshots + verify json | Retained (untracked evidence) |
| WUJUD-WEB-INTERACTIVE-001-followups.md | Left outside feature commit |

## Tests
54 tests passing (routing precedence, build composer visibility, UX hierarchy contracts, prior suites).

## Screenshots
`ai-workflow/screenshots/WUJUD-CONVERSATIONAL-HOME-005/` includes required desktop and mobile captures (hierarchy, Build without dock, setup/security answers, summary, collapsed examples, Try, Arabic security, zoom, mode-switch).

## Regression verification
- `npm test` — 54 pass  
- `tsc -b` / `npm run build` — pass  
- scoped ESLint — pass (0 warnings)  
- axe reviewed states — 0  
- 320 / 390 / 200% overflow — 0  
- Arabic security content locale — pass  
- No live Sara/demo/Clerk calls in conversational isolation tests  
- No commit / merge / production deploy

## Files modified
- `routeIntent.ts` (+ tests)
- `ConversationalHomePage.tsx`, `BuildPanel.tsx`, `buildComposer.ts`
- `BelowFoldExamples.tsx`, `CatalogPanels.tsx`, `PricingBlocks.tsx`, `TextFieldBlock.tsx`
- `locale.ts`, `conversational.css`, `FaqPage.tsx`
- New: `buildComposer.test.ts`, `uxHierarchy.test.ts`

## Deviations
Overflow at CSS `zoom: 2` is evaluated with zoom-normalized scroll metrics (Chromium reports inflated scrollWidth under CSS zoom). No content disabled to pass the check.

## Unresolved issues
None blocking merge from the 004 required-fix list.

## Final rating
**8.8 / 10**

## Final recommendation
**READY TO MERGE**

(Do not merge or deploy production until you explicitly request it.)
