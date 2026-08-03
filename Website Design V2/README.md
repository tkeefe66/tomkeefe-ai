# Handoff: tomkeefe.ai — full site redesign

## Overview
A complete redesign of tomkeefe.ai, the personal site of Tom Keefe (Director, GTM Experts at Demandbase). It has to satisfy three audiences at once: GTM/RevOps practitioners, executives, and recruiters — and act as the hub for the tools he ships.

The design is **enterprise-document**: a deep navy masthead, a continuous white document body on a single grid, and a matching navy closing band. Hairline rules, mono metadata, no ornament. Light and dark modes, a sticky top nav with a Projects dropdown, and two project detail pages.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes demonstrating layout, typography, colour and behaviour. They are **not production code to copy**.

tomkeefe.ai is **Next.js + TypeScript + Tailwind** on Railway. Recreate these designs there using the codebase's existing patterns. This README is written to be sufficient on its own.

The prototype uses a custom streaming runtime (`.dc.html`, `<sc-if>`, `<x-dc>`, `renderVals()`). **Ignore that machinery** — it is authoring infrastructure. Read `<sc-if>` as a conditional render and `renderVals()` as component state.

## Fidelity
**High-fidelity.** Colours, type, spacing and interaction states are final.

---

## Global system

### Typography
| Role | Family | Weights |
|---|---|---|
| UI + headings | **Onest** | 400, 500, 600, 700 |
| Labels, metadata, captions | **IBM Plex Mono** | 400, 500 |

Body default: `font-family: Onest; letter-spacing: -0.011em; -webkit-font-smoothing: antialiased`.

| Token | Size | Weight | Tracking | Line-height | Used for |
|---|---|---|---|---|---|
| Name display | `clamp(48px, 6.6vw, 80px)` | 700 | -0.052em | 0.92 | "Tom Keefe" masthead |
| Project title | `clamp(38px, 5.4vw, 64px)` | 700 | -0.045em | 0.98 | Project page h1 |
| Section headline | `clamp(30px, 3.8vw, 46px)` | 600 | -0.036em | 1.06 | Every section h2 |
| Contact headline | `clamp(30px, 4.4vw, 52px)` | 600 | -0.038em | 1.06 | Contact band |
| Column-header h1 | `clamp(34px, 4.4vw, 52px)` | 600 | -0.038em | 1.06 | Backup header only |
| Principle statement | 26px | 500 | -0.028em | 1.28 | Principles list |
| Project name | 21px | 600 | -0.030em | — | Projects index |
| Header lead | 20px | 400 | — | 1.5 | Under name / project premise |
| Section subhead | 18px | 400 | — | 1.55 | Under each h2, `--muted` |
| Body | 16–16.5px | 400 | — | 1.6 | Prose |
| Row text | 15–16px | 400 | — | 1.5 | List rows |
| Nav / mono label | 11px | 400 | 0.08em | — | Nav, fact tables |
| Mono caption | 10.5px | 400 | 0.06–0.12em | — | Figure captions, footer, strip |

Mono is always UPPERCASE. Prose uses `text-wrap: pretty`; headlines `text-wrap: balance`.

