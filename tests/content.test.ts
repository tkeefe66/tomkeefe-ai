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

/** Cards are looked up by slug — card order changes as projects are added. */
function card(slug: string) {
  const found = projects.find((p) => p.slug === slug);
  if (!found) throw new Error(`no project card for slug ${slug}`);
  return found;
}

describe("site content", () => {
  it("has the new tagline in hero and meta source", () => {
    expect(site.name).toBe("Tom Keefe");
    expect(site.tagline).toContain("tired of waiting for");
    expect(site.masthead.lead).toBe(site.tagline);
  });

  it("ledger is three rows: ROLE, YEARS, STATUS", () => {
    expect(site.masthead.ledger.map((r) => r.label)).toEqual(["ROLE", "YEARS", "STATUS"]);
    expect(site.masthead.ledger[0].value).toBe("Director, GTM Experts at Demandbase");
    expect(site.masthead.ledger[2].value).toBe("The agents are typing");
  });

  it("has tech strip, links, contact and footer", () => {
    // 18 approved 2026-08-15 (docs/tech-strip-update.md). Trimming still NOT approved.
    expect(site.techStrip).toHaveLength(18);
    expect(site.links.map((l) => l.label)).toEqual(["EMAIL", "LINKEDIN", "GITHUB"]);
    expect(site.contactHeadline).toBe("Let's talk.");
    expect(site.contactLine).toContain("I answer email");
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
  it("ten cards in display order", () => {
    expect(projects.map((p) => p.name)).toEqual([
      "MarTech Intel", "Outdoor Inventory Mgmt", "Life Tracker", "Outdoor Telegram Agent",
      "Dynasty Analyzer", "tomkeefe.ai",
      "Camera Agent", "Job Search", "Family Tree", "Code Coach",
    ]);
  });

  it("every project reads LIVE (2026-08-14 decision)", () => {
    expect(projects.filter((p) => p.state === "live")).toHaveLength(projects.length);
    for (const p of projects) expect(p.status).toBe("LIVE");
  });

  // Keyed by slug, not index — the list is reordered as projects are added.
  it("Outdoor Inventory Mgmt is three units (2 paragraphs + meta); Life Tracker alone carries no meta row", () => {
    expect(card("inventory").body).toHaveLength(2);
    expect(card("inventory").meta?.filter(Boolean)).toHaveLength(3); // B5 filled: over 1,000 items
    expect(card("life-tracker").meta).toBeUndefined(); // B1/B2 deferred
    expect(card("tomkeefe-ai").meta?.filter(Boolean)).toHaveLength(2); // B7: cost fragment unfilled
    expect(card("b2b-martech-intel").meta?.filter(Boolean)).toHaveLength(3);
    expect(card("dynasty-analyzer").meta?.filter(Boolean)).toHaveLength(3); // B4 filled
  });

  it("every card carries one sentence short enough to sit on a line", () => {
    for (const p of projects) {
      expect(p.line.length).toBeGreaterThan(0);
      expect(p.line.length).toBeLessThanOrEqual(72);
      expect(p.line).toMatch(/\.$/);
    }
  });

  it("no literal placeholders anywhere in card copy", () => {
    for (const p of projects) {
      expectNoBrackets(p.name);
      expectNoBrackets(p.status);
      expectNoBrackets(p.line);
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
  it("detail records mirror card order, numbered in sequence, closed next-chain", () => {
    expect(projectDetails.map((d) => d.slug)).toEqual(projects.map((p) => p.slug));
    expect(projectDetails.map((d) => d.number)).toEqual(
      projectDetails.map((_, i) => `PROJECT ${String(i + 1).padStart(2, "0")}`),
    );
    const slugs = projectDetails.map((d) => d.slug);
    projectDetails.forEach((d, i) => {
      expect(d.next.slug).toBe(slugs[(i + 1) % slugs.length]);
    });
  });

  it("every card is linked", () => {
    expect(projects.every((p) => p.slug)).toBe(true);
  });

  it("stubs are honest: no invented narrative, no brackets, no figures", () => {
    // Life Tracker is off this list since FIG. 02 moved to it (2026-08-14).
    for (const slug of [
      "dynasty-analyzer", "tomkeefe-ai", "outdoor-telegram-agent",
      "camera-agent", "job-search", "family-tree", "code-coach",
    ]) {
      const d = getProjectDetail(slug);
      expect(d.figures).toHaveLength(0);
      for (const s of d.sections) {
        expect(s.body).not.toMatch(/[[\]]/);
      }
    }
    // No launch capsule anywhere — every project reads LIVE.
    expect(projectDetails.some((d) => d.launch)).toBe(false);
  });

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

  it("MarTech no longer ships the bracketed WHAT CHANGED placeholder", () => {
    const martech = getProjectDetail("b2b-martech-intel");
    for (const s of martech.sections) {
      expect(s.body).not.toMatch(/[[\]]/);
    }
  });

  it("the daily digest figure and its note live on Life Tracker, not Inventory", () => {
    const lt = getProjectDetail("life-tracker");
    expect(lt.figures).toHaveLength(1);
    expect(lt.figures[0].src).toBe("/projects/spend-digest.png");
    expect(lt.figures[0].caption).toContain("FIG. 01");
    expect(lt.digestNote).toBeDefined();
    const inv = getProjectDetail("inventory");
    expect(inv.figures.map((f) => f.src)).toEqual(["/projects/inventory.png"]);
    expect(inv.digestNote).toBeUndefined();
  });

  it("Inventory page carries the Field Assistant module and the camera story", () => {
    const inv = getProjectDetail("inventory");
    const fa = inv.sections.find((s) => s.heading === "THE CAMERA DETOUR");
    expect(fa?.body).toContain("Field Assistant");
    expect(fa?.body).toContain("Sony");
  });

  it("the dynamic [slug] route file exists", () => {
    const routePath = path.join(process.cwd(), "app", "projects", "[slug]", "page.tsx");
    expect(fs.existsSync(routePath)).toBe(true);
  });

  it("every project card slug resolves to a detail record via getProjectDetail", () => {
    for (const p of projects) {
      if (!p.slug) continue;
      expect(() => getProjectDetail(p.slug!)).not.toThrow();
    }
  });

  it("b2b-martech-intel and inventory carry an og image that exists on disk, with non-empty alt text", () => {
    for (const slug of ["b2b-martech-intel", "inventory"]) {
      const d = getProjectDetail(slug);
      expect(d.og).toBeDefined();
      const imagePath = path.join(process.cwd(), "public", d.og!.image);
      expect(fs.existsSync(imagePath)).toBe(true);
      expect(d.og!.alt.length).toBeGreaterThan(0);
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
