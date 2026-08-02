---
name: tomkeefe-design
description: Use when building or styling any UI in this repo — pages, components, prototypes, mocks, OG images, emails — or when choosing colors, type, spacing, imagery treatment, or theme behavior for the tomkeefe.ai brand.
---

# tomkeefe.ai design system

Canonical source: `Tom Keefe AI design system/` at the repo root. Read its
`readme.md` for full rules; `ui_kits/website/index.html` is the reference
homepage; `guidelines/` holds foundation specimens; `components/` has React
primitives for prototyping.

Production implementation: `app/globals.css` — all tokens (`:root` +
`[data-theme="dark"]`) and component recipes in `@layer components`:
`.page`, `.site-header`, `.kicker`, `.btn/.btn-primary/.btn-secondary`,
`.tag/.tag-live/.tag-draft/.tag-neutral`, `.card*`, `.stat*/.stat-grid`,
`.section-head`, `.principle*`, `.nav*`, `.poster/.poster-ink`,
`em.accent` (the red terminal period brand mark), `.grayscale-photo`.
React components in `components/*.tsx` combine these classes with Tailwind
layout utilities only (grid/flex/gap/padding).

## Non-negotiables

- Archivo only, weights 400/600/800, loaded via `next/font` in
  `app/layout.tsx` (never the Google Fonts CDN import).
- Single accent `#ec3013`, used scarcely. Accent for paragraph-size text is
  `--color-accent-readable` (#ae1800 light / #ff9783 dark).
- Radius 0 everywhere. Never round a corner.
- Rules organize the page: 2px (`--rule-strong`) for section heads/nav,
  1px (`--rule-thin`) for rows. Flush-left everything.
- Photography prints black & white via `.grayscale-photo`. No color photos,
  no illustration, no icon fonts, no emoji. Arrows are `→` or Lucide stroke.
- Sentence case; UPPERCASE only for kickers, labels, stat captions.
- Dark theme = `data-theme="dark"` on `<html>`; light is default. Toggle
  lives in `components/ThemeToggle.tsx`, persisted as `tk-theme`.
- Motion minimal: state changes are instant color/tint swaps, no fades.
- Sign-off: "Built by AI agents, directed by a human."

## Deviations from the source folder (this repo wins)

| Source | Here | Why |
|---|---|---|
| `--color-muted` 55% ink | 68% ink | WCAG AA 4.5:1 (PRODUCT.md requirement) |
| `.grayscale` | `.grayscale-photo` | Collides with Tailwind's `grayscale` utility |
| link `styles.css` | recipes in `app/globals.css` | Tailwind 4 layering |

Content lives in `content/*.ts`, never hardcoded in components. Draft/
placeholder states stay visible (`Draft` tags, `[X]` stats) until real.
