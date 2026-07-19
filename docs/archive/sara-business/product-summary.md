# SARA Business — Frozen Product Summary

Status: **FROZEN — 2026-07-19**

SARA Business is the archived WUJUD B2B AI sales and customer-service
assistant. It includes a public marketing and onboarding website, an
organization-scoped customer application, customer-platform foundations,
WhatsApp and Meta integration work, sales-assistant runtime services, and
operational review tools.

The active product direction is now:

- **WUJUD** — wellness platform
- **SARA** — daily AI wellness companion

The wellness product is independent. It must not import, call, query or reuse
SARA Business APIs, databases, Redis namespaces, identities, prompts,
credentials, analytics or customer records.

## Freeze rules

1. Do not delete historical SARA Business source or documentation.
2. Do not start new SARA Business feature branches during the freeze.
3. Do not merge frozen feature work without a separate restart decision.
4. Do not connect wellness code to any SARA Business runtime.
5. Do not shut down production services automatically.
6. Disable automated deployments only after a named owner reviews the
   deployment inventory and approves each action.

## Local archive refs

Created locally only; not pushed:

- Wujud website: `archive/sara-business-2026-07-19` and
  `sara-business-freeze-2026-07-19` at `4463829`
- Sara API: `archive/sara-business-2026-07-19` and
  `sara-business-freeze-2026-07-19` at `c5ff7c8`

These refs preserve stable baselines. Unmerged and uncommitted work is recorded
separately in the branch map.
