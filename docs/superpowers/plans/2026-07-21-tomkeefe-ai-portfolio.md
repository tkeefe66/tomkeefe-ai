# tomkeefe.ai Portfolio v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a single-page, bold/high-contrast portfolio site for Tom Keefe (GTM Engineer) with placeholder-aware content, deployed on Railway.

**Architecture:** Next.js App Router serving one composed page at `/`. Typed content files in `content/` are the single source of truth for all copy; section components in `components/` render them. One vitest suite validates content shape.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS 4, vitest, Railway.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-21-tomkeefe-ai-portfolio-design.md` — read it before starting any task.
- All user-visible copy comes from `content/*.ts` — never hardcode copy in components.
- Placeholder stats render in the literal form `[X]+` etc.; principles with `draft: true` must show a visible "draft" tag.
- Visual direction: near-black background, off-white type, ONE electric accent color, oversized stat numerals, tight grid, responsive. Use the `impeccable` or `frontend-design:frontend-design` skill for the visual build — must not look like a default Tailwind template.
- Voice: confident & direct.
- Node project; repo root is the Next.js app root.
- Commit at the end of every task with the trailer: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

---

### Task 1: Scaffold Next.js app

**Files:**
- Create: entire Next.js scaffold at repo root (`app/`, `package.json`, `tsconfig.json`, etc.)
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: runnable `npm run dev` / `npm run build` / `npm test` project; later tasks add files into `app/`, `components/`, `content/`.

- [ ] **Step 1: Scaffold into the existing repo root**

The repo root already contains `docs/` and `.git`. Run:

```bash
npx --yes create-next-app@latest . --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
```

If it refuses because the directory is non-empty, scaffold to a temp dir and move everything in (do not overwrite `docs/` or `.git`):

```bash
npx --yes create-next-app@latest /tmp/tk-scaffold --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
rsync -a --ignore-existing /tmp/tk-scaffold/ ./
```

- [ ] **Step 2: Add vitest**

```bash
npm install -D vitest
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { include: ["tests/**/*.test.ts"] },
});
```

Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 3: Verify build runs**

Run: `npm run build`
Expected: successful production build of the default scaffold page.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app with Tailwind and vitest"
```

---

### Task 2: Content layer (TDD)

**Files:**
- Create: `content/types.ts`, `content/site.ts`, `content/principles.ts`, `content/projects.ts`, `content/stats.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces (consumed by Task 3 components — exact names):
  - `content/types.ts`: `Stat`, `Principle`, `Project`, `ProjectStatus`, `SkillCategory`, `SiteContent`
  - `content/site.ts`: `export const site: SiteContent`
  - `content/principles.ts`: `export const principles: Principle[]`
  - `content/projects.ts`: `export const projects: Project[]`
  - `content/stats.ts`: `export const stats: Stat[]`

- [ ] **Step 1: Write the failing test**

Create `tests/content.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { site } from "@/content/site";
import { principles } from "@/content/principles";
import { projects } from "@/content/projects";
import { stats } from "@/content/stats";

