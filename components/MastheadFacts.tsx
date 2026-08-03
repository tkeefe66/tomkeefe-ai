"use client";

import { useState } from "react";
import type { LedgerRow } from "@/content/types";

// The masthead fact table starts closed behind a mono disclosure line at
// ≤700px (design v3 README §Components — FactTable). Visibility is owned by
// CSS (.facts-toggle / .facts-rows in globals.css), never inline styles —
// above the breakpoint the toggle is display:none and rows always render.
export default function MastheadFacts({ rows }: { rows: LedgerRow[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/50">
      <button
        type="button"
        className="facts-toggle mono cursor-pointer border-0 bg-transparent p-0 py-[11px] text-[11.5px] uppercase"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {/* Assumed summary label — the spec names the prop but not the copy */}
        <span className="text-white/60">Profile</span>
        <span
          aria-hidden
          className={`transition-transform duration-[160ms] ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--acc-soft)" }}
        >
          ▾
        </span>
      </button>
      <div className="facts-rows" data-open={open ? "true" : "false"}>
        {rows.map((row) => (
          <div key={row.label} className="fact-row">
            <span className="text-white/60">{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
