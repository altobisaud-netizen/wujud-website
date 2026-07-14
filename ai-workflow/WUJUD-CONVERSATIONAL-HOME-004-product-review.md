# WUJUD Conversational Homepage Product Review

**Ticket:** WUJUD-CONVERSATIONAL-HOME-004  
**Preview:** https://wujud-conversational-home-preview.altobi-saud.workers.dev  
**Branch:** `feature/conversational-homepage-design`  
**Date:** 2026-07-14  

Evidence: `ai-workflow/screenshots/WUJUD-CONVERSATIONAL-HOME-004-review/`

## First-impression result

Fresh session (no draft), normal viewport.

| Question | Within ~10s? | Observation |
|---|---|---|
| What is WUJUD? | Partial | Brand is clear; platform story is thin. Visitor mainly learns “AI sales employee / SARA,” not WUJUD as a product company beyond the mark. |
| Who is SARA? | Yes | Portrait + first-person intro (“Hi, I’m SARA…”) answer this immediately. |
| What can I do on this page? | Yes | Intro + five chips state build / try / ask / price / demo. |
| What should I type? | Mostly | Placeholder helps; empty composer still feels slightly open-ended until chips are noticed. |
| How do I begin building? | Yes | “Build my SARA” is readable and first in the chip row. |

**Caveats:** On narrow viewports SARA’s portrait sits right-aligned above the headline (slightly awkward). Below the fold, “More ways to see SARA” floods the page with many tabs (~14), which can dilute the prompt-first story after scroll.

## Primary-action hierarchy

- **Build my SARA** reads as the intended primary *label*, but visually all five chips share equal weight.
- The filled purple **Send** control is the strongest color accent on the first screen—stronger than Build—so hierarchy is slightly inverted.
- **Try SARA** is clear once entered (demo badge), but on the home shell it sits equally with secondary paths.
- Pricing / FAQ / Book Demo work as secondary destinations; nav Pricing/FAQ also compete lightly with chips.
- Business starters help when present; on short mobile heights they can sit near or below the fold.
- **Decision load:** five equal chips is manageable but borderline “menu,” not one clear primary CTA.

## Build journey

Completed cleanly end-to-end in automation (~**11 actions**, ~**1.6s** scripted; human estimate **~60–90s**).

| Check | Result |
|---|---|
| Non-technical clarity | Good — plain questions, step “1 of 5” |
| Next action obvious | Mostly — Continue enabled/disabled; no textual validation hint when empty |
| Multi-select reduces typing | Good for customers/channels/goals |
| Summary accuracy | Yes — name/channels reflected |
| Draft persistence | Yes — `wujud:sara-onboarding-draft:v1` |
| Continue → `/build-sara` | Yes — lands as continuation of same product |
| Dual input problem | **Proven issue** — Build step field + dock composer both visible; Enter can feel ambiguous |

## Try SARA

All four businesses verified:

| Starter | Profile | Demo badge | Distinct | Fake ops claim | Build like this |
|---|---|---|---|---|---|
| Coffee shop | Harbor Roast | Yes | Yes | No | Yes |
| Clinic | BrightCare Clinic | Yes | Yes | No | Yes |
| Real estate | Oasis Homes | Yes | Yes | No | Yes |
| Retail | Noon & Night | Yes | Yes | No | Yes |

Scripted tone is honest (“demonstration,” “checkout isn’t completed”). Does not feel “broken AI”; feels clearly demo.

## Product questions

| Query | Actual mode | Expected | Notes |
|---|---|---|---|
| How much does SARA cost? | Pricing | Pricing | Shows **$299 / $799** from catalog |
| كم سعر الاشتراك؟ | Pricing | Pricing | Correct |
| Can SARA use WhatsApp? | Help | Help | Catalog capabilities |
| How long does setup take? | **Build** | Help | **Misroute** — `setup` keyword fires Build |
| Is my information secure? | **Clarify** | Help | **Miss** — matches `security` not `secure` |
| What happens when SARA cannot answer? | Help | Help | Generic help dump; not a dedicated escalation FAQ answer |
| كيف تعمل سارة؟ | Help (AR UI) | Help | Arabic catalog copy renders when locale is AR |
| hello there | Clarify | Clarify | Useful path choices |
| What is WUJUD? | Help | Help | OK |
| help | Clarify | Help/Clarify | Ambiguous → clarify |

Canonical pricing/FAQ links appear in conversation modes.

## Mobile

| Viewport | Overflow | Notes |
|---|---|---|
| 390px | 0 | Usable; Build mode has dual composer |
| 320px | 0 | Thread/composer geometry tight; dock can sit over thread edge |
| 200% zoom | **~250px overflow** | **Proven issue** — horizontal scroll appears |