### Colour
Themed CSS custom properties. Swap the whole set on theme change — **nothing may hard-code a neutral or an accent** (an earlier bug hard-coded a plate gradient to #FFFFFF and produced a white band on a black page in dark mode).

**Neutrals — light**
```
--bg #FFFFFF  --ink #0B0D10  --body #3B424C  --muted #6B7280
--faint #9AA1AC  --hair #E4E6EA  --sunk #F7F8F9
```
**Neutrals — dark**
```
--bg #101113  --ink #F0F0F0  --body #C4C4C8  --muted #8B8B8E
--faint #5F5F63  --hair #26272B  --sunk #17181A
```

**Accent** — four options were built; **Navy is the default and the recommended ship**. Each defines `acc` (accent type/rules), `hover`, `tint` (pale surface), `edge` (tint border), `deep` (the full colour fields), `soft` (accent type ON a deep field). `--accInk` is #FFFFFF in light, #101113 in dark.

| Accent | Mode | acc | hover | tint | edge | deep | soft |
|---|---|---|---|---|---|---|---|
| **Navy** | light | #1D3A63 | #152C4C | #E8EDF4 | #D0DAE8 | #152C4B | #A6BCD8 |
| **Navy** | dark | #7FA6D9 | #95B8E4 | #161C26 | #26313F | #1B3050 | #9DBBDD |
| Teal | light | #12605A | #0D4A45 | #E7EFED | #D2E0DC | #0E4C47 | #9CD3C9 |
| Teal | dark | #4FB3A5 | #6AC7BA | #19231F | #2A3B37 | #123F3A | #8FCABC |
| Oxblood | light | #8F3324 | #74281B | #F5E9E5 | #E8D3CC | #71271B | #DFAA9C |
| Oxblood | dark | #D4705C | #E28773 | #241815 | #3B2823 | #6B2A1F | #E0A594 |
| Graphite | light | #31373D | #1F2429 | #ECEEF0 | #DADEE2 | #22282D | #AEB6BE |
| Graphite | dark | #B9C0C7 | #CED4DA | #1A1C1F | #2B2F33 | #272C31 | #C4CBD2 |

Note the dark `deep` values are deliberately lifted from their light counterparts — at first pass they sat too close to `--bg` and the colour fields disappeared in dark mode.

`::selection` = `--acc` on white. Links are `--ink`, hover `--acc`.

### Where colour is allowed
Colour is **structural, not decorative**. Exactly:
1. **Two full-bleed `--accDeep` fields** — the masthead (plus its tech strip) and the closing contact band. These bookend the page.
2. **`--acc` type only** on: range altitude labels, principle numerals, `READ →`, project-page section headings, FIG captions, nav hover.
3. Nothing else. No tinted boxes, no rounded colour panels, no gradients except the figure-plate fade.

> **Rejected approach, do not reintroduce:** inset rounded colour panels per section. They fragment the page. Colour must run full-bleed edge to edge with content on the container grid.

### Layout & rhythm
- Container: `max-width: 1180px; margin: 0 auto; padding: 0 44px` — used inside every full-bleed band and by `<main>`.
- Sections: `margin-top: 44px`. Range opens at `padding-top: 48px`.
- Every section in `<main>` opens with an **h2 headline + one-line subhead** in `--muted`. No mono section labels, no full-width rules between sections — both were explicitly removed.
- Radius: 3px buttons, 999px toggle pills, 0 on figure plates. **No shadows** except the nav dropdown.

---

## Screens

### Sticky nav (all pages)
`position: sticky; top: 0; z-index: 80`, background `--accDeep`, height 56px, container-aligned. Continuous with the masthead when scrolled to top.

- Left: "Tom Keefe", 15px/600/-0.022em, white → home.
- Right, mono 11px/0.08em, `rgba(255,255,255,0.74)`, hover white on `rgba(255,255,255,0.09)`, 8px 12px, radius 3px: **OVERVIEW** (→ #range), **PROJECTS ▾**, **PRINCIPLES**, **CONTACT**, then an **EMAIL** button (white fill, `--accDeep` text).
- **Projects dropdown**: opens on `mouseenter`, closes on `mouseleave`. Panel `min-width: 268px`, `--bg`, 1px `--hair`, radius 4, 6px padding, `box-shadow: 0 12px 28px rgba(0,0,0,0.14)`. Items: project name (14px/600) with a mono subtitle beneath (10.5px, `--faint`) — "MARKET INTELLIGENCE · INTERNAL", "LEDGER + DIGEST · LIVE" — hover `--tint` + `--acc`; hairline divider; "ALL PROJECTS →".
- Anchor jumps scroll with a **-64px offset** so targets clear the bar. From a project page they route home first, then scroll (80ms defer).

### Masthead — Ledger (PRIMARY)
Full-bleed `--accDeep`, white type. Container padding `76px 44px 52px`. Grid `minmax(0,1fr) 360px`, 56px gap.

*Left:* h1 "Tom Keefe" (Name display). Lead paragraph 20px/1.5 at `rgba(255,255,255,0.80)`, `max-width: 34ch`: "I build the systems that carry go-to-market — the automation, the data model, and the tooling underneath the number."

*Right — the ledger:* `border-top: 1px solid rgba(255,255,255,0.5)`, rows `display:flex; justify-content:space-between; padding:11px 0; border-bottom:1px solid rgba(255,255,255,0.16)`, mono 11.5px, label `rgba(255,255,255,0.6)`, value white:

```
ROLE     Director, GTM Experts
COMPANY  Demandbase
FIELD    MOps · RevOps · GTM
YEARS    13
STATUS   Open to conversation
```

Then three buttons: EMAIL (white fill, `--accDeep` text, hover → transparent + white text), LINKEDIN and GITHUB (1px `rgba(255,255,255,0.36)`, text `rgba(255,255,255,0.82)`, hover → white).

### Masthead — Column Rule (APPROVED BACKUP)
Keep implemented behind a flag; the client asked for both. Same navy field, container padding `68px 44px 60px`, grid `230px minmax(0,1fr)`. Left: stacked "Tom / Keefe" 30px/700/-0.045em, a mono block (DIRECTOR / GTM EXPERTS / DEMANDBASE / 13 YEARS IN GTM), three mono text links. Right: `border-left: 1px solid rgba(255,255,255,0.5); padding-left: 40px`, h1 "Every GTM team is running on systems somebody had to build." plus supporting paragraph.

### Technology strip
Its own full-bleed `--accDeep` band **after both masthead variants** — it must appear regardless of which header is active (it originally lived inside the ledger header and vanished when switching to Column).

`border-top: 1px solid rgba(255,255,255,0.16)`, container, `padding: 17px 0 19px`, flex, 22px gap.
- Static mono label `BUILT ACROSS` at `rgba(255,255,255,0.5)`, `flex: 0 0 auto`.
- Track: `overflow: hidden` with `mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)`.
- Inside, `width: max-content` flex row containing the item list **twice**, animated `translateX(0) → translateX(-50%)`, **46s linear infinite**. The duplicate list is what makes the loop seamless.
- Items 14.5px `rgba(255,255,255,0.78)`, separated by 3px `rgba(255,255,255,0.3)` dots.
- `animation-play-state: paused` on hover. Honour `prefers-reduced-motion` — stop the animation, let the row wrap.

List (**inferred from the old site and screenshots — Tom has not confirmed it**): Salesforce, Marketo, Demandbase, HubSpot, Outreach, Snowflake, SQL, dbt, Claude Code, Next.js, TypeScript, Railway, REST APIs.

### Page order
**Overview (Range) → Projects → Principles → Contact.** Range makes the claim, Projects prove it, Principles close on point of view before the contact band.

### 1. Overview / Range  (`#range`)
- h2 "Boardroom to production query."
- Subhead 18px `--muted`, `max-width: 44ch`: "Most people cover one altitude. The work happens between them."
- Paragraph 16px/1.6 `--body`, `max-width: 66ch` — marketing ops → revenue data → the GTM Experts team, closing on "Customer Zero by instinct."
- Five altitude rows. List has `border-top: 1px solid var(--ink)`; each row `display:flex; gap:26px; padding:15px 0; border-bottom:1px solid var(--hair)`; mono label `flex: 0 0 118px` in `--acc`; description 16px.

```
C-SUITE      Revenue narrative, GTM operating model, and where the number actually comes from.
LEADERSHIP   Coverage math, headcount-to-pipeline, and the handoffs between teams.
PROGRAM      Playbooks, routing, territory design, lifecycle definitions.
SYSTEM       CRM architecture, enrichment pipelines, the data model underneath it all.
MACHINE      SQL, APIs, Claude Code, agent workflows that keep running without me.
```

### 2. Projects  (`#projects`)
- h2 "Things I built instead of waiting for a vendor."
- Subhead: "Two are running today. Read either one for the problem, the build and what it cost."
- List with `border-top: 1px solid var(--ink)`, rows `padding: 20px 0; border-bottom: 1px solid var(--hair)`. Each row: name left (21px/600), status right (mono 10.5px/0.08em), description beneath (15px/1.5 `--muted`, `max-width: 68ch`). Hover on linked rows: `padding-left` 0 → 10px, 160ms.

| Project | Right label | Linked |
|---|---|---|
| B2B MarTech Intel | `READ →` in `--acc` | → project page |
| Inventory | `READ →` in `--acc` | → project page |
| Dynasty Analyzer | `IN PROGRESS` in `--faint` | no — name in `--muted`, row inert |
| Field Assistant | `IN PROGRESS` | no |
| tomkeefe.ai | `LIVE` | no |

Only projects with real content are clickable. No stacks here — those live on the detail pages.

### 3. Principles  (`#principles`)
- h2 "Five opinions, held firmly."
- Subhead: "Earned the expensive way. Disagreement welcome — bring the data."
- Five rows, `display:flex; gap:24px; padding:24px 0; border-bottom:1px solid var(--hair)` (last row none). Numeral `flex: 0 0 30px`, mono 11.5px, `--acc`, `padding-top: 9px`. Statement 26px/500/-0.028em/1.28, `max-width: 32ch`. **No gloss text.**

1. Most GTM problems aren't strategy problems. They're plumbing problems nobody wants to own.
2. Buying another tool isn't a strategy. Wiring together the ones you have is.
3. If your team does it manually every week, that's not a process. It's a hostage situation.
4. Build vs. buy is dead. It's build vs. wait.
5. AI doesn't replace ops people. Ops people who build with AI replace vendor stacks.

*(Three more were written and cut: speed-to-answer beats depth; every recurring report becomes an automation; territory fights are data problems in political costumes. Available if the section ever expands.)*

### 4. Contact  (`#contact`)
Full-bleed `--accDeep`, container padding `64px 44px 26px`, `margin-top: 56px`. No section label.
- h2 (Contact headline, white, `max-width: 22ch`): "If something in your stack is held together by a Friday afternoon, let's talk."
- Same three buttons as the masthead.
- Footer: `margin-top: 60px`, `border-top: 1px solid rgba(255,255,255,0.18)`, mono 10.5px `rgba(255,255,255,0.55)` — "© 2026 TOM KEEFE" left, "DIRECTED BY A HUMAN. BUILT WITH AGENTS." right.

### 5. Project detail pages
Routes: `/projects/b2b-martech-intel`, `/projects/inventory`.

1. **Navy header** (same `--accDeep`): a 22px-padded bar with `← TOM KEEFE` left and `PROJECT 01` / `PROJECT 02` in `--accSoft` right; then `border-top: 1px solid rgba(255,255,255,0.16)` and a block at `34px 44px 56px` holding the h1 and a 20px premise line at `rgba(255,255,255,0.8)`, `max-width: 46ch`.
2. **Body**, `padding: 46px 44px 0`, grid `minmax(0,1fr) minmax(260px,340px)`, 48px gap. Left: mono 11px/0.12em `--acc` headings — THE PROBLEM / WHAT I BUILT / WHAT CHANGED (or WHY IT MATTERS AT WORK) — each followed by 16.5px/1.6 prose at `max-width: 64ch`. Right: fact table, `border-top: 1px solid var(--ink)`, rows as per the masthead ledger but in theme colours.
3. **Figure plates**, then footer nav: `← ALL PROJECTS` / `NEXT — <other project> →`.

Fact tables:
- *B2B MarTech Intel* — ROLE Built and operated · STACK Next.js · Claude · RSS · CORPUS 63,731 articles · REFRESH Every 12 minutes · STATUS Internal
- *Inventory* — ROLE Designed and built · STACK Local-first · agent ingest · RECORDS 491 items · 168 active · NEEDS REVIEW 0 · STATUS Live, personal

> **Blocking content item:** B2B MarTech Intel's **WHAT CHANGED** is a live placeholder — `[Outcome pending]`. It needs a real outcome metric from Tom before launch; it is the most important paragraph on the page for the executive audience.
>
> **Verify before publishing:** all project narrative copy was inferred from screenshots, not supplied. Confirm accuracy, and confirm it is permitted to describe B2B MarTech Intel publicly as an internal Demandbase tool.

### 6. Figure plates — the screenshot pattern
Load-bearing and arrived at after two failed attempts. Sources are ~3300px retina captures; scaling one to fit a 1100px column renders it at ~0.27 and nothing is readable.

```
position: relative;
border: 1px solid var(--hair);
overflow: hidden;
height: 480–520px;          /* fixed */
```
Image inside at `display: block; width: 190%; max-width: none;` — **deliberately wider than its container**, so a meaningful region renders near native scale and the rest is cropped. A 96px overlay at the bottom: `linear-gradient(to bottom, transparent, var(--bg))` — the crop dissolves into the page instead of ending in a hard edge.

Narrow images (spend digest, 918×1636) use `width: 100%` in a ~460px column, which is already near native.

Every plate takes a mono caption in `--acc`: `FIG. 01 — NEWS FEED. CATEGORY, SOURCE AND TAG FILTERS ACROSS THE FULL CORPUS.`

Rules for future screenshots: crop to a region at ≥0.5 effective scale; never shrink a whole UI to fit; always fade to `var(--bg)`; always caption.

---

## Interactions
- **Theme toggle** — swaps the full variable set, 220ms transition on background and colour. Should persist to `localStorage` and respect `prefers-color-scheme` on first load. *(The prototype's bottom-right toggle is a dev control — ship a proper one.)*
- **Header variant toggle** — prototype-only, for comparing Ledger vs Column. Do not ship it; ship the chosen variant.
- **Nav dropdown** — hover open/close; consider click + keyboard for production accessibility.
- **Row hover** — `padding-left` 0 → 10px, 160ms.
- **Marquee** — pauses on hover.
- **Buttons** — fill inverts, 150ms.
- No scroll animation. No loading or error states.

## Responsive
Designed at 1180px; below ~900px is unspecified. Known constraints from testing:
- **Never** use fixed-px side columns in content rows — an earlier three-column layout collapsed the primary text below its own annotation at <1150px. Use fractional `minmax(0, Nfr)` tracks.
- Masthead grid, project-detail grid and the digest row should each stack to one column on narrow screens.
- The nav needs a mobile treatment (not designed) — the dropdown assumes hover.

## State
`theme: 'light' | 'dark'` · route/page · `menu: boolean` (nav dropdown) · *(prototype only)* `layout: 'ledger' | 'column'`.

## Assets
`assets/` — three product screenshots supplied by Tom:
- `martech-intel.png` 3292×1740 — B2B MarTech Intel news feed (light UI)
- `inventory.png` 3302×1760 — Inventory item ledger (dark UI)
- `spend-digest.png` 918×1636 — daily spend digest (light UI)

No icons or illustrations. **There is deliberately no logomark.** Three rounds of monogram exploration were rejected; the decision is that the name set in Onest 700 at tight tracking *is* the identity. Do not add a mark.

## Files
- `Tom Keefe.dc.html` — the full design: nav, both mastheads, both themes, all four sections, both project pages.
- `Explorations.dc.html` — rejected directions, for context on what was ruled out (four hero architectures, four palettes, three rounds of logos). Not for implementation.
- `assets/` — the screenshots.

## Outstanding
1. **Outcome metric for B2B MarTech Intel** — placeholder is live on the page.
2. **Verify all inferred project copy**, and clearance to name the Demandbase tool publicly.
3. **Confirm the technology list** in the strip.
4. **Final accent** — Navy is the default and the recommendation; Teal, Oxblood and Graphite are fully specified above if he changes his mind.
5. The four header stats (workflows automated, hours/week saved, apps shipped) were **removed, not designed** — they were `[X]` placeholders with no real numbers behind them. If real figures appear, they need a home.
6. **No writing/notes section exists yet** — the audience-building goal has nowhere to live.
7. Mobile layout and an accessible (click/keyboard) nav dropdown are undesigned.
