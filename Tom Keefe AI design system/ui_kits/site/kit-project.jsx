const __ns = () => window.TomKeefeDesignSystem_7aaa63 || {};
const SiteNav = (props) => React.createElement(__ns().SiteNav, props);
const FigurePlate = (props) => React.createElement(__ns().FigurePlate, props);
const FactTable = (props) => React.createElement(__ns().FactTable, props);

const PP_CONTAINER = { maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)" };
const pmono = { fontFamily: "var(--font-mono)", fontSize: "var(--size-label)", letterSpacing: "var(--track-label)" };
const pheading = { margin: 0, fontFamily: "var(--font-mono)", fontSize: "var(--size-label)", fontWeight: "var(--weight-medium)", letterSpacing: "var(--track-label-wide)", color: "var(--acc)" };
const pbody = { margin: "12px 0 0", fontSize: "var(--size-body-lg)", lineHeight: "var(--leading-body)", color: "var(--body)", maxWidth: "64ch", textWrap: "pretty" };

function SpecTable({ rows }) {
  return <FactTable rows={rows} collapsible summary="PROJECT SPEC" />;
}

function ProjectPage({ project, nav, onHome, onNext }) {
  return (
    <div>
      <a className="tk-skip" href="#top">SKIP TO CONTENT</a>
      <SiteNav {...nav} onBrandClick={onHome} />
      <header className="tk-field" style={{ background: "var(--acc-deep)", color: "var(--on-field)" }}>
        <div className="tk-meta-row" style={{ ...PP_CONTAINER, padding: "22px var(--gutter)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", ...pmono }}>
          <a href="#top" onClick={onHome} style={{ color: "var(--on-field-strong)", textDecoration: "none" }}>← TOM KEEFE</a>
          <span style={{ color: "var(--acc-soft)" }}>{project.number}</span>
        </div>
        <div style={{ ...PP_CONTAINER, padding: "34px var(--gutter) 56px", borderTop: "1px solid var(--on-field-rule)" }}>
          <h1 style={{ margin: 0, fontSize: "var(--size-project-title)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--track-project-title)", lineHeight: 0.98, color: "var(--on-field)" }}>{project.title}</h1>
          <p style={{ margin: "18px 0 0", fontSize: "var(--size-lead)", lineHeight: "var(--leading-snug)", color: "var(--on-field-body)", maxWidth: "46ch", textWrap: "pretty" }}>{project.lead}</p>
        </div>
      </header>
      <main style={{ ...PP_CONTAINER, padding: "46px var(--gutter) 0" }}>
        <div className="tk-project-grid">
          <div>
            {project.sections.map((s) => (
              <div key={s.heading} style={{ marginTop: s === project.sections[0] ? 0 : "32px" }}>
                <h2 style={pheading}>{s.heading}</h2>
                <p style={{ ...pbody, color: s.pending ? "var(--faint)" : "var(--body)" }}>{s.text}</p>
              </div>
            ))}
          </div>
          <SpecTable rows={project.spec} />
        </div>
        <div style={{ marginTop: "var(--section-gap)" }}>
          <FigurePlate src={project.figure.src} alt={project.figure.alt} caption={project.figure.caption} height={project.figure.height} zoom={190} capture={project.figure.capture || "light"} />
        </div>
        {project.secondFigure ? (
          <div style={{ marginTop: "38px", display: "flex", gap: "26px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: "0 1 460px", minWidth: "280px" }}>
              <FigurePlate src={project.secondFigure.src} alt={project.secondFigure.alt} caption={project.secondFigure.caption} height={360} zoom={100} />
            </div>
            <p style={{ flex: "1 1 300px", margin: 0, fontSize: "15.5px", lineHeight: "var(--leading-body)", color: "var(--muted)", maxWidth: "46ch", textWrap: "pretty" }}>{project.secondFigure.note}</p>
          </div>
        ) : null}
        <div className="tk-meta-row" style={{ marginTop: "56px", padding: "20px 0 56px", borderTop: "1px solid var(--hair)", display: "flex", justifyContent: "space-between", gap: "20px", ...pmono }}>
          <a href="#top" onClick={onHome} style={{ color: "var(--muted)", textDecoration: "none" }}>← ALL PROJECTS</a>
          <a href="#top" onClick={onNext} style={{ color: "var(--muted)", textDecoration: "none" }}>{project.nextLabel}</a>
        </div>
      </main>
    </div>
  );
}

const Martech = {
  number: "PROJECT 01",
  title: "B2B MarTech Intel",
  lead: "A market-intelligence system for a go-to-market organization, built so the field stops guessing what changed this week.",
  sections: [
    { heading: "THE PROBLEM", text: "Market and account signal lived in a dozen places — newsletters, alerts, analyst notes, someone's bookmarks. By the time it reached a seller it was stale, and nobody owned the job of curating it." },
    { heading: "WHAT I BUILT", text: "A continuous ingest across news, GTM tech and AI sources that categorizes and tags every article, tracks named companies, and refreshes every twelve minutes. On top of the same corpus sit the things people actually asked for: briefings, trend analysis, an AI analyst, and drafting tools for thought leadership and field enablement." },
    { heading: "WHAT CHANGED", text: "[Outcome pending — the number you want to lead with goes here.]", pending: true }
  ],
  spec: [
    { label: "ROLE", value: "Built and operated" },
    { label: "STACK", value: "Next.js · Claude · RSS" },
    { label: "CORPUS", value: "63,731 articles" },
    { label: "REFRESH", value: "Every 12 minutes" },
    { label: "STATUS", value: "Internal" }
  ],
  figure: { src: "../../assets/martech-intel.png", alt: "B2B MarTech Intel news feed", height: 520, caption: "FIG. 01 — NEWS FEED. CATEGORY, SOURCE AND TAG FILTERS ACROSS THE FULL CORPUS." },
  nextLabel: "NEXT — INVENTORY →"
};

const Inventory = {
  number: "PROJECT 02",
  title: "Inventory",
  lead: "The same discipline I apply to a revenue stack, pointed at my own household: parse everything, categorize it once, query it forever.",
  sections: [
    { heading: "THE PROBLEM", text: "Purchase history is scattered across receipts, order confirmations and card statements, none of which agree on what a thing is. Spending questions that should take a second take an afternoon." },
    { heading: "WHAT I BUILT", text: "An agent ingest that parses receipts and email into a single ledger — 491 items with brand, price, category, domain and type resolved automatically, and a review queue for anything it can't place confidently. Spend is tracked against the same month last year, and a daily digest rolls it up by day with behavioral tags rather than merchant names." },
    { heading: "WHY IT MATTERS AT WORK", text: "It is a signal pipeline with a different subject: messy inputs, an enrichment layer, a confidence threshold, and a human review queue. Every problem in it is a problem I've solved in a CRM." }
  ],
  spec: [
    { label: "ROLE", value: "Designed and built" },
    { label: "STACK", value: "Local-first · agent ingest" },
    { label: "RECORDS", value: "491 items · 168 active" },
    { label: "NEEDS REVIEW", value: "0" },
    { label: "STATUS", value: "Live, personal" }
  ],
  figure: { src: "../../assets/inventory.png", alt: "Inventory items table", height: 480, capture: "dark", caption: "FIG. 01 — ITEM LEDGER. 491 RECORDS, AUTO-CATEGORIZED, 0 AWAITING REVIEW." },
  secondFigure: { src: "../../assets/spend-digest.png", alt: "Daily spend digest", caption: "FIG. 02 — DAILY DIGEST.", note: "Days are tagged by shape — social, delivery, rides, date — so a week reads as behavior instead of a list of charges. It's the same instinct as a signal feed: the raw event is less useful than the pattern it belongs to." },
  nextLabel: "NEXT — B2B MARTECH INTEL →"
};
Object.assign(window, { TKSiteProjectPage: ProjectPage, TKSiteMartech: Martech, TKSiteInventory: Inventory });
