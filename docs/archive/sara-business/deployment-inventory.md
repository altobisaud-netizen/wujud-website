# SARA Business Deployment Inventory

Status is intentionally recorded as **manual verification required** unless it
can be proven from source. No deployment was changed during the freeze.

## Cloudflare

| Safe service name | Repository/config | Freeze action |
|---|---|---|
| `wujud-website` Worker/assets | Wujud website `wrangler.json` | Existing production/preview automation should be reviewed before the wellness branch is ever deployed |
| Website demo preview Worker | Sara API `website-demo-api/` | Keep frozen; manually disable preview automation later if no longer needed |
| Customer workspace preview assets | Sara API `customer-app/wrangler.toml` and archived screenshots | Preserve artifacts; do not repoint to wellness |

The Wujud website Worker still contains the archived `/api/demo` Business
inquiry endpoint. The wellness frontend does not call it. Removing or disabling
that endpoint is an infrastructure decision outside this frontend cycle.

## Railway

| Safe service role | Source area | Freeze action |
|---|---|---|
| SARA Business API/runtime | Sara API root | Do not stop automatically; identify deployment owner and disable auto-deploy manually if approved |
| Text demo sandbox | `website-demo-api/` / demo branch | Preserve; review whether preview auto-deploy remains necessary |
| Managed PostgreSQL | SARA Business environment | Keep running until retention/export/shutdown plan is approved |
| Managed Redis | SARA Business environment | Keep running until runtime and retention dependencies are reviewed |

## Manual checks before disabling anything

1. Confirm the service/project name and current branch in the provider console.
2. Confirm whether production traffic, webhooks, scheduled work or customer
   access remains active.
3. Export or snapshot required data under the approved retention policy.
4. Disable automatic deployments before changing service state.
5. Record owner, timestamp, reason and rollback instructions.

No Meta authorization, WhatsApp registration, webhook mutation, branch push,
production deploy or service shutdown was performed.

The demo sandbox's `railway.json` exists on its feature branch rather than the
current Sara API checkout. A remote-only historical Cloudflare autoconfig
branch also exists. Verify provider-console configuration instead of assuming
the current checkout is the deployment source of truth.
