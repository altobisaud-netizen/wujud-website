# SARA Business Repository Map

Inventory date: 2026-07-19. Names and statuses only; no credentials or
customer information are recorded.

## `altobisaud-netizen/wujud-website`

Role: public WUJUD/SARA Business marketing site and onboarding entrypoint.

Historical areas retained in source:

- `src/react-app/conversational/` — prompt-first Business homepage
- `src/react-app/onboarding/` — Business onboarding flow
- `src/react-app/pages/` — Business pricing, demo and legal pages
- `src/worker/` — Cloudflare Worker and demo-request endpoint
- `src/content/` — Business product catalogue copy
- `ai-workflow/screenshots/` — approved Business website captures

Active wellness work is isolated under `src/react-app/wellness/`.

## `altobisaud-netizen/sara-ai` (local folder: `Sara API`)

Role: SARA Business backend monorepo.

Contained applications:

- API/runtime at repository root
- `customer-app/` — authenticated organization workspace
- `website-demo-api/` — isolated public text demo service
- `dashboard/` — internal review/admin interface
- `sara-optimizer/` — optimizer tooling

These are folders in one Git repository, not independent local Git roots.

Important backend areas:

- `src/services/` — production reply, WhatsApp, escalation, follow-up and lead services
- `src/routes/` and `src/controllers/` — API and webhook boundaries
- `src/auth/`, `src/organizations/`, `src/onboarding/` — customer platform foundations
- `src/knowledge/`, `src/salesBehaviour/`, `src/channelSelection/`,
  `src/channelConnection/` — organization configuration foundations
- `prisma/` — shared SARA Business schema and migrations
- `docs/` — architecture, security, migration and runtime-isolation records

## Dependency boundary

The wellness website must not depend on either repository's Business modules.
It may preserve archived files in Git, but the active `App.tsx` imports only
`src/react-app/wellness/`.
