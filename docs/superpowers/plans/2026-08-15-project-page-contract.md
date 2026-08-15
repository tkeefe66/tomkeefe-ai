# Project Page Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring all ten project detail pages up to one contract — four body sections, five fact rows, one figure — with every published fact sourced from the project's own repository.

**Architecture:** No component redesign; `components/ProjectPage.tsx` already renders the target layout for every page. The work is content in `content/projects.ts`, enforced by a shrink-only guard test so the contract ships green on day one and each project's commit removes its own debt entries.

**Tech Stack:** TypeScript, Next.js (see `AGENTS.md` — read `node_modules/next/dist/docs/` before touching any Next API), Vitest, Tailwind v4.

**Spec:** `docs/superpowers/specs/2026-08-15-project-pages-design.md`

## Global Constraints

- **Nothing is invented.** Every fact is read off the project's repo in `~/Code Apps`: manifests, config, schema, test counts, git history. Where evidence is absent, the copy says less. It does not estimate.
- **Section headings, exact strings, in this order:** `THE PROBLEM`, `WHAT IT DOES`, `WHAT I BUILT`, `WHERE IT BROKE`.
- **`WHAT IT DOES` states the benefit outright** — what it replaced, what having it is worth — because there is no fifth section arguing significance.
- **`WHAT IT DOES` contains no implementation nouns. `WHAT I BUILT` contains no first-person experience.** This is what keeps the two from blurring.
- **Fact rows:** five minimum, always including `ROLE`, `STACK`, `STATUS`. Mono, uppercase, per the design system.
- **No literal brackets** anywhere in project copy — existing guard at `tests/content.test.ts:227`.
- **Never hardcode a color or neutral** — CSS vars only (`.claude/skills/tomkeefe-design`).
- Verification for every task: `npm run lint && npm test && npm run build`.

---

### Task 1: Retire the detail-page meta row

`MetaRow` on a detail page renders `[scale, cost, what broke]`. With `WHERE IT BROKE` becoming a section and the cost section cut from the design, its only unique content is gone. `ProjectRow.meta` stays — the homepage cards still use it.

**Files:**
- Modify: `components/ProjectPage.tsx:106-110` (remove render), `:5` (remove import)
- Modify: `content/types.ts:87-88` (remove `ProjectDetail.meta`)
- Modify: `content/projects.ts` (remove four `meta:` blocks from detail records only — `b2b-martech-intel`, `inventory`, `dynasty-analyzer`, `tomkeefe-ai`)
- Test: `tests/content.test.ts:173-178`

**Interfaces:**
- Produces: `ProjectDetail` without a `meta` field. Every later task writes records against this shape.

- [ ] **Step 1: Rewrite the meta test to assert cards only**

Replace `tests/content.test.ts:173-178` with:

```ts
  it("card meta survives on the homepage; detail records no longer carry it", () => {
    for (const slug of ["b2b-martech-intel", "inventory", "dynasty-analyzer", "tomkeefe-ai"]) {
      const card = projects.find((p) => p.slug === slug)!;
      expect(card.meta?.some(Boolean)).toBe(true);
    }
    // The detail meta row was retired when WHERE IT BROKE became a section
    // (spec 2026-08-15). No detail record may reintroduce it.
    for (const d of projectDetails) {
      expect(d).not.toHaveProperty("meta");
    }
  });
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run tests/content.test.ts -t "card meta survives"`
Expected: FAIL — detail records still have `meta`.

- [ ] **Step 3: Remove the render block**

Delete `components/ProjectPage.tsx:106-110` in full:

```tsx
        {project.meta?.some(Boolean) && (
          <div className="mt-(--space-8)">
            <MetaRow items={project.meta} />
          </div>
        )}
```

Delete the import at line 5: `import MetaRow from "@/components/MetaRow";`

- [ ] **Step 4: Remove the type field**

Delete from `content/types.ts`:

