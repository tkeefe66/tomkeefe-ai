One-line: the mono marker that says where something stands, without adjectives.

```jsx
<StatusLabel state="live">LIVE</StatusLabel>
<StatusLabel state="progress">IN PROGRESS</StatusLabel>
<StatusLabel state="launching">LAUNCHING SEPT 2026</StatusLabel>
```

Three project states, descending loudness: `live` is accent because it's the only actionable one; `progress` is muted; `launching` is accent type in a tinted capsule — quieter than bare accent at the same size, and the only state with a container, so it stays distinct from LIVE when both appear in one grid.

**Target string is `LAUNCHING SEPT 2026`.** The component never wraps, so don't exceed roughly that length — `PUBLIC LAUNCH SEPTEMBER 2026` will hold a single line at desktop but crowds the card header at 390px.

On launch week, change `state` to `live` and the text to `LIVE`. Nothing else moves.

`tone` still exists for non-state markers (`PROJECT 01`, `READ →`) and is ignored when `state` is set.
