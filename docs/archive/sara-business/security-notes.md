# SARA Business Archive Security Notes

## What this archive does not contain

- secret values or access tokens
- database or Redis URLs
- app secrets, signing keys or encryption keys
- Meta/WhatsApp identifiers
- personal customer information
- raw production logs or provider payloads

## Freeze safeguards

1. Historical source is retained; no destructive cleanup was performed.
2. Archive refs point only to reviewed stable commits.
3. Uncommitted and stashed work is named in the branch map.
4. Wellness runtime isolation tests reject Business API/client imports, live
   network calls, Clerk, Meta/WhatsApp terms and common secret patterns.
5. The wellness preview stores only a language preference in browser local
   storage; discovery answers are React in-memory state and are not transmitted.

## Manual security work before infrastructure shutdown

- Verify data-retention and contractual requirements.
- Export or back up approved records using least privilege.
- Disable automated deployments before revoking runtime credentials.
- Rotate/revoke credentials only after confirming no required service still
  depends on them.
- Review webhook subscriptions before disconnecting providers.
- Record every shutdown/revocation action and rollback procedure.

## Future wellness backend

It requires a new threat model, separate identity boundary, separate data
stores, wellness-specific consent/deletion flows, separate model credentials,
and clear medical-safety escalation. None of those should be inherited from
SARA Business by convenience.
