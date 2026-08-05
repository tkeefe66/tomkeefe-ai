import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { site } from "@/content/site";
import { range } from "@/content/range";
import { principles } from "@/content/principles";
import { agents } from "@/content/agents";
import { wrong } from "@/content/wrong";
import { projects, projectDetails, projectsIntro, getProjectDetail } from "@/content/projects";

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

  it("linked cards resolve to detail records", () => {
    const slugs = new Set(projectDetails.map((d) => d.slug));
    for (const p of projects.filter((p) => p.slug)) {
      expect(slugs.has(p.slug!)).toBe(true);
    }
    for (const d of projectDetails) expect(slugs.has(d.next.slug)).toBe(true);
    expect(getProjectDetail("inventory").title).toBeTruthy();
  });
});

describe("project details (Phase 2 alignment)", () => {
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

  it("every project card slug has a route file", () => {
    for (const p of projects) {
      if (!p.slug) continue;
      const routePath = path.join(process.cwd(), "app", "projects", p.slug, "page.tsx");
      expect(fs.existsSync(routePath)).toBe(true);
    }
  });

  it("no literal brackets anywhere across all detail records", () => {
    for (const d of projectDetails) {
      expectNoBrackets(d.premise);
      expectNoBrackets(d.menuSubtitle);
      for (const s of d.sections) {
        expectNoBrackets(s.heading);
        expectNoBrackets(s.body);
      }
      for (const f of d.facts) {
        expectNoBrackets(f.value);
      }
      (d.meta ?? []).filter((m): m is string => Boolean(m)).forEach(expectNoBrackets);
    }
  });

  it("full writeups (b2b-martech-intel, inventory) meet writeup invariants", () => {
    for (const slug of ["b2b-martech-intel", "inventory"]) {
      const d = getProjectDetail(slug);
      expect(d.figures.length).toBeGreaterThanOrEqual(1);
      expect(d.premise.length).toBeGreaterThan(40);
      expect(d.sections.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("projects intro copy", () => {
  it("three paragraphs, bracket-free, opens with the framing line", () => {
    expect(projectsIntro).toHaveLength(3);
    projectsIntro.forEach(expectNoBrackets);
    expect(projectsIntro[0]).toContain("Four tools and this website");
  });
});
