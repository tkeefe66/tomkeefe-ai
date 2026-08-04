# Tom Keefe — Design System

The brand and interface system behind **tomkeefe.ai**, the personal site of Tom Keefe — Director of GTM Experts at Demandbase, thirteen years in marketing ops, revenue ops and GTM systems.

The site has one job: credibility with three audiences at once — GTM/RevOps practitioners, executives, and recruiters — while acting as the hub for the internal tools and personal apps he ships.

## Sources

- **Live site:** https://tomkeefe.ai (Next.js + TypeScript + Tailwind, deployed on Railway). The current build predates this system.
- **Design source of truth:** `Tom Keefe.dc.html` in the design project — the full redesign: sticky nav, both masthead variants, light and dark, all four sections, two project detail pages.
- **Rejected directions:** `Explorations.dc.html` — four hero architectures, four palettes, three rounds of logo exploration. Kept because knowing what was ruled out is what keeps the system from drifting back.
- **Developer handoff:** `design_handoff_tomkeefe_site/README.md` — implementation-level spec.
- **Screenshots** in `assets/` were supplied by Tom from his own running tools.

## Index

| Path | What's there |
|---|---|
| `styles.css` | Entry point. Imports everything below. Link this one file. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css` |
| `layout/` | `responsive.css` (breakpoints and `tk-*` layout classes), `focus.css` (keyboard focus, skip link), `dark.css` (OS dark mode, screenshot dimming) |
| `components/core/` | Button, SectionHeading, StatusLabel, ProseBlock |
| `components/data/` | FactTable, RowLink, LabelledRow, Statement, ProjectCard, MetaRow |
| `components/media/` | FigurePlate, TechMarquee |
| `components/navigation/` | SiteNav |
| `ui_kits/site/` | Homepage, both mastheads, project detail pages, mobile view |
| `templates/homepage/` | Starting-point template — the homepage, ready to copy into a consuming project |
| `templates/project-page/` | Starting-point template — the project detail page |
| `thumbnail.html` | Homepage tile for this design system |
| `guidelines/` | Foundation specimen cards |
| `assets/` | Product screenshots, favicon, apple-touch icon, share cards |
| `SKILL.md` | Agent Skills wrapper for use in Claude Code |

---

## CONTENT FUNDAMENTALS

**Voice: a senior operator who has done the work and doesn't need to tell you he's senior.** Dry, concrete, a little blunt. Confidence comes from specificity, never from adjectives.

**Person.** First person singular, unhedged — "I build the systems that carry go-to-market." Never "we" (he is one person). The reader is "you" or "your team" only when making a point about their stack: "If something in your stack is held together by a Friday afternoon."

**Sentences are short and land hard.** Most headlines are one clause, ending in a full stop:
- "Boardroom to production query."
- "Build vs. buy is dead. It's build vs. wait."
- "Things I built instead of waiting for a vendor."

The recurring rhetorical move is **negate-then-replace** — deny the obvious framing, then supply the real one. "Most GTM problems aren't strategy problems. They're plumbing problems nobody wants to own." Use it sparingly; it loses force past once a section.

**Concrete nouns over abstractions.** Routing, enrichment, territory design, the query, the number, the Friday afternoon. Never "solutions," "leverage" as a verb, "best-in-class," "passionate," "results-driven," "thought leader."

**Numbers instead of claims.** "63,731 articles indexed." "491 records, auto-categorized." "13 years." If a number isn't real it doesn't appear — the original site's `[X]+ workflows automated` placeholders were deleted rather than guessed at.

**Say what's unfinished.** Unbuilt projects are labelled `IN PROGRESS` and rendered muted and unclickable. A missing outcome metric shows as a visible placeholder. Nothing is dressed up as further along than it is.

**One dry joke per section, maximum.** "It's a hostage situation." "Directed by a human. Built with agents." Never more; the humour works because it's rationed.

**Casing.** Sentence case for all prose and headlines. UPPERCASE only in mono — nav items, table labels, status markers, figure captions. Title Case appears nowhere.

**Punctuation and spelling.** Em dashes for asides, spaced en dashes never. Serial comma. **US English throughout** — organization, categorized, behavior, color. No British or European spellings anywhere, including in mono labels and figure captions.

**No emoji. No exclamation marks. No LinkedIn cadence** — no one-line-paragraph stacking, no rhetorical questions as hooks.

---

## VISUAL FOUNDATIONS

**The idea:** an enterprise document, not a marketing page. It should look like something written by a person who states facts and lets them stand.

### Color
Seven neutrals and one accent family. **Color is structural, never decorative.**

The accent appears in exactly two ways:
1. **Two full-bleed `--acc-deep` fields** that bookend the page — the masthead (with the tools strip beneath) and the closing contact band. These carry all the color mass.
2. **`--acc` type only** — range altitude labels, principle numerals, `READ →`, project-page section headings, figure captions, nav hover.

Everything between the two fields is a white document. **Navy** ships by default; Teal, Oxblood and Graphite are fully specified alternates, swapped via `data-accent`.

> **Two rejected approaches, documented so they don't return.** (1) Inset rounded color panels per section — they fragment the page into boxes. Color runs full-bleed or not at all. (2) A barely-there tint (2.5% luminance delta) — if a surface is meant to read as tinted, it must actually read.

Dark mode inverts the neutrals and *lifts* each accent's deep value — at first pass the fields sat too close to the page background and the structure vanished. It **follows the OS** via `prefers-color-scheme` while `<html data-theme="auto">` is set (the default markup state); an explicit visitor choice replaces that attribute with `light` or `dark`. **The UI kit's theme chip is preview-only and deliberately does not persist** — the Homepage card documents the light/OS default and dark has its own card, so a click must not become that card's permanent appearance. A real deployment can persist the choice; the prototype must not. Dark is treated as a first-class equal, not a courtesy: `--faint` was lifted from `#5F5F63` to `#82828A` because status markers (`IN PROGRESS`, `LIVE`) at 10.5px failed AA against `--bg` — it now clears 4.5:1 at 4.96:1.

