# Build My SARA — Website Handoff

This site creates an anonymous onboarding draft only when the visitor selects **Create My SARA**, then redirects to the customer app with an opaque code in the URL fragment.

The Sara API repository’s `docs/onboarding-handoff.md` is the canonical contract and security specification. Keep this website implementation aligned with that document; do not duplicate or extend the API contract here.

Website-specific setup and operational behavior are documented in [onboarding-handoff-frontend.md](./onboarding-handoff-frontend.md).

The marketing website never creates an organization and must never contain admin credentials or product-session secrets.
