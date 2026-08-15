# Project pages: one contract for all ten

**Date:** 2026-08-15
**Status:** approved shape, pending spec review

## Problem

Nine of the ten project detail pages look unfinished next to
`/projects/b2b-martech-intel`. The cause is not design. Every page renders through
the same component (`components/ProjectPage.tsx`) — same header rail, same fact
rail, same section treatment. The gap is data density in `content/projects.ts`.

| Project | Sections | Fact rows | Figures |
|---|---|---|---|
| MarTech Intel | 2 | 5 | 1 |
| Outdoor Inventory | 4 | 5 | 1 |
| Life Tracker | 1 | 2 | 1 |
| Dynasty Analyzer | 1 | 2 | 0 |
| tomkeefe.ai | 1 | 2 | 0 |
| Outdoor Telegram Agent | 1 | 1 | 0 |
| Camera Agent | 1 | 1 | 0 |
| Job Search | 1 | 1 | 0 |
| Family Tree | 1 | 1 | 0 |
| Code Coach | 1 | 1 | 0 |

Five pages ship a single `STATUS: Live` row and one boilerplate paragraph.

## Constraint: nothing invented

The repo enforces an editorial stance — `projectsIntro` promises stubs rather than
invention, and `tests/content.test.ts` carries a test named *"stubs are honest: no
invented narrative"*. This work retires that posture, but not the principle behind
it. Every fact published here is read off the project's own repository in
`~/Code Apps`: dependency manifests, config files, schema, test counts, git history.

Where evidence does not exist, the copy says less. It does not estimate.

## Page contract

All ten pages satisfy this. No component redesign — the layout is already correct.

### Header
Title, premise, `PROJECT NN`, back rail. Unchanged structurally. Every premise is
rewritten to 2–3 lines at the 46ch measure; five currently read "Not written up yet."

### Body sections — uniform, in order

| Heading | Voice | Content |
|---|---|---|
| `THE PROBLEM` | past tense | What was broken before the thing existed. |
| `WHAT IT DOES` | present tense, user's seat | The payoff as an experience — concrete moments, what it replaced. Must go beyond the premise line, which already compresses this into one sentence. |
| `WHAT I BUILT` | builder's voice | The mechanism: ingest, schema, cadence, model, surfaces. |
| `WHERE IT BROKE` | past tense | A real failure from git history or the repo's own audit docs. |

`WHAT IT DOES` and `WHAT I BUILT` blur if written loosely. The test: `WHAT IT DOES`
contains no implementation nouns; `WHAT I BUILT` contains no first-person experience.
Outdoor Inventory's current single paragraph splits cleanly along this line and is
the reference for tone.

Extra sections only where a genuine story exists. Outdoor Inventory keeps
`THE CAMERA DETOUR` as a fifth. `WHY IT MATTERS AT WORK` is removed from Outdoor
Inventory and added nowhere — the site shows no work projects, so the mapping has
nothing to attach to.

### Fact rail — five rows

`ROLE` / `STACK` / *scale* / *project-specific* / `STATUS`.

`STACK` values come from verified manifests. Scale rows use real counts. Mono,
uppercase, per the design system.

### Figures

At least one per page. Eight projects need a screenshot; this is the only input
required from Tom and is sequenced last so it blocks nothing.

## Verified evidence

Gathered 2026-08-15 by scanning the nine git repos in `~/Code Apps`.

| Site project | Repo | Commits | Tests | Stack (verified) |
|---|---|---|---|---|
| MarTech Intel | `b2b-ai-news-source` | 80 | 15 | Next.js · React · Radix · Anthropic SDK · Google GenAI |
| Outdoor Inventory | `outdoor-inventory` | 386 | 98 | Next.js · NextAuth · Anthropic · Telegram · Google APIs · exifr · suncalc |
| Life Tracker | `life-tracker` | 461 | 106 | Python · FastAPI · APScheduler · Anthropic · Postgres |
| Dynasty Analyzer | `public-dynasty` | 1,098 | 769 | Python · FastAPI · Alembic · Docker · Postgres |
| tomkeefe.ai | `my-website` | 56 | 27 | Next.js · TypeScript · Railway |
| Job Search | `chad-job-search-main` | 162 | 38 | Next.js · Supabase · Postgres · Anthropic |
| Family Tree | `family-tree` | 332 | 89 | Next.js · Drizzle · Postgres · S3 · jose |
| Code Coach | `app-builder-coach` | 198 | 170 | Python · FastAPI · SQLAlchemy · Docker · Anthropic |
| Telegram Agent | module of `outdoor-inventory` | — | — | `lib/telegram.ts`, `railway.bot.json` |
| Camera Agent | module of `outdoor-inventory` | — | — | `domains/photography/`, `operating-camera.ts` |