**Screenshots in dark mode.** Light-UI captures are dimmed to 82% brightness so they don't glare, and restore to full on hover for reading. Dark-UI captures are left alone — pass `capture="dark"` on the figure plate. `assets/inventory.png` is a dark interface; the other two are light.

### Focus
The source design specified no focus state at all. This system adds one, because a sticky nav with a dropdown is otherwise unusable by keyboard: a **2px `--acc` outline at 2px offset**, lifting to `--acc-soft` inside any `.tk-field` (the deep-color bands). It is `:focus-visible` only, so mouse clicks never show a ring. The outline deliberately matches nothing else in the vocabulary, so it can't be mistaken for a border or a rule.

A `.tk-skip` skip link sits before the nav on every screen — hidden until focused, then landing top-left as a bordered mono chip. Press states remain unstyled, as designed.

### Typography
**Onest** for everything visible; **IBM Plex Mono** for metadata. No third face.

Tracking tightens as type grows (-0.052em at 80px, -0.011em at body) and opens for mono labels (+0.08 to +0.12em). Headlines use `text-wrap: balance`, prose `text-wrap: pretty`. Measures are enforced: 34ch leads, 32ch statements, 66ch prose, 68ch row descriptions.

Body copy is `--body`, never full `--ink` — ink is reserved for headings and interactive text. That single rule does most of the work in making the page feel calm.

### Layout
One 1180px container with 44px gutters, used *inside* every full-bleed band so content never leaves the grid. Sections sit 44px apart and open with a headline plus a one-line subhead — **there are no mono section labels and no rules between sections.** Both existed and were removed; don't reintroduce them.

Never use fixed-px side columns in content rows. An early three-column layout collapsed the primary text below its own annotation under 1150px. Use fractional `minmax(0, Nfr)` tracks.

### Rules, radius, depth
Two rule weights only: **1.5px ink** opens a table, **1px hairline** separates rows. Radius is minimal — 3px buttons, 4px panels, pill for toggles, and **0 on figure plates**.

**No shadows anywhere** except the nav dropdown (`0 12px 28px rgba(0,0,0,0.14)`), which needs to float above content. No gradients except the figure-plate bottom fade. No blur, no glassmorphism, no transparency except white alphas on color fields.

### Imagery
Product screenshots only — real interfaces from real tools. No stock photography, no illustration, no 3D, no abstract shapes.

Screenshots use the **figure plate**: a fixed-height crop with the image rendered *wider than its container* (typically 190%) so a meaningful region reads at native scale, with a 96px fade to `--bg` at the bottom. Never scale a whole UI down to fit — a 3300px retina capture at column width renders at 0.27 and nothing is legible. Every plate carries a numbered mono caption.

### Responsive behavior
One set of rules, all in `layout/responsive.css`. Components are inline-styled, so they expose `tk-*` class hooks and that file is the only place layout changes by viewport.

| Breakpoint | What changes |
|---|---|
| ≤ 900px (`--bp-tablet`) | Both mastheads collapse to one column — the ledger's fact table drops below the lead, the Column Rule variant's vertical rule becomes a top rule above the statement. Project pages stack prose above the spec table. Figure plates crop to 400px. |
| ≤ 760px | Nav links leave the bar. A mono `MENU` / `CLOSE` button opens them as a full-width panel on the deep field; the PROJECTS dropdown renders inline in that panel rather than as a floating card. |
| ≤ 700px (`--bp-mobile`) | Gutter 44px → 20px, section gap 44px → 36px. Labelled-row mono labels stack above their text. Figure plates crop to 300px. The masthead fact table starts **collapsed** behind a mono `ROLE, COMPANY, FIELD, YEARS, STATUS ▾` line, so the name and lead own the first screen. |
| ≤ 560px | Footer and pager meta rows stack instead of squeezing. |
| ≤ 520px (`--bp-small`) | Gutter → 16px. |