Mode menu works via “Conversation mode.” Dialog Escape behavior verified in prior cycle; 004 re-check found dialog not always forced on the mobile path used.

## Arabic

- Toggle sets `dir=rtl` / `lang=ar`.
- Headline, intro, quick actions localize well.
- With AR locale, help/pricing content uses catalog Arabic.
- Typing Arabic while UI is still EN returns EN catalog (locale is UI preference, not script detection)—acceptable but worth clarifying in copy optionally.

## Accessibility

Manual: focus lands on Build name field after entering Build; Continue/options are keyboard-reachable; mode dialog uses dialog semantics (prior cycle). Restrained aria-live retained.

**axe findings (all impacts):**

| Surface | Finding | Impact |
|---|---|---|
| Home (reduced motion) | none | — |
| Build workspace | `landmark-one-main` | moderate |
| Build workspace | `page-has-heading-one` | moderate |
| Build workspace | `region` (3 nodes) | moderate |
| `/pricing` | none | — |

No new serious/critical on home/pricing under reduced motion. Build workspace loses the page `h1`/`main` after leaving hero.

## Visual quality

- Prompt-first intent is recognizable; not v0-dark.
- Large empty space between Build card and dock composer on mobile feels unfinished rather than calm.
- Chip density is even; primary path not colored as primary.
- Portrait size OK; placement on narrow screens is off-axis.
- Conversation width fine on desktop.
- Cards use consistent soft radius; shadows light.
- Pricing density acceptable.
- Footer / below-fold demotion is heavy for a “prompt-first” first experience after scroll.

## Conversion paths

| Path | Result |
|---|---|
| Build → `/build-sara` | Works; draft preserved |
| Book Demo → form | Works in conversation + `/book-demo` |
| Pricing → catalog | Works; $299/$799/Custom |
| FAQ → catalog | Works + Full FAQ link |
| Sign in | Safe unavailable on preview (no `VITE_CUSTOMER_APP_URL`) |

No secondary CTA overpowers Build once inside Build mode; on home, Send color still competes.

## Local cleanup

| Path | Classification |
|---|---|
| `ai-workflow/screenshots/WUJUD-CONVERSATIONAL-HOME-004-review/` | **KEEP_FOR_FUTURE_WORK** (004 evidence) |
| `ai-workflow/WUJUD-CONVERSATIONAL-HOME-004-product-review.md` | **KEEP_FOR_FUTURE_WORK** |
| `ai-workflow/screenshots/WUJUD-CONVERSATIONAL-HOME-003/` | **KEEP_FOR_FUTURE_WORK** (committed) |
| `ai-workflow/screenshots/WUJUD-CONVERSATIONAL-HOME-002/` | **DELETE_TEMPORARY** or archive off-branch (prototype shots; untracked duplicate of earlier cycle) |
| `ai-workflow/WUJUD-WEB-INTERACTIVE-001-followups.md` | **MOVE_TO_DOCUMENTED_LOCATION** / keep off this feature PR |
| `scripts/capture-conversational-shots.mjs` | **DELETE_TEMPORARY** |
| `scripts/capture-conversational-shots-003.mjs` | **DELETE_TEMPORARY** (or keep locally only; do not commit) |

Do not add the above untracked items to this feature branch commit set.

## Required fixes

1. **Intent routing:** “How long does setup take?” must not enter Build; prefer Product/FAQ. Soften/reorder `setup` keyword vs product-help.
2. **Intent routing:** Match `secure` / natural privacy phrasing so “Is my information secure?” reaches security/help content, not Clarify.
3. **Build workspace dual composer:** Hide or demote the dock composer while a structured Build question is active so Enter/Continue is unambiguous.
4. **200% text zoom:** Fix horizontal overflow on narrow widths.
5. **Primary hierarchy:** Make Build visually primary (or demote Send accent when empty) so color hierarchy matches product intent.

## Optional improvements

- Short line under the intro answering “WUJUD is the platform; SARA is your AI sales employee.”
- Soften/collapse below-fold interactive demos on `/` so the first scroll stays conversational.
- Textual validation under disabled Continue (“Enter at least 2 characters”).
- Dedicated FAQ answer for escalation / “when SARA cannot answer.”
- Center SARA portrait on mobile.
- Restore `main` + `h1` (or equivalent) in workspace modes for landmarks.

## Final rating

**7.4 / 10** — Strong product direction and solid Try/Pricing/AR foundations; a few deterministic routing and Build-composer issues block “ready to merge.”

## Final recommendation

**REQUIRES FINAL UX FIX**

Do not merge or deploy production until required fixes above are verified on preview.
