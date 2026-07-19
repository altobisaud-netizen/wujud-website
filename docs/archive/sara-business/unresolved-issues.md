# SARA Business Unresolved Issues

## Preservation risks

1. Organization Test SARA is complete but uncommitted on
   `feature/organization-sara-test-mode`. Its working tree must not be reset,
   cleaned or overwritten.
2. Conversational orchestrator work is in a branch-specific stash and is not
   represented by the freeze tag.
3. Several older feature stashes remain. Their ownership and continued value
   should be reviewed before any stash cleanup.
4. Local archive refs have not been pushed. A future owner may choose to push
   them only after reviewing repository policy and remote state.

## Product and runtime issues

1. SARA Business automated deployments may still be enabled in Cloudflare or
   Railway. Provider-console verification is required.
2. The Wujud website Worker still exposes the archived Business demo-request
   endpoint even though the wellness frontend does not call it.
3. Meta/WhatsApp production and staging configuration may still be active.
   Do not revoke, rotate or disconnect it without an explicit shutdown plan.
4. Database and Redis retention/export requirements have not been approved.
5. The final Business homepage follow-up note records a non-blocking local
   synchronization issue and is preserved in the website stash.
6. Organization Test SARA tests on Windows previously showed a non-failing
   embedded-Postgres/Vitest teardown warning; see its implementation report.
7. Internal `/admin` protection is documented as a placeholder and requires a
   security review before any restart.
8. Archive refs and local-only WIP are not durable off-device because the user
   prohibited pushing/committing in this cycle.

## Wellness exclusions

No wellness backend, account system, payments, reminders, live AI, analytics,
professional network, voice, uploads or wearable integrations exist in this
cycle. Copy describing those capabilities is future-facing or explicitly
marked as prototype/coming later.

The full website dependency audit currently reports 16 advisory findings. A
production-only audit identifies one high-severity direct dependency group in
the archived Hono Worker (`hono` 4.11.1); npm reports a non-major fix at
4.12.31. It was not upgraded because changing the archived Business Worker is
outside this frontend-only cycle. Upgrade and regression-test it before any
production deployment.

Before any future public cutover, assign named owners for legal copy, privacy,
wellness safety, commercial pricing and infrastructure approval. Also decide
explicit retirement/redirect behavior for archived Business routes such as
`/build-sara`, `/book-demo`, `/faq` and `/data-deletion`; today unknown/retired
paths fall back to the wellness homepage through SPA routing.