Type needs no breakpoints — every display size is already `clamp()`. Figure plates **crop shorter, never scale down**; the image stays at its 190% zoom so the interface remains legible. The `▾`, `→` and `←` glyphs are unchanged on mobile; no icon set is introduced.

The nav dropdown now opens on **click as well as hover**, which is what makes it usable on touch.

### Motion
Restrained and functional. Hover transitions at 160ms, theme change at 220ms, and one ambient animation — the tools marquee at 46s linear, paused on hover. **No scroll-triggered reveals, no parallax, no entrance animations.**

Hover states: row links shift `padding-left` 0 → 10px (never a color change); buttons invert their fill; nav items take a 9% white wash. Press states are not separately styled.

### Layout rules
The nav is the only fixed element — sticky at top, on the deep field so it merges with the masthead at scroll-top. Anchor targets need a **-64px scroll offset** to clear it.

---

## ICONOGRAPHY

**There is essentially none, and that is the system.** The interface uses no icon set — no Lucide, no Heroicons, no icon font, no SVG sprite. Meaning is carried by type, rule weight and position.

The only glyphs in use are **unicode characters set in the text**:
- `→` in row links and CTAs (`READ →`, `EMAIL →`, `NEXT — INVENTORY →`)
- `←` for back navigation (`← ALL PROJECTS`)
- `▾` for the nav dropdown, tinted `--acc-soft`
- `·` as a separator in mono strings (`MOps · RevOps · GTM`)

**No emoji, ever.** If a future need genuinely calls for icons, use a hairline stroke set at 1–1.5px matching the rule weights, and flag it as an addition — don't quietly introduce a library.

**There is no logo.** Three rounds of monogram exploration were rejected. The decision: the name set in Onest 700 at tight tracking *is* the identity. Where a mark would go, set "Tom Keefe" in type. **Do not draw, generate or approximate one.**

### Favicon and share cards

The one place the no-logo rule has to bend, because a wordmark cannot render at 16px. The favicon is **`TK` in IBM Plex Mono 500, white on `--acc-deep`** — mono rather than Onest deliberately, so it reads as a system marker rather than the drawn monogram that was rejected three times.

| File | Size | Notes |
|---|---|---|
| `assets/favicon.png` | 512×512 | Downscales cleanly to 32 and 16 |
| `assets/apple-touch-icon.png` | 180×180 | `TK` set tighter — iOS masks the corners and adds its own rounding, so the glyphs need more clearance |

No `.ico` and no `site.webmanifest`. Every browser in use reads the PNG, and the site is a static personal site — not installable, no theme-color chrome to match, so a manifest would be metadata with nothing behind it.

Share cards are 1200×630 on the same deep field, type only:

| File | Used on | Contents |
|---|---|---|
| `assets/og-home.png` | Homepage | Name at display size, the lead, a mono footer rule with role and domain |
| `assets/og-martech.png` | B2B MarTech Intel | `PROJECT 01`, title, one-line summary, three spec columns |
| `assets/og-inventory.png` | Inventory | `PROJECT 02`, same structure with its own numbers |

Project cards front-load real figures (63,731 articles; 491 items) because the numbers are the credential. `og:image` and `og:url` are **absolute** (`https://tomkeefe.ai/…`) — scrapers do not resolve relative paths — and each page declares a canonical URL. Regenerate any asset from `guidelines/brand-share.html`, which holds the full-size render targets — never redraw them by hand.

---

## Intentional additions

The original inventory is exactly what the site used: Button, SectionHeading, StatusLabel, FactTable, RowLink, LabelledRow, Statement, FigurePlate, TechMarquee, SiteNav. No Toast, Avatar, Tabs or Modal — the brand has no use for them yet, and adding them would invite designs the site can't back up.

Three were added for the 2026 copy rewrite, each because new content needed a pattern the old copy never did:

- **ProjectCard** — replaces the two-tier split (featured card + one-line entry) with one component, now that all five projects have detail pages and equal weight.
- **MetaRow** — the dot-separated annotation line under a card body: scale, cost, and what went wrong.
- **ProseBlock** — multi-paragraph running text. The site was display type, mono labels and fragments; two new sections run to real paragraphs.

`StatusLabel` gained a third state (`launching`, dated) and `Statement` gained an optional `annotation`. Both are extensions, not new components.

## Known gaps

- **Fonts are loaded from Google Fonts**, not self-hosted binaries — no font files were supplied. Onest and IBM Plex Mono are both open-licensed (OFL) and available from Google Fonts, so this is a legitimate production setup rather than a substitution; self-host the binaries if you need offline or print reliability.
- **The third masthead direction and the four rejected palettes** live only in `Explorations.dc.html`, which was not supplied with this project. The three alternate accents (Teal, Oxblood, Graphite) are fully tokenized here.
- **`favicon.png` is a PNG, not an `.ico`** — a deliberate call, not an omission. See the favicon section.
- **The share-card and canonical URLs are hardcoded to `https://tomkeefe.ai`.** If the domain changes, update the five files in `ui_kits/site/`.
