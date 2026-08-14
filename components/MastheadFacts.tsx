import type { LedgerRow } from "@/content/types";

// The fact table is always open, at every width. Design v3 README §Components
// — FactTable collapses it behind a mono PROFILE disclosure at ≤700px; that
// was overridden by decision (2026-08-14) because the ledger is the masthead's
// substance on mobile, not an optional detail.
export default function MastheadFacts({ rows }: { rows: LedgerRow[] }) {
  return (
    <div className="border-t border-white/50">
      {rows.map((row) => (
        <div key={row.label} className="fact-row">
          <span className="text-white/60">{row.label}</span>
          <span>{row.value}</span>
        </div>
      ))}
    </div>
  );
}
