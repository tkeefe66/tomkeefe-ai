# tomkeefe.ai — Personal Portfolio Site (v1 Design)

**Date:** 2026-07-21
**Owner:** Tom Keefe (Director of GTM Experts, Demandbase)
**Status:** Approved by user (design conversation, this session)

## Purpose

A personal site modeled loosely on chadholdorf.com: principles and ideas front and center, projects showcased with evidence. Positions Tom as a GTM Engineer/Ops builder.

**Audience (ranked):** 1) GTM/RevOps community, 2) hiring managers/recruiters, 3) personal record.
**Voice:** Confident & direct — declarative, numbers-forward, a little edge.
**Domain:** tomkeefe.ai (user purchasing separately; site built domain-agnostic).

## Scope

### v1 (this build)
- Single scrolling page at `/` with sticky anchor nav (Principles · Projects · About · Contact) + custom 404.
- Sections in order: Hero → Stat banner → Principles → Projects → About/Skills → Contact.
- All copy in typed content files; placeholders clearly marked, nothing fake presented as real.
- Deployed to Railway (new project/service).

### Explicitly deferred (v2+)
- Blog, real stat numbers, finalized principles, flagship case-study deep-dive, live app metrics via API routes, photo, real contact links if not provided.

## Architecture

- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS. No database, no auth.
- **Why Next over static:** user explicitly chose it for the upgrade path to dynamic features (live app stats pulled from his apps via API routes). Runs as a normal Next server on Railway.
- **Content layer:** `content/site.ts`, `content/principles.ts`, `content/projects.ts`, `content/stats.ts` — typed exports consumed by section components. Editing copy never touches components.
- **Components:** one per section (`Hero`, `StatBanner`, `Principles`, `Projects`, `About`, `Contact`) plus `Nav` and `Footer`, composed in `app/page.tsx`.

## Content spec

### Hero
- Positioning line (draft): **"GTM runs on systems. I build them."** (alternates kept as comments in `site.ts`).
- Credential line: "Director of GTM Experts @ Demandbase".
- Photo slot that renders cleanly with no photo present.

### Stat banner
Four slots rendering placeholder form `[X]+ workflows automated`, `[X] hrs/week automated away`, `[X] apps shipped`, `[X] years in GTM` — visually obvious placeholders until real numbers exist.

### Principles
Eight drafted one-liners in Tom's target voice, each with `draft: boolean`. `draft: true` renders a subtle "draft" tag; Tom flips to `false` as he approves/edits each. Initial drafts (Claude-authored, to be reacted to):

1. Most GTM problems aren't strategy problems. They're plumbing problems nobody wants to own.
2. Buying another tool isn't a strategy. Wiring together the ones you have is.
3. If your team does it manually every week, that's not a process. It's a hostage situation.
4. Speed to answer beats depth of analysis. A directionally right number today moves the deal.
5. Every recurring report should become an automation. Every automation should have an owner.
6. Territory fights, routing rules, attribution debates — data problems wearing political costumes.
7. Build vs. buy is dead. It's build vs. wait.
8. AI doesn't replace ops people. Ops people who build with AI replace vendor stacks.

### Projects (5 cards)
Fields per project: name, one-line description (placeholder drafts below), stack tags (placeholder until confirmed), status badge (`Live` / `In development` / `Internal`), optional link. Grid layout must support later promoting one card to a full-width flagship case study.

1. **B2B News Source** — AI-curated B2B news and account-signal digest. (work-related; shown openly per user)
2. **Outdoors & Photography Assistant** — personal AI assistant for planning outdoor trips and photography.
3. **Sleeper Dynasty Analyzer** — analytics for Sleeper dynasty fantasy football leagues: trades, roster value, draft capital.
4. **Life Focus Tracker** — personal focus/goals tracking app.
5. **This Site** — tomkeefe.ai, designed, written, and deployed by AI agents under Tom's direction.

### About/Skills
Short placeholder bio + 4 categories: GTM Automation · Data & Enrichment · AI Agents · RevOps Tooling.

### Contact
LinkedIn, email, GitHub — placeholder hrefs (`#`) with visible "coming soon" treatment until real links provided.

## Visual design

Bold & high-contrast: near-black background, off-white type, single electric accent color, oversized display numerals on stats, tight grid, generous section spacing. Distinctive, not Tailwind-template-default — build with the frontend-design/impeccable skill. Must be responsive and readable on mobile.

## Error handling & quality

- Custom 404 page in the same visual system.
- Content-shape validation: one vitest test asserting required fields on every content export (bad content edit fails the build loudly, never renders blank).
- Quality gate: `tsc --noEmit`, ESLint, `next build`, vitest all pass before deploy.
- Logging: none needed in v1 (static content, no external calls).

## Deployment

- New Railway project (name: `tomkeefe-ai`), single service `web` deployed from this repo. Confirm service naming at deploy time.
- Custom domain tomkeefe.ai attached after user purchases; Railway-generated domain until then.
