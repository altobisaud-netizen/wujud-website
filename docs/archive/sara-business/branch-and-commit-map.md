# SARA Business Branch and Commit Map

## Wujud website

| Branch/ref | Commit | Status |
|---|---:|---|
| `main` / `origin/main` | `4463829` | Last approved Business homepage merge |
| `archive/sara-business-2026-07-19` | `4463829` | Local freeze ref |
| `sara-business-freeze-2026-07-19` | `4463829` | Local freeze tag |
| `feature/conversational-homepage-design` | `7eac085` | Approved conversational homepage validation |
| `feature/interactive-product-homepage` | `2911a16` | Earlier interactive homepage validation |
| `feature/secure-onboarding-handoff` | `d491f84` | Unmerged onboarding handoff/test work |
| `feature/wujud-sara-wellness` | based on `4463829` | Active wellness preview; not merged |

Approved Business homepage feature commits:

- `61d551d` — prompt-first conversational homepage
- `c4fc534` — UX and product-boundary validation
- `66507af` — final homepage UX corrections
- `7eac085` — final experience validation
- `4463829` — merge to website `main`

Preserved local-only website work:

- Stash: `archive-preserve: WUJUD Business homepage follow-up note before wellness pivot`
- Content: one non-blocking synchronization follow-up note
- Restore only on a future SARA Business restart branch.

## Sara API

| Branch/ref | Commit | Status |
|---|---:|---|
| `main` / `origin/main` | `c5ff7c8` | Current production baseline |
| `archive/sara-business-2026-07-19` | `c5ff7c8` | Local production freeze ref |
| `sara-business-freeze-2026-07-19` | `c5ff7c8` | Local production freeze tag |
| `feature/sara-owner-workspace-integration` | `4bac198` | Approved workspace integration; remote exists |
| `feature/organization-sara-test-mode` | based on `4bac198` | Large uncommitted Test SARA implementation |
| `feature/conversational-orchestrator-foundation` | `fca3e1c` | Unmerged platform work; remote exists |
| `feature/customer-platform-consolidation` | `e2eb973` | Unmerged architecture/platform consolidation |
| `feature/channel-connection-foundation` | `73c146f` | Unmerged channel foundation |
| `feature/website-demo-text-sandbox` | `64c56c9` | Demo sandbox branch; remote exists |
| `feature/whatsapp-staging-verification` | `e03c690` | Staging verification branch; remote exists |

## Uncommitted and stashed Sara API work

Do not discard or switch destructively:

- Current working tree on `feature/organization-sara-test-mode` contains the
  complete, uncommitted organization Test SARA backend/frontend work.
- `feature/conversational-orchestrator-foundation` WIP is preserved in a named
  stash and must be restored only on that branch.
- Additional older stashes exist for demo sandbox, WhatsApp staging, channel
  connection and customer-auth work.

No archive ref includes those uncommitted changes. Resume requires reviewing
the working tree and stash map before any checkout, reset or cleanup.
