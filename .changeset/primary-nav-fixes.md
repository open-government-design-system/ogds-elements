---
"@ogds/elements": patch
---

Fix several ogds-primary-nav spacing and sizing issues found while integrating the header on paidleave.maryland.gov, and make component more consistent with USWDS defaults:

- links/summaries own their padding instead of the containing `li`, so each item's touch target fills its whole row. No visual difference from this change. 
- align the first nav item with inline-start at desktop width
- align hover state and current-page indicator more closely with USWDS
