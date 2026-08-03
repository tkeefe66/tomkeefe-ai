---
name: tomkeefe-design
description: Use when building or styling any UI in this repo — pages, components, prototypes, mocks, OG images, emails — or when choosing colors, type, spacing, imagery treatment, or theme behavior for the tomkeefe.ai brand.
---

# tomkeefe.ai design system (v2 — "enterprise-document")

Canonical spec: `website design v2/README.md` at the repo root (the design
bundle folder on disk is capitalized "Website Design V2" — same folder,
case-insensitive filesystem).

Production implementation: `app/globals.css` — all tokens (`:root` +
`[data-theme="dark"]`) and component recipes in `@layer components`:
`.container-page .band .mono .section-h2 .section-sub .nav-link .band-btn
.band-btn-ghost .fact-row .row-link .fig-plate .fig-fade .fig-caption
.marquee-mask .marquee-track`. Content lives in `content/*.ts`, never
hardcoded in components.

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
  `rgba(255,255,255,…)` is allowed inside `.band`, nowhere else. An earlier
  bug hard-coded a plate gradient to `#FFFFFF` and produced a white band on
  a black page in dark mode; a related bug let `.band a { color: inherit }`
  beat `.band-btn`'s navy text color on specificity, rendering the EMAIL
  button white-on-white — fixed with `.band :where(a) { color: inherit }`,
  which drops the rule's specificity to ~(0,1,0) so `.band-btn`,
  `.band-btn-ghost`, `.nav-link` and `.nav-link:hover` (each a real class
  selector) always win, while plain band links still inherit white.
  Check both classes of bug (visible bands, invisible text) after any
  `.band`-adjacent CSS change, in both themes.
- Radius: 3px buttons/nav, 4px dropdown, 0 plates. No shadows except the
  nav dropdown.
- Body copy 16px / 1.6 line-height / -0.011em tracking.
- Sections use `.section-h2` + `.section-sub` — no mono section labels.
- Theme: `data-theme="dark"` on `<html>`, persisted as `tk-theme` in
  localStorage, OS preference as fallback; 220ms transition on toggle.
- Footer sign-off: "DIRECTED BY A HUMAN. BUILT WITH AGENTS."

## Figure plates (screenshots)

Never shrink a whole UI to fit. Fixed-height `.fig-plate`, capture the UI
wide (~190% width) and crop, `.fig-fade` (linear-gradient to `var(--bg)`)
blends the bottom edge into the page in both themes, mono caption in
`var(--acc)` below reading `FIG. NN — …`.

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
| `--faint` design source (`#9AA1AC` light / `#5F5F63` dark) | `#7C838E` / `#75757A` | Source values failed WCAG AA (2.60:1 / 2.97:1) for the 10.5px status labels and dropdown subtitles that use this token; darkened to pass. This repo wins on contrast — v1 made the same call for its muted token. |

`app/opengraph-image.tsx` and `app/icon.svg` legitimately hard-code brand
hexes: `next/og` image generation and SVG favicons can't read CSS custom
properties, so the "CSS vars only" rule above doesn't apply to them.

The old `Tom Keefe AI design system/` folder is the SUPERSEDED v1
reference (Archivo, red accent, zero-radius). Do not build against it.
