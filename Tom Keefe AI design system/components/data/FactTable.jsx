import React from "react";

/* `collapsible` only affects viewports at or below --bp-mobile: the rows start
   closed behind a mono disclosure line. Above that breakpoint the toggle is
   hidden and the rows always show, so desktop is unchanged. */
export function FactTable({ rows = [], onField = false, collapsible = false, summary = "DETAILS" }) {
  const [open, setOpen] = React.useState(false);
  const rule = onField ? "var(--on-field-rule)" : "var(--hair)";
  return (
    <div style={{ borderTop: onField ? "1px solid var(--on-field-rule-strong)" : "1.5px solid var(--ink)" }}>
      {collapsible ? (
        <button className="tk-facts-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open} style={{
          width: "100%", background: "transparent", border: 0, borderBottom: "1px solid " + rule, padding: onField ? "11px 0" : "10px 0",
          gap: "16px",
          fontFamily: "var(--font-mono)", fontSize: "var(--size-data)", letterSpacing: "var(--track-caption)",
          color: onField ? "var(--on-field-label)" : "var(--muted)", cursor: "pointer", textAlign: "left"
        }}>
          <span>{summary}</span>
          <span style={{
            color: onField ? "var(--acc-soft)" : "var(--acc)",
            display: "inline-block", transform: open ? "rotate(180deg)" : "none",
            transition: "transform var(--dur-hover) var(--ease)"
          }}>▾</span>
        </button>
      ) : null}
      <div className={collapsible ? "tk-facts-rows" : undefined} data-open={open ? "true" : "false"}>
        {rows.map((r, i) => (
          <div key={r.label} style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            padding: onField ? "11px 0" : "10px 0",
            borderTop: undefined,
            borderBottom: i === rows.length - 1 ? "none" : "1px solid " + rule,
            fontFamily: "var(--font-mono)",
            fontSize: "var(--size-data)"
          }}>
            <span style={{ color: onField ? "var(--on-field-label)" : "var(--muted)" }}>{r.label}</span>
            <span style={{ textAlign: "right", color: onField ? "var(--on-field)" : "var(--ink)" }}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
