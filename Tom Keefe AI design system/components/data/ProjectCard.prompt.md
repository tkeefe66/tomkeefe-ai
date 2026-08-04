One-line: one project, one card — name, state, body, annotation, link. Use it for all five; there is no lesser variant.

```jsx
<ProjectCard
  name="Inventory"
  state="live"
  status="LIVE"
  body={[
    "Started as a way to stop losing track of outdoor gear. It now knows what I own, reads the forecast, talks to AllTrails, and answers over Telegram.",
    "Then I bought a camera I couldn't operate. Instead of working through tutorials I taught the same system to teach me."
  ]}
  meta={["491 items tracked", "under $5/month", "told me what I actually spend on coffee, which I have so far responded to by continuing to do it"]}
  href="/projects/inventory"
/>
```

**Stack them full-width; never a uniform-height grid.** Bodies are intentionally unequal — one project runs three paragraphs — and a grid that stretches every card to the tallest leaves four of them with dead space. Height follows content.

Hover is inherited from the row-link treatment: `padding-left` 0 → 10px, never a color change.

Pass `last` on the final card to drop its bottom hairline. Omit `cta` with `cta={false}` if a card has no detail page yet.