```ts
  /** Same three-line stat block as the card (brief Phase 2 §3); null clauses omitted per OPEN.md. */
  meta?: (string | null)[];
```

- [ ] **Step 5: Remove the four detail `meta:` blocks**

In `content/projects.ts`, inside `projectDetails` only, delete the `meta: [...]` block from `b2b-martech-intel`, `inventory`, `dynasty-analyzer`, and `tomkeefe-ai`. Leave every `meta:` inside the `projects` (card) array untouched.

- [ ] **Step 6: Verify green**

Run: `npm run lint && npm test && npm run build`
Expected: all pass. `MetaRow.tsx` stays on disk — the homepage still imports it.

- [ ] **Step 7: Commit**

```bash
git add components/ProjectPage.tsx content/types.ts content/projects.ts tests/content.test.ts
git commit -m "refactor: detail pages drop the meta row, cards keep it"
```

---

### Task 2: Ship the writeup contract guard, green, with a shrink-only baseline

The contract fails for all ten records today. Rather than defer the guard until content lands, ship it now with an explicit per-slug debt list that only ever shrinks. Every rule a slug is *not* baselined for is enforced immediately.

**Files:**
- Create: `tests/writeup-contract.test.ts`
- Create then delete: `scripts/gen-writeup-baseline.ts`

**Interfaces:**
- Produces: `BASELINE`, a `Record<slug, ruleId[]>`. Every content task below deletes its slug's entries and must not add any.
- Rule ids, used verbatim in `BASELINE` and in failure output: `four-sections`, `heading-order`, `five-facts`, `core-fact-labels`, `one-figure`, `premise-length`.

- [ ] **Step 1: Write the guard**

Create `tests/writeup-contract.test.ts`:

