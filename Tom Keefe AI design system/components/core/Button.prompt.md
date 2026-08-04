One-line: the only button in the system — a mono uppercase label in a 3px-radius box, filled for primary and hairline-outlined for secondary.

```jsx
<Button href="mailto:tkeefe66@gmail.com">EMAIL</Button>
<Button variant="secondary" href="https://linkedin.com/in/tomkeefesmc">LINKEDIN</Button>
<Button onField>EMAIL</Button>
```

Always uppercase the label. On a navy field pass `onField` so primary flips to a white fill with accent text. Groups sit in a `display:flex; gap:8px` row.
