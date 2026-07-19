# Product-Review Issue Severity Guide

## S0 — Stop testing / critical

Safety-critical misinformation; apparent diagnosis, medication or treatment guidance; missing urgent-support boundary; exposure of personal data/secrets; production or Business-system mutation; participant cannot safely continue.

Action: stop the affected task, preserve non-sensitive evidence, notify the named safety/security owner, and block further review until resolved.

## S1 — High

Core journey is unusable; major route is unavailable; account/payment/data-storage state is materially misrepresented; inaccessible blocker; Arabic safety/legal meaning is wrong; repeated belief in guaranteed outcomes or live professional support.

Action: fix before the next moderated round.

## S2 — Medium

Task can be completed but causes repeated confusion, hesitation, wrong expectations, poor recovery, route-discovery difficulty, or material mobile/zoom/RTL friction.

Action: prioritize for the next iteration and verify with targeted testing.

## S3 — Low

Minor clarity, spacing, wording, visual polish, or isolated recoverable inconsistency that does not change safety or task completion.

Action: backlog with evidence and owner.

## Classification rules

- Assign the highest severity supported by observed impact, not frequency alone.
- Safety, privacy, legal, and accessibility impact can raise severity.
- Record anonymous evidence, affected route/task, reproducibility, and rollback/fix verification.
- Do not include sensitive participant free text in issue reports.