```ts
/**
 * Guard: the four-section writeup contract.
 * Spec: docs/superpowers/specs/2026-08-15-project-pages-design.md
 *
 * Every project record is held to RULES. Two escape maps, and they are NOT
 * the same thing:
 *
 *   ALLOWED  — permanent, sanctioned exceptions, each with its reason.
 *   BASELINE — temporary debt: records the rewrite has not reached yet.
 *
 * BASELINE only ever shrinks. Never add a slug; never add a rule to a slug.
 * Fill a project and delete its entry in the SAME commit — the stale test
 * fails otherwise, which is what stops this becoming a permission slip.
 *
 * Endgame: when BASELINE is empty, delete the constant, its filter, and
 * the stale test in one commit. The rules become absolute.
 */
import { describe, expect, it } from "vitest";
import { projectDetails } from "@/content/projects";
import type { ProjectDetail } from "@/content/types";

type Rule = {
  id: string;
  why: string;
  /** Returns a failure message, or null when the record satisfies the rule. */
  check: (d: ProjectDetail) => string | null;
};

const HEADINGS = ["THE PROBLEM", "WHAT IT DOES", "WHAT I BUILT", "WHERE IT BROKE"];
const CORE_FACTS = ["ROLE", "STACK", "STATUS"];

const RULES: Rule[] = [
  {
    id: "four-sections",
    why: "Every page answers why it exists, what it's like to have, how it works, and what went wrong.",
    check: (d) => {
      const got = d.sections.map((s) => s.heading);
      const missing = HEADINGS.filter((h) => !got.includes(h));
      return missing.length ? `missing section(s): ${missing.join(", ")}` : null;
    },
  },
  {
    id: "heading-order",
    why: "Problem, then payoff, then mechanism, then failure — a reader loses the thread in any other order.",
    check: (d) => {
      const idx = HEADINGS.map((h) => d.sections.findIndex((s) => s.heading === h)).filter((i) => i >= 0);
      const sorted = [...idx].sort((a, b) => a - b);
      return idx.join() === sorted.join() ? null : `contract sections are out of order`;
    },
  },
  {
    id: "five-facts",
    why: "The fact rail carries the page's right column; fewer than five rows leaves it visibly empty.",
    check: (d) => (d.facts.length >= 5 ? null : `${d.facts.length} fact rows, needs 5`),
  },
  {
    id: "core-fact-labels",
    why: "ROLE, STACK and STATUS are the three rows every project can answer honestly.",
    check: (d) => {
      const labels = d.facts.map((f) => f.label);
      const missing = CORE_FACTS.filter((l) => !labels.includes(l));
      return missing.length ? `missing fact row(s): ${missing.join(", ")}` : null;
    },
  },
  {
    id: "one-figure",
    why: "A page with no figure reads as a stub regardless of how good the copy is.",
    check: (d) => (d.figures.length >= 1 ? null : "no figure"),
  },
  {
    id: "premise-length",
    why: "The premise sits under the title at a 46ch measure; a one-liner leaves the header hollow.",
    check: (d) => (d.premise.length > 40 ? null : `premise is ${d.premise.length} chars, needs > 40`),
  },
];

/** Permanent, sanctioned exceptions. Each entry states what sanctions it. */
const ALLOWED: Record<string, string[]> = {};

/** Migration debt — generated by scripts/gen-writeup-baseline.ts. Shrinks only. */
const BASELINE: Record<string, string[]> = {
  // PASTE GENERATOR OUTPUT HERE IN STEP 3
};

const failures = (d: ProjectDetail) =>
  RULES.filter((r) => !ALLOWED[d.slug]?.includes(r.id))
    .map((r) => ({ rule: r, msg: r.check(d) }))
    .filter((f) => f.msg !== null);

describe("writeup contract", () => {
  it("guard is armed", () => {
    // A refactor that empties or renames the export must not turn every rule
    // below into a no-op that passes on zero records.
    expect(projectDetails.length).toBeGreaterThanOrEqual(10);
  });

  for (const rule of RULES) {
    it(`${rule.id}: ${rule.why}`, () => {
      const hits = projectDetails
        .filter((d) => !ALLOWED[d.slug]?.includes(rule.id))
        .filter((d) => !BASELINE[d.slug]?.includes(rule.id))
        .map((d) => ({ slug: d.slug, msg: rule.check(d) }))
        .filter((h) => h.msg !== null);
      expect(hits.map((h) => `${h.slug} — ${h.msg}`)).toEqual([]);
    });
  }

  it("baseline is not stale", () => {
    const stale: string[] = [];
    for (const [slug, ids] of Object.entries(BASELINE)) {
      const d = projectDetails.find((p) => p.slug === slug);
      if (!d) {
        stale.push(`${slug} — no such project, delete the entry`);
        continue;
      }
      for (const id of ids) {
        const rule = RULES.find((r) => r.id === id);
        if (!rule) stale.push(`${slug} — unknown rule "${id}"`);
        else if (rule.check(d) === null) stale.push(`${slug} — "${id}" now passes, remove it from BASELINE`);
      }
    }
    expect(stale).toEqual([]);
  });

  it("every record reports its remaining debt accurately", () => {
    // Cross-check: a record's live failures must be a subset of its baseline.
    for (const d of projectDetails) {
      const live = failures(d).map((f) => f.rule.id);
      const listed = BASELINE[d.slug] ?? [];
      expect(live.filter((id) => !listed.includes(id))).toEqual([]);
    }
  });
});
```

- [ ] **Step 2: Write the generator**

Never hand-type the baseline — a hand-typed list drifts from what the guard actually matches. Create `scripts/gen-writeup-baseline.ts`:

