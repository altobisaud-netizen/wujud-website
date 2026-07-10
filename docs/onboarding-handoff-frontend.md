# SARA-005 frontend handoff

The API repository’s `docs/onboarding-handoff.md` is the canonical API and security contract. This guide describes only the website integration.

## Environment

Set public Vite variables before building:

- `VITE_SARA_HANDOFF_ENABLED=true` enables the API handoff. Any other value retains the local-only completion flow.
- `VITE_SARA_API_BASE_URL` is the Sara API origin. The site posts to `/api/v1/onboarding/drafts`.
- `VITE_CUSTOMER_APP_URL` is the customer-app origin. Successful handoff navigates to `/continue`.

Never use a `VITE_` variable for secrets; Vite exposes these values to the browser.

## Submit and redirect

The review screen maps website option IDs to API enums and sends the anonymous draft with an `Idempotency-Key` UUID. One key is reused for retries of the same failed profile. Starting over, or changing a material profile field after a failure, creates a new key.

On success the browser navigates with:

```text
${VITE_CUSTOMER_APP_URL}/continue#handoff=<opaque-code>
```

The handoff code is in the fragment, so it is not included in the HTTP request to the customer app. The profile, including business name and description, is never placed in the URL or logged by this integration.

## Failure states

The website remains on the review screen and keeps its session-storage draft for these safe retry messages:

- 400/422: review profile details
- 409: profile is already being created
- 429: wait, then retry
- 5xx, timeout, or unavailable configuration: service temporarily unavailable
- network error: check connection and retry

The create and edit controls are disabled while the request is pending. The API needs CORS permission for the website origin.

## Screenshot preview

Use the live Vite preview with `VITE_SARA_HANDOFF_ENABLED=true` and a test API URL to capture secure-submit and API-error states. Do not use a real business description or handoff code in screenshots.
