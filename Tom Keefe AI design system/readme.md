# tomkeefe.ai design system

Design system for Tom Keefe's personal site (https://tomkeefe.ai) — a portfolio of AI/GTM projects. Tom is a GTM Engineer (Director of GTM Experts @ Demandbase); the site's thesis is **"GTM runs on systems. I build them."** The design takes that literally: a visible modular grid, strong 2px rules, flat architectural layout — the system IS the aesthetic. Derived from the Modernist design system (Archivo, red #ec3013 on light gray, zero radius), extended with a dark theme and site-specific components.

Sources: live site https://tomkeefe.ai (Next.js + TypeScript + Tailwind on Railway, built by AI agents). No logo/brand files were provided — the mark is typographic (see Brand mark below). Stats and project descriptions are placeholders pending final copy.

## Content fundamentals

- Voice: first person implied, direct, systems-minded. Professional but opinionated — "GTM runs on systems. I build them." Aphorisms are numbered principles ("01", "02"…).
- Tone target: slightly recruiter/client-friendly — blunt insight, no snark overreach. No emoji, ever.
- Casing: sentence case for body and headings; UPPERCASE only for kickers, labels, and stat captions.
- Draft states are honest and visible: principles carry a `Draft` tag, unfinished projects say `In development` / `TBC`. Keep them until copy is final.
- Sign-off convention: "Built by AI agents, directed by a human."

## Visual foundations

- **Color**: light ground #f3f2f2, ink #201e1d, single accent #ec3013. Dark theme flips ground/ink and lifts the accent one ramp step (#ff563c). Accent is scarce — primary action, kickers, small emphasis; the one full-red field is the `.poster` statement/banner. Full 100–900 OKLCH ramps in `tokens/colors.css`.
- **Type**: Archivo only (400/600/800). Display 64, h1 42 → caption 11. Headings 800, -0.015em. Everything flush left — headings, hero copy, even button labels.
- **Layout**: modular grid, equal-width cells, visible structure. Sections open with a 2px top rule (`.section-head`); rows separate with 1px rules. Page max 1120px. Nothing floats, nothing is decorated.
- **Shape**: radius 0 everywhere. Never round a corner.
- **Rules**: 2px strong (`--rule-strong`) for section/table-head/nav dividers, 1px for rows. Never soften to hairline-gray-on-gray or drop for whitespace.
- **Imagery**: photography prints pure black & white via `.grayscale`. No tints, no color photos, no illustration, no drawn SVG art.
- **Elevation**: flat by default; `--shadow-sm/md/lg` reserved for dialogs and rare overlays.
- **Motion**: minimal — no bounces or fades; state changes are instant color/tint swaps.
- **States**: hover = one accent ramp step or 7% ink tint; active = one further step / 14% tint; focus = 2px accent outline, offset 2; disabled = 45% opacity. Never browser defaults.
- **Dark theme**: set `data-theme="dark"` on `<html>` or any subtree. Semantic tokens (`--color-bg/surface/text/accent/…`, tint pairs, shadows) flip; ramps stay fixed.

## Brand mark

No logo file exists and none was invented. The mark is set in plain type: **TK.** — Archivo 800, the period in accent red — with the wordmark "Tom Keefe" (nav: `.nav-brand`, red terminal period via `<em>.</em>`). See `guidelines/brand-mark.html`. Replace with real art if Tom supplies one.

## Iconography

Lucide (https://lucide.dev) via CDN, stroke style, sized 16–20px inline. Arrows (`arrow-right`, `arrow-up-right`) are the working glyphs for links ("LinkedIn →"). No icon font, no emoji, no hand-drawn SVGs. Unicode `→` is acceptable in running text links.

## Index

- `styles.css` — entry point (imports everything below)
- `tokens/` — `colors.css` (light+dark), `typography.css`, `spacing.css`, `elevation.css`, `fonts.css`
- `css/base.css` — resets, type, links, `.grayscale`, `.hr`, `.kicker`, `.page`
- `css/components.css` — `.btn*`, `.tag*`, `.input`, `.card*`, `.stat*`, `.section-head`, `.principle*`, `.nav*`, `.table`, `.poster`
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/` — React primitives: core/ (Button, Tag, Input), content/ (Card, Stat, SectionHead, Principle), navigation/ (NavBar)
- `ui_kits/website/` — the redesigned tomkeefe.ai homepage (light/dark toggle)
- `SKILL.md` — Claude Code skill entry point

## Intentional additions

Stat, SectionHead, Principle, `.poster`, `.tag-live/.tag-draft` — site-specific patterns the source content requires (counters, numbered aphorisms, project status vocabulary); not in Modernist's base set.