```ts
/** Throwaway: prints the BASELINE literal for tests/writeup-contract.test.ts. */
import { projectDetails } from "../content/projects";

const HEADINGS = ["THE PROBLEM", "WHAT IT DOES", "WHAT I BUILT", "WHERE IT BROKE"];
const CORE_FACTS = ["ROLE", "STACK", "STATUS"];

for (const d of projectDetails) {
  const ids: string[] = [];
  const got = d.sections.map((s) => s.heading);
  if (HEADINGS.some((h) => !got.includes(h))) ids.push("four-sections");
  const idx = HEADINGS.map((h) => d.sections.findIndex((s) => s.heading === h)).filter((i) => i >= 0);
  if (idx.join() !== [...idx].sort((a, b) => a - b).join()) ids.push("heading-order");
  if (d.facts.length < 5) ids.push("five-facts");
  const labels = d.facts.map((f) => f.label);
  if (CORE_FACTS.some((l) => !labels.includes(l))) ids.push("core-fact-labels");
  if (d.figures.length < 1) ids.push("one-figure");
  if (d.premise.length <= 40) ids.push("premise-length");
  if (ids.length) console.log(`  "${d.slug}": [${ids.map((i) => `"${i}"`).join(", ")}],`);
}
```

- [ ] **Step 3: Run it and paste the output**

Run: `npx tsx scripts/gen-writeup-baseline.ts`

Paste the printed lines into `BASELINE` in `tests/writeup-contract.test.ts`, replacing the `// PASTE GENERATOR OUTPUT HERE` comment. Expected shape — every slug appears, `b2b-martech-intel` and `inventory` carry the fewest entries:

```
  "b2b-martech-intel": ["four-sections"],
  ...
  "code-coach": ["four-sections", "five-facts", "core-fact-labels", "one-figure", "premise-length"],
```

- [ ] **Step 4: Delete the generator**

Run: `rm scripts/gen-writeup-baseline.ts`

The guard is now the only definition. Re-derive by temporarily re-adding the script if a rule is ever added.

- [ ] **Step 5: Retire the stubs test**

Delete `tests/content.test.ts:157-171` (`"stubs are honest: no invented narrative, no brackets, no figures"`) in full. It pins seven slugs to zero figures, which this work reverses. Its bracket check is already covered by `"no literal brackets anywhere across all detail records"` at line 227, and its `launch` assertion moves into the deletion commit message as a note — no project uses `launch`.

- [ ] **Step 6: Verify green**

Run: `npm run lint && npm test && npm run build`
Expected: all pass. The guard is green because every current failure is baselined.

- [ ] **Step 7: Commit**

```bash
git add tests/writeup-contract.test.ts tests/content.test.ts
git commit -m "test: writeup contract guard, green, with shrink-only baseline"
```

---

### Tasks 3–12: Fill one project per task

**Every one of these tasks has the same five steps.** They differ only in the slug, the repo to read, and the verified facts already in hand. Do not batch them — one project per commit keeps each page reviewable and keeps the baseline shrinking visibly.

**Order** (easiest delta first, so the pattern is established before the bare pages):

| Task | Slug | Repo to read |
|---|---|---|
| 3 | `b2b-martech-intel` | `~/Code Apps/b2b-ai-news-source` |
| 4 | `inventory` | `~/Code Apps/outdoor-inventory` |
| 5 | `life-tracker` | `~/Code Apps/life-tracker` |
| 6 | `dynasty-analyzer` | `~/Code Apps/public-dynasty` |
| 7 | `tomkeefe-ai` | `~/Code Apps/my-website` (this repo) |
| 8 | `code-coach` | `~/Code Apps/app-builder-coach` |
| 9 | `family-tree` | `~/Code Apps/family-tree` |
| 10 | `job-search` | `~/Code Apps/chad-job-search-main` |
| 11 | `outdoor-telegram-agent` | `~/Code Apps/outdoor-inventory` (`lib/telegram.ts`, `railway.bot.json`) |
| 12 | `camera-agent` | `~/Code Apps/outdoor-inventory` (`domains/photography/`) |

**Files (every task):**
- Modify: `content/projects.ts` — the one `projectDetails` record, and the matching `projects` card `line` where it still reads "Writeup coming."
- Modify: `tests/writeup-contract.test.ts` — delete this slug's `BASELINE` entries

**Interfaces:**
- Consumes: `ProjectDetail` without `meta` (Task 1); rule ids from Task 2.
- Produces: nothing later tasks depend on. These are independent and may be reordered.

