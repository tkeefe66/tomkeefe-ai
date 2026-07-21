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
