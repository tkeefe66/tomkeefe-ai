One-line: the credibility strip — tools scrolling quietly under the masthead.

```jsx
<TechMarquee items={["Salesforce", "Marketo", "Demandbase", "Snowflake", "SQL", "Claude Code", "Next.js"]} />
```

Must render below BOTH masthead variants, never inside one. Pauses on hover; stop the animation under `prefers-reduced-motion`.
