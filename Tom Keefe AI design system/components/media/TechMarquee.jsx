import React from "react";

export function TechMarquee({ label = "BUILT ACROSS", items = [], duration = 46 }) {
  const run = items.map((t, i) => (
    <React.Fragment key={t + i}>
      <span style={{ fontSize: "14.5px", color: "var(--on-field-strong)", whiteSpace: "nowrap" }}>{t}</span>
      <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", flex: "0 0 auto" }} />
    </React.Fragment>
  ));
  const mask = "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)";
  return (
    <div style={{ background: "var(--acc-deep)", color: "var(--on-field)" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "22px", padding: "17px 0 19px", borderTop: "1px solid var(--on-field-rule)" }}>
          <span style={{
            flex: "0 0 auto", fontFamily: "var(--font-mono)", fontSize: "var(--size-caption)",
            letterSpacing: "var(--track-label-wide)", color: "var(--on-field-faint)"
          }}>{label}</span>
          <div style={{ flex: "1 1 auto", minWidth: 0, overflow: "hidden", maskImage: mask, WebkitMaskImage: mask }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "22px", width: "max-content",
              animation: `tk-marquee ${duration}s linear infinite`
            }}>{run}{run}</div>
          </div>
        </div>
      </div>
      <style>{"@keyframes tk-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"}</style>
    </div>
  );
}
