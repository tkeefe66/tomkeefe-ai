import React from "react";

export function LabelledRow({ label, children, last = false }) {
  return (
    <div className="tk-labelled-row" style={{
      display: "flex",
      gap: "26px",
      alignItems: "baseline",
      padding: "15px 0",
      borderBottom: last ? "none" : "1px solid var(--hair)"
    }}>
      <span className="tk-label" style={{
        flex: "0 0 118px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--size-label)",
        letterSpacing: "var(--track-caption)",
        color: "var(--acc)"
      }}>{label}</span>
      <span style={{ fontSize: "var(--size-body)", lineHeight: 1.5, minWidth: 0 }}>{children}</span>
    </div>
  );
}