- [ ] **Step 1: Gather evidence from the repo**

Run, substituting the repo path:

```bash
cd ~/Code\ Apps/<repo>
cat README.md PRODUCT.md 2>/dev/null | head -60
ls docs/ 2>/dev/null
git log --oneline --grep='^fix' --grep='^revert' -i | head -20
git log --oneline | wc -l
cat SECURITY-AUDIT.md AGATE_FOLLOWUPS.md 2>/dev/null | head -40
```

`README.md`/`PRODUCT.md` feed `THE PROBLEM` and `WHAT IT DOES`. Manifests and config feed `WHAT I BUILT` and the `STACK` row. The `fix`/`revert` log and any audit doc feed `WHERE IT BROKE`.

- [ ] **Step 2: Write the four sections**

Four `ProjectSection` entries in contract order. Hold the two discipline rules: `WHAT IT DOES` uses present tense from the user's seat with no implementation nouns and closes on what the thing is worth; `WHAT I BUILT` is mechanism only, no first-person experience.

Reference for tone — the target `WHAT IT DOES`, from `b2b-martech-intel`:

> One email, every morning. Everything that moved overnight in B2B martech, filtered to the topics and the specific companies I care about — plus how the narrative shifted over the week, which is the part no newsletter gives you. It replaced a reading habit I kept failing to maintain, and it does the job a company this size would otherwise have to hire an analyst for.

**If the repo yields no real failure**, stop and raise it rather than manufacturing one. The four-section contract is deliberately not pre-relaxed (spec, "Known weak spots"). `b2b-ai-news-source` (80 commits) and `my-website` (56) are the likely cases.

**Task 4 (`inventory`) only — two extra edits.** Delete the existing `WHY IT MATTERS AT WORK` section: the site shows no work projects, so the mapping has nothing to attach to, and the value argument now lives in `WHAT IT DOES`. Keep `THE CAMERA DETOUR` as a fifth section — it is real, it is good, and `tests/content.test.ts:198` pins its content. Final order: `THE PROBLEM`, `WHAT IT DOES`, `WHAT I BUILT`, `THE CAMERA DETOUR`, `WHERE IT BROKE`.

- [ ] **Step 3: Write five fact rows**

`ROLE` / `STACK` / *scale* / *project-specific* / `STATUS`. Values uppercase in render; write them in sentence case as the existing records do (`"Built and operated"`), matching `b2b-martech-intel`.

Verified stacks and counts, already gathered 2026-08-15 — use these rather than re-deriving:

| Slug | Commits | Tests | Stack |
|---|---|---|---|
| `b2b-martech-intel` | 80 | 15 | Next.js · React · Radix · Anthropic · Google GenAI |
| `inventory` | 386 | 98 | Next.js · NextAuth · Anthropic · Telegram · Google APIs |
| `life-tracker` | 461 | 106 | Python · FastAPI · APScheduler · Anthropic · Postgres |
| `dynasty-analyzer` | 1,098 | 769 | Python · FastAPI · Alembic · Docker · Postgres |
| `tomkeefe-ai` | 56 | 27 | Next.js · TypeScript · Railway |
| `code-coach` | 198 | 170 | Python · FastAPI · SQLAlchemy · Anthropic |
| `family-tree` | 332 | 89 | Next.js · Drizzle · Postgres · S3 |
| `job-search` | 162 | 38 | Next.js · Supabase · Postgres · Anthropic |

For Tasks 11 and 12, `menuSubtitle` reads `MODULE OF OUTDOOR INVENTORY · LIVE`, and the sections cover only that module's surface — the bot interface and the photography curriculum respectively. Do not restate the ledger story from Task 4.

- [ ] **Step 4: Rewrite the premise, and the card line if it is a placeholder**

Premise runs > 40 characters and reads as 2–3 lines at the 46ch measure. Where the `projects` card still says `line: "Writeup coming."`, replace it with a single sentence written to sit alone on one line.

