"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import type { SiteLink } from "@/content/types";
import { projectDetails } from "@/content/projects";
import ThemeToggle from "@/components/ThemeToggle";

function requireEmailLink(): SiteLink {
  const found = site.links.find((l) => l.label === "EMAIL");
  if (!found) throw new Error("site.links must include an EMAIL link");
  return found;
}

const email = requireEmailLink();

export default function Nav() {
  // Dropdown opens on hover AND click — hover-only was unusable on touch
  // (design v3 README §Components — SiteNav).
  const [dropOpen, setDropOpen] = useState(false);
  // ≤760px the links leave the bar for a panel behind the MENU button.
  const [panelOpen, setPanelOpen] = useState(false);

  const closeAll = () => {
    setDropOpen(false);
    setPanelOpen(false);
  };

  // Document-level so Escape also closes a hover-opened menu with no
  // focus inside the wrapper (wrapper onKeyDown never fires in that case).
  useEffect(() => {
    if (!dropOpen && !panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dropOpen, panelOpen]);

  return (
    <nav className="band sticky top-0 z-40" aria-label="Main">
      <div className="container-page flex h-14 items-center justify-between gap-6">
        {/* Wordmark is the monogram — the masthead already says the name in
            full one line below it. aria-label keeps the link readable. */}
        <Link
          href="/"
          aria-label="Tom Keefe — home"
          className="text-[15px] font-semibold tracking-[0.02em] text-white"
        >
          TK
        </Link>
        <div className="flex items-center gap-1">
          <div id="site-nav-links" className="nav-links" data-open={panelOpen ? "true" : "false"}>
            <Link href="/#range" className="nav-link" onClick={closeAll}>
              Overview
            </Link>
            {/* Hover-open only for real mice — touch taps emulate mouseenter,
                which would open-then-toggle-closed on the same tap. */}
            <div
              className="relative max-[760px]:static"
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setDropOpen(true);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setDropOpen(false);
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setDropOpen(false);
              }}
            >
              <button
                type="button"
                className="nav-link cursor-pointer border-0 bg-transparent"
                aria-expanded={dropOpen}
                aria-haspopup="true"
                onClick={() => setDropOpen((v) => !v)}
              >
                Projects <span style={{ color: "var(--acc-soft)" }}>▾</span>
              </button>
              {dropOpen && (
                <div
                  className="absolute right-0 top-full min-w-[268px] rounded p-1.5 max-[760px]:static max-[760px]:mt-1 max-[760px]:min-w-0"
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--hair)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
                  }}
                >
                  {projectDetails.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      onClick={closeAll}
                      className="block rounded-[3px] px-3 py-2.5 hover:bg-(--tint) hover:text-(--acc)"
                      style={{ color: "var(--ink)" }}
                    >
                      <span className="block text-sm font-semibold tracking-[-0.02em]">
                        {p.title}
                      </span>
                      <span
                        className="mono mt-0.5 block text-[10.5px] tracking-[0.06em]"
                        style={{ color: "var(--faint)" }}
                      >
                        {p.menuSubtitle}
                      </span>
                    </Link>
                  ))}
                  <div className="mx-3 my-1 h-px" style={{ background: "var(--hair)" }} />
                  <Link
                    href="/#projects"
                    onClick={closeAll}
                    className="mono block rounded-[3px] px-3 py-2 text-[10.5px] tracking-[0.08em] hover:bg-(--tint) hover:text-(--acc)"
                    style={{ color: "var(--muted)" }}
                  >
                    All projects →
                  </Link>
                </div>
              )}
            </div>
            <Link href="/#principles" className="nav-link" onClick={closeAll}>
              Principles
            </Link>
            <Link href="/#contact" className="nav-link" onClick={closeAll}>
              Contact
            </Link>
          </div>
          <ThemeToggle />
          <a
            href={email.href}
            className="mono ml-2 rounded-[3px] bg-white px-3.5 py-2 text-[11px] font-medium tracking-[0.08em]"
            style={{ color: "var(--acc-deep)" }}
          >
            Email
          </a>
          <button
            type="button"
            className="nav-toggle nav-link ml-1 cursor-pointer bg-transparent"
            style={{ border: "1px solid rgba(255,255,255,0.36)" }}
            aria-expanded={panelOpen}
            aria-controls="site-nav-links"
            onClick={() => setPanelOpen((v) => !v)}
          >
            {panelOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </nav>
  );
}
