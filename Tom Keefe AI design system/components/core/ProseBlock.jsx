import React from "react";

/* Running prose. The rest of the site is set for scanning; this is set for
   reading, which wants a longer measure and more generous leading. Paragraph
   spacing is deliberately tighter than the section rhythm so paragraphs of
   very different lengths still hold together as one argument.

   `size`: "prose" for the long-form sections (16.5px, 66ch), "row" for the
   shorter bodies inside a card (15px, 68ch, muted). */
export function ProseBlock({ paragraphs = [], size = "prose", style }) {
  const parts = (Array.isArray(paragraphs) ? paragraphs : [paragraphs]).filter(Boolean);
  const reading = size === "prose";
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: reading ? "16px" : "11px",
      fontSize: reading ? "var(--size-body-lg)" : "var(--size-row)",
      lineHeight: "var(--leading-body)",
      color: reading ? "var(--body)" : "var(--muted)",
      maxWidth: reading ? "var(--measure-prose)" : "var(--measure-row)",
      textWrap: "pretty",
      ...style
    }}>
      {parts.map((p, i) => <p key={i} style={{ margin: 0 }}>{p}</p>)}
    </div>
  );
}
