import React from "react";

/* A numbered opinion. `annotation` is the optional receipt — the line that ties
   the claim to a project. Only some opinions carry one; the ones that don't
   must not read as missing something, so the annotation adds nothing to the
   layout when absent (no reserved space, no placeholder). */
export function Statement({ index, children, annotation, last = false }) {
  return (
    <div style={{
      display: "flex",
      gap: "24px",
      alignItems: "flex-start",
      padding: "24px 0",
      borderBottom: last ? "none" : "1px solid var(--hair)"
    }}>
      {index ? (
        <span style={{
          flex: "0 0 30px",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--size-data)",
          color: "var(--acc)",
          paddingTop: "9px"
        }}>{index}</span>
      ) : null}
      <div style={{ minWidth: 0 }}>
        <p style={{
          margin: 0,
          fontSize: "var(--size-principle)",
          fontWeight: "var(--weight-medium)",
          lineHeight: "var(--leading-principle)",
          letterSpacing: "var(--track-principle)",
          maxWidth: "var(--measure-principle)",
          textWrap: "pretty"
        }}>{children}</p>
        {annotation ? (
          <p style={{
            margin: "11px 0 0",
            fontSize: "var(--size-row)",
            lineHeight: 1.5,
            color: "var(--muted)",
            maxWidth: "var(--measure-row)",
            textWrap: "pretty"
          }}>{annotation}</p>
        ) : null}
      </div>
    </div>
  );
}
