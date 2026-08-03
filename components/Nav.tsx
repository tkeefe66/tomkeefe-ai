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
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  // Document-level so Escape also closes a hover-opened menu with no
  // focus inside the wrapper (wrapper onKeyDown never fires in that case).
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav className="band sticky top-0 z-40" aria-label="Main">
      <div className="container-page flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-[-0.022em] text-white"
        >
          Tom Keefe
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/#range" className="nav-link max-sm:hidden">
            Overview
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={close}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) close();
            }}
          >
            <Link
              href="/#projects"
              className="nav-link"
              aria-expanded={menuOpen}
              onFocus={() => setMenuOpen(true)}
              onClick={close}
            >
              Projects <span style={{ color: "var(--acc-soft)" }}>▾</span>
            </Link>
            {menuOpen && (
              <div
                className="absolute right-0 top-full min-w-[268px] rounded p-1.5"
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
                    onClick={close}
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
                  onClick={close}
                  className="mono block rounded-[3px] px-3 py-2 text-[10.5px] tracking-[0.08em] hover:bg-(--tint) hover:text-(--acc)"
                  style={{ color: "var(--muted)" }}
                >
                  All projects →
                </Link>
              </div>
            )}
          </div>
          <Link href="/#principles" className="nav-link max-sm:hidden">
            Principles
          </Link>
          <Link href="/#contact" className="nav-link max-sm:hidden">
            Contact
          </Link>
          <ThemeToggle />
          <a
            href={email.href}
            className="mono ml-2 rounded-[3px] bg-white px-3.5 py-2 text-[11px] font-medium tracking-[0.08em]"
            style={{ color: "var(--acc-deep)" }}
          >
            Email
          </a>
        </div>
      </div>
    </nav>
  );
}
