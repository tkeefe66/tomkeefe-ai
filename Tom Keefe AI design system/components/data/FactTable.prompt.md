One-line: the label/value ledger that states facts without selling them.

```jsx
<FactTable rows={[
  { label: "ROLE", value: "Director, GTM Experts" },
  { label: "COMPANY", value: "Demandbase" },
  { label: "YEARS", value: "13" },
  { label: "STATUS", value: "Open to conversation" }
]} />
```

Keep values short enough to sit on one line. On the navy masthead pass `onField` — rules and text flip to the white alpha ramp.

Pass `collapsible` when the table sits high on a page and would push the headline off a phone screen. The rows then start closed below 700px behind a mono disclosure line; give it a `summary` naming the labels. Desktop is unaffected — the toggle is hidden and the rows always render.

```jsx
<FactTable onField collapsible summary="ROLE, COMPANY, FIELD, YEARS, STATUS" rows={rows} />
```
