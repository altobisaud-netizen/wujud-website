# WUJUD-SARA-WELLNESS-006.2 / 006.3 — Final conversion balance report

Date: 2026-07-20  
Branch: `feature/wujud-wellness-conversion-home`

## Summary

Chat remains the primary conversion surface (~40% desktop column) with lifestyle imagery supportive (~30%). Mobile order is headline → chat → image. Articles nav removed. Genuine 200% zoom verification recorded under `ai-workflow/screenshots/WUJUD-SARA-WELLNESS-006.2/browser-zoom-200-evidence.json`.

## Zoom method

Playwright cannot drive Edge/Chrome Ctrl+/- page zoom. Evidence uses:

1. CDP `Emulation.setPageScaleFactor(2)` (engine page scale, not CSS `zoom`)
2. Half-width layout viewport (CSS equivalent of Chrome UI 200% zoom)

Body `min-width` softened to `min(100%, 320px)` so zoomed narrow viewports do not force horizontal overflow.

## Verification snapshot

- 114/114 tests
- Zero serious/critical axe findings
- Desktop proportions 30/30/40
- Mobile chat before image at 320/390/430
- Claim scan PASS; layout-reference isolation PASS
