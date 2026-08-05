# tomkeefe.ai Copy & Structure Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the tomkeefe.ai rewrite brief — land the five DS component patterns (Phase 0.5), rewrite the homepage copy and structure (Phase 1), align the two existing project detail pages (Phase 2), and add three stub project routes (Phase 3) — with zero literal placeholders shipped and every omission logged in `OPEN.md`.

**Architecture:** Copy lives in typed content modules (`content/*.ts`) consumed by presentational components; all copy changes are content-module edits plus component rewires. Five new components (`StatusLabel`, `MetaRow`, `ProseBlock`, `ProjectCard`, `Statement`) are built from the design-system specs in `Tom Keefe AI design system/components/`, translated to the repo idiom (Tailwind arbitrary values for type sizes, CSS custom properties for colors). Detail pages share one template (`components/ProjectPage.tsx`) which is generalized to tolerate stub records.

**Tech Stack:** Next.js 16.2.10 (App Router), React 19, TypeScript, Tailwind v4 (arbitrary values + CSS vars in `app/globals.css`), Vitest (content tests only — no component-test infra; components are verified by `tsc`, build, and visual check).

## Global Constraints

- **Never invent a number.** Unfilled values (B4 leagues, B5 items, B7 all, footer changelog) → delete the whole clause, log in `OPEN.md`. A literal `[` in rendered output is a production defect.
- **Copy in blockquotes below is verbatim.** Do not improve, re-tone, or add transitions.
- **Do not modify:** design tokens/colors in `app/globals.css` `:root` blocks, fonts, spacing scale values, dark-mode logic (`ThemeToggle`, `themeInit`), OG image files, the tech-strip marquee (13 entries stay), analytics (none present).
- **Dynasty badge text is `LAUNCHING SEPT 2026`** (Tom's decision; matches the design-system `StatusLabel` spec, overrides the brief's `PUBLIC LAUNCH SEPT 2026`).
- **DS5 annotation is muted, NOT italic** — the design system's `Statement.annotation` treatment (`--size-row` in `--muted`) supersedes the brief's italics fallback.
- **Phase 0.5 is additive only:** its commit may create the five component files and nothing else. `git diff --stat` for that commit must show only new files under `components/`.
- **Commit per phase**, with the one-line skill-candidate output before each commit.
- **Do not deploy.** Local build and preview only. No Railway commands.
- **Do not touch the Claude Design project** (pull-only relationship).
- Verification commands: `npm run test`, `npx tsc --noEmit`, `npm run lint`, `npm run build`.

## Decisions already made (do not re-open)

- Field Assistant card is removed; it has no route, so **no redirects are needed anywhere** in this job.
- The five-altitude ladder (C-SUITE…MACHINE) is deleted, including its data and rendering.
- Life Tracker card ships with **no metadata row** (B1/B2 deferred); its page is a stub.
- Dynasty and tomkeefe.ai pages are stubs (B4/B7 open).
- The Inventory rename (B3) is **out of scope** — separate PR later.
- New-route OG images: none created; routes inherit the root `app/opengraph-image.png`. Existing OG PNGs untouched.
- Pending open questions asked of Tom (opinions heading/numbering, "MarTech Intel" vs "B2B MarTech Intel" display name, B9 receipt-parsing framing): the plan below uses defaults — heading **"Six opinions, held firmly."** with numbers kept, display name **"MarTech Intel"**, B9 framing as the brief wrote it. If Tom's answers differ, apply them as small copy edits in the affected tasks.

---

# Phase 0.5 — DS1–DS5 components (standalone additive commit)

### Task 1: StatusLabel (DS1)

**Files:**
- Create: `components/StatusLabel.tsx`

**Interfaces:**
- Produces: `default StatusLabel({ state?: "live" | "progress" | "launching"; tone?: "accent" | "faint" | "muted" | "onField"; children: React.ReactNode })`
- Consumed by: `ProjectCard` (Task 4), `ProjectPage` header (Task 18), any badge use.

Spec source: `Tom Keefe AI design system/components/core/StatusLabel.jsx`. Repo translation: mono caption type = `mono whitespace-nowrap text-[10.5px] tracking-[0.08em]`; `--radius-pill` → `rounded-full`; `--tint`/`--tint-edge`/`--acc` etc. exist in `app/globals.css` already.

- [ ] **Step 1: Write the component**

```tsx
/* Three states. LIVE is the loudest because it is the only one that is
   actionable; PROGRESS and LAUNCHING are both quieter than it by design.
   LAUNCHING carries a date and is the only state that gets a tinted capsule —
   it must read as a different state than LIVE in the same list without
   competing with it. `tone` covers the non-state uses (PROJECT 01, READ →). */
export default function StatusLabel({
  state,
  tone = "faint",
  children,
}: {
  state?: "live" | "progress" | "launching";
  tone?: "accent" | "faint" | "muted" | "onField";
  children: React.ReactNode;
}) {
  const base = "mono whitespace-nowrap text-[10.5px] tracking-[0.08em]";
  if (state === "launching") {
    return (
      <span
        className={`${base} rounded-full px-[9px] py-[3px]`}
        style={{
          color: "var(--acc)",
          background: "var(--tint)",
          border: "1px solid var(--tint-edge)",
        }}
      >
        {children}
      </span>
    );
  }
  const tones = {
    accent: "var(--acc)",
    faint: "var(--faint)",
    muted: "var(--muted)",
    onField: "var(--acc-soft)",
  } as const;
  const color =
    state === "live" ? tones.accent : state === "progress" ? tones.muted : tones[tone];
  return (
    <span className={base} style={{ color }}>
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

### Task 2: MetaRow (DS3)

**Files:**
- Create: `components/MetaRow.tsx`

**Interfaces:**
- Produces: `default MetaRow({ items: Array<string | false | null | undefined> })` — falsy fragments are dropped cleanly (that is how B4/B5/B7 omissions ship without empty separators). Returns `null` when no truthy fragments remain.
- Consumed by: `ProjectCard` (Task 4), `ProjectPage` (Task 15).

Spec source: `Tom Keefe AI design system/components/data/MetaRow.jsx`. Separators are real flex children so a wrapped line never starts with `·`. `--size-row` 15px, `--measure-row` → `max-w-[68ch]` (repo's row measure).

- [ ] **Step 1: Write the component**

```tsx
import { Fragment } from "react";

/* Dot-separated annotation under a card body: scale, cost, and what went
   wrong. Fragments wrap as whole units; the separators are real flex
   children, so a wrapped row never orphans a "·" at a line start. Never
   truncated — the third fragment is usually a full clause and is the point. */
