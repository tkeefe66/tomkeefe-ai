One-line: the sticky navy nav — same field color as the masthead so the two merge at scroll-top.

```jsx
<SiteNav
  items={[{ label: "OVERVIEW", href: "#range" }, { label: "PRINCIPLES", href: "#principles" }, { label: "CONTACT", href: "#contact" }]}
  projects={[{ title: "B2B MarTech Intel", meta: "MARKET INTELLIGENCE · INTERNAL", href: "/projects/b2b-martech-intel" }]}
  cta={{ label: "EMAIL", href: "mailto:tkeefe66@gmail.com" }}
/>
```

Nav order must mirror page order. The dropdown opens on **click as well as hover**, so it works on touch. Below 760px the links collapse behind a mono `MENU` button — nothing to configure. Keyboard focus styling is still unbuilt.
