import { site } from "@/content/site";

function Buttons({ pad }: { pad: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${pad}`}>
      {site.links.map((l, i) => (
        <a key={l.label} href={l.href} className={i === 0 ? "band-btn" : "band-btn-ghost"}>
          {l.label}
        </a>
      ))}
    </div>
  );
}

function Ledger() {
  return (
    <header className="band">
      <div className="container-page grid items-start gap-14 pb-13 pt-19 md:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h1 className="m-0 text-[clamp(48px,6.6vw,80px)] font-bold leading-[0.92] tracking-[-0.052em] text-white">
            {site.name}
          </h1>
          <p className="mt-5.5 max-w-[34ch] text-xl leading-normal text-white/80">
            {site.masthead.lead}
          </p>
        </div>
        <div className="border-t border-white/50">
          {site.masthead.ledger.map((row) => (
            <div key={row.label} className="fact-row">
              <span className="text-white/60">{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
          <Buttons pad="mt-5.5" />
        </div>
      </div>
    </header>
  );
}

// Approved backup variant — kept behind site.mastheadVariant, do not delete
// (design README §Masthead — Column Rule).
function Column() {
  return (
    <header className="band">
      <div className="container-page grid pb-15 pt-17 md:grid-cols-[230px_minmax(0,1fr)]">
        <div className="pr-7.5">
          <div className="text-3xl font-bold leading-none tracking-[-0.045em] text-white">
            Tom
            <br />
            Keefe
          </div>
          <div className="mono mt-4 text-[10.5px] leading-[1.95] text-white/60">
            {site.masthead.column.facts.map((f) => (
              <span key={f}>
                {f}
                <br />
              </span>
            ))}
          </div>
          <div className="mono mt-5 flex flex-col gap-1.5 text-[11px] tracking-[0.06em]">
            {site.links.map((l) => (
              <a key={l.label} href={l.href} className="text-white/72 hover:text-white">
                {l.label} →
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 md:mt-0 md:border-l md:border-white/50 md:pl-10">
          <h1 className="m-0 max-w-[20ch] text-[clamp(34px,4.4vw,52px)] font-semibold leading-[1.06] tracking-[-0.038em] text-white">
            {site.masthead.column.headline}
          </h1>
          <p className="mt-5.5 max-w-[54ch] text-lg leading-relaxed text-white/78">
            {site.masthead.column.support}
          </p>
        </div>
      </div>
    </header>
  );
}

export default function Masthead() {
  return site.mastheadVariant === "column" ? <Column /> : <Ledger />;
}
