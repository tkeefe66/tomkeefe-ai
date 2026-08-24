import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { isExternalHref } from "@/components/ExternalLink";
import { site } from "@/content/site";

describe("isExternalHref", () => {
  it("flags absolute http(s) URLs", () => {
    expect(isExternalHref("https://github.com/tkeefe66")).toBe(true);
    expect(isExternalHref("http://example.com")).toBe(true);
  });

  it("does not flag internal paths, anchors, or non-navigating schemes", () => {
    expect(isExternalHref("/projects/inventory")).toBe(false);
    expect(isExternalHref("/#projects")).toBe(false);
    expect(isExternalHref("#")).toBe(false);
    expect(isExternalHref("mailto:tkeefe66@gmail.com")).toBe(false);
  });

  it("matches the real site.links data — only LINKEDIN and GITHUB are external", () => {
    const external = site.links.filter((l) => isExternalHref(l.href)).map((l) => l.label);
    expect(external).toEqual(["LINKEDIN", "GITHUB"]);
  });
});

describe("external link discipline", () => {
  it("no component renders a raw <a> tag — everything routes through ExternalLink", () => {
    const componentsDir = path.join(process.cwd(), "components");
    const offenders: string[] = [];
    for (const file of fs.readdirSync(componentsDir)) {
      if (!file.endsWith(".tsx") || file === "ExternalLink.tsx") continue;
      const src = fs.readFileSync(path.join(componentsDir, file), "utf8");
      if (/<a[\s>]/.test(src)) offenders.push(file);
    }
    expect(offenders).toEqual([]);
  });
});
