# SARA-001.1 Visual Review

## step-1-desktop-1440.png
- **Viewport:** ~1440×900
- **Checked:** Logo sizing on light header, portrait + question layout, progress, Continue prominence, navy/purple/lavender palette
- **Issue found:** Wordmark previously rendered as a huge dark slab (~1024×106) due to global `height: auto` + `brightness(0.12)`
- **Fix applied:** Sized wordmark with `!important` overrides; `filter: invert(1)` only; excluded onboarding brand classes from global img height rule
- **Final result:** Sharp header-sized wordmark; clean two-column welcome layout

## step-1-mobile-390.png
- **Viewport:** 390×844
- **Checked:** Single-column stack, avatar message, progress, input visibility, tap targets
- **Issue found:** None material after logo fix
- **Fix applied:** N/A
- **Final result:** Usable mobile step 1; Continue reachable via scroll

## step-1-mobile-320.png
- **Viewport:** 320×568 (also used for short-height / keyboard simulation)
- **Checked:** Horizontal overflow, header crowding, Continue reachability when viewport height is reduced
- **Issue found:** Horizontal overflow (`scrollWidth` 344 > 320) from header actions
- **Fix applied:** Narrow-header spacing, shrinkable brand, smaller sm-button padding under 360px; removed sticky Continue overlay
- **Final result:** No horizontal overflow; Continue remains in document flow and scrollable into view

## target-customers-desktop-1440.png
- **Viewport:** ~1440×900
- **Checked:** Multi-select chips, selected state, Back/Continue, SARA support message without overpowering the task
- **Issue found:** None
- **Fix applied:** Autofocus moved to first checkbox for reliable keyboard landing
- **Final result:** Clear multi-select step with readable chip grid

## review-desktop-1440.png
- **Viewport:** ~1440×900
- **Checked:** Summary scanability, Edit actions, progress at 100%, brand consistency
- **Issue found:** None
- **Fix applied:** Step heading receives programmatic focus after transition
- **Final result:** Review is scannable; Edit links clear

## completion-mobile-390.png
- **Viewport:** 390×844
- **Checked:** Completion copy honesty, primary/secondary actions, success badge
- **Issue found:** None
- **Fix applied:** N/A
- **Final result:** Clear completion state; no live-agent claims

## start-over-dialog-desktop-1440.png
- **Viewport:** ~1440×900
- **Checked:** Modal title/description, Cancel-first focus, overlay
- **Issue found:** Dialog previously lacked focus trap, Escape, return focus, and `aria-describedby`
- **Fix applied:** Accessible dialog behaviour in `OnboardingShell`
- **Final result:** Cancel focused on open; Escape closes; focus returns to Start over

## reduced-motion-step-change.png
- **Viewport:** ~1440×900
- **Checked:** Step change under `prefers-reduced-motion: reduce` (CDP `Emulation.setEmulatedMedia`)
- **Issue found:** None after verification
- **Fix applied:** Existing `useReducedMotion` + CSS `transition: none` on progress; exit slide removed when reduced
- **Final result:** `matchMedia` reduce=true; motion node `transform: none`; progress transition `0s`; step advanced cleanly to description
