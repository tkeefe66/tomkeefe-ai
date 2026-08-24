import { site } from "@/content/site";
import MastheadFacts from "@/components/MastheadFacts";
import ExternalLink from "@/components/ExternalLink";

function Buttons({ pad }: { pad: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${pad}`}>
      {site.links.map((l, i) => (
        <ExternalLink key={l.label} href={l.href} className={i === 0 ? "band-btn" : "band-btn-ghost"}>
          {l.label}
        </ExternalLink>
      ))}
    </div>
  );
}

function Ledger() {
  return (
    <header className="band">
      <div className="container-page grid items-start gap-[34px] pb-13 pt-(--space-9) min-[901px]:grid-cols-[minmax(0,1fr)_360px] min-[901px]:gap-14">
        <div>
          <h1 className="m-0 text-[clamp(48px,6.6vw,80px)] font-bold leading-[0.92] tracking-[-0.052em] text-white">
            {site.name}
          </h1>
          <p className="mt-5.5 max-w-[34ch] text-xl leading-normal text-white/80">
            {site.masthead.lead}
          </p>
          <Buttons pad="mt-5.5" />
        </div>
        <MastheadFacts rows={site.masthead.ledger} />
      </div>
    </header>
  );
}

// Approved backup variant — kept behind site.mastheadVariant, do not delete
// (design README §Masthead — Column Rule).
function Column() {
  return (
    <header className="band">
      <div className="container-page grid gap-[30px] pb-15 pt-17 min-[901px]:grid-cols-[230px_minmax(0,1fr)] min-[901px]:gap-0">
        <div className="min-[901px]:pr-7.5">
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
          <div className="mono mt-5 flex flex-col gap-[7px] text-[11px] tracking-[0.06em]">
            {site.links.map((l) => (
              <ExternalLink key={l.label} href={l.href} className="text-white/82 hover:text-white">
                {l.label} →
              </ExternalLink>
            ))}
          </div>
        </div>
        <div className="border-t border-white/50 pt-7 min-[901px]:border-t-0 min-[901px]:border-l min-[901px]:pl-10 min-[901px]:pt-0">
          <h1 className="m-0 max-w-[20ch] text-[clamp(34px,4.4vw,52px)] font-semibold leading-[1.06] tracking-[-0.038em] text-white">
            {site.masthead.column.headline}
          </h1>
          <p className="mt-5.5 max-w-[54ch] text-lg leading-[1.55] text-white/80">
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
