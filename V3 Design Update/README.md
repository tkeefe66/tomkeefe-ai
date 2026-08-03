# Handoff: tomkeefe.ai site update

## Overview

This bundle specifies **everything added to the tomkeefe.ai design system after the original homepage was built**. The live site currently has one page — the homepage, light theme, desktop only. This update adds:

1. **Two project detail pages** (B2B MarTech Intel, Inventory) — the site's only real content pages besides the homepage.
2. **An alternate masthead** ("Column Rule") as a switchable variant of the homepage hero.
3. **Full responsive behavior** down to 390px, including a mobile nav.
4. **Keyboard focus states and a skip link** — the site currently has none, and the nav dropdown is keyboard-unreachable.
5. **Dark mode**, following the OS with an explicit override.
6. **Favicon, apple-touch icon, and three OpenGraph share cards.**

Items 4 and 5 are corrections to the existing homepage as well as requirements for the new pages.

## About the design files

The files in this bundle are **design references and production-ready CSS**. The token and layout stylesheets are meant to ship as-is; everything else is specification.

**Recreate the designs in the target codebase's own environment** using its established patterns. If the site has no framework yet, a static generator (Astro, Eleventy) suits it better than a SPA — there are three pages, no forms, and no authenticated state. Nothing here needs client-side routing.

The design system's HTML prototypes (listed under **Files** below) are previews built on a compiled component runtime; read them for behavior, not for architecture.

## Fidelity

**High-fidelity.** Every value in this document is exact and taken from the source design, not approximated. Colors are final hex values; type sizes include their `clamp()` expressions; spacing, radii and durations are literal. Recreate pixel-perfectly.

Two places are deliberately *not* final and are marked as such:
- The "WHAT CHANGED" section on the B2B MarTech Intel page contains a placeholder: `[Outcome pending — the number you want to lead with goes here.]`. Tom needs to supply the metric.
- No mobile layout was ever *designed* — the responsive rules in `layout/responsive.css` are a system-level derivation from the desktop design, not a separate mock. They are correct and tested, but if Tom wants a different mobile treatment, that's a design conversation, not an implementation bug.

---

## Design tokens

Use `styles.css` as the single entry point. It `@import`s, in order: `tokens/fonts.css`, `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `layout/dark.css`, `layout/focus.css`, `layout/responsive.css`. **Order matters** — the layout files override token values inside media queries.

### Colors — light (default)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page |
| `--ink` | `#0B0D10` | Headings, heavy rules |
| `--body` | `#3B424C` | Body prose |
| `--muted` | `#6B7280` | Mono labels, secondary |
| `--faint` | `#9AA1AC` | Meta, placeholder copy |
| `--hair` | `#E4E6EA` | Hairline rules, borders |
| `--sunk` | `#F7F8F9` | Recessed panels |
| `--acc` | `#1D3A63` | Links, accent type, focus ring |
| `--acc-hover` | `#152C4C` | Link hover |
| `--acc-ink` | `#FFFFFF` | Type on `--acc` |
| `--acc-deep` | `#152C4B` | The deep field (nav, masthead, contact band) |
| `--acc-soft` | `#A6BCD8` | Accent type on a deep field |
| `--tint` | `#E8EDF4` | Tinted surface |
| `--tint-edge` | `#D0DAE8` | Tinted surface border |

### Colors — dark (`[data-theme="dark"]`)

| Token | Value |
|---|---|
| `--bg` | `#101113` |
| `--ink` | `#F0F0F0` |
| `--body` | `#C4C4C8` |
| `--muted` | `#8B8B8E` |
| `--faint` | `#82828A` |
| `--hair` | `#26272B` |
| `--sunk` | `#17181A` |
| `--acc` | `#7FA6D9` |
| `--acc-hover` | `#95B8E4` |
| `--acc-ink` | `#101113` |
| `--acc-deep` | `#1B3050` |
| `--acc-soft` | `#9DBBDD` |
| `--tint` | `#161C26` |
| `--tint-edge` | `#26313F` |

Note the deep field **lifts** in dark (`#152C4B` → `#1B3050`) rather than darkening. At the original value the field sat too close to `--bg` and the page structure disappeared. `--faint` is also lighter than a naive inversion would give (`#82828A`) so the 10.5px mono status markers clear AA against `--bg` — 4.96:1.

