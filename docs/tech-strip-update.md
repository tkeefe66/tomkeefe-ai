# Task: update the BUILT ACROSS tech strip

**File to edit:** `content/site.ts`, the `techStrip` array (currently lines 27–30).

That array is the single source of truth for the "BUILT ACROSS" marquee under the
masthead. Nothing else needs to change — the design-system copies under
`Website Design V2/`, `Tom Keefe AI design system/`, and the plan file in
`docs/superpowers/plans/` are historical artifacts, not live code. Leave them alone.

---

## Make this edit

Replace the current array **and its stale comment**:

```ts
  // Unconfirmed by Tom — inferred from the old site (design README §Outstanding 3).
  techStrip: [
    "Salesforce", "Marketo", "Demandbase", "HubSpot", "Outreach", "Snowflake",
    "SQL", "dbt", "Claude Code", "Next.js", "TypeScript", "Railway", "REST APIs",
  ],
```

with:

```ts
  // Build-stack half confirmed 2026-08-15 by scanning all 9 repos in ~/Code Apps
  // (manifests + infra files, then grep-verified). GTM half is Tom's day job.
  techStrip: [
    // GTM systems
    "Salesforce", "Marketo", "Demandbase", "HubSpot", "Outreach", "Snowflake",
    "SQL", "dbt",
    // Build stack
    "Claude Code", "Anthropic API", "Python", "FastAPI", "TypeScript", "Next.js",
    "React", "Postgres", "Docker", "Railway",
  ],
```

13 items → 18.

---

## Why each change (evidence)

Derived from a dependency-manifest scan of all 9 git repos in `~/Code Apps`,
with each claim confirmed by grepping for actual usage — not just a manifest entry.

| Change | Evidence |
|---|---|
| **+ Python** | Largest language by file count: 664 `.py` in public-dynasty, 103 in app-builder-coach, 101 in zParental-stories, 58 in life-tracker. Was entirely absent from the strip. |
| **+ FastAPI** | 4 of 9 repos run FastAPI + uvicorn (public-dynasty, life-tracker, app-builder-coach, zParental-stories). Half the architecture, previously unnamed. |
| **+ Postgres** | The only universal dependency — present in all 9 repos, via Drizzle, SQLAlchemy, `pg`, or psycopg. |
| **+ Anthropic API** | Anthropic SDK in 7 of 9 repos. Distinct from Claude Code: it means shipping products *on* the model, not just coding *with* it. |
| **+ React** | 6 repos. Also covers the Vite frontends (life-tracker, b2b-ai-news-source) that "Next.js" alone misses. |
| **+ Docker** | Multi-stage Dockerfiles in public-dynasty (×2), zParental-stories (×2), app-builder-coach. |
| **− REST APIs** | Generic filler; implied by everything else on the strip. |
| GTM block unchanged | Salesforce / Marketo / Demandbase / HubSpot / Outreach / Snowflake / SQL / dbt reflects Tom's career, not the repo scan. Nothing to correct. |

---

## Alternatives, if 18 items overflow the marquee

**Leaner (15)** — drop `React`, `Docker`, `SQL`:

```ts
  techStrip: [
    "Salesforce", "Marketo", "Demandbase", "HubSpot", "Outreach", "Snowflake", "dbt",
    "Claude Code", "Anthropic API", "Python", "FastAPI", "TypeScript", "Next.js",
    "Postgres", "Railway",
  ],
```

**Builder-forward** — same 18 items, build-stack block first. Rationale: the ledger
directly above already reads "DIRECTOR, GTM EXPERTS AT DEMANDBASE", so the strip can
carry the other half of the identity instead of repeating it.

---

## Deliberately excluded

- **Drizzle / SQLAlchemy** — accurate (2 and 3 repos) but too inside-baseball for a marquee.
- **Vitest / pytest / Playwright** — testing is a real strength (91 test files in
  family-tree, 106 in life-tracker, 99 in outdoor-inventory) but belongs in Principles
  as a claim with a number, not in a scrolling strip.
- **Sentry, SSE, slowapi** — each confirmed in exactly one repo (public-dynasty).
  Too thin to claim as a general capability.

---

## Optional, separate from the strip

`masthead.ledger` currently reads `6mo building AI products/workflows`. The earliest
commit across all 9 repos is **2026-03-24**, so the accurate figure is ~5 months —
across **2,864 commits**. The commit count is the stronger number if you want to swap it.

Do not make this change without asking Tom first.

---

## Verify before finishing

```bash
npm run lint && npm test && npm run build
```

Then confirm the strip renders — 18 items, no horizontal overflow, marquee still loops
cleanly — at desktop and mobile widths.

**Note:** per `AGENTS.md`, this repo runs a Next.js version with breaking changes from
most references. This task only edits a plain TypeScript data file, so no Next.js API
is involved — but read `node_modules/next/dist/docs/` before touching anything else.
