---
name: tomkeefe-design
description: Use when building or styling any UI in this repo — pages, components, prototypes, mocks, OG images, emails — or when choosing colors, type, spacing, imagery treatment, or theme behavior for the tomkeefe.ai brand.
---

# tomkeefe.ai design system (v2 "enterprise-document" + v3 update)

**Upstream source of truth:** the Claude Design project **"Tomkeefe.ai
Design System"** (`7aaa6306-3233-44e8-a733-0a8c1324f756`) — brand/design
decisions are made there, not in this repo. Its synced local mirror is
`Tom Keefe AI design system/` at the repo root; refresh it with the
design-sync skill (pull-only) when specs may have drifted. If a repo-side
design decision should become canonical, it belongs upstream in Claude
Design.

Canonical specs, in order: `V3 Design Update/README.md` (responsive, dark
mode, focus, project pages, assets — the spec of record for anything it
covers; identical to the mirror's `design_handoff_site_update/README.md`)
over `website design v2/README.md` (the base system; folder on disk
is capitalized "Website Design V2" — case-insensitive filesystem). On any
conflict, the freshly-synced mirror wins — it reflects the latest upstream
edits.

Production implementation: `app/globals.css` — all tokens (`:root` +
`[data-theme="dark"]`), layout-rhythm vars (`--gutter --section-gap
--space-8 --space-9`, overridden at ≤700/≤520px), and component recipes in
`@layer components`: `.container-page .band .mono .section-h2 .section-sub
.nav-link .nav-links .nav-toggle .band-btn .band-btn-ghost .fact-row
.facts-toggle .facts-rows .row-link .fig-plate .fig-fade .fig-caption
.skip-link .marquee-mask .marquee-track`. Content lives in `content/*.ts`,
never hardcoded in components.

## Responsive (v3)

Breakpoints: ≤900 (multi-column rows collapse — grids use `min-[901px]:`
Tailwind variants), ≤760 (nav links move behind the mono MENU button into
a `.nav-links[data-open]` panel; dropdown renders inline/static), ≤700
(gutter 20px, rhythm vars tighten, masthead facts collapse behind
`.facts-toggle` — visibility owned by CSS, never inline styles), ≤560
(footer/pager meta rows stack via `max-[560px]:` variants), ≤520 (gutter
16px). Figure plates crop shorter (`min(var(--plate-h), 400px|300px)`),
never scale. Nav dropdown hover-opens only for `pointerType === "mouse"` —
touch taps emulate mouseenter and would open-then-close on one tap.

## Non-negotiables

- Onest (UI/headings) + IBM Plex Mono (labels/metadata, ALWAYS uppercase)
  loaded via `next/font` in `app/layout.tsx` — never the Google Fonts CDN.
- Navy accent set: light `--acc #1D3A63`, deep field `#152C4B`; dark
  `--acc #7FA6D9`, deep `#1B3050`. Alternates (Teal/Oxblood/Graphite) are
  fully specified in the design README.
- Colour is structural: exactly two full-bleed `--acc-deep` bands (masthead
  + tech strip, contact band); `--acc` is type-only everywhere else. No
  tinted boxes or gradients except `.fig-fade`.
- Never hard-code a neutral or accent value — CSS vars only. White-on-navy
  `rgba(255,255,255,…)` is allowed inside `.band`, nowhere else. The hazard
  the rule prevents: a plate gradient hard-coded to `#FFFFFF` renders a
  white band on a black page in dark mode, which is why `.fig-fade` fades to
  `var(--bg)`. **Note this is a hazard, not an incident here** — no commit in
  this repo ever fixed such a bug, and `.fig-fade` has used `var(--bg)` since
  it first appeared in `b5ad8e3`. This line previously described it as a bug
  this codebase shipped; an agent repeated that as fact on a project page and
  it had to be pulled. If it happened, it happened in the design prototype.
  A real, verified bug of the same family: `.band a { color: inherit }` beat
  `.band-btn`'s navy text color on specificity, rendering the EMAIL
  button white-on-white — fixed with `.band :where(a) { color: inherit }`,
  which drops the rule's specificity to (0,1,0), tying with `.band-btn`,
  `.band-btn-ghost`, `.nav-link` (each a real class selector). They win by
  source order (declared later in the components layer), while plain band
  links still inherit white.
  Check both classes of bug (visible bands, invisible text) after any
  `.band`-adjacent CSS change, in both themes.
- Radius: 3px buttons/nav, 4px dropdown, 0 plates. No shadows except the
  nav dropdown.
- Body copy 16px / 1.6 line-height / -0.011em tracking.
- Sections use `.section-h2` + `.section-sub` — no mono section labels.
- Theme: `data-theme` is set to `dark` or `light` on `<html>`, persisted as
  `tk-theme` in localStorage; 220ms transition on toggle. **Dark is the
  default when nothing is stored — there is no OS-preference fallback.**
  Commit `0228dfc` (2026-08-14) removed it; `app/layout.tsx`'s inline
  `themeInit` reads `localStorage.getItem('tk-theme')||'dark'` and the
  codebase contains no `matchMedia` or `prefers-color-scheme` reference.
  (Verified against code 2026-08-15. This line previously said "OS
  preference as fallback" and stayed wrong for eleven days after the
  behaviour changed, which cost a page a fix round when an agent published
  the claim.)
- Footer sign-off: "DIRECTED BY A HUMAN. BUILT WITH AGENTS."

## Figure plates (screenshots)

Never shrink a whole UI to fit. Fixed-height `.fig-plate` (height flows
through `--plate-h` so media queries can cap it), capture the UI wide
(~190% width) and crop, `.fig-fade` (linear-gradient to `var(--bg)`)
blends the bottom edge into the page in both themes, mono caption in
`var(--acc)` below reading `FIG. NN — …`. Every figure declares
`capture: "light" | "dark"` — light captures are dimmed
`brightness(0.82) contrast(1.02)` in dark mode and restore on hover;
dark captures opt out.

## Masthead variant

`site.mastheadVariant` flag: `"ledger"` ships. `"column"` is an approved
backup — never delete it even though it's unused.

## Deviations from the prototype (this repo wins)

| Source | Here | Why |
|---|---|---|
| Inline styles | CSS recipe classes + Tailwind utilities | Reuse, `@layer components` |
| JS scroll offset | `scroll-margin-top: 64px` | Simpler, no JS needed for hash nav under the sticky 56–64px bar |
| Base dropdown | Focus + Escape handling added | Keyboard accessibility |
| Hardcoded white `::selection` | `--acc-ink` | Stays readable in dark mode |
| `--faint` design source (`#9AA1AC` light / `#82828A` v3 dark) | `#6F7683` / `#7A8090` | Light source value fails WCAG AA (2.60:1) for the 10.5px status labels and dropdown subtitles that use this token; repo values pass 4.5:1. This repo wins on contrast — v1 and v2 made the same call. |
| v3 `data-theme="auto"` + duplicated `layout/dark.css` media-query block | Explicit `light`/`dark` resolved pre-paint by the inline script in `layout.tsx`, persisted as `tk-theme` | One source of truth for dark tokens; the README itself invites this ("persist it in production") |
| v3 `/assets/*.png` head tags | Next file conventions: `app/icon.png`, `app/apple-icon.png`, per-route `opengraph-image.png` | Framework generates the tags with absolute URLs via `metadataBase` |

Icons and OG cards are the V3 bundle's PNGs (`V3 Design Update/assets/`),
shipped verbatim — the earlier generated `opengraph-image.tsx` / `icon.svg`
are gone. Footer meta stays `white/55` (v3 says 0.45; fails AA at 10.5px).

`Tom Keefe AI design system/` is the synced mirror of the live Claude
Design project (current brand: Onest/Plex Mono, navy accent — synced
2026-08-03). It previously held the superseded v1 system (Archivo, red
accent, zero-radius); if it ever shows those values again, it is stale —
re-run design-sync before trusting it. The v1 leftovers were purged on
2026-08-03 — the mirror now holds only synced upstream files (binary
`assets/` are intentionally not mirrored; see design-sync).