### On a deep field

Every piece of type on `--acc-deep` is a **white alpha**, never a solid neutral. This is non-negotiable — solid greys look dirty on the navy.

| Token | Value | Use |
|---|---|---|
| `--on-field` | `#FFFFFF` | Headings, table values |
| `--on-field-strong` | `rgba(255,255,255,0.82)` | Back links, secondary buttons |
| `--on-field-body` | `rgba(255,255,255,0.80)` | Lead paragraphs |
| `--on-field-label` | `rgba(255,255,255,0.60)` | Mono labels |
| `--on-field-faint` | `rgba(255,255,255,0.45)` | Footer meta |
| `--on-field-rule-strong` | `rgba(255,255,255,0.50)` | Opening rule on a field table |
| `--on-field-border` | `rgba(255,255,255,0.36)` | Button borders |
| `--on-field-rule` | `rgba(255,255,255,0.16)` | Hairlines |
| `--on-field-hover` | `rgba(255,255,255,0.09)` | Nav item hover wash |

### Alternate accents

Three are tokenized and switch via `data-accent` on the root: `teal` (`--acc: #12605A`), `oxblood` (`#8F3324`), `graphite` (`#31373D`). Each has a dark-mode pair. **Navy is the shipping default** — the alternates exist so the palette decision stays reversible. Only the seven `--acc*` / `--tint*` values change; neutrals never do.

### Typography

Two families, loaded from Google Fonts: **Onest** (400/500/600/700) and **IBM Plex Mono** (400/500). Both are OFL-licensed. Self-host if you want offline reliability — the design system ships the Google `@import` because no binaries were supplied.

| Token | Value |
|---|---|
| `--font-sans` | `Onest, system-ui, -apple-system, sans-serif` |
| `--font-mono` | `"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace` |

Sizes — fluid values are `clamp()` and need **no media queries**:

| Token | Value |
|---|---|
| `--size-name` | `clamp(48px, 6.6vw, 80px)` |
| `--size-project-title` | `clamp(38px, 5.4vw, 64px)` |
| `--size-section` | `clamp(30px, 3.8vw, 46px)` |
| `--size-contact` | `clamp(30px, 4.4vw, 52px)` |
| `--size-column-h1` | `clamp(34px, 4.4vw, 52px)` |
| `--size-principle` | `26px` |
| `--size-project-name` | `21px` |
| `--size-lead` | `20px` |
| `--size-subhead` | `18px` |
| `--size-body-lg` | `16.5px` |
| `--size-body` | `16px` |
| `--size-row` | `15px` |
| `--size-data` | `11.5px` |
| `--size-label` | `11px` |
| `--size-caption` | `10.5px` |

Tracking tightens as type grows and opens for mono: `--track-name: -0.052em`, `--track-project-title: -0.045em`, `--track-section: -0.036em`, `--track-contact: -0.038em`, `--track-principle: -0.028em`, `--track-project-name: -0.030em`, `--track-base: -0.011em`, `--track-label: 0.08em`, `--track-label-wide: 0.12em`, `--track-caption: 0.06em`.

Leading: `--leading-name: 0.92`, `--leading-display: 1.06`, `--leading-principle: 1.28`, `--leading-snug: 1.5`, `--leading-body: 1.6`.

Measure: `--measure-lead: 34ch`, `--measure-subhead: 52ch`, `--measure-principle: 32ch`, `--measure-prose: 66ch`, `--measure-row: 68ch`.

`--track-base` is applied to `<body>`. Sentence case everywhere; UPPERCASE only in mono. Title Case appears nowhere.

### Spacing, rules, radius, motion

Scale: `4, 8, 11, 16, 22, 26, 44, 56, 76` px (`--space-1` … `--space-9`). Note 11 and 22 — not a strict 4px grid. **Do not round these to 12 and 24.**

Layout: `--container: 1180px`, `--gutter: 44px`, `--section-gap: 44px`, `--nav-height: 56px`, `--scroll-offset: 64px` (applied as `scroll-margin-top` on every `[id]` so anchors clear the sticky nav).

