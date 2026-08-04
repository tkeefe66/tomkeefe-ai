const __ns = () => window.TomKeefeDesignSystem_7aaa63 || {};
const SiteNav = (props) => React.createElement(__ns().SiteNav, props);
const TechMarquee = (props) => React.createElement(__ns().TechMarquee, props);
const SectionHeading = (props) => React.createElement(__ns().SectionHeading, props);
const Button = (props) => React.createElement(__ns().Button, props);
const FactTable = (props) => React.createElement(__ns().FactTable, props);
const LabelledRow = (props) => React.createElement(__ns().LabelledRow, props);
const RowLink = (props) => React.createElement(__ns().RowLink, props);
const Statement = (props) => React.createElement(__ns().Statement, props);

const CONTAINER = { maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)" };

function Masthead() {
  return (
    <header className="tk-field" style={{ background: "var(--acc-deep)", color: "var(--on-field)" }}>
      <div className="tk-masthead-ledger" style={{ ...CONTAINER, padding: "76px var(--gutter) 52px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "var(--size-name)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--track-name)", lineHeight: "var(--leading-name)", color: "var(--on-field)" }}>Tom Keefe</h1>
          <p style={{ margin: "22px 0 0", fontSize: "var(--size-lead)", lineHeight: "var(--leading-snug)", color: "var(--on-field-body)", maxWidth: "var(--measure-lead)", textWrap: "pretty" }}>
            I build the systems that carry go-to-market — the automation, the data model, and the tooling underneath the number.
          </p>
        </div>
        <div>
          <FactTable onField collapsible summary="ROLE, COMPANY, FIELD, YEARS, STATUS" rows={[
            { label: "ROLE", value: "Director, GTM Experts" },
            { label: "COMPANY", value: "Demandbase" },
            { label: "FIELD", value: "MOps · RevOps · GTM" },
            { label: "YEARS", value: "13" },
            { label: "STATUS", value: "Open to conversation" }
          ]} />
          <div style={{ marginTop: "22px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button onField href="mailto:tkeefe66@gmail.com">EMAIL</Button>
            <Button variant="secondary" onField href="https://www.linkedin.com/in/tomkeefesmc">LINKEDIN</Button>
            <Button variant="secondary" onField href="https://github.com/tkeefe66">GITHUB</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function ColumnMasthead() {
  const railLink = { color: "var(--on-field-strong)", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "var(--size-label)", letterSpacing: "var(--track-caption)" };
  return (
    <header className="tk-field" style={{ background: "var(--acc-deep)", color: "var(--on-field)" }}>
      <div className="tk-masthead-column" style={{ ...CONTAINER, padding: "68px var(--gutter) 60px" }}>
        <div className="tk-rail">
          <div style={{ fontSize: "30px", fontWeight: "var(--weight-bold)", letterSpacing: "var(--track-project-title)", lineHeight: 1, color: "var(--on-field)" }}>Tom<br />Keefe</div>
          <div style={{ marginTop: "16px", fontFamily: "var(--font-mono)", fontSize: "var(--size-caption)", lineHeight: 1.95, color: "var(--on-field-label)" }}>DIRECTOR<br />GTM EXPERTS<br />DEMANDBASE<br />13 YEARS IN GTM</div>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "7px" }}>
            <a href="mailto:tkeefe66@gmail.com" style={railLink}>EMAIL →</a>
            <a href="https://www.linkedin.com/in/tomkeefesmc" style={railLink}>LINKEDIN →</a>
            <a href="https://github.com/tkeefe66" style={railLink}>GITHUB →</a>
          </div>
        </div>
        <div className="tk-column-body">
          <h1 style={{ margin: 0, fontSize: "var(--size-column-h1)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--track-contact)", lineHeight: "var(--leading-display)", maxWidth: "20ch", textWrap: "balance", color: "var(--on-field)" }}>Every GTM team is running on systems somebody had to build.</h1>
          <p style={{ margin: "22px 0 0", fontSize: "var(--size-subhead)", lineHeight: 1.55, color: "var(--on-field-body)", maxWidth: "54ch", textWrap: "pretty" }}>Usually badly, usually undocumented, usually by whoever was closest. For thirteen years that person has been me — and I've made a career of turning that improvisation into infrastructure.</p>
        </div>
      </div>
    </header>
  );
}

function Home({ masthead = "ledger", onOpenProject }) {
  const openMartech = onOpenProject ? (e) => { e.preventDefault(); onOpenProject("martech"); } : undefined;
  const openInventory = onOpenProject ? (e) => { e.preventDefault(); onOpenProject("inventory"); } : undefined;
  return (
    <div>
      <a className="tk-skip" href="#range">SKIP TO CONTENT</a>
      <SiteNav
        items={[{ label: "OVERVIEW", href: "#range" }, { label: "PRINCIPLES", href: "#principles" }, { label: "CONTACT", href: "#contact" }]}
        projects={[
          { title: "B2B MarTech Intel", meta: "MARKET INTELLIGENCE · INTERNAL", href: "#projects", onClick: openMartech },
          { title: "Inventory", meta: "LEDGER + DIGEST · LIVE", href: "#projects", onClick: openInventory }
        ]}
        cta={{ label: "EMAIL", href: "mailto:tkeefe66@gmail.com" }} />
      {masthead === "column" ? <ColumnMasthead /> : <Masthead />}
      <TechMarquee items={["Salesforce","Marketo","Demandbase","HubSpot","Outreach","Snowflake","SQL","dbt","Claude Code","Next.js","TypeScript","Railway","REST APIs"]} />

      <main style={CONTAINER}>
        <section id="range" style={{ paddingTop: "48px" }}>
          <SectionHeading title="Boardroom to production query."
            subhead="Most people cover one altitude. The work happens between them." />
          <p style={{ margin: "24px 0 34px", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--body)", maxWidth: "var(--measure-prose)", textWrap: "pretty" }}>
            I've led marketing operations, architected revenue data, and now run a team of GTM Experts at Demandbase — product evangelists who operate the platform daily and feed what they learn back into the roadmap. Customer Zero by instinct: if I'm going to recommend a workflow, I've already run it on myself.
          </p>
          <div style={{ borderTop: "1px solid var(--ink)" }}>
            <LabelledRow label="C-SUITE">Revenue narrative, GTM operating model, and where the number actually comes from.</LabelledRow>
            <LabelledRow label="LEADERSHIP">Coverage math, headcount-to-pipeline, and the handoffs between teams.</LabelledRow>
            <LabelledRow label="PROGRAM">Playbooks, routing, territory design, lifecycle definitions.</LabelledRow>
            <LabelledRow label="SYSTEM">CRM architecture, enrichment pipelines, the data model underneath it all.</LabelledRow>
            <LabelledRow label="MACHINE" last>SQL, APIs, Claude Code, agent workflows that keep running without me.</LabelledRow>
          </div>
        </section>

        <section id="projects" style={{ marginTop: "var(--section-gap)" }}>
          <SectionHeading title="Things I built instead of waiting for a vendor."
            subhead="Two are running today. Read either one for the problem, the build and what it cost." />
          <div style={{ marginTop: "26px", borderTop: "1px solid var(--ink)" }}>
            <RowLink title="B2B MarTech Intel" status="READ →" statusTone="accent" href="#projects" onClick={openMartech}
              description="Market intelligence for the GTM org — 63,731 articles ingested, categorized and tagged, with briefings, trend analysis and drafting tools on top." />
            <RowLink title="Inventory" status="READ →" statusTone="accent" href="#projects" onClick={openInventory}
              description="Every purchase parsed from receipts and email into one queryable ledger, with a daily digest that reads a week as behavior." />
            <RowLink title="Dynasty Analyzer" status="IN PROGRESS" muted
              description="Trade, roster-value and draft-capital analytics for Sleeper dynasty leagues." />
            <RowLink title="Field Assistant" status="IN PROGRESS" muted
              description="Trip and photography planner — conditions, light, locations, timing." />
            <RowLink title="tomkeefe.ai" status="LIVE" muted last
              description="This site — designed, written and deployed by AI agents under my direction." />
          </div>
        </section>

        <section id="principles" style={{ marginTop: "var(--section-gap)", paddingBottom: "8px" }}>
          <SectionHeading title="Five opinions, held firmly."
            subhead="Earned the expensive way. Disagreement welcome — bring the data." />
          <div style={{ marginTop: "34px" }}>
            <Statement>Most GTM problems aren't strategy problems. They're plumbing problems nobody wants to own.</Statement>
            <Statement>Buying another tool isn't a strategy. Wiring together the ones you have is.</Statement>
            <Statement>If your team does it manually every week, that's not a process. It's a hostage situation.</Statement>
            <Statement>Build vs. buy is dead. It's build vs. wait.</Statement>
            <Statement last>AI doesn't replace ops people. Ops people who build with AI replace vendor stacks.</Statement>
          </div>
        </section>
      </main>

      <section id="contact" className="tk-field" style={{ marginTop: "56px", background: "var(--acc-deep)", color: "var(--on-field)" }}>
        <div style={{ ...CONTAINER, padding: "64px var(--gutter) 26px" }}>
          <h2 style={{ margin: 0, fontSize: "var(--size-contact)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--track-contact)", lineHeight: "var(--leading-display)", maxWidth: "22ch", textWrap: "balance", color: "var(--on-field)" }}>
            If something in your stack is held together by a Friday afternoon, let's talk.
          </h2>
          <div style={{ marginTop: "28px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button onField href="mailto:tkeefe66@gmail.com">EMAIL</Button>
            <Button variant="secondary" onField href="https://www.linkedin.com/in/tomkeefesmc">LINKEDIN</Button>
            <Button variant="secondary" onField href="https://github.com/tkeefe66">GITHUB</Button>
          </div>
          <div className="tk-meta-row" style={{ marginTop: "60px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.18)", display: "flex", justifyContent: "space-between", gap: "20px", fontFamily: "var(--font-mono)", fontSize: "var(--size-caption)", letterSpacing: "var(--track-caption)", color: "rgba(255,255,255,0.55)" }}>
            <span>© 2026 TOM KEEFE</span>
            <span>DIRECTED BY A HUMAN. BUILT WITH AGENTS.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
Object.assign(window, { TKSiteHome: Home, TKSiteColumnMasthead: ColumnMasthead });
