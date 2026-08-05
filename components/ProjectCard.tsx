import Link from "next/link";
import StatusLabel from "@/components/StatusLabel";
import MetaRow from "@/components/MetaRow";
import ProseBlock from "@/components/ProseBlock";

type ProjectCardProps = {
  name: string;
  state?: "live" | "progress" | "launching";
  status?: string;
  body: string[];
  meta?: Array<string | null>;
  href?: string;
  cta?: string;
};

/* One card per project — full-width stacked rows, never a grid. Unequal
   bodies read as a list of essays, which is what they are. Same hover as
   .row-link: padding-left 0 → 10px, never a color change. */
export default function ProjectCard({
  name,
  state,
  status,
  body,
  meta,
  href,
  cta = "READ →",
}: ProjectCardProps) {
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-[22px] max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-2">
        <span
          className="text-[21px] font-semibold tracking-[-0.03em]"
          style={{ color: "var(--ink)" }}
        >
          {name}
        </span>
        {status ? <StatusLabel state={state}>{status}</StatusLabel> : null}
      </div>
      <ProseBlock paragraphs={body} size="row" className="mt-[11px]" />
      {meta?.some(Boolean) ? (
        <div className="mt-4">
          <MetaRow items={meta} />
        </div>
      ) : null}
      {href && cta ? (
        <div className="mt-4">
          <StatusLabel tone="accent">{cta}</StatusLabel>
        </div>
      ) : null}
    </>
  );
  const pad = { paddingTop: 26, paddingBottom: 26 };
  return href ? (
    <Link href={href} className="row-link last:border-b-0" style={pad}>
      {inner}
    </Link>
  ) : (
    <div className="row-link last:border-b-0" style={pad}>
      {inner}
    </div>
  );
}
