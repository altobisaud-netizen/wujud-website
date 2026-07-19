# Safely Restarting SARA Business Development

Do not restart from the wellness branch.

## 1. Confirm ownership and scope

- Name the product/engineering owner.
- Decide whether the restart targets production maintenance, customer platform,
  Test SARA, conversational onboarding, website, or provider integration.
- Review current legal, data-retention and infrastructure obligations.

## 2. Re-inventory before checkout

In each repository:

```text
git status --short
git branch --all
git tag --list
git stash list
git log --all --decorate --oneline
```

Do not run reset, clean, checkout-overwrite, rebase or history rewrite while
uncommitted/stashed work remains unreviewed.

## 3. Choose the correct baseline

- Sara API production maintenance:
  `sara-business-freeze-2026-07-19` (`c5ff7c8`)
- Website Business baseline:
  `sara-business-freeze-2026-07-19` (`4463829`)
- Owner workspace continuation:
  `feature/sara-owner-workspace-integration` (`4bac198`)
- Organization Test SARA:
  preserve and review the existing uncommitted
  `feature/organization-sara-test-mode` working tree
- Conversational orchestrator:
  restore its named stash only while checked out on
  `feature/conversational-orchestrator-foundation`

Create a new restart branch from the selected baseline; do not develop directly
on the archive branch/tag.

## 4. Restore local-only work safely

1. Capture a fresh status/diff.
2. Inspect the named stash with `git stash show` before applying it.
3. Apply one stash at a time to its original branch.
4. Resolve conflicts without deleting unrelated work.
5. Run the branch-specific migration, runtime-isolation and protected-hash
   checks before committing.

## 5. Revalidate services

- Confirm Cloudflare/Railway project and deployment branches.
- Confirm database migration status and backups.
- Confirm Redis availability and keyspace ownership.
- Confirm Meta/WhatsApp webhook and credential state without printing secrets.
- Confirm feature flags default safely.

## 6. Keep wellness isolated

Never import wellness modules into Sara API/customer-app, or Business modules
into `src/react-app/wellness/`. If shared utilities are proposed, conduct a
separate data, identity and dependency review first.