Rules — **only two weights exist**: `--rule-thin: 1px` (hairlines, `--hair`) and `--rule-thick: 1.5px` (opens a table or a section, `--ink`).

Radius: `--radius-button: 3px`, `--radius-panel: 4px`, `--radius-pill: 999px`. Figure plates are radius **0**.

Motion: `--ease: cubic-bezier(0.2, 0.8, 0.2, 1)`, `--dur-hover: 160ms`, `--dur-theme: 220ms`, `--dur-marquee: 46s`. No scroll-triggered animation, no reveals, no parallax.

---

## Screens

### 1. Homepage — masthead variants

The existing homepage hero gets a **second variant**. Both share the same nav, tools strip, and everything below.

**Variant A — "Ledger" (current, default).** Two columns inside `--container`, `padding: 76px var(--gutter) 52px`, on `--acc-deep`:
- Left (`minmax(0,1fr)`): name at `--size-name` / weight 700 / `--track-name` / `--leading-name`, then the lead paragraph, then three buttons.
- Right (fixed `360px`): the fact table (ROLE / COMPANY / FIELD / YEARS / STATUS).
- Gap `56px`, `align-items: start`.

**Variant B — "Column Rule" (new).** Identity rail beside a statement headline, `padding: 68px var(--gutter) 60px`:
- Left rail (fixed `230px`, `padding-right: 30px`): "Tom" / "Keefe" on two lines at `30px` / weight 700 / `--track-project-title` / `line-height: 1`. Below at `16px` margin: four mono lines at `--size-caption`, `line-height: 1.95`, `--on-field-label` — `DIRECTOR`, `GTM EXPERTS`, `DEMANDBASE`, `13 YEARS IN GTM`. Below at `20px` margin: three mono links in a `7px`-gap column — `EMAIL →`, `LINKEDIN →`, `GITHUB →`, at `--size-label` / `--track-caption` / `--on-field-strong`.
- Right body: `border-left: 1px solid var(--on-field-rule-strong)`, `padding-left: 40px`. Headline at `--size-column-h1` / weight 600 / `--track-contact` / `--leading-display`, `max-width: 20ch`, `text-wrap: balance`: *"Every GTM team is running on systems somebody had to build."* Then at `22px` margin a paragraph at `--size-subhead` / `line-height: 1.55` / `--on-field-body` / `max-width: 54ch`: *"Usually badly, usually undocumented, usually by whoever was closest. For thirteen years that person has been me — and I've made a career of turning that improvisation into infrastructure."*

**Which ships?** Tom's call. Ledger is the current default. Build the toggle only if he wants to keep both; otherwise pick one and delete the other.

### 2. Project detail page (new) — two instances

One template, two content sets. Structure top to bottom:

**Nav** — the same sticky `SiteNav`, with the brand link routing home.

**Header** on `--acc-deep`, two parts:
- A meta row: `padding: 22px var(--gutter)`, `display: flex`, `justify-content: space-between`, mono at `--size-label` / `--track-label`. Left `← TOM KEEFE` in `--on-field-strong`; right the project number (`PROJECT 01`) in `--acc-soft`.
- The title block: `border-top: 1px solid var(--on-field-rule)`, `padding: 34px var(--gutter) 56px`. Title at `--size-project-title` / weight 700 / `--track-project-title` / `line-height: 0.98` / `--on-field`. Lead at `18px` margin, `--size-lead` / `--leading-snug` / `--on-field-body` / `max-width: 46ch` / `text-wrap: pretty`.

**Body** inside `--container`, `padding: 46px var(--gutter) 0`. Two columns — `minmax(0,1fr)` and `minmax(260px, 340px)`, gap `48px`, `align-items: start`:
- Left: three prose sections. Each heading is mono at `--size-label` / weight 500 / `--track-label-wide` / `--acc`. Each paragraph is `--size-body-lg` / `--leading-body` / `--body` / `max-width: 64ch` / `text-wrap: pretty`, `12px` below its heading. Sections are `32px` apart.
- Right: the spec table (see FactTable below).

