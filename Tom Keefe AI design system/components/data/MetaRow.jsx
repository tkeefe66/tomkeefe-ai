import React from "react";

/* Dot-separated annotation under a card body: scale, cost, and what went wrong.
   The third fragment is usually a full clause and is the point of the row — it
   is never truncated. Fragments wrap as whole units and the separators are
   real flex children, so a wrapped row never orphans a "·" at a line start.
   Reads as annotation, not a stat block: no big numbers, no emphasis. */
export function MetaRow({ items = [] }) {
  const parts = items.filter(Boolean);
  return (
    <div className="tk-meta-fragments" style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "baseline",
      columnGap: "9px",
      rowGap: "3px",
      fontSize: "var(--size-row)",
      lineHeight: 1.5,
      color: "var(--muted)",
      maxWidth: "var(--measure-row)",
      textWrap: "pretty"
    }}>
      {parts.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <span aria-hidden="true" style={{ color: "var(--faint)" }}>·</span> : null}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
