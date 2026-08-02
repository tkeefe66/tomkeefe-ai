---
name: tomkeefe-design
description: Use this skill to generate well-branded interfaces and assets for tomkeefe.ai (Tom Keefe, GTM Engineer), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Key facts: link `styles.css` (or port `tokens/*.css` custom properties into a Tailwind config — every value is a `--*` variable). Archivo only; accent #ec3013; radius 0 everywhere; 2px section rules; flush-left everything; photos through `.grayscale`; dark theme via `data-theme="dark"` on the root. Component markup patterns are in `css/components.css` and demonstrated in `ui_kits/website/index.html`; React versions in `components/`.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
