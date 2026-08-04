import React from "react";
import { StatusLabel } from "../core/StatusLabel.jsx";
import { MetaRow } from "./MetaRow.jsx";
import { ProseBlock } from "../core/ProseBlock.jsx";

/* One card per project — full-width stacked rows, never a grid. Five projects
   with deliberately unequal bodies (one runs three paragraphs) read as a list
   of essays, which is what they are; a grid would either stretch four cards to
   match the tallest or force the long one to compress. Height follows content.

   Same hover as RowLink: padding-left 0 → 10px, never a color change. */
export function ProjectCard({ name, state, status, body = [], meta = [], href, onClick, cta = "READ →", last = false }) {
  const Tag = href || onClick ? "a" : "div";
  const paragraphs = Array.isArray(body) ? body : [body];
  return (
    <Tag className="tk-row-link" href={href} onClick={onClick} style={{
      display: "block",
      padding: "26px 0",
      borderBottom: last ? "none" : "1px solid var(--hair)",
      textDecoration: "none",
      color: "inherit",
      transition: "padding var(--dur-hover) var(--ease)"
    }}>
      <div className="tk-card-head" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "22px" }}>
        <span style={{
          fontSize: "var(--size-project-name)",
          fontWeight: "var(--weight-semibold)",
          letterSpacing: "var(--track-project-name)",
          color: "var(--ink)"
        }}>{name}</span>
        {status ? <StatusLabel state={state}>{status}</StatusLabel> : null}
      </div>
      <ProseBlock paragraphs={paragraphs} size="row" style={{ marginTop: "11px" }} />
      {meta.length ? <div style={{ marginTop: "16px" }}><MetaRow items={meta} /></div> : null}
      {cta ? (
        <div style={{ marginTop: "16px" }}>
          <StatusLabel tone="accent">{cta}</StatusLabel>
        </div>
      ) : null}
    </Tag>
  );
}
