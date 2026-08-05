# OPEN — clauses omitted for missing values (rewrite brief, 2026-08)

Per the brief's rule 1: unfilled values are never estimated or padded — the
clause is deleted and logged here. Restore each by editing the content module
listed.

- **B4 — Dynasty card meta** (`content/projects.ts`): "[B4 leagues] so far, all
  of them people I know" omitted. Meta row ships with 2 of 3 fragments.
- **B5 — Inventory card meta** (`content/projects.ts`): "[B5 items] catalogued"
  omitted. Meta row ships with 2 of 3 fragments.
- **B7 — tomkeefe.ai card meta** (`content/projects.ts`): all three values
  (sessions / API spend / rewrite count) unfilled — the entire third line is
  dropped rather than shipping a partial.
- **Footer changelog** (`content/site.ts`): "Last shipped: [month], [what]"
  unfilled — footer ships as "© 2026 Tom Keefe" alone.
- **B1/B2 — Life Tracker** (deferred by decision, not blocked): card ships
  body-only with no metadata row; /projects/life-tracker is an intentional
  stub. Restore target: before the Dynasty launch, September 2026.
- **MarTech detail page — "WHAT CHANGED" section** (`content/projects.ts`,
  removed in Phase 2): its body was a literal bracket placeholder awaiting a
  real outcome metric. Reinstate when the number exists.
- **Stub routes** (`/projects/life-tracker`, `/projects/dynasty-analyzer`,
  `/projects/tomkeefe-ai`): intentionally incomplete — card copy + short intro
  only, no invented narratives. Life Tracker awaits B1/B2; Dynasty awaits B4;
  tomkeefe.ai awaits B7.
