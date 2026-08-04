One-line: the screenshot treatment — a fixed-height crop at native scale that dissolves into the page.

```jsx
<FigurePlate src="/assets/martech-intel.png" alt="News feed" height={520}
  caption="FIG. 01 — NEWS FEED. CATEGORY, SOURCE AND TAG FILTERS ACROSS THE FULL CORPUS." />
<FigurePlate src="/assets/spend-digest.png" alt="Digest" height={360} zoom={100} caption="FIG. 02 — DAILY DIGEST." />
```

Rule: crop to a region at 0.5+ effective scale. Wide retina captures use zoom 190; already-narrow images use 100.
