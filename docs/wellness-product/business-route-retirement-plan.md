# Business-SARA Route Retirement Plan

Status: **PROPOSAL ONLY â€” NO REDIRECTS ACTIVE**
Owner: **UNASSIGNED**
Last reviewed: 2026-07-19

This plan inventories public routes from the frozen SARA Business website baseline `4463829`. It does not delete, redirect, or modify production routes. Every activation requires product, legal, SEO, and operations approval plus a tested rollback.

| Source path | Classification | Proposed destination | Reason | SEO effect | Rollback plan |
| --- | --- | --- | --- | --- | --- |
| `/` | REDIRECT_TO_WELLNESS | `/` | Reposition the public homepage to WUJUD wellness after launch approval. | Preserve the primary URL while materially changing intent; update title, structured content, and campaign links together. | Restore the frozen Business homepage deployment and previous asset manifest. |
| `/how-it-works` | REDIRECT_TO_WELLNESS | `/how-it-works` | Path remains useful but content changes from Business automation to wellness. | Existing ranking intent may not match; treat as a content migration and monitor search queries. | Restore frozen route HTML and remove the wellness redirect/content deployment. |
| `/pricing` | KEEP_TEMPORARILY | `/pricing` | Wellness pricing is provisional; do not imply commercial readiness. | Avoid publishing final-price signals until approved. | Keep or restore the frozen pricing page while owners decide. |
| `/privacy` | KEEP_TEMPORARILY | `/privacy` | Existing Business legal obligations may remain relevant. | Replacing legal content prematurely could remove required disclosures. | Restore the frozen legal page immediately. |
| `/terms` | KEEP_TEMPORARILY | `/terms` | Existing Business terms may remain relevant to existing users. | Preserve contractual discoverability until legal approves replacement. | Restore the frozen legal page immediately. |
| `/data-deletion` | KEEP_TEMPORARILY | Not decided | May remain necessary for Business customer/data requests. | Removing it could break platform/legal references. | Re-enable frozen page from baseline `4463829`. |
| `/build-sara` | ARCHIVE | Not decided | Business onboarding must not be imported into wellness. | Remove from future wellness sitemap; preserve historical source and inbound-link inventory. | Restore route from the frozen archive if Business development resumes. |
| `/faq` | REDIRECT_TO_WELLNESS | `/how-it-works` | Most future wellness questions belong in product explanation or safety content. | A 301 could consolidate authority, but only after query-intent review. | Remove redirect and restore frozen FAQ. |
| `/book-demo` | REMOVE_AFTER_APPROVAL | `/contact` | Business demo booking is not a wellness capability. | A temporary 302 is safer during review; consider 410 only after inbound-link and campaign audit. | Restore route and its prior contact workflow. |
| Any undocumented campaign path | UNKNOWN_REQUIRES_OWNER_DECISION | Not decided | Analytics and campaign inventory are unavailable in this cycle. | Unknown; must audit backlinks and paid campaigns first. | Preserve current production routing until classified. |

## Activation gate

Before any route change:

1. Name the product, legal, SEO, and operations approvers.
2. Export the current production route and inbound-link inventory.
3. Confirm whether existing Business users still rely on legal, deletion, pricing, or demo routes.
4. Choose 301, 302, 410, archive page, or unchanged behavior per route.
5. Test direct load, refresh, canonical tags, sitemap, analytics, and accessibility in a non-production environment.
6. Record the previous Worker version and rehearse rollback.
7. Obtain written launch approval. This cycle grants none.
