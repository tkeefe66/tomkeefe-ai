import React from "react";

/* Three states. LIVE is the loudest because it is the only one that is
   actionable; PROGRESS and LAUNCHING are both quieter than it by design.
   LAUNCHING carries a date and is the only state that gets a tinted capsule —
   it needs to be distinguishable from LIVE in the same row without competing
   with it, and a soft surface reads quieter than bare accent type at the same
   size. `tone` is retained for the non-state uses (PROJECT 01, READ →). */
export function StatusLabel({ children, tone = "faint", state }) {
  const tones = { accent: "var(--acc)", faint: "var(--faint)", muted: "var(--muted)", onField: "var(--acc-soft)" };
  const base = {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--size-caption)",
    letterSpacing: "var(--track-label)",
    whiteSpace: "nowrap"
  };
  if (state === "launching") {
    return (
      <span style={{
        ...base,
        color: "var(--acc)",
        background: "var(--tint)",
        border: "1px solid var(--tint-edge)",
        borderRadius: "var(--radius-pill)",
        padding: "3px 9px"
      }}>{children}</span>
    );
  }
  const stateTone = state === "live" ? "accent" : state === "progress" ? "muted" : null;
  return <span style={{ ...base, color: tones[stateTone || tone] || tones.faint }}>{children}</span>;
}