**Figure plate** at `--section-gap` margin. Then, on the Inventory page only, a **second figure** at `38px` margin: a `flex` row, gap `26px`, `align-items: flex-start`, wrapping — plate at `flex: 0 1 460px` (min `280px`, height `360`, zoom `100`), and a note paragraph at `flex: 1 1 300px`, `15.5px` / `--leading-body` / `--muted` / `max-width: 46ch`.

**Pager** at `56px` margin: `padding: 20px 0 56px`, `border-top: 1px solid var(--hair)`, `display: flex`, `justify-content: space-between`, mono at `--size-label` / `--muted`. Left `← ALL PROJECTS`, right the next project.

#### Content — B2B MarTech Intel (`PROJECT 01`)

- **Title:** B2B MarTech Intel
- **Lead:** A market-intelligence system for a go-to-market organization, built so the field stops guessing what changed this week.
- **THE PROBLEM:** Market and account signal lived in a dozen places — newsletters, alerts, analyst notes, someone's bookmarks. By the time it reached a seller it was stale, and nobody owned the job of curating it.
- **WHAT I BUILT:** A continuous ingest across news, GTM tech and AI sources that categorizes and tags every article, tracks named companies, and refreshes every twelve minutes. On top of the same corpus sit the things people actually asked for: briefings, trend analysis, an AI analyst, and drafting tools for thought leadership and field enablement.
- **WHAT CHANGED:** `[Outcome pending — the number you want to lead with goes here.]` — render in `--faint`.
- **Spec:** ROLE `Built and operated` · STACK `Next.js · Claude · RSS` · CORPUS `63,731 articles` · REFRESH `Every 12 minutes` · STATUS `Internal`
- **Figure:** `martech-intel.png`, height `520`, zoom `190`, **light capture**. Caption: `FIG. 01 — NEWS FEED. CATEGORY, SOURCE AND TAG FILTERS ACROSS THE FULL CORPUS.`
- **Pager:** `NEXT — INVENTORY →`

#### Content — Inventory (`PROJECT 02`)

- **Title:** Inventory
- **Lead:** The same discipline I apply to a revenue stack, pointed at my own household: parse everything, categorize it once, query it forever.
- **THE PROBLEM:** Purchase history is scattered across receipts, order confirmations and card statements, none of which agree on what a thing is. Spending questions that should take a second take an afternoon.
- **WHAT I BUILT:** An agent ingest that parses receipts and email into a single ledger — 491 items with brand, price, category, domain and type resolved automatically, and a review queue for anything it can't place confidently. Spend is tracked against the same month last year, and a daily digest rolls it up by day with behavioral tags rather than merchant names.
- **WHY IT MATTERS AT WORK:** It is a signal pipeline with a different subject: messy inputs, an enrichment layer, a confidence threshold, and a human review queue. Every problem in it is a problem I've solved in a CRM.
- **Spec:** ROLE `Designed and built` · STACK `Local-first · agent ingest` · RECORDS `491 items · 168 active` · NEEDS REVIEW `0` · STATUS `Live, personal`
- **Figure 1:** `inventory.png`, height `480`, zoom `190`, **dark capture**. Caption: `FIG. 01 — ITEM LEDGER. 491 RECORDS, AUTO-CATEGORIZED, 0 AWAITING REVIEW.`
- **Figure 2:** `spend-digest.png`, height `360`, zoom `100`, light capture. Caption: `FIG. 02 — DAILY DIGEST.` Note: *"Days are tagged by shape — social, delivery, rides, date — so a week reads as behavior instead of a list of charges. It's the same instinct as a signal feed: the raw event is less useful than the pattern it belongs to."*
- **Pager:** `NEXT — B2B MARTECH INTEL →`

---

## Components used

All ten already exist in the design system. Two changed in this update.

**SiteNav** — sticky, `z-index: 80`, `--acc-deep`, height `--nav-height`. Brand at `15px` / weight 600 / `-0.022em`. Links are mono `--size-label` / `--track-label` / `--on-field-strong`, `padding: 8px 12px`, radius `--radius-button`, hover `--on-field-hover`. CTA is a white pill with `--acc-deep` type, `padding: 8px 14px`.
- **Changed:** the PROJECTS dropdown now opens on **click as well as hover** (it was hover-only, unusable on touch). Panel is `--bg`, `1px solid --hair`, radius `--radius-panel`, `padding: 6px`, `min-width: 268px`, and carries **the only shadow in the system**: `0 12px 28px rgba(0,0,0,0.14)`. Each entry: title at `14px` / weight 600 / `-0.02em`, meta below at `--size-caption` / `--track-caption` / `--faint`.
- **Changed:** added `onBrandClick` so a project page can route home.

