import React from "react";

export function SectionHeading({ title, subhead, size = "section" }) {
  const sizes = {
    section: { fontSize: "var(--size-section)", letterSpacing: "var(--track-section)" },
    contact: { fontSize: "var(--size-contact)", letterSpacing: "var(--track-contact)" }
  };
  return (
    <div>
      <h2 style={{
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--weight-semibold)",
        lineHeight: "var(--leading-display)",
        maxWidth: "22ch",
        textWrap: "balance",
        ...(sizes[size] || sizes.section)
      }}>{title}</h2>
      {subhead ? (
        <p style={{
          margin: "16px 0 0",
          fontSize: "var(--size-subhead)",
          lineHeight: 1.55,
          color: "var(--muted)",
          maxWidth: "var(--measure-subhead)",
          textWrap: "pretty"
        }}>{subhead}</p>
      ) : null}
    </div>
  );
}