export default function MetaRow({
  items,
}: {
  items: Array<string | false | null | undefined>;
}) {
  const parts = items.filter((i): i is string => Boolean(i));
  if (parts.length === 0) return null;
  return (
    <div
      className="flex max-w-[68ch] flex-wrap items-baseline gap-x-[9px] gap-y-[3px] text-[15px] leading-[1.5] text-pretty"
      style={{ color: "var(--muted)" }}
    >
      {parts.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && (
            <span aria-hidden="true" style={{ color: "var(--faint)" }}>
              ·
            </span>
          )}
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

### Task 3: ProseBlock (DS4)

**Files:**
- Create: `components/ProseBlock.tsx`

**Interfaces:**
- Produces: `default ProseBlock({ paragraphs: string[]; size?: "prose" | "row"; className?: string })`. `"prose"` = 16.5px/66ch in `--body`, 16px paragraph gap. `"row"` = 15px/68ch in `--muted`, 11px gap (card bodies).
- Consumed by: `ProjectCard` (Task 4), `Range`, `AgentsSection`, `WrongSection`, `ProjectsList` intro (Phase 1).

Spec source: `Tom Keefe AI design system/components/core/ProseBlock.jsx` — paragraph gap deliberately tighter than section rhythm so consecutive paragraphs read as one argument.

- [ ] **Step 1: Write the component**

```tsx
/* Running prose. The rest of the site is set for scanning; this is set for
   reading. Paragraph spacing is deliberately tighter than the section rhythm
   so paragraphs of very different lengths still hold together as one
   argument. "prose" carries the long-form sections; "row" carries the
   shorter muted bodies inside a project card. */
export default function ProseBlock({
  paragraphs,
  size = "prose",
  className,
}: {
  paragraphs: string[];
  size?: "prose" | "row";
  className?: string;
}) {
  const reading = size === "prose";
  return (
    <div
      className={`flex flex-col text-pretty ${
        reading
          ? "max-w-[66ch] gap-4 text-[16.5px]"
          : "max-w-[68ch] gap-[11px] text-[15px]"
      } leading-[1.6]${className ? ` ${className}` : ""}`}
      style={{ color: reading ? "var(--body)" : "var(--muted)" }}
    >
      {paragraphs.filter(Boolean).map((p) => (
        <p key={p} className="m-0">
          {p}
        </p>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

### Task 4: ProjectCard (DS2)

**Files:**
- Create: `components/ProjectCard.tsx`

**Interfaces:**
- Consumes: `StatusLabel` (Task 1), `MetaRow` (Task 2), `ProseBlock` (Task 3).
- Produces: `default ProjectCard({ name: string; state?: "live" | "progress" | "launching"; status?: string; body: string[]; meta?: Array<string | null>; href?: string; cta?: string })`
- Consumed by: `ProjectsList` (Task 12).

Spec source: `Tom Keefe AI design system/components/data/ProjectCard.jsx`. Full-width stacked rows, never a grid — height follows content (uniform height explicitly rejected). Reuses the existing `.row-link` class (`app/globals.css:334-347`) for the hairline + hover padding-shift; DS padding is 26px vertical, applied as inline `paddingTop/Bottom` which overrides the class's `padding: 20px 0` shorthand without touching the hover `padding-left` longhand. At ≤560px the head stacks so the long LAUNCHING badge can't crush the project name (the one responsive rule DS1 added).

- [ ] **Step 1: Write the component**

```tsx
import Link from "next/link";
import StatusLabel from "@/components/StatusLabel";
import MetaRow from "@/components/MetaRow";
import ProseBlock from "@/components/ProseBlock";

type ProjectCardProps = {
  name: string;
  state?: "live" | "progress" | "launching";
  status?: string;
  body: string[];
  meta?: Array<string | null>;
  href?: string;
  cta?: string;
};

/* One card per project — full-width stacked rows, never a grid. Unequal
   bodies read as a list of essays, which is what they are. Same hover as
   .row-link: padding-left 0 → 10px, never a color change. */
export default function ProjectCard({
  name,
  state,
  status,
  body,
  meta,
  href,
  cta = "READ →",
}: ProjectCardProps) {
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-[22px] max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-2">
        <span
          className="text-[21px] font-semibold tracking-[-0.03em]"
          style={{ color: "var(--ink)" }}
        >
          {name}
        </span>
        {status ? <StatusLabel state={state}>{status}</StatusLabel> : null}
      </div>
      <ProseBlock paragraphs={body} size="row" className="mt-[11px]" />
      {meta?.some(Boolean) ? (
        <div className="mt-4">
          <MetaRow items={meta} />
        </div>
      ) : null}
      {href && cta ? (
        <div className="mt-4">
          <StatusLabel tone="accent">{cta}</StatusLabel>
        </div>
      ) : null}
    </>
  );
  const pad = { paddingTop: 26, paddingBottom: 26 };
  return href ? (
    <Link href={href} className="row-link last:border-b-0" style={pad}>
      {inner}
    </Link>
  ) : (
    <div className="row-link last:border-b-0" style={pad}>
      {inner}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

### Task 5: Statement (DS5)

**Files:**
- Create: `components/Statement.tsx`

**Interfaces:**
- Produces: `default Statement({ index?: string; text: string; annotation?: string; last?: boolean })`. `annotation` is the optional receipt line — muted, NOT italic; layout reserves nothing when absent. `index` optional per the design-system judgment (omitting it closes the gutter cleanly).
- Consumed by: `Principles` (Task 13).

Spec source: `Tom Keefe AI design system/components/data/Statement.jsx`. Type values match the live Principles rendering exactly (26px/1.28/-0.028em, 30px mono gutter).

- [ ] **Step 1: Write the component**

```tsx
/* A numbered opinion. `annotation` is the optional receipt — the line that
   ties the claim to a project. The ones without must not read as missing
   something, so the annotation adds nothing to the layout when absent. */
export default function Statement({
  index,
  text,
  annotation,
  last = false,
}: {
  index?: string;
  text: string;
  annotation?: string;
  last?: boolean;
}) {
  return (
    <div
      className="flex items-start gap-6 py-6"
      style={{ borderBottom: last ? undefined : "1px solid var(--hair)" }}
    >
      {index ? (
        <span
          className="mono flex-none basis-[30px] pt-[9px] text-[11.5px]"
          style={{ color: "var(--acc)" }}
        >
          {index}
        </span>
      ) : null}
      <div className="min-w-0">
        <p className="m-0 max-w-[32ch] text-[26px] font-medium leading-[1.28] tracking-[-0.028em] text-pretty">
          {text}
        </p>
        {annotation ? (
          <p
            className="m-0 mt-[11px] max-w-[68ch] text-[15px] leading-[1.5] text-pretty"
            style={{ color: "var(--muted)" }}
          >
            {annotation}
          </p>
        ) : null}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

### Task 6: Phase 0.5 verification + commit

- [ ] **Step 1: Full check**

Run: `npm run lint && npx tsc --noEmit && npm run test && npm run build`
Expected: all pass (components are not yet imported anywhere; existing tests untouched).

- [ ] **Step 2: Additive-diff check (the brief's hard gate)**

Run: `git status --porcelain && git diff --stat`
Expected: exactly five untracked files, all under `components/` (`StatusLabel.tsx`, `MetaRow.tsx`, `ProseBlock.tsx`, `ProjectCard.tsx`, `Statement.tsx`), zero modified files. If anything else changed, STOP — revert the extra change and report.

- [ ] **Step 3: Skill-candidate line + commit**

```bash
git add components/StatusLabel.tsx components/MetaRow.tsx components/ProseBlock.tsx components/ProjectCard.tsx components/Statement.tsx
git commit -m "feat: land DS1–DS5 component patterns from the design system"
```

**CHECKPOINT: report the diff-stat to Tom before starting Phase 1** (brief requires it).

---

# Phase 1 — Homepage rewrite (one commit)

### Task 7: Rewrite the content test suite (fails until Tasks 8–13 land)

**Files:**
- Modify: `tests/content.test.ts` (full rewrite)

**Interfaces:**
- Consumes: the new content shapes defined in Task 8. Written first per TDD; it will not even typecheck until Task 8 lands — that is the expected failure state.

- [ ] **Step 1: Replace the whole file with:**

```ts
import { describe, it, expect } from "vitest";
import { site } from "@/content/site";
import { range } from "@/content/range";
import { principles } from "@/content/principles";
import { agents } from "@/content/agents";
import { wrong } from "@/content/wrong";
import { projects, projectDetails, getProjectDetail } from "@/content/projects";

/** Rule 1 of the rewrite brief: a literal bracket in copy is a defect. */
function expectNoBrackets(s: string) {
  expect(s).not.toMatch(/[[\]]/);
}

describe("site content", () => {
  it("has the new tagline in hero and meta source", () => {
    expect(site.name).toBe("Tom Keefe");
    expect(site.tagline).toContain("audience of one");
    expect(site.masthead.lead).toBe(site.tagline);
  });

  it("ledger is three rows: ROLE, YEARS, STATUS", () => {
    expect(site.masthead.ledger.map((r) => r.label)).toEqual(["ROLE", "YEARS", "STATUS"]);
    expect(site.masthead.ledger[0].value).toBe("Director, GTM Experts at Demandbase");
    expect(site.masthead.ledger[2].value).toBe("The agents are typing.");
  });

  it("has tech strip, links, contact and footer", () => {
    expect(site.techStrip).toHaveLength(13); // marquee trim NOT approved
    expect(site.links.map((l) => l.label)).toEqual(["EMAIL", "LINKEDIN", "GITHUB"]);
    expect(site.contactHeadline).toContain("I answer email");
    expect(site.footer.left).toBe("© 2026 Tom Keefe");
    // Changelog values unfilled → footer is the © line alone (OPEN.md).
    // "DIRECTED BY A HUMAN. BUILT WITH AGENTS." moved to a section heading.
    expect(site.footer.right).toBeUndefined();
  });
});

describe("range (Boardroom)", () => {
  it("keeps the headline, drops the subhead and the altitude ladder", () => {
    expect(range.headline).toBe("Boardroom to production query.");
    expect(range.paragraphs).toHaveLength(2);
    expect(range.paragraphs[0]).toContain("enrichment job stopped writing on a Tuesday");
    expect(range.paragraphs[1]).toContain("Customer Zero by instinct");
    expect("altitudes" in range).toBe(false);
    expect("subhead" in range).toBe(false);
  });
});

describe("new prose sections", () => {
  it("agents section: heading appears here (and only here — footer test above)", () => {
    expect(agents.heading).toBe("Directed by a human. Built with agents.");
    expect(agents.paragraphs).toHaveLength(4);
    expect(agents.paragraphs[2]).toContain("Silence isn't a valid answer");
  });

  it("wrong section: two final paragraphs, B6 resolved inline", () => {
    expect(wrong.heading).toBe("How I get things wrong.");
    expect(wrong.paragraphs).toHaveLength(2);
    expect(wrong.paragraphs[0]).toContain("the better part of a month");
    for (const p of wrong.paragraphs) expectNoBrackets(p);
  });
});

describe("opinions", () => {
  it("ships six, annotations on 03 and 04 only", () => {
    expect(principles).toHaveLength(6);
    expect(principles.map((p) => Boolean(p.annotation))).toEqual([
      false, false, true, true, false, false,
    ]);
    expect(principles[2].annotation).toContain("packing the same bag wrong");
    expect(principles[3].annotation).toContain("The month was the cheap part.");
    expect(principles[5].text).toBe(
      "The feature you're most excited about is usually the one to cut.",
    );
  });
});

describe("project cards", () => {
  it("five cards, brief order, no Field Assistant", () => {
    expect(projects.map((p) => p.name)).toEqual([
      "MarTech Intel", "Inventory", "Life Tracker", "Dynasty Analyzer", "tomkeefe.ai",
    ]);
  });

  it("statuses and states", () => {
    expect(projects.map((p) => p.status)).toEqual([
      "LIVE", "LIVE", "LIVE", "LAUNCHING SEPT 2026", "LIVE",
    ]);
    expect(projects[3].state).toBe("launching");
    expect(projects.filter((p) => p.state === "live")).toHaveLength(4);
  });

  it("Inventory card is intentionally three units (2 paragraphs + meta); Life Tracker and tomkeefe.ai carry no meta row", () => {
    expect(projects[1].body).toHaveLength(2);
    expect(projects[1].meta?.filter(Boolean)).toHaveLength(2); // B5 clause omitted
    expect(projects[2].meta).toBeUndefined(); // Life Tracker: B1/B2 deferred
    expect(projects[4].meta).toBeUndefined(); // tomkeefe.ai: B7 → whole line dropped
    expect(projects[0].meta?.filter(Boolean)).toHaveLength(3);
    expect(projects[3].meta?.filter(Boolean)).toHaveLength(2); // B4 clause omitted
  });

  it("no literal placeholders anywhere in card copy", () => {
    for (const p of projects) {
      expectNoBrackets(p.name);
      expectNoBrackets(p.status);
      p.body.forEach(expectNoBrackets);
      (p.meta ?? []).filter((m): m is string => Boolean(m)).forEach(expectNoBrackets);
    }
  });

  it("linked cards resolve to detail records (2 until Phase 3 lands routes)", () => {
    const slugs = new Set(projectDetails.map((d) => d.slug));
    for (const p of projects.filter((p) => p.slug)) {
      expect(slugs.has(p.slug!)).toBe(true);
    }
    for (const d of projectDetails) expect(slugs.has(d.next.slug)).toBe(true);
    expect(getProjectDetail("inventory").title).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm run test`
Expected: FAIL (imports `@/content/agents` / `@/content/wrong` which don't exist yet; type errors on new fields).

### Task 8: Content types

**Files:**
- Modify: `content/types.ts`

**Interfaces:**
- Produces (consumed by Tasks 9–15): `ProjectRow { name; slug?; state: "live" | "progress" | "launching"; status: string; body: string[]; meta?: (string | null)[] }`, `RangeContent { headline; paragraphs: string[] }`, `Principle { text; annotation? }`, `ProseSection { heading: string; paragraphs: string[] }`, `SiteContent.footer { left: string; right?: string }`.

- [ ] **Step 1: Apply these type changes**

Replace the `RangeContent`, `Principle`, and `ProjectRow` definitions and the `footer` line; add `ProseSection`:

```ts
export type RangeContent = {
  headline: string;
  /** Two paragraphs; subhead and the altitude ladder were cut in the 2026-08 rewrite. */
  paragraphs: string[];
};

export type Principle = {
  text: string;
  /** Optional receipt line tying the claim to a project (DS5 Statement annotation). */
  annotation?: string;
};

/** A homepage prose section: heading + consecutive paragraphs (ProseBlock). */
export type ProseSection = { heading: string; paragraphs: string[] };

export type ProjectRow = {
  name: string;
  /** Present = card links to /projects/<slug> and shows READ →. */
  slug?: string;
  /** Drives StatusLabel; "launching" gets the tinted capsule. */
  state: "live" | "progress" | "launching";
  /** Badge text, e.g. "LIVE" or "LAUNCHING SEPT 2026". */
  status: string;
  /** 1–3 card body paragraphs. */
  body: string[];
  /** [scale, cost, what broke]; null = value unavailable, clause omitted (OPEN.md). Absent = no meta row at all. */
  meta?: (string | null)[];
};
```

In `SiteContent`, change `footer: { left: string; right: string };` to:

```ts
  /** right is absent while the changelog values are unfilled (OPEN.md). */
  footer: { left: string; right?: string };
```

- [ ] **Step 2: Typecheck** — expected to FAIL in `content/*.ts` consumers (fixed by Tasks 9–12).

### Task 9: site.ts — tagline, ledger, contact, footer

**Files:**
- Modify: `content/site.ts`

- [ ] **Step 1: Apply copy (all verbatim from the brief)**

Set both `tagline` and `masthead.lead` to:

> I run GTM at a B2B SaaS company and build agents for an audience of one, on the assumption they won't stay that way.

Replace `masthead.ledger` with:

```ts
    ledger: [
      { label: "ROLE", value: "Director, GTM Experts at Demandbase" },
      { label: "YEARS", value: "13 in revenue operations. 2 building things that run without me." },
      { label: "STATUS", value: "The agents are typing." },
    ],
```

Replace `contactHeadline` with:

> I answer email. Especially about GTM systems, agent architecture, or why your enrichment pipeline is quietly lying to you.

Replace the `footer` line with:

```ts
  footer: { left: "© 2026 Tom Keefe" },
```

Leave `mastheadVariant`, `column`, `techStrip`, `links`, `notFound` untouched. `app/layout.tsx` needs **no edit** — `description` and `openGraph.description` reference `site.tagline`; `og:title`/`<title>` stay unchanged per the brief.

### Task 10: range.ts — Boardroom body, ladder deleted

**Files:**
- Modify: `content/range.ts`

- [ ] **Step 1: Replace the whole export**

```ts
import type { RangeContent } from "./types";

export const range: RangeContent = {
  headline: "Boardroom to production query.",
  paragraphs: [
    "I've led marketing operations, architected revenue data, and now run a team of GTM Experts at Demandbase who use the product daily and push what breaks back into the roadmap. About half my week is spent embedded with Product, Data Science and Engineering, which is a polite way of saying I'm often the person who finds out the enrichment job stopped writing on a Tuesday and told nobody.",
    "Customer Zero by instinct: every workflow I recommend has already run against my own data. Several of them ran badly for a while first.",
  ],
};
```

The subhead and all five altitude entries are gone — confirmed decision, not optional.

### Task 11: principles.ts — six opinions + annotations

**Files:**
- Modify: `content/principles.ts`

- [ ] **Step 1: Replace the array (keep the trailing "cut in v2" comment block)**

```ts
export const principles: Principle[] = [
  { text: "Most GTM problems aren't strategy problems. They're plumbing problems nobody wants to own." },
  { text: "Buying another tool isn't a strategy. Wiring together the ones you have is." },
  {
    text: "If your team does it manually every week, that's not a process. It's a hostage situation.",
    annotation: "Inventory exists because I kept packing the same bag wrong.",
  },
  {
    text: "Build vs. buy is dead. It's build vs. wait.",
    annotation:
      "MarTech Intel took over a month of nights and runs for under ten dollars a month, indefinitely. The month was the cheap part.",
  },
  { text: "AI doesn't replace ops people. Ops people who build with AI replace vendor stacks." },
  { text: "The feature you're most excited about is usually the one to cut." },
];
```

### Task 12: agents.ts + wrong.ts (new prose sections) and projects.ts card rows

**Files:**
- Create: `content/agents.ts`
- Create: `content/wrong.ts`
- Modify: `content/projects.ts` (the `projects` array only; `projectDetails` untouched until Phase 2)

- [ ] **Step 1: content/agents.ts (copy verbatim)**

```ts
import type { ProseSection } from "./types";

export const agents: ProseSection = {
  heading: "Directed by a human. Built with agents.",
  paragraphs: [
    "Everything on this page was built with Claude Code doing the typing. That's a management problem, not a shortcut.",
    "The setup is a global config that encodes how I want things built: test-driven by default, Railway as the only deploy target, plan first when a task is ambiguous and start coding when it isn't, and batch every clarifying question into one message instead of interrupting me six separate times. Independent subtasks get dispatched to parallel agents. Verification runs before anything is called done, because \"done\" from a model is a claim, not a result.",
    "The part I'm actually proud of is smaller than any of that. Before every commit, the agent has to output one line naming a reusable skill it could extract from the work it just did, or explicitly state there wasn't one. Silence isn't a valid answer, and a hook enforces it. The effect is that the system gets marginally better at its own job every time I use it, without me having to remember to make it.",
    "The hard part was never the code. It was writing a spec tight enough that an agent could execute it unsupervised, then building the guardrails that catch it when the spec turned out to be wrong anyway.",
  ],
};
```

- [ ] **Step 2: content/wrong.ts (copy verbatim, B6 resolved inline)**

```ts
import type { ProseSection } from "./types";

export const wrong: ProseSection = {
  heading: "How I get things wrong.",
  paragraphs: [
    "I built a market intelligence tool and decided it should also produce slide decks. It could not produce slide decks. It produced objects shaped like slide decks. I spent the better part of a month on that before cutting it, and the tool only became useful the week I deleted the feature I'd been most excited about.",
    "I'm revisiting the idea now that Claude Design is available via API, which either means I was early or means I've learned nothing. One of those.",
  ],
};
```

- [ ] **Step 3: Replace the `projects` array in content/projects.ts (copy verbatim; nulls = omitted clauses per OPEN.md)**

```ts
export const projects: ProjectRow[] = [
  {
    name: "MarTech Intel",
    slug: "b2b-martech-intel",
    state: "live",
    status: "LIVE",
    body: [
      "A market intelligence function for a GTM org that doesn't have one. It watches B2B martech coverage, filters against the topics and specific companies I care about, and sends one digest email every morning. It also tracks how the narrative moves over weeks, not just what happened yesterday.",
    ],
    meta: [
      "63,731 articles ingested",
      "under $10/month to run",
      "took over a month, mostly because v1 also insisted on building slide decks",
    ],
  },
  {
    name: "Inventory",
    slug: "inventory",
    state: "live",
    status: "LIVE",
    // Intentionally three units where others are two (brief: do not compress).
    body: [
      "Started as a way to stop losing track of outdoor gear. It learns what I own by parsing my receipts and email, so buying a jacket is the same act as cataloguing one. From there it reads the forecast, talks to AllTrails, and answers over Telegram: what to pack for Saturday, what's missing, what to buy before I find out about it on the trail.",
      "Then I bought a camera I couldn't operate. Instead of working through tutorials I taught the same system to teach me, which is how Field Assistant became a module rather than a project: light, conditions, location and timing for a shoot.",
    ],
    // B5 (items catalogued) unfilled — first clause omitted, logged in OPEN.md.
    meta: [
      null,
      "under $20/month",
      "began life as a spreadsheet replacement and now has opinions about golden hour",
    ],
  },
  {
    name: "Life Tracker",
    state: "live",
    status: "LIVE",
    body: [
      "Spending and habits, tracked and then actually interpreted. Inventory reads my receipts to learn what I own; this one reads them to learn what I keep doing. Two systems parsing the same input for different reasons, which is a design I intend to fix and haven't.",
      "The only thing I've built that I open every day without deciding to.",
    ],
    // No meta row by decision: B1 + B2 deferred (OPEN.md). Do not pad.
  },
  {
    name: "Dynasty Analyzer",
    state: "launching",
    status: "LAUNCHING SEPT 2026",
    body: [
      "Trade evaluation, roster valuation and draft-capital modeling for Sleeper dynasty leagues. Built across one offseason so my league could stop arguing about whether a trade was fair and start losing that argument with numbers.",
      "Launching in September because that's when the arguing starts.",
    ],
    // B4 (leagues modeled) unfilled — middle clause omitted, logged in OPEN.md.
    meta: [
      "Free, and staying free",
      null,
      "built entirely in the offseason, which means it goes live having never been tested under real traffic",
    ],
  },
  {
    name: "tomkeefe.ai",
    state: "live",
    status: "LIVE",
    body: [
      "This site. Written, designed and deployed by agents under my direction. The footer isn't a joke.",
    ],
    // B7 wholly unfilled — third line dropped entirely rather than partial (OPEN.md).
  },
];
```

Life Tracker, Dynasty, and tomkeefe.ai get `slug` values in Phase 3 when their routes exist — until then their cards render unlinked (no dead links at any commit).

- [ ] **Step 4: Run tests**

Run: `npm run test`
Expected: PASS except the two Phase-2/3-dependent expectations noted in Task 7 all pass now (`projectDetails` untouched keeps the linked-card test green). If a test still fails, fix the content, not the test.

### Task 13: Component rewires — ProjectsList, Principles, Range, new sections, ContactBand

**Files:**
- Modify: `components/ProjectsList.tsx` (full rewrite)
- Modify: `components/Principles.tsx` (full rewrite)
- Modify: `components/Range.tsx` (full rewrite)
- Create: `components/AgentsSection.tsx`
- Create: `components/WrongSection.tsx`
- Modify: `components/ContactBand.tsx` (headline unchanged path; footer right conditional)

**Interfaces:**
- Consumes: `ProjectCard`, `ProseBlock`, `Statement` (Phase 0.5); `agents`/`wrong` content (Task 12).

- [ ] **Step 1: components/ProjectsList.tsx**

```tsx
import ProjectCard from "@/components/ProjectCard";
import ProseBlock from "@/components/ProseBlock";
import { projects } from "@/content/projects";

const intro = [
  "Four tools and this website. Three run in production with a user base of one, which is me, and one of them I open every single day. That's the point rather than the apology: I don't recommend a workflow I haven't already run against my own data for months.",
  "The fourth goes public in September, at which point I find out whether any of this survives contact with strangers.",
  "Each writeup covers the problem, the build, what it costs to run, and the part where it didn't work.",
];

export default function ProjectsList() {
  return (
    <section id="projects" className="pt-12">
      <h2 className="section-h2 max-w-[22ch]">Things I built instead of waiting for a vendor.</h2>
      <ProseBlock paragraphs={intro} className="mt-[18px]" />
      <div className="mt-[26px]" style={{ borderTop: "1px solid var(--ink)" }}>
        {projects.map((p) => (
          <ProjectCard
            key={p.name}
            name={p.name}
            state={p.state}
            status={p.status}
            body={p.body}
            meta={p.meta}
            href={p.slug ? `/projects/${p.slug}` : undefined}
          />
        ))}
      </div>
    </section>
  );
}
```

(`pt-12` because Projects is now the first section in `<main>`; Range hands its old top padding over — see Task 14.)

- [ ] **Step 2: components/Range.tsx**

```tsx
import ProseBlock from "@/components/ProseBlock";
import { range } from "@/content/range";

export default function Range() {
  return (
    <section id="range" className="mt-11">
      <h2 className="section-h2 max-w-[20ch]">{range.headline}</h2>
      <ProseBlock paragraphs={range.paragraphs} className="mt-[26px]" />
    </section>
  );
}
```

- [ ] **Step 3: components/AgentsSection.tsx**

```tsx
import ProseBlock from "@/components/ProseBlock";
import { agents } from "@/content/agents";

export default function AgentsSection() {
  return (
    <section id="agents" className="mt-11">
      <h2 className="section-h2 max-w-[24ch]">{agents.heading}</h2>
      <ProseBlock paragraphs={agents.paragraphs} className="mt-[26px]" />
    </section>
  );
}
```

- [ ] **Step 4: components/WrongSection.tsx**

```tsx
import ProseBlock from "@/components/ProseBlock";
import { wrong } from "@/content/wrong";

export default function WrongSection() {
  return (
    <section id="wrong" className="mt-11">
      <h2 className="section-h2 max-w-[24ch]">{wrong.heading}</h2>
      <ProseBlock paragraphs={wrong.paragraphs} className="mt-[26px]" />
    </section>
  );
}
```

- [ ] **Step 5: components/Principles.tsx**

```tsx
import Statement from "@/components/Statement";
import { principles } from "@/content/principles";

export default function Principles() {
  return (
    <section id="principles" className="mt-11 pb-2">
      <div className="pt-2">
        <h2 className="section-h2 max-w-[22ch]">Six opinions, held firmly.</h2>
        <p className="section-sub mb-[34px] max-w-[52ch]">Each one cost at least a quarter to learn.</p>
      </div>
      <div>
        {principles.map((p, i) => (
          <Statement
            key={p.text}
            index={String(i + 1).padStart(2, "0")}
            text={p.text}
            annotation={p.annotation}
            last={i === principles.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
```

(Heading and numbering are the plan defaults — swap in Tom's answers if different.)

- [ ] **Step 6: components/ContactBand.tsx — render footer.right only when present**

Replace the `<footer>` block's second span:

```tsx
          <span>{site.footer.left}</span>
          {site.footer.right ? <span>{site.footer.right}</span> : null}
```

No other change to ContactBand — headline markup already renders `site.contactHeadline`.

### Task 14: Homepage section order + skip link

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Reorder to the brief's sequence (hero → profile → marquee → projects → agents → boardroom → wrong → opinions → contact)**

```tsx
import Nav from "@/components/Nav";
import Masthead from "@/components/Masthead";
import TechStrip from "@/components/TechStrip";
import Range from "@/components/Range";
import ProjectsList from "@/components/ProjectsList";
import AgentsSection from "@/components/AgentsSection";
import WrongSection from "@/components/WrongSection";
import Principles from "@/components/Principles";
import ContactBand from "@/components/ContactBand";

export default function Home() {
  return (
    <>
      <a href="#projects" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <Masthead />
      <TechStrip />
      <main className="container-page flex-1">
        <ProjectsList />
        <AgentsSection />
        <Range />
        <WrongSection />
        <Principles />
      </main>
      <ContactBand />
    </>
  );
}
```

Skip link retargets to `#projects` because Projects is now the first content section (a11y consequence of the reorder, not a nav restructure). The Nav's "Overview → /#range" link is deliberately untouched — nav changes beyond the Projects dropdown are out of scope.

### Task 15: OPEN.md + Phase 1 verification + commit

**Files:**
- Create: `OPEN.md` (repo root)

- [ ] **Step 1: Write OPEN.md**

```markdown
# OPEN — clauses omitted for missing values (rewrite brief, 2026-08)

Per the brief's rule 1: unfilled values are never estimated or padded — the
clause is deleted and logged here. Restore each by editing the content module
listed.

- **B4 — Dynasty card meta** (`content/projects.ts`): "[B4 leagues] so far, all
  of them people I know" omitted. Meta row ships with 2 of 3 fragments.
- **B5 — Inventory card meta** (`content/projects.ts`): "[B5 items] catalogued"
  omitted. Meta row ships with 2 of 3 fragments.
- **B7 — tomkeefe.ai card meta** (`content/projects.ts`): all three values
  (sessions / API spend / rewrite count) unfilled — the entire third line is
  dropped rather than shipping a partial.
- **Footer changelog** (`content/site.ts`): "Last shipped: [month], [what]"
  unfilled — footer ships as "© 2026 Tom Keefe" alone.
- **B1/B2 — Life Tracker** (deferred by decision, not blocked): card ships
  body-only with no metadata row; /projects/life-tracker is an intentional
  stub. Restore target: before the Dynasty launch, September 2026.
- **MarTech detail page — "WHAT CHANGED" section** (`content/projects.ts`,
  removed in Phase 2): its body was a literal bracket placeholder awaiting a
  real outcome metric. Reinstate when the number exists.
```

- [ ] **Step 2: Full verification**

Run: `npm run test && npm run lint && npx tsc --noEmit && npm run build`
Expected: all pass, zero console errors in build output.

- [ ] **Step 3: Placeholder + duplication grep on rendered output**

```bash
grep -rEo "\[(B[0-9]|N\]|\\$X|month\]|what\])" .next/server/app/index.html || echo CLEAN
grep -c "DIRECTED BY A HUMAN" .next/server/app/index.html
```

Expected: `CLEAN`, and the heading count is `1` (section heading only — footer line removed). Also confirm the old tagline is gone: `grep -c "tooling underneath the number" .next/server/app/index.html` → `0` (grep exits 1).

- [ ] **Step 4: Skill-candidate line + commit**

```bash
git add -A
git commit -m "content: homepage rewrite — new tagline, 3-row ledger, unified project cards, agents + wrong sections, six opinions"
```

---

# Phase 2 — Existing detail pages (one commit)

### Task 16: ProjectDetail.meta + ProjectPage renders the card's stat block

**Files:**
- Modify: `content/types.ts` (ProjectDetail)
- Modify: `components/ProjectPage.tsx`
- Modify: `tests/content.test.ts` (extend)

**Interfaces:**
- Produces: `ProjectDetail.meta?: (string | null)[]` — the same array as the project's card row; rendered by `MetaRow` at the end of every detail page (brief Phase 2 §3).

- [ ] **Step 1: Add to `ProjectDetail` in types.ts**

```ts
  /** Same three-line stat block as the card (brief Phase 2 §3); null clauses omitted per OPEN.md. */
  meta?: (string | null)[];
```

- [ ] **Step 2: Render it in ProjectPage.tsx** — import `MetaRow`, then insert between the second-figure block and the footer-nav `div`:

```tsx
        {project.meta?.some(Boolean) && (
          <div className="mt-(--space-8)">
            <MetaRow items={project.meta} />
          </div>
        )}
```

- [ ] **Step 3: Extend the test suite** (inside `describe("project cards")` or a new describe):

```ts
describe("project details (Phase 2 alignment)", () => {
  it("detail meta matches the card meta for both live writeups", () => {
    for (const slug of ["b2b-martech-intel", "inventory"]) {
      const card = projects.find((p) => p.slug === slug)!;
      expect(getProjectDetail(slug).meta).toEqual(card.meta);
    }
  });

  it("MarTech no longer ships the bracketed WHAT CHANGED placeholder", () => {
    const martech = getProjectDetail("b2b-martech-intel");
    expect(martech.sections.some((s) => s.pending)).toBe(false);
    for (const s of martech.sections) {
      expect(s.body).not.toMatch(/[[\]]/);
    }
  });

  it("Inventory page carries the Field Assistant module and the camera story", () => {
    const inv = getProjectDetail("inventory");
    const fa = inv.sections.find((s) => s.heading === "THE CAMERA DETOUR");
    expect(fa?.body).toContain("Field Assistant");
    expect(fa?.body).toContain("Sony");
  });
});
```

Run: `npm run test` — expected FAIL (drives Task 17).

### Task 17: MarTech + Inventory detail records

**Files:**
- Modify: `content/projects.ts` (`projectDetails` array)

- [ ] **Step 1: MarTech entry edits**

1. `title`: `"MarTech Intel"` (aligns with the card; slug/route unchanged — the rename task B3 is separate and out of scope). Update `menuSubtitle` stays `"MARKET INTELLIGENCE · INTERNAL"`.
2. `premise` — align with card, expand not contradict:

```ts
    premise:
      "A market intelligence function for a GTM org that doesn't have one — filtered against the topics and companies I care about, delivered as one digest email every morning.",
```

3. **Delete the whole `WHAT CHANGED` section object** (`pending: true`, bracketed body) — logged in OPEN.md.
4. Append after `figures`:

```ts
    meta: [
      "63,731 articles ingested",
      "under $10/month to run",
      "took over a month, mostly because v1 also insisted on building slide decks",
    ],
```

5. In `WHAT I BUILT`, append one sentence tying to "How I get things wrong" (expansion, no new numbers):

```ts
        body: "A continuous ingest across news, GTM tech and AI sources that categorizes and tags every article, tracks named companies, and refreshes every twelve minutes. On top of the same corpus sit the things people actually asked for: briefings, trend analysis, an AI analyst, and drafting tools for thought leadership and field enablement. It also tracks how the narrative moves over weeks, not just what happened yesterday.",
```

- [ ] **Step 2: Inventory entry edits**

1. `premise` — align with the card's gear-first framing (B9 framing as the brief wrote it; amend here if Tom corrects it):

```ts
    premise:
      "Started as a way to stop losing track of outdoor gear: it learns what I own by parsing receipts and email, so buying a jacket is the same act as cataloguing one.",
```

2. Insert a new section between `WHAT I BUILT` and `WHY IT MATTERS AT WORK` — the Field Assistant module + Sony camera anecdote (a real content addition; intentionally longer than surrounding copy, and untouchable once written per the brief's do-not-touch list):

```ts
      {
        heading: "THE CAMERA DETOUR",
        body: "Then I bought a Sony camera I couldn't operate. The manual assumed I knew what aperture was for; the tutorials assumed I had evenings free. Instead of working through either, I taught the same system to teach me — which is how Field Assistant became a module rather than a project. It already knew my gear, my trails and my weekends from the ledger; now it reads light, conditions, location and timing for a shoot, and folds the answer into the same Telegram thread as the packing list. I still can't recite the exposure triangle. The camera comes home with usable photographs anyway, which was the actual requirement.",
      },
```

3. In `WHAT I BUILT`, prepend the outdoor-agent capability (expansion of existing copy, keeps 491 — an already-shipped site number, not an invented one):

```ts
        body: "An agent ingest that parses receipts and email into a single ledger — 491 items with brand, price, category, domain and type resolved automatically, and a review queue for anything it can't place confidently. From there it reads the forecast, talks to AllTrails, and answers over Telegram: what to pack for Saturday, what's missing, and what to buy before I find out about it on the trail.",
```

4. Append after `digestNote`:

```ts
    meta: [
      null,
      "under $20/month",
      "began life as a spreadsheet replacement and now has opinions about golden hour",
    ],
```

- [ ] **Step 3: Verify + commit**

Run: `npm run test && npx tsc --noEmit && npm run build`
Expected: all pass. Then grep both project HTML outputs for brackets:

```bash
grep -REo "\[(B[0-9]|Outcome pending)" .next/server/app/projects || echo CLEAN
```

Expected: `CLEAN`. Skill-candidate line, then:

```bash
git add -A
git commit -m "content: align MarTech + Inventory detail pages with new cards; add Field Assistant module story"
```

---

# Phase 3 — New routes (one commit)

### Task 18: Generalize ProjectPage for stubs

**Files:**
- Modify: `components/ProjectPage.tsx`
- Modify: `content/types.ts`

**Interfaces:**
- Produces: `ProjectPage({ slug: string })`; `ProjectDetail.launch?: true` (renders the launching badge in the header); `figures` may be empty for stubs.

- [ ] **Step 1: types.ts** — add to `ProjectDetail`:

```ts
  /** Renders the LAUNCHING SEPT 2026 capsule in the page header (Dynasty). */
  launch?: true;
```

- [ ] **Step 2: ProjectPage.tsx edits**

1. Prop type: `{ slug: string }` (was the two-slug union).
2. Import `StatusLabel`; in the header, after the `<p>` premise line, add:

```tsx
          {project.launch && (
            <div className="mt-[18px]">
              <StatusLabel state="launching">LAUNCHING SEPT 2026</StatusLabel>
            </div>
          )}
```

3. Guard the figure blocks (stubs have `figures: []`):

```tsx
        {project.figures[0] && (
          <div className="mt-(--section-gap)">
            <FigurePlate figure={project.figures[0]} />
          </div>
        )}
```

(The second-figure block is already conditional.)

### Task 19: Three stub detail records + next-chain + card slugs + tests

**Files:**
- Modify: `content/projects.ts`
- Modify: `tests/content.test.ts`

**Interfaces:**
- Produces detail records with slugs `life-tracker`, `dynasty-analyzer`, `tomkeefe-ai`; `projectDetails` order = card order (the Nav dropdown maps this array, so 3.4 falls out automatically); next-chain: martech → inventory → life-tracker → dynasty-analyzer → tomkeefe-ai → martech.

- [ ] **Step 1: Update tests first** — in the details describe, replace the Phase-2 length assumptions and add:

```ts
  it("five detail records in card order; closed next-chain", () => {
    expect(projectDetails.map((d) => d.slug)).toEqual([
      "b2b-martech-intel", "inventory", "life-tracker", "dynasty-analyzer", "tomkeefe-ai",
    ]);
    expect(projectDetails.map((d) => d.number)).toEqual([
      "PROJECT 01", "PROJECT 02", "PROJECT 03", "PROJECT 04", "PROJECT 05",
    ]);
    const slugs = projectDetails.map((d) => d.slug);
    projectDetails.forEach((d, i) => {
      expect(d.next.slug).toBe(slugs[(i + 1) % slugs.length]);
    });
  });

  it("all five cards are linked once routes exist", () => {
    expect(projects.every((p) => p.slug)).toBe(true);
  });

  it("stubs are honest: no invented narrative, no brackets, no figures", () => {
    for (const slug of ["life-tracker", "dynasty-analyzer", "tomkeefe-ai"]) {
      const d = getProjectDetail(slug);
      expect(d.figures).toHaveLength(0);
      for (const s of d.sections) {
        expect(s.body).not.toMatch(/[[\]]/);
      }
    }
    expect(getProjectDetail("dynasty-analyzer").launch).toBe(true);
  });
```

Also loosen the old `facts` `toHaveLength(5)` style assertions to apply only to the two full writeups. Run `npm run test` — expected FAIL.

- [ ] **Step 2: Add slugs to the three card rows** in the `projects` array: `slug: "life-tracker"`, `slug: "dynasty-analyzer"`, `slug: "tomkeefe-ai"`.

- [ ] **Step 3: Append three stub records to `projectDetails`** (bodies reuse card copy — the brief forbids inventing problem/build/cost narratives; section headings are the only new scaffolding). Update the two existing records' `next` pointers per the chain above.

```ts
  // Stub by decision (B1/B2 deferred) — card body + short intro only (OPEN.md).
  {
    slug: "life-tracker",
    number: "PROJECT 03",
    title: "Life Tracker",
    menuSubtitle: "SPEND + HABITS · LIVE",
    premise:
      "Spending and habits, tracked and then actually interpreted — the only thing I've built that I open every day without deciding to.",
    sections: [
      {
        heading: "THE SHORT VERSION",
        body: "Inventory reads my receipts to learn what I own; this one reads them to learn what I keep doing. Two systems parsing the same input for different reasons, which is a design I intend to fix and haven't. The full writeup lands when the tool's own findings are ready to publish.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Built and operated" },
      { label: "STATUS", value: "Live, personal" },
    ],
    figures: [],
    next: { slug: "dynasty-analyzer" },
  },
  // Stub gated on B4 — card body + launch marker only.
  {
    slug: "dynasty-analyzer",
    number: "PROJECT 04",
    title: "Dynasty Analyzer",
    menuSubtitle: "SLEEPER ANALYTICS · SEPT 2026",
    launch: true,
    premise:
      "Trade evaluation, roster valuation and draft-capital modeling for Sleeper dynasty leagues.",
    sections: [
      {
        heading: "THE SHORT VERSION",
        body: "Built across one offseason so my league could stop arguing about whether a trade was fair and start losing that argument with numbers. Launching in September because that's when the arguing starts.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Built and operated" },
      { label: "PRICE", value: "Free, and staying free" },
      { label: "STATUS", value: "Launching Sept 2026" },
    ],
    figures: [],
    meta: [
      "Free, and staying free",
      null,
      "built entirely in the offseason, which means it goes live having never been tested under real traffic",
    ],
    next: { slug: "tomkeefe-ai" },
  },
  // Stub pending B7 — card body + short intro only.
  {
    slug: "tomkeefe-ai",
    number: "PROJECT 05",
    title: "tomkeefe.ai",
    menuSubtitle: "THIS SITE · LIVE",
    premise: "This site. Written, designed and deployed by agents under my direction.",
    sections: [
      {
        heading: "THE SHORT VERSION",
        body: "The footer isn't a joke: every page here was built with Claude Code doing the typing, under the working agreement described on the homepage — Directed by a human. Built with agents.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Directed" },
      { label: "STATUS", value: "Live" },
    ],
    figures: [],
    next: { slug: "b2b-martech-intel" },
  },
```

And in the existing records: martech `next: { slug: "inventory" }` (unchanged), inventory `next: { slug: "life-tracker" }` (was `b2b-martech-intel`).

- [ ] **Step 4: Run tests** — `npm run test` → PASS.

### Task 20: Route files + final verification + commit

**Files:**
- Create: `app/projects/life-tracker/page.tsx`
- Create: `app/projects/dynasty-analyzer/page.tsx`
- Create: `app/projects/tomkeefe-ai/page.tsx`

- [ ] **Step 1: Each route follows the existing one-liner pattern** (shown for life-tracker; repeat with the slug swapped for the other two):

```tsx
import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";
import { getProjectDetail } from "@/content/projects";

const project = getProjectDetail("life-tracker");

export const metadata: Metadata = {
  title: `${project.title} — Tom Keefe`,
  description: project.premise,
  alternates: { canonical: "/projects/life-tracker" },
  openGraph: {
    title: `${project.title} — Tom Keefe`,
    description: project.premise,
    url: "/projects/life-tracker",
    type: "website",
  },
};

export default function Page() {
  return <ProjectPage slug="life-tracker" />;
}
```

(New routes inherit the root OG image — no new PNGs; existing OG logic untouched.)

- [ ] **Step 2: Append to OPEN.md**

```markdown
- **Stub routes** (`/projects/life-tracker`, `/projects/dynasty-analyzer`,
  `/projects/tomkeefe-ai`): intentionally incomplete — card copy + short intro
  only, no invented narratives. Life Tracker awaits B1/B2; Dynasty awaits B4;
  tomkeefe.ai awaits B7.
```

- [ ] **Step 3: Full acceptance run**

```bash
npm run test && npm run lint && npx tsc --noEmit && npm run build
grep -rEo "\[(B[0-9]|N\]|month\]|what\])" .next/server/app --include="*.html" || echo CLEAN
grep -rc "DIRECTED BY A HUMAN" .next/server/app/index.html
grep -rn "tooling underneath the number" .next/server/app --include="*.html" || echo TAGLINE-GONE
grep -rn "Field Assistant" .next/server/app/index.html
```

Expected: all green; `CLEAN`; heading count 1; `TAGLINE-GONE`; Field Assistant appears only inside the Inventory card body (as a module mention, not a card). Then start `npm run dev` and click through `/`, all five project routes, and the Nav dropdown (five entries, card order) — zero console errors.

- [ ] **Step 4: Skill-candidate line + commit**

```bash
git add -A
git commit -m "feat: stub routes for Life Tracker, Dynasty Analyzer and tomkeefe.ai; five-entry projects dropdown"
```

**CHECKPOINT: report acceptance-criteria results to Tom. Do not deploy.**

---

## Acceptance criteria (from the brief — verify all before reporting complete)

- [ ] Zero literal `[` placeholders in rendered output (grep `.next` HTML, not just source)
- [ ] `OPEN.md` exists listing every omitted clause
- [ ] Old tagline in zero locations (hero + 4 meta fields all source from the two edited literals)
- [ ] "DIRECTED BY A HUMAN. BUILT WITH AGENTS." exactly once (section heading; footer line removed)
- [ ] Five cards, order: MarTech Intel, Inventory, Life Tracker, Dynasty Analyzer, tomkeefe.ai
- [ ] No Field Assistant card; no Field Assistant route needed (verified — none exists)
- [ ] Altitude ladder gone; its rendering removed from `Range.tsx`, data removed from `content/range.ts`
- [ ] No token/color/font file modified; Phase 0.5 commit shows only the five new component files
- [ ] Local build passes; no console errors on `/` or any project route
- [ ] Redirects: none required (Field Assistant routeless; rename task deferred) — nothing to verify beyond absence