- [ ] **Step 5: Delete this slug's baseline entries, verify, commit**

Remove the slug's line from `BASELINE` in `tests/writeup-contract.test.ts`. Leave `one-figure` in place — figures land in Task 14.

Run: `npm run lint && npm test && npm run build`
Expected: all pass. If `baseline is not stale` fails, an entry was left behind that now passes — delete it. If a rule test fails, the record does not yet meet the contract.

```bash
git add content/projects.ts tests/writeup-contract.test.ts
git commit -m "content: <project name> meets the writeup contract"
```

---

### Task 13: Rewrite the projects intro

`projectsIntro` currently promises stubs. Both of its load-bearing claims go false: "Four tools and this website" (there are ten) and "The rest are stubs until their numbers exist."

**Files:**
- Modify: `content/projects.ts:3-7`
- Modify: `tests/content.test.ts:252-257`

- [ ] **Step 1: Update the intro test to match the new opening**

The existing test pins `projectsIntro[0]` to contain "Four tools and this website". Replace that assertion with one pinning whatever opening line ships, keeping the three-paragraph and bracket-free checks:

```ts
describe("projects intro copy", () => {
  it("three paragraphs, bracket-free, opens on the real count", () => {
    expect(projectsIntro).toHaveLength(3);
    projectsIntro.forEach(expectNoBrackets);
    // Pinned so the count and the copy can't drift apart again.
    expect(projectsIntro[0]).toContain("Ten");
    expect(projectsIntro.join(" ")).not.toContain("stubs");
  });
});
```

- [ ] **Step 2: Draft three replacement paragraphs**

Keep the existing voice — the first paragraph states what exists and the user base of one, the second covers what is still moving, the third sets expectations for the writeups. The "I'd rather ship a short page than invent one" promise is retired, so do not restate it.

**This copy is the user's to approve.** Draft it, show it, and do not commit until they have signed off.

- [ ] **Step 3: Verify and commit**

Run: `npm run lint && npm test && npm run build`

```bash
git add content/projects.ts tests/content.test.ts
git commit -m "content: intro reflects ten writeups, not four and six stubs"
```

---

### Task 14: Figures

**Blocked on the user.** Eight projects need a screenshot. This is the only external input in the plan and is deliberately last.

**Files:**
- Create: `public/projects/<slug>.png` ×8
- Modify: `content/projects.ts` (one `figures` entry per record)
- Modify: `tests/writeup-contract.test.ts` (delete the last `one-figure` entries, then the `BASELINE` constant itself)

- [ ] **Step 1: Send the user a shot list**

Ask for one screenshot per project, naming for each what the shot should show — the surface the page's `WHAT IT DOES` section describes. Per the design system: capture wide (~190% width) for cropping, and note whether each capture is light or dark UI.

- [ ] **Step 2: Add each figure**

For each, add a `ProjectFigure` with real `width`/`naturalHeight` read from the file, a `FIG. 01 — …` caption in mono uppercase, and the correct `capture` value. Light captures are dimmed in dark mode; dark captures opt out.

- [ ] **Step 3: Retire the baseline**

Once the last `one-figure` entry is gone, `BASELINE` is empty. Delete the constant, its two filter expressions, the `baseline is not stale` test, and the `every record reports its remaining debt accurately` test — in one commit. Leave a line in the file's header comment recording that it existed and what it covered. The six rules become absolute.

- [ ] **Step 4: Verify and deploy**

Run: `npm run lint && npm test && npm run build`

Then push to `main` and confirm the Railway `web` service reaches `SUCCESS` on the pushed commit before checking the live pages.

---

## Verification

Beyond the suite, confirm on the live site after deploy:

- All ten pages render four sections, five fact rows, and a figure.
- The fact rail does not overflow at ≤900px, where the grid collapses to one column.
- Both themes: light captures dim correctly in dark mode, and no `.band`-adjacent change has produced a white band or invisible button text.
