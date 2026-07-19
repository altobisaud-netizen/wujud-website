# SARA Business Feature Status at Freeze

## Stable / production baseline

- Core SARA Business API and production sales-assistant runtime
- Meta OAuth connection flow on Sara API `main`
- WhatsApp inbound/outbound, webhook, reply, escalation, follow-up and lead paths
- WUJUD Business marketing site on website `main`
- Public prompt-first Business homepage

## Approved but not merged into Sara API `main`

- Customer authentication and organization foundations
- Organization-scoped knowledge and sales-behaviour setup
- Channel selection and channel-connection foundations
- Approved customer owner workspace integration at `4bac198`
- Website demo text sandbox and staging-verification branches

## Uncommitted / review required

- Organization-scoped Test SARA backend and customer-app integration on
  `feature/organization-sara-test-mode`
- Conversational onboarding/orchestrator work preserved in a branch-specific stash

## Archived website features retained in source

- Conversational Business homepage
- Interactive Business homepage
- Build SARA onboarding
- Business pricing, FAQ, demo and legal routes
- Demo-request Worker endpoint

These files are not imported by the active wellness runtime.

## Feature flags recorded safely

Backend examples:

- `CUSTOMER_AUTH_ENABLED`
- `ONBOARDING_HANDOFF_ENABLED`
- `CHANNEL_CREDENTIAL_VAULT_ENABLED`
- `INSTAGRAM_IMPORT_ENABLED`
- `INSTAGRAM_AUTO_SYNC_ENABLED`
- `SOCIAL_LEARNING_ENABLED`
- `FOLLOW_UP_NOTIFICATIONS_ENABLED`
- `SARA_ORGANIZATION_TEST_MODE_ENABLED`
- `SARA_TEST_MODE_MODEL_ENABLED`
- `USE_SARA_REPLY_V2`
- `ENABLE_TWO_CALL_SARA_PLANNER`

Customer-app examples:

- `VITE_CONVERSATIONAL_SARA_WORKSPACE_ENABLED`
- `VITE_SARA_TEST_MODE_ENABLED`
- `VITE_KNOWLEDGE_FILE_UPLOAD_ENABLED`

Values and secrets are intentionally not recorded here. Review the deployment
environment directly if development resumes.

Design-only flags documented but not confirmed as shipped include
`CONVERSATIONAL_ONBOARDING_ENABLED`, `CONVERSATIONAL_UPLOADS_ENABLED` and
`SARA_RUNTIME_ACTIVATION_ENABLED`.

Repository history contains test-backed checkpoints but no formal approval or
sign-off metadata. “Approved” in this archive means the feature tip previously
validated in its task report, not a release-governance record.
