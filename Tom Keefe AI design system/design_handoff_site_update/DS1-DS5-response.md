# DS1–DS5: audit answers and verdicts

Response to the tomkeefe.ai copy-rewrite brief. Everything below is built and in the system; nothing here needed a new token.

---

## Audit answers

**1. Does the system define a running body-copy style?** Partially — and this was the one that changed the size of the job. The tokens existed (`--size-body-lg`, `--leading-body: 1.6`, `--measure-prose: 66ch`) and the homepage used them for single paragraphs. What did not exist was any handling of **consecutive** paragraphs: no paragraph spacing, no component, every instance hand-rolled inline. So DS4 is a **variant on the existing scale, not a new scale.** No new type tokens were added.

**2. How many card variants, one component or two?** Two components, not two variants — `RowLink` (title, status, one-line description) did all the project rows, and the "featured" treatment was hand-built inline in the homepage. There was no real card component to consolidate. `ProjectCard` is new.

**3. Is the status badge fixed-width, and what are its states?** Content-sized, `white-space: nowrap`, no container. States were not enumerated anywhere — `LIVE` / `IN PROGRESS` were passed as free strings through a `tone` prop (`accent` / `faint` / `muted` / `onField`). Now a real `state` prop.

**4. Does the project card grid enforce uniform height?** There is no grid. Projects were stacked full-width rows separated by hairlines. This is why the DS2 recommendation was easy to accept — see the verdict.

**5. Is the profile block hardcoded to five rows?** No. `LabelledRow` is a per-row component; the count is whatever the page renders. See Layout A below.

**6. Is there an existing muted/secondary style?** Yes, a three-step ramp: `--body` (prose), `--muted` (labels, secondary), `--faint` (meta, timestamps). `--muted` is the annotation level and is what DS3 and DS5 use.

---

## DS1. Status badge, third state — built

`StatusLabel` now takes `state="live" | "progress" | "launching"`.

- **`live`** — accent. The loudest, because it's the only actionable state.
- **`progress`** — muted.
- **`launching`** — accent type in a tinted capsule (`--tint` / `--tint-edge`, `--radius-pill`).

**Target string is `LAUNCHING SEPT 2026`**, as recommended. The build spec should conform to it.

The capsule is the only container in the component, and it exists to solve exactly the edge case flagged: at four times the character count of `LIVE`, color alone couldn't separate the two in one row without the date state getting louder. A soft surface reads quieter than bare accent type at the same size while still being unmistakably a different state. Both are shown side by side on the `Status states` card.

Still never wraps. At ≤560px the card header stacks so a long badge can't crush the project name — that's the one responsive rule this added.

## DS2. Unified project card — built

`ProjectCard` carries name → badge → body (1–3 paragraphs) → metadata row → link affordance, in that order. `RowLink` is retained for non-project rows but is no longer used for projects.

**Verdict on uniform height: do not enforce it.** Agreed with the brief, and the existing site already did the right thing — projects were stacked full-width rows, not a grid. Cards size to content. No masonry needed, because full-width stacking sidesteps the problem entirely rather than working around it.

The three-paragraph card sits beside two-paragraph cards without the short ones looking unfinished, because in a stacked list an unequal body reads as a shorter essay, not a half-empty box. Both test bodies (the 18-word one and the two-paragraph camera story) are on the `Project cards` card.

## DS3. Card metadata row — built

`MetaRow` takes an array of fragments.

**Verdict on wrapping: fragments wrap as whole units; separators persist and never orphan.** The `·` marks are real flex children with `column-gap: 9px` / `row-gap: 3px`, so a wrapped row never begins a line with a separator — the failure mode you get for free from `join(" · ")`. Set at `--size-row` in `--muted`, deliberately one step below body copy, so the long third clause reads as annotation and doesn't compete with the paragraph above it.

Never truncated or ellipsed. Two fragments is a first-class shape — pass `false` or `null` for a missing value and it's dropped cleanly, no empty separator.

## DS4. Long-form prose block — built

`ProseBlock`. **No new type scale was required** — this is the answer to deliverable 4.

`--size-body-lg` at `--measure-prose` (66ch) in `--body`, `--leading-body` 1.6. Paragraph gap is `16px` — deliberately tighter than `--section-gap` (44px), so four paragraphs of two-to-four sentences hold together as one argument instead of reading as four blocks. The full Claude Code section was set, not approximated, and it's on the `Prose & annotation` card.

A `size="row"` variant handles the shorter muted card bodies, so `ProjectCard` and the long-form sections share one component.

## DS5. Annotation caption — built

Implemented as an **`annotation` prop on `Statement`**, not a separate component — deliberately, because that's what makes the asymmetry safe. The layout reserves nothing when it's absent, so the four unannotated opinions can't read as missing anything. A standalone component would have invited a placeholder.

`--size-row` in `--muted` against `--size-principle` above it: the claim lands first, the receipt second. Both example strings fit, including the longer two-sentence one.

---

## Layout assumptions

**A. Profile block, five rows to three.** Works without changes. `LabelledRow` is per-row, and the value cell already wraps (`min-width: 0`, baseline alignment against a fixed 118px mono label). The longer values change the block's proportions but not its behavior — it becomes three taller rows instead of five short ones, and the label column still aligns.

One note: at ≤700px the mono label stacks above its value. With three long values that reads better than it did with five short ones, so no change needed.

**B. Projects section doubles in weight and moves up.** No structural issue — the section is a stack of hairline-separated rows, so it absorbs both more content per card and a three-paragraph intro (`ProseBlock`) above it. Section rhythm is `--section-gap`, unchanged.

---

## The two judgments

**1. Numbering the opinions.** Agreed, and `index` is now optional on `Statement` — omit it and the layout closes up cleanly with no leftover gutter. My recommendation: **drop the numbers and put the count in the heading.** Numbering six unranked assertions implies a sequence that isn't there, and the mono index is the one place in the system where a structural device is doing decorative work. This is a copy decision, so the component supports both and I've made neither the default.

**2. The thirteen-item marquee.** Out of scope, no change made. For the record: I agree that a scrolling logo strip is the least differentiated element on the page, and it will look worse sitting above a project section that's now much stronger. `TechMarquee` takes whatever array it's given, so trimming to six is a one-line change on the copy side whenever that decision lands.

---

## Nothing was found to be unnecessary

All five patterns were genuinely absent. DS1 and DS5 are extensions of existing components; DS2, DS3 and DS4 are new. The build can start.

## Out of scope, untouched

Palette, spacing scale, dark mode, hero, OG templates, navigation, project detail page template.
