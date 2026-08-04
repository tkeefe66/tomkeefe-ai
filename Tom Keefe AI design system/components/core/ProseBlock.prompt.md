One-line: the only component set for reading rather than scanning — use it for any section that runs to real paragraphs.

```jsx
<ProseBlock paragraphs={[
  "Everything on this page was built with Claude Code doing the typing. That's a management problem, not a shortcut.",
  "The setup is a global config that encodes how I want things built: test-driven by default, Railway as the only deploy target, plan first when a task is ambiguous and start coding when it isn't.",
  "The part I'm actually proud of is smaller than any of that. Before every commit, the agent has to output one line naming a reusable skill it could extract from the work it just did."
]} />
```

Two sizes. `prose` (default) is the long-form treatment — `--size-body-lg` at `--measure-prose`, 66ch, in `--body`. `size="row"` is the shorter muted variant for card bodies.

**No new type scale was required** — this uses existing tokens. The measure is longer than the scanning sections because line length for reading and line length for scanning are different problems.

Paragraph spacing is intentionally tighter than `--section-gap`: paragraphs here vary from two to four sentences and need to hold together as one argument, not read as separate blocks.

Use `style` for outer margin only. Never override the type inside it.