describe("content shape", () => {
  it("site has required fields", () => {
    expect(site.name).toBeTruthy();
    expect(site.tagline).toBeTruthy();
    expect(site.credential).toBeTruthy();
    expect(site.about.bio).toBeTruthy();
    expect(site.skills.length).toBeGreaterThanOrEqual(4);
    for (const s of site.skills) {
      expect(s.title).toBeTruthy();
      expect(s.items.length).toBeGreaterThan(0);
    }
    expect(site.contact.length).toBeGreaterThanOrEqual(3);
    for (const c of site.contact) {
      expect(c.label).toBeTruthy();
      expect(typeof c.href).toBe("string");
    }
  });

  it("has exactly 8 principles, all non-empty", () => {
    expect(principles).toHaveLength(8);
    for (const p of principles) {
      expect(p.text.length).toBeGreaterThan(10);
      expect(typeof p.draft).toBe("boolean");
    }
  });

  it("has exactly 5 projects with valid fields", () => {
    expect(projects).toHaveLength(5);
    for (const p of projects) {
      expect(p.name).toBeTruthy();
      expect(p.description.length).toBeGreaterThan(10);
      expect(p.stack.length).toBeGreaterThan(0);
      expect(["Live", "In development", "Internal"]).toContain(p.status);
    }
  });

  it("has 4 stats, placeholders flagged", () => {
    expect(stats).toHaveLength(4);
    for (const s of stats) {
      expect(s.value).toBeTruthy();
      expect(s.label).toBeTruthy();
      if (s.placeholder) expect(s.value).toContain("[X]");
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/content/site`.

- [ ] **Step 3: Implement content files**

`content/types.ts`:

```ts
export type Stat = { value: string; label: string; placeholder: boolean };

export type Principle = { text: string; draft: boolean };

export type ProjectStatus = "Live" | "In development" | "Internal";

export type Project = {
  name: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  link?: string;
  flagship?: boolean;
};

export type SkillCategory = { title: string; items: string[] };

export type ContactLink = { label: string; href: string; comingSoon?: boolean };

export type SiteContent = {
  name: string;
  domain: string;
  tagline: string;
  taglineAlternates: string[];
  credential: string;
  about: { bio: string };
  skills: SkillCategory[];
  contact: ContactLink[];
};
```

`content/site.ts`:

```ts
import type { SiteContent } from "./types";

export const site: SiteContent = {
  name: "Tom Keefe",
  domain: "tomkeefe.ai",
  tagline: "GTM runs on systems. I build them.",
  // Alternates Tom can swap in:
  taglineAlternates: [
    "I automate the work GTM teams shouldn't do by hand.",
    "I build the systems that make GTM teams move faster.",
  ],
  credential: "Director of GTM Experts @ Demandbase",
  about: {
    bio: "GTM engineer and ops builder. I spend my days making go-to-market teams faster with systems, data, and AI agents — and my nights building apps for the things I care about. [PLACEHOLDER BIO — replace with Tom's real bio.]",
  },
  skills: [
    { title: "GTM Automation", items: ["Workflow design", "Process automation", "Playbook systems"] },
    { title: "Data & Enrichment", items: ["Account data", "Signal pipelines", "SQL"] },
    { title: "AI Agents", items: ["Claude Code", "Agent workflows", "LLM integrations"] },
    { title: "RevOps Tooling", items: ["CRM systems", "Routing & territories", "Reporting"] },
  ],
  contact: [
    { label: "LinkedIn", href: "#", comingSoon: true },
    { label: "Email", href: "#", comingSoon: true },
    { label: "GitHub", href: "#", comingSoon: true },
  ],
};
```

`content/principles.ts`:

```ts
import type { Principle } from "./types";

// All draft:true until Tom approves/edits each. Flip to false as approved.
export const principles: Principle[] = [
  { text: "Most GTM problems aren't strategy problems. They're plumbing problems nobody wants to own.", draft: true },
  { text: "Buying another tool isn't a strategy. Wiring together the ones you have is.", draft: true },
  { text: "If your team does it manually every week, that's not a process. It's a hostage situation.", draft: true },
  { text: "Speed to answer beats depth of analysis. A directionally right number today moves the deal.", draft: true },
  { text: "Every recurring report should become an automation. Every automation should have an owner.", draft: true },
  { text: "Territory fights, routing rules, attribution debates — data problems wearing political costumes.", draft: true },
  { text: "Build vs. buy is dead. It's build vs. wait.", draft: true },
  { text: "AI doesn't replace ops people. Ops people who build with AI replace vendor stacks.", draft: true },
];
```

`content/projects.ts`:

```ts
import type { Project } from "./types";

// Descriptions and stacks are placeholders until Tom supplies details.
export const projects: Project[] = [
  {
    name: "B2B News Source",
    description: "AI-curated B2B news and account-signal digest for GTM teams. [PLACEHOLDER — confirm description]",
    stack: ["TBC"],
    status: "Internal",
  },
  {
    name: "Outdoors & Photography Assistant",
    description: "Personal AI assistant for planning outdoor trips and photography — conditions, locations, timing. [PLACEHOLDER — confirm description]",
    stack: ["TBC"],
    status: "In development",
  },
  {
    name: "Sleeper Dynasty Analyzer",
    description: "Analytics for Sleeper dynasty fantasy football leagues — trades, roster value, draft capital. [PLACEHOLDER — confirm description]",
    stack: ["TBC"],
    status: "In development",
  },
  {
    name: "Life Focus Tracker",
    description: "Personal focus and goals tracker. [PLACEHOLDER — confirm description]",
    stack: ["TBC"],
    status: "In development",
  },
  {
    name: "This Site",
    description: "tomkeefe.ai — designed, written, and deployed by AI agents under my direction.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Railway"],
    status: "Live",
  },
];
```

`content/stats.ts`:

```ts
import type { Stat } from "./types";

// placeholder:true renders obviously-unfinished values on purpose. Replace value and set placeholder:false when real numbers exist.
export const stats: Stat[] = [
  { value: "[X]+", label: "workflows automated", placeholder: true },
  { value: "[X]", label: "hrs/week automated away", placeholder: true },
  { value: "[X]", label: "apps shipped", placeholder: true },
  { value: "[X]", label: "years in GTM", placeholder: true },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add content tests
git commit -m "feat: typed content layer with shape tests"
```

---

### Task 3: Page sections and visual design

**Files:**
- Create: `components/Nav.tsx`, `components/Hero.tsx`, `components/StatBanner.tsx`, `components/Principles.tsx`, `components/Projects.tsx`, `components/About.tsx`, `components/Contact.tsx`, `components/Footer.tsx`
- Modify: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`

**Interfaces:**
- Consumes: `site`, `principles`, `projects`, `stats` exports from Task 2 (exact shapes in `content/types.ts`).
- Produces: complete rendered page at `/`.

- [ ] **Step 1: Load the design skill**

Invoke `impeccable` (or `frontend-design:frontend-design`) before writing any component markup. Follow its guidance for the whole task.

- [ ] **Step 2: Build the page**

Requirements (all copy from content files, zero hardcoded copy):

- `app/layout.tsx`: metadata (title `Tom Keefe — GTM Engineer`, description from `site.tagline`), font setup. Choose one distinctive display font (e.g. via `next/font/google`) for headlines + one for body; avoid the default Geist-only look.
- `Nav`: sticky top bar, anchor links Principles / Projects / About / Contact, name/wordmark left.
- `Hero`: full-viewport-height section. `site.tagline` as oversized display type (target ~clamp(3rem, 10vw, 7rem)), `site.credential` beneath. Photo slot: render nothing (clean layout) when no photo file exists.
- `StatBanner`: 4 stats in a horizontal band, oversized numerals; when `stat.placeholder` is true, render the value with muted/dashed styling so it reads as intentionally unfinished.
- `Principles` (`id="principles"`): numbered list (01–08) of large statements; when `draft: true`, render a small uppercase "DRAFT" tag beside the number.
- `Projects` (`id="projects"`): responsive card grid (1-col mobile, 2-col desktop); each card: name, status badge (`Live` green-ish accent, `In development` neutral, `Internal` muted), description, stack tags, link if present. Layout must tolerate a future `flagship: true` card spanning full width.
- `About` (`id="about"`): bio + 4 skill categories in a grid.
- `Contact` (`id="contact"`): big closing section; links with `comingSoon` render disabled/muted with a "soon" note.
- `Footer`: `© 2026 Tom Keefe` + "Built by AI agents, directed by a human." line.
- Visual system per Global Constraints: near-black bg, off-white type, ONE electric accent, tight grid, generous vertical rhythm, responsive, no horizontal scroll on mobile (375px).

- [ ] **Step 3: Verify**

Run: `npm run build` — expected: clean production build.
Run: `npm run dev` and fetch `http://localhost:3000` (curl) — expected: HTML contains the tagline, 8 principles, 5 project names.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: build single-page portfolio UI"
```

---

### Task 4: 404 page and metadata polish

**Files:**
- Create: `app/not-found.tsx`
- Modify: `app/layout.tsx` (OpenGraph metadata)

**Interfaces:**
- Consumes: `site` from `content/site.ts`.

- [ ] **Step 1: Create `app/not-found.tsx`**

Same visual system: oversized "404", line "This page doesn't exist. The systems do.", link back to `/`.

- [ ] **Step 2: Add OpenGraph/Twitter metadata to `app/layout.tsx`**

```ts
export const metadata: Metadata = {
  title: "Tom Keefe — GTM Engineer",
  description: "GTM runs on systems. I build them.",
  metadataBase: new URL("https://tomkeefe.ai"),
  openGraph: {
    title: "Tom Keefe — GTM Engineer",
    description: "GTM runs on systems. I build them.",
    url: "https://tomkeefe.ai",
    siteName: "Tom Keefe",
    type: "website",
  },
};
```

- [ ] **Step 3: Verify**

Run: `npm run build` — expected: clean build. Fetch `/nonexistent` in dev — expected: styled 404.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: 404 page and OpenGraph metadata"
```

---

### Task 5: Quality gate

**Files:** none new (fixes only).

- [ ] **Step 1: Run the full gate**

```bash
npx tsc --noEmit
npm run lint
npm test
npm run build
```

Expected: all pass with zero errors. Fix anything that fails, then re-run until green.

- [ ] **Step 2: Commit fixes (if any)**

```bash
git add -A
git commit -m "chore: pass typecheck, lint, tests, build"
```

---

### Task 6: Deploy to Railway

**Files:**
- Possibly create: none (Railway auto-detects Next.js via Railpack/Nixpacks).

- [ ] **Step 1: Load the railway-cli skill, then create project and deploy**

New Railway project `tomkeefe-ai`, single service `web`, deploy from repo root. Use Railway MCP tools or CLI per the skill.

- [ ] **Step 2: Generate a Railway domain**

Expected: a `*.up.railway.app` URL serving the site.

- [ ] **Step 3: Verify deployment**

Fetch the Railway URL — expected: 200, HTML contains "GTM runs on systems."

- [ ] **Step 4: Commit any config produced**

```bash
git add -A
git commit -m "chore: Railway deploy config"
```

(Custom domain tomkeefe.ai attached later, after purchase — not part of this plan.)
