import { describe, it, expect } from "vitest";
import { site } from "@/content/site";
import { range } from "@/content/range";
import { principles } from "@/content/principles";
import { projects, projectDetails, getProjectDetail } from "@/content/projects";

describe("site content", () => {
  it("has identity and masthead", () => {
    expect(site.name).toBe("Tom Keefe");
    expect(site.masthead.lead.length).toBeGreaterThan(40);
    expect(site.masthead.ledger).toHaveLength(5);
    for (const row of site.masthead.ledger) {
      expect(row.label).toMatch(/^[A-Z ]+$/);
      expect(row.value).toBeTruthy();
    }
    expect(site.masthead.column.headline).toBeTruthy();
    expect(["ledger", "column"]).toContain(site.mastheadVariant);
  });

  it("has tech strip, links, contact and footer", () => {
    expect(site.techStrip.length).toBeGreaterThanOrEqual(10);
    expect(site.links).toHaveLength(3);
    expect(site.links.map((l) => l.label)).toEqual(["EMAIL", "LINKEDIN", "GITHUB"]);
    expect(site.contactHeadline).toContain("Friday afternoon");
    expect(site.footer.left).toContain("TOM KEEFE");
    expect(site.footer.right).toBe("DIRECTED BY A HUMAN. BUILT WITH AGENTS.");
  });
});

describe("range", () => {
  it("has headline and exactly 5 altitudes", () => {
    expect(range.headline).toBe("Boardroom to production query.");
    expect(range.altitudes).toHaveLength(5);
    expect(range.altitudes.map((a) => a.label)).toEqual([
      "C-SUITE", "LEADERSHIP", "PROGRAM", "SYSTEM", "MACHINE",
    ]);
  });
});

describe("principles", () => {
  it("ships exactly 5", () => {
    expect(principles).toHaveLength(5);
    for (const p of principles) expect(p.text.length).toBeGreaterThan(20);
  });
});

describe("projects", () => {
  it("lists 5 rows, exactly 2 linked", () => {
    expect(projects).toHaveLength(5);
    const linked = projects.filter((p) => p.slug);
    expect(linked.map((p) => p.slug)).toEqual(["b2b-martech-intel", "inventory"]);
    for (const p of projects.filter((p) => !p.slug)) {
      expect(["IN PROGRESS", "LIVE"]).toContain(p.status);
    }
  });

  it("has complete detail records for both linked projects", () => {
    expect(projectDetails).toHaveLength(2);
    for (const d of projectDetails) {
      expect(d.title).toBeTruthy();
      expect(d.number).toMatch(/^PROJECT 0[12]$/);
      expect(d.premise.length).toBeGreaterThan(40);
      expect(d.sections.length).toBeGreaterThanOrEqual(3);
      expect(d.facts).toHaveLength(5);
      expect(d.figures.length).toBeGreaterThanOrEqual(1);
      expect(d.next.slug).not.toBe(d.slug);
    }
    const martech = getProjectDetail("b2b-martech-intel");
    expect(martech.sections.find((s) => s.pending)?.heading).toBe("WHAT CHANGED");
    expect(getProjectDetail("inventory").figures).toHaveLength(2);
  });
});