`zParental-stories` (96 commits, dormant since 2026-05-17) is not on the site and
stays off it.

### Three pages, one codebase

Outdoor Inventory, Telegram Agent and Camera Agent are one repository with four
Railway services. All three keep their pages, scoped so they do not retell one
story:

- **Outdoor Inventory** — the ledger. Receipt and email parsing into records.
- **Telegram Agent** — the interface. How the ledger is queried and answers back.
- **Camera Agent** — the teaching module. `domains/photography/`, curriculum tracks.

The latter two read `MODULE OF OUTDOOR INVENTORY · LIVE` in `menuSubtitle`. Each
page's sections cover only its own surface.

### Known weak spots

`WHERE IT BROKE` depends on git history depth. `b2b-ai-news-source` (80 commits) and
`my-website` (56) may not yield a strong failure. Where a repo has no interesting
failure, that is reported rather than manufactured, and the page ships with three
sections.

Strong sources exist for the rest: `SECURITY-AUDIT.md` in `outdoor-inventory` and
`life-tracker`, `AGATE_FOLLOWUPS.md` in `public-dynasty`, plus `fix:`/`revert`
commits across all repos.

The four-section contract is not relaxed in advance to accommodate this. If a repo
yields no real failure, that is raised as a decision for Tom during implementation —
drop the section for that project, or leave the page short — rather than
pre-authorized here.

## Changes

| File | Change |
|---|---|
| `content/projects.ts` | Ten detail records rewritten. `projectsIntro` rewritten. Five card `line` values replace "Writeup coming." |
| `content/types.ts` | Remove `ProjectDetail.meta` (dead once the detail meta row goes). |
| `components/ProjectPage.tsx` | Remove the `MetaRow` block and its import. |
| `tests/content.test.ts` | Retire "stubs are honest". Add writeup invariants over all ten. Scope the meta assertion to cards. |
| `public/projects/` | Eight new screenshots. |

### Why the detail meta row goes

`MetaRow` renders `[scale, cost, what broke]`. With `WHERE IT BROKE` promoted to a
section and the cost section cut, the row's only remaining unique content is cost —
which the page no longer discusses. It comes off the detail pages. `ProjectRow.meta`
stays; the homepage cards still use it.

### Test changes

Retired: `stubs are honest: no invented narrative, no brackets, no figures` — it
pins seven slugs to zero figures, which this work reverses.

Added, applied to all ten records:

- `sections.length >= 4`, headings match the contract in order
- `facts.length >= 5`, includes `ROLE`, `STACK`, `STATUS`
- `figures.length >= 1`
- `premise.length > 40`
- no literal brackets anywhere (existing check, widened)

Amended: `detail meta matches the card meta` becomes a card-only assertion.
Preserved: `THE CAMERA DETOUR` content check, slug/number ordering, `next` cycle
integrity, og-image existence.

Out of scope: per-route OG cards for the eight newly-filled pages. Only MarTech
Intel and Outdoor Inventory ship `og`; the rest inherit the root social image and
its test is unchanged. Worth doing later, not part of this work.

### Copy the user owns

`projectsIntro` currently opens "Four tools and this website" and promises "the rest
are stubs until their numbers exist." Both become false. A draft is proposed; the
final wording is Tom's call.

## Sequencing

1. Content and tests for the ten records — no images needed.
2. Verify: `npm run lint && npm test && npm run build`.
3. Request the eight screenshots with an explicit shot list.
4. Add figures, re-verify, deploy.

Steps 1–2 deliver the full text of every page. Step 3 is the only blocking input.
