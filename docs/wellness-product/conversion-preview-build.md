# Conversion preview build freeze — asset-enhanced

**Status:** Preview prototype freeze (not production-ready)

| Field | Value |
|-------|-------|
| Branch | `feature/wujud-wellness-conversion-home` |
| Feature commit | `7c341e633e2142ee06e4122df17678b8c3b6bdd6` |
| Test / evidence commit | `dbe42ee006d09e3c71175773b234fe3dc873f25e` |
| Source baseline (pre-conversion HEAD) | `82753cafff170957bec028e95751573ae2a70f39` |
| Frozen moderated-review ancestor | `9fbbb0b0f6bd3acca0751c7d936913e409e6dfac` |
| Preview URL | https://wujud-sara-wellness-preview.altobi-saud.workers.dev |
| Preview Worker | `wujud-sara-wellness-preview` |
| Approved Worker version | `0e2857b6-39a6-406d-bacf-c5143d5258b4` |
| Freeze date | 2026-07-20 |
| Tests | 105 / 105 passed |

## Shipped conversion assets

Under `public/images/wellness/conversion/`:

- `hero-arab-man-woman-outdoor.webp` (+ PNG fallback)
- `wellness-daily-energy-man.webp` (+ PNG fallback)
- `wellness-sleep-routine.webp` (+ PNG fallback)
- `wellness-balanced-meal.webp` (+ PNG fallback)
- `wellness-consistent-movement-man.webp` (+ PNG fallback)
- `wellness-calm-hijabi-woman.webp` (+ PNG fallback)

Evidence-only layout reference (not shipped):

- `ai-workflow/screenshots/WUJUD-SARA-WELLNESS-006/layout-reference.png`

## Reproducibility

Committed `build:preview` fingerprints match the live Worker for homepage HTML, CSS/JS bundles, and all six WebP conversion assets. No preview redeploy was required after commit.

## Known prototype limitations

- No account system
- No live AI
- No WhatsApp
- No payment
- No permanent wellness-data storage
- No functional waitlist (CTA disabled / non-submitting)
- Provisional pricing only (`Price under review` / `السعر قيد المراجعة`)
- Generated prototype imagery must be reviewed before production

## Production blockers

- Do not merge to `main` until product review and asset review complete
- Do not deploy production Worker `wujud-website`
- Do not change production DNS
- Connect live AI, accounts, payments, waitlist, and analytics only after explicit production authorization
- Replace or approve prototype imagery before production

This preview is **not** production-ready.