**FactTable** — label left in `--muted`, value right in `--ink`, both mono at `--size-data`. Opened by a `1.5px --ink` rule; rows separated by `1px --hair`; last row has no border. Row padding `10px 0` (`11px 0` on a field). With `onField`, rules become `--on-field-rule`, the opening rule `--on-field-rule-strong`, labels `--on-field-label`, values `--on-field`.
- **Changed:** new `collapsible` + `summary` props. At ≤700px the rows start **closed** behind a mono disclosure line showing `summary` and a `▾` that rotates 180° when open. Above 700px the toggle is `display: none` via CSS and rows always render. **Visibility must be owned by CSS, not an inline style** — an inline `display` cannot be overridden by the media query.

**Button** — three variants (primary filled `--acc`, secondary bordered, ghost) plus an `onField` mode. Hover **inverts the fill** rather than shifting color.

**RowLink** — the project list row. Title `--size-project-name` / weight 600 / `--track-project-name`; description `--size-row` / `--leading-body` / `--body`; status mono right-aligned. Hover shifts `padding-left` **0 → 10px** over `--dur-hover`. Never a color change. Added a `tk-row-link` class for focus offset.

**FigurePlate** — the screenshot frame. Image renders **wider than its container** (`zoom` %, default 190) so a real region reads at natural size; `overflow: hidden`, `1px --hair` border, radius **0**, fixed `height`. A bottom gradient fades to `--bg`. Caption below in mono `--size-caption` / `--track-caption` / `--faint`.
- **Changed:** new `capture="light" | "dark"` prop. In dark mode, **light captures are dimmed** to `brightness(0.82) contrast(1.02)` and restore to full on hover; dark captures are untouched. `inventory.png` is a dark interface; `martech-intel.png` and `spend-digest.png` are light.

**SectionHeading, StatusLabel, LabelledRow, Statement, TechMarquee** — unchanged. `LabelledRow` gained `tk-labelled-row` / `tk-label` classes so its `118px` mono label can stack on mobile.

---

## Responsive behavior

All rules live in `layout/responsive.css`. Components are inline-styled, so they expose `tk-*` class hooks and this file is the **only** place layout changes by viewport. Type needs no breakpoints — display sizes are already `clamp()`.

| Breakpoint | Behavior |
|---|---|
| ≤ 900px | Both mastheads collapse to one column — the ledger's fact table drops below the lead; the Column Rule's `border-left` becomes a `border-top` with `padding-top: 28px`. Project body stacks prose above spec table. Figure plates → `400px`. |
| ≤ 760px | Nav links leave the bar. A mono `MENU` / `CLOSE` button (bordered `--on-field-border`) opens them as a full-width panel on the field: `position: absolute`, `top: 100%`, `border-top: 1px solid --on-field-rule`, `padding: 10px var(--gutter) 18px`. The dropdown renders **inline** in that panel (`position: static`) rather than as a floating card. |
| ≤ 700px | `--gutter` 44 → 20px, `--section-gap` 44 → 36px, `--space-9` → 52px, `--space-8` → 40px. LabelledRow labels stack above their text. Figure plates → `300px`. Masthead fact table starts collapsed. |
| ≤ 560px | Footer and pager meta rows stack (`.tk-meta-row` → column). |
| ≤ 520px | `--gutter` → 16px. |

Figure plates **crop shorter, never scale down** — the image stays at its zoom so the interface remains legible.

## Focus states (new)

The source design specified none. A sticky nav with a dropdown is unusable by keyboard without them.

