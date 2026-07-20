# Final conversion preview build freeze

**Status:** Final conversion preview freeze (not production-ready)

| Field | Value |
|-------|-------|
| Branch | `feature/wujud-wellness-conversion-home` |
| Feature commit | `186d01728a9bfe84d7b1d0992808a0928a0b6e38` |
| Test / evidence commit | `b83766c922d5118101d5bc27f72e059c96394043` |
| Prior freeze commit | `9b55eb2380ca6eca200a61318bd6d49b57bf8cd7` |
| Asset-enhanced feature baseline | `7c341e633e2142ee06e4122df17678b8c3b6bdd6` |
| Asset-enhanced test baseline | `dbe42ee006d09e3c71175773b234fe3dc873f25e` |
| Moderated-review ancestor | `9fbbb0b0f6bd3acca0751c7d936913e409e6dfac` |
| Preview URL | https://wujud-sara-wellness-preview.altobi-saud.workers.dev |
| Preview Worker | `wujud-sara-wellness-preview` |
| Worker version | `ab37545f-1aee-420b-b597-b31e79792f9f` |
| Previous Worker (pre-freeze rebuild) | `ac63f2e8-d92e-43d4-8260-6af5cdeebd71` |
| Freeze date | 2026-07-20 |
| Tests | 114 / 114 passed |

## Why the Worker was redeployed

Committed source after 006.3 included a zoom overflow fix (`body` min-width → `min(100%, 320px)` plus ambient/header clip). Fingerprints no longer matched `ac63f2e8-…`, so preview was redeployed to reproduce Git.

## Shipped conversion assets

Under `public/images/wellness/conversion/`:

- `hero-arab-man-woman-outdoor.webp` (+ PNG)
- `wellness-daily-energy-man.webp` (+ PNG)
- `wellness-sleep-routine.webp` (+ PNG)
- `wellness-balanced-meal.webp` (+ PNG)
- `wellness-consistent-movement-man.webp` (+ PNG)
- `wellness-calm-hijabi-woman.webp` (+ PNG)

## Real browser zoom result

Evidence: `ai-workflow/screenshots/WUJUD-SARA-WELLNESS-006.2/browser-zoom-200-evidence.json`

- Playwright cannot drive Edge/Chrome Ctrl+/- page zoom (recorded).
- Verified with CDP page scale ×2 and half-width layout viewport (Chrome UI 200% CSS equivalent).
- Status: **PASS** — no horizontal overflow; RTL/LTR preserved; chat before image when stacked.

## Desktop / mobile hierarchy

- Desktop 1440: ~30% copy / ~30% image / ~40% chat
- Below 1100px: copy → chat → image
- Mobile 320/390/430: chat above lifestyle image; chat in first viewport

## Known prototype limitations

- No account system
- No live AI
- No WhatsApp
- No payment
- No wellness-data storage
- No operational waitlist
- Provisional pricing only
- Generated imagery requires production licensing / art-direction review

## Production blockers

- Do not merge to `main` until moderated conversion review completes
- Do not deploy production Worker `wujud-website`
- Do not change production DNS
- Connect live AI, accounts, payments, waitlist, and analytics only after explicit authorization
- Approve or replace prototype imagery before production

This preview is **not** production-ready.
