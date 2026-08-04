const NAV = {
  items: [{ label: "OVERVIEW", href: "#range" }, { label: "PRINCIPLES", href: "#principles" }, { label: "CONTACT", href: "#contact" }],
  cta: { label: "EMAIL", href: "mailto:tkeefe66@gmail.com" }
};

function Site() {
  const [page, setPage] = React.useState("home");
  const [masthead, setMasthead] = React.useState("ledger");
  // Preview-only: never persisted. This card documents the light/OS default;
  // dark has its own dedicated card, so a click here must not outlive the session.
  const [theme, setTheme] = React.useState("auto");
  const [accent, setAccent] = React.useState("navy");
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const isDark = theme === "dark" || (theme === "auto" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  React.useEffect(() => {
    const r = document.documentElement;
    if (accent === "navy") r.removeAttribute("data-accent"); else r.setAttribute("data-accent", accent);
  }, [accent]);
  const open = (p) => { setPage(p); window.scrollTo(0, 0); };
  const home = (e) => { if (e) e.preventDefault(); open("home"); };
  const navFor = (openFn) => ({
    ...NAV,
    projects: [
      { title: "B2B MarTech Intel", meta: "MARKET INTELLIGENCE · INTERNAL", href: "#top", onClick: () => openFn("martech") },
      { title: "Inventory", meta: "LEDGER + DIGEST · LIVE", href: "#top", onClick: () => openFn("inventory") }
    ]
  });
  let view;
  if (page === "martech") {
    view = <window.TKSiteProjectPage project={window.TKSiteMartech} nav={navFor(open)} onHome={home} onNext={(e) => { e.preventDefault(); open("inventory"); }} />;
  } else if (page === "inventory") {
    view = <window.TKSiteProjectPage project={window.TKSiteInventory} nav={navFor(open)} onHome={home} onNext={(e) => { e.preventDefault(); open("martech"); }} />;
  } else {
    view = <window.TKSiteHome masthead={masthead} onOpenProject={open} />;
  }
  return (
    <div>
      {view}
      <div className="tk-chips">
        <div className="grp">
          {[["navy", "NAVY"], ["teal", "TEAL"], ["oxblood", "OXBLOOD"], ["graphite", "GRAPHITE"]].map(([k, label]) => (
            <button key={k} data-on={accent === k} onClick={() => setAccent(k)}>{label}</button>
          ))}
        </div>
        <div className="grp">
          <button data-on={masthead === "ledger"} onClick={() => { setMasthead("ledger"); open("home"); }}>LEDGER</button>
          <button data-on={masthead === "column"} onClick={() => { setMasthead("column"); open("home"); }}>COLUMN</button>
          <button className="solo" style={{ marginLeft: "4px" }} onClick={() => setTheme(isDark ? "light" : "dark")}>{isDark ? "LIGHT" : "DARK"}</button>
        </div>
      </div>
    </div>
  );
}
window.TKSiteApp = Site;
