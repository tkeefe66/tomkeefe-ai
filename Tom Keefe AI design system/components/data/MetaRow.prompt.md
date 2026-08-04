One-line: the muted dot-separated line under a card body — scale, cost, and what went wrong.

```jsx
<MetaRow items={[
  "63,731 articles ingested",
  "under $10/month to run",
  "took over a month, mostly because v1 also insisted on building slide decks"
]} />
```

The third fragment is the one that matters and is usually the longest — a full clause, sometimes longer than the first two combined. **Never truncate or ellipse it.**

Set at `--size-row` in `--muted`, deliberately below body copy. These are not KPIs; do not give any fragment big-number treatment or emphasis.

Two fragments is a legitimate shape (a value was unavailable and the clause was dropped) — pass `false` or `null` in place of a missing item and it's removed cleanly:

```jsx
<MetaRow items={["This site", "built by agents", hasCost && "one rewrite"]} />
```

Fragments wrap as whole units at narrow widths and separators never start a line.
