import React from "react";

export function FigurePlate({ src, alt, caption, height = 480, zoom = 190, capture = "light" }) {
  return (
    <div>
      <div className="tk-figure" data-capture={capture} style={{ position: "relative", border: "1px solid var(--hair)", overflow: "hidden", height: height + "px" }}>
        <img src={src} alt={alt} style={{ display: "block", width: zoom + "%", maxWidth: "none" }} />
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: "96px",
          background: "linear-gradient(to bottom, transparent, var(--bg))"
        }} />
      </div>
      {caption ? (
        <div style={{
          marginTop: "10px",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--size-caption)",
          letterSpacing: "var(--track-caption)",
          color: "var(--acc)"
        }}>{caption}</div>
      ) : null}
    </div>
  );
}
