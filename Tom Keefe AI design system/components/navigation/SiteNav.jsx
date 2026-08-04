import React from "react";

export function SiteNav({ brand = "Tom Keefe", items = [], projects = [], cta, onBrandClick }) {
  const [open, setOpen] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const link = {
    padding: "8px 12px", borderRadius: "var(--radius-button)",
    color: "var(--on-field-strong)", textDecoration: "none",
    fontFamily: "var(--font-mono)", fontSize: "var(--size-label)",
    letterSpacing: "var(--track-label)", whiteSpace: "nowrap"
  };
  return (
    <nav className="tk-field" style={{ position: "sticky", top: 0, zIndex: 80, background: "var(--acc-deep)", color: "var(--on-field)" }}>
      <div style={{
        maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)",
        height: "var(--nav-height)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px",
        position: "relative"
      }}>
        <a href="#top" onClick={onBrandClick} style={{ fontSize: "15px", fontWeight: "var(--weight-semibold)", letterSpacing: "-0.022em", color: "var(--on-field)", textDecoration: "none" }}>{brand}</a>
        <button className="tk-nav-toggle" onClick={() => setMenu((v) => !v)} aria-expanded={menu} style={{
          background: "transparent", border: "1px solid var(--on-field-border)", borderRadius: "var(--radius-button)",
          color: "var(--on-field)", padding: "8px 12px", fontFamily: "var(--font-mono)",
          fontSize: "var(--size-label)", letterSpacing: "var(--track-label)", cursor: "pointer"
        }}>{menu ? "CLOSE" : "MENU"}</button>
        <div className="tk-nav-links" data-open={menu ? "true" : "false"}>
          {items.map((it) => <a key={it.label} href={it.href} onClick={() => setMenu(false)} style={link}>{it.label}</a>)}
          {projects.length ? (
            <div className="tk-nav-dropdown" style={{ position: "relative", flex: "0 0 auto" }}
              onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <a href="#projects" onClick={(e) => { e.preventDefault(); setOpen((v) => !v); }}
                style={{ ...link, display: "block", background: open ? "var(--on-field-hover)" : "transparent", color: open ? "var(--on-field)" : "var(--on-field-strong)" }}>
                PROJECTS <span style={{ color: "var(--acc-soft)" }}>▾</span>
              </a>
              {open ? (
                <div className="tk-nav-dropdown-panel" style={{
                  position: "absolute", top: "100%", right: 0, minWidth: "268px",
                  background: "var(--bg)", border: "1px solid var(--hair)", borderRadius: "var(--radius-panel)",
                  padding: "6px", boxShadow: "0 12px 28px rgba(0,0,0,0.14)"
                }}>
                  {projects.map((p) => (
                    <a key={p.title} href={p.href} onClick={(e) => { setOpen(false); setMenu(false); if (p.onClick) { e.preventDefault(); p.onClick(e); } }}
                      style={{ display: "block", padding: "10px 12px", borderRadius: "var(--radius-button)", color: "var(--ink)", textDecoration: "none" }}>
                      <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: "var(--weight-semibold)", letterSpacing: "-0.02em" }}>{p.title}</span>
                      <span style={{ display: "block", marginTop: "2px", fontFamily: "var(--font-mono)", fontSize: "var(--size-caption)", letterSpacing: "var(--track-caption)", color: "var(--faint)" }}>{p.meta}</span>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          {cta ? (
            <a href={cta.href} style={{
              marginLeft: "8px", padding: "8px 14px", background: "#FFFFFF", color: "var(--acc-deep)",
              borderRadius: "var(--radius-button)", fontFamily: "var(--font-mono)", fontSize: "var(--size-label)",
              letterSpacing: "var(--track-label)", fontWeight: "var(--weight-medium)", textDecoration: "none",
              textAlign: "center"
            }}>{cta.label}</a>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
