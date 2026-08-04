import React from "react";

export function RowLink({ title, description, status, statusTone, href, onClick, muted = false, last = false }) {
  const Tag = href || onClick ? "a" : "div";
  return (
    <Tag className="tk-row-link" href={href} onClick={onClick} style={{
      display: "block",
      padding: "20px 0",
      borderBottom: last ? "none" : "1px solid var(--hair)",
      textDecoration: "none",
      color: "inherit",
      transition: "padding var(--dur-hover)"
    }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "24px" }}>
        <span style={{
          fontSize: "var(--size-project-name)",
          fontWeight: "var(--weight-semibold)",
          letterSpacing: "var(--track-project-name)",
          color: muted ? "var(--muted)" : "var(--ink)"
        }}>{title}</span>
        {status ? (
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--size-caption)",
            letterSpacing: "var(--track-label)",
            color: statusTone === "accent" ? "var(--acc)" : "var(--faint)",
            whiteSpace: "nowrap"
          }}>{status}</span>
        ) : null}
      </div>
      {description ? (
        <p style={{ margin: "7px 0 0", fontSize: "var(--size-row)", lineHeight: 1.5, color: "var(--muted)", maxWidth: "var(--measure-row)" }}>{description}</p>
      ) : null}
    </Tag>
  );
}
