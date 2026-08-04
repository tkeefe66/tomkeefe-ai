# UI kit — tomkeefe.ai

A recreation of the personal site, composed entirely from this system's components.

- `index.html` — the interactive site: homepage, both mastheads, and both project pages, with masthead, accent and light/dark switchers.
- `kit-home.jsx` — the homepage and both masthead variants: nav, masthead, tools strip, Overview, Projects, Principles, Contact.
- `kit-project.jsx` — the project detail page plus the copy for both projects (B2B MarTech Intel, Inventory).
- `kit-app.jsx` — the prototype's router and switcher shell.
- `kit-loader.js` — fetches and transforms the kit JSX. Babel's `<script type="text/babel" src>` handling does not fire reliably here, and its default JSX runtime emits an ES `import` that a classic script cannot execute; the loader pins `runtime: "classic"` instead.
- `masthead-column.html`, `project-page.html`, `mobile.html`, `dark-home.html`, `dark-project.html` — single-view cards for the Design System tab.

**Page order is deliberate:** Overview makes the claim, Projects prove it, Principles close on point of view, Contact asks. The nav mirrors that order.

**Two color fields only** — the masthead (with the tools strip beneath it) and the contact band. Everything between is a white document on the 1180px grid.

Not included here: nothing. The masthead toggle switches both variants, the accent chips swap all four palettes via `data-accent` on the root, and the theme chip inverts light/dark.
