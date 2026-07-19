# SARA Business Data and Infrastructure Map

This is a logical map only. It deliberately excludes database URLs, hostnames,
account IDs, tokens, phone numbers, customer identifiers and secret values.

## Data stores

### PostgreSQL / Prisma

Used by the Sara API repository for:

- production contacts, conversations and messages
- leads, handoffs, follow-ups and operational records
- platform users, organizations and memberships
- onboarding drafts and progress
- BusinessProfile, KnowledgeItem and SalesBehaviorProfile configuration
- channel selection/connection foundations
- admin/reviewer and optimizer records
- dedicated organization Test SARA tables in uncommitted feature work

The wellness product must use a separate future data design and must never
query or migrate this database.

### Redis

Used by SARA Business for message buffering, outbound/runtime coordination,
rate limits, onboarding locks, follow-up/escalation work and test-mode
namespaces.

The wellness product must not reuse this Redis service or any SARA Business
keyspace.

## External services

- Clerk customer authentication foundations exist for SARA Business.
- Meta and WhatsApp provider integration exists in production/runtime code and
  staging branches.
- OpenAI-backed Business reply services exist in Sara API.
- Cloudflare serves the public website and preview assets.
- Railway is used for SARA Business application/data hosting.

The wellness preview connects to none of these services.

## Required future wellness separation

Before a wellness backend is designed, approve:

1. a separate identity/account boundary
2. a separate database and migrations
3. a separate cache/queue namespace or service
4. separate model credentials and prompt governance
5. wellness-specific consent, retention and deletion policies
6. analytics that do not ingest SARA Business users or events