- **Ring:** `outline: 2px solid var(--acc)`, `outline-offset: 2px`, radius follows `--radius-button`. Applied via `:where(a, button, [tabindex]):focus-visible`.
- **On a deep field:** any focusable inside `.tk-field` gets `outline-color: var(--acc-soft)` — the accent *is* the background there. Put `tk-field` on the nav, both mastheads, the project header, and the contact band.
- **`:focus-visible` only** — mouse clicks never show a ring.
- **Row links** use `outline-offset: 3px` so the ring doesn't collide with the hover padding shift.
- **Skip link:** `.tk-skip`, first element in the body. `position: absolute`, `translateY(-250%)` until `:focus`, then `translateY(0)`; `pointer-events: none` while hidden. Bordered `--acc` chip on `--bg`, mono `--size-label`. Homepage targets `#range`; project pages target `#top`.

The outline deliberately matches nothing else in the vocabulary so it can't be mistaken for a border or rule. **Press states remain unstyled** — that is the source design's intent, not an oversight.

## Dark mode (new)

- Default markup state is `<html data-theme="auto">`, which follows `prefers-color-scheme`. An explicit choice replaces the attribute with `light` or `dark`. **The prototype's theme chip does not persist** — it is preview-only state, so no viewer's click changes what the card looks like next time. If you want the real site to remember the choice, add the `localStorage` write yourself; it was deliberately left out here.
- `layout/dark.css` mirrors the `[data-theme="dark"]` block for the `auto` case. **Keep the two in sync** — if you change a dark value in `tokens/colors.css`, change it in `layout/dark.css` too.
- Body transitions `background` and `color` over `--dur-theme`.
- The figure plate's bottom fade blends to `--bg`, so it inverts automatically. Nothing to do.

If you'd rather avoid the duplicated block, replace both with a single `light-dark()` implementation or move the media query into `tokens/colors.css` — the duplication exists only because the token file has no media queries by convention.

## Interactions

- **Nav dropdown:** opens on hover (`onMouseEnter` / `onMouseLeave`) and on click. Closes on selection.
- **Mobile menu:** toggles on click, closes when a link is chosen.
- **Fact table disclosure:** toggles on click, mobile only.
- **Row link hover:** `padding-left` 0 → 10px, `--dur-hover`, `--ease`.
- **Button hover:** fill inverts (filled → transparent with accent type, and back).
- **Nav item hover:** `--on-field-hover` wash.
- **Figure plate hover:** in dark mode only, a light capture returns to full brightness.
- **Anchor scrolling:** `scroll-behavior: smooth` on `html`; every `[id]` carries `scroll-margin-top: var(--scroll-offset)`.
- **No** scroll-triggered animation, reveals, parallax, or loading skeletons. The marquee is the only autonomous motion (`--dur-marquee: 46s`, linear, infinite).

## State

Trivial. Per-page: `open` (dropdown), `menu` (mobile nav), `open` (fact table). Site-level: `theme` (`auto` | `light` | `dark`) — not persisted in the prototype; persist it in production if you want the choice remembered. If you build the masthead toggle, one more: `masthead` (`ledger` | `column`). No data fetching — all content is static.

## Assets

In `assets/`. All three screenshots were supplied by Tom from his own running tools; the icons and share cards were generated from `guidelines/brand-share.html` in the design system.

| File | Size | Notes |
|---|---|---|
| `martech-intel.png` | — | Light UI. B2B MarTech Intel news feed. |
| `inventory.png` | — | **Dark UI.** Inventory item ledger. |
| `spend-digest.png` | — | Light UI. Daily spend digest. |
| `favicon.png` | 512×512 | `TK` in IBM Plex Mono 500, white on `--acc-deep`. |
| `apple-touch-icon.png` | 180×180 | Same, set tighter — iOS masks corners. |
| `og-home.png` | 1200×630 | Homepage share card. |
| `og-martech.png` | 1200×630 | B2B MarTech Intel share card. |
| `og-inventory.png` | 1200×630 | Inventory share card. |

**There is no logo.** Three rounds of monogram exploration were rejected; the name set in Onest 700 at tight tracking *is* the identity. The favicon is the one concession, and it is type in mono — not a drawn mark. **Do not create, generate, or approximate a logo.**

**There is no icon library.** The entire icon system is four unicode glyphs: `→` (links, CTAs), `←` (back), `▾` (dropdown, tinted `--acc-soft`), `·` (mono separator). No Lucide, no Heroicons, no icon font, no SVG sprite, **no emoji, ever.** Do not add one.

