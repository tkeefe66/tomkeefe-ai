import React from "react";

export function Button({ variant = "primary", href, onField = false, children, ...rest }) {
  const base = {
    display: "inline-block",
    padding: "11px 18px",
    borderRadius: "var(--radius-button)",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--size-label)",
    letterSpacing: "var(--track-label)",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background var(--dur-hover), color var(--dur-hover), border-color var(--dur-hover)"
  };
  const skins = {
    primary: onField
      ? { background: "#FFFFFF", color: "var(--acc-deep)", border: "1px solid #FFFFFF", fontWeight: "var(--weight-medium)" }
      : { background: "var(--acc)", color: "var(--acc-ink)", border: "1px solid var(--acc)", fontWeight: "var(--weight-medium)" },
    secondary: onField
      ? { background: "transparent", color: "var(--on-field-strong)", border: "1px solid var(--on-field-border)" }
      : { background: "transparent", color: "var(--muted)", border: "1px solid var(--hair)" },
    disabled: { background: "transparent", color: "var(--faint)", border: "1px solid var(--hair)", cursor: "default" }
  };
  const style = { ...base, ...(skins[variant] || skins.primary) };
  const Tag = href ? "a" : "button";
  return <Tag href={href} style={style} {...rest}>{children}</Tag>;
}