### Head tags

Each page needs, with **absolute** URLs (scrapers don't resolve relative paths):

```html
<link rel="icon" type="image/png" href="/assets/favicon.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
<link rel="canonical" href="https://tomkeefe.ai/">
<meta name="description" content="…">
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:url" content="https://tomkeefe.ai/">
<meta property="og:image" content="https://tomkeefe.ai/assets/og-home.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

Canonical URLs used in the prototypes: `https://tomkeefe.ai/`, `https://tomkeefe.ai/projects/b2b-martech-intel`, `https://tomkeefe.ai/projects/inventory`. **Confirm these paths match the real routing** before shipping.

No `.ico` and no web manifest — deliberate. Every current browser reads the PNG, and a static personal site has no install target.

## Copy rules

Read `readme.md` § CONTENT FUNDAMENTALS in the design system before writing any new copy. In short: first person, present tense, no hedging. Sentence case in prose; UPPERCASE only in mono. **US English** — organization, categorized, behavior, color. Em dashes for asides, never spaced en dashes. Serial comma. No exclamation marks, no emoji. Numbers are exact and unrounded (`63,731`, not "60k+"). Claims are load-bearing — if a number can't be verified, say so rather than estimating.

## Files in this bundle

| Path | What it is |
|---|---|
| `styles.css` | Entry point — `@import`s everything below. **Ship as-is.** |
| `tokens/fonts.css` | Google Fonts import. **Ship as-is.** |
| `tokens/colors.css` | All color tokens, light + dark + three alternate accents. **Ship as-is.** |
| `tokens/typography.css` | Type scale, tracking, leading, measure. **Ship as-is.** |
| `tokens/spacing.css` | Spacing, layout, rules, radius, motion. **Ship as-is.** |
| `layout/dark.css` | OS dark mode + screenshot dimming. **Ship as-is.** |
| `layout/focus.css` | Focus rings + skip link. **Ship as-is.** |
| `layout/responsive.css` | All breakpoints and `tk-*` hooks. **Ship as-is.** |
| `assets/` | Screenshots, icons, share cards. **Ship as-is.** |
| `readme.md` | The full design guide — content fundamentals, visual foundations, iconography. **Read this.** |

**The working prototypes are not in this bundle** — they are React files that only run inside the design system's compiled runtime, so copying them here produced files that could not execute. They live in the design system project instead:

| Path in the design system | What it is |
|---|---|
| `ui_kits/site/index.html` | Interactive prototype — routing, masthead toggle, accent + theme switchers |
| `ui_kits/site/kit-home.jsx` | Homepage + both mastheads (`window.TKSiteHome`, `window.TKSiteColumnMasthead`) |
| `ui_kits/site/kit-project.jsx` | Project page template + both content sets (`window.TKSiteProjectPage`, `TKSiteMartech`, `TKSiteInventory`) |
| `ui_kits/site/kit-app.jsx` | The prototype's router/switcher shell |
| `ui_kits/site/kit-loader.js` | Fetches + Babel-transforms the kit JSX (classic runtime) and mounts it |
| `ui_kits/site/mobile.html` | Homepage at 390px |
| `ui_kits/site/dark-home.html`, `dark-project.html` | Dark theme |
| `ui_kits/site/masthead-column.html` | The Column Rule variant alone |
| `components/` | The ten primitives, each with `.d.ts` props and a `.prompt.md` usage note |
| `guidelines/` | 30 specimen cards — type, color, spacing, glyphs, depth, states, focus |

Open those in the design system to see behavior this document can only describe. **This README is the spec of record** — it is self-sufficient, and every value in it is exact.

## Open questions for Tom

1. **The `WHAT CHANGED` metric** on the B2B MarTech Intel page is a placeholder and needs a real number.
2. **Which masthead ships** — Ledger (current) or Column Rule. Or both, behind a toggle.
3. **Which accent ships** — Navy is the default; Teal, Oxblood and Graphite are ready.
4. **Route paths** for the project pages, to confirm the canonical URLs.
5. **Self-hosted fonts** — worth doing only for offline or print reliability.
