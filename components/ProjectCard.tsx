import Link from "next/link";
import StatusLabel from "@/components/StatusLabel";

type ProjectCardProps = {
  name: string;
  state?: "live" | "progress" | "launching";
  status?: string;
  line: string;
  href?: string;
};

/* Compact catalogue card: name + status on one line, the project's single
   sentence under it. The whole card is the link — there is no separate READ
   affordance and no meta row, so cost per project is ~87px instead of ~293px
   (2026-08-14). Hover matches .row-link: padding-left 0 → 10px, never colour.
   Deviates from design v2 §Project rows ("full-width stacked rows, never a
   grid") by decision — see ProjectsList. */
export default function ProjectCard({ name, state, status, line, href }: ProjectCardProps) {
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[17px] font-semibold tracking-[-0.03em]" style={{ color: "var(--ink)" }}>
          {name}
        </span>
        {status ? <StatusLabel state={state}>{status}</StatusLabel> : null}
      </div>
      <span className="mt-[5px] block text-[14.5px] leading-[1.5]" style={{ color: "var(--muted)" }}>
        {line}
      </span>
    </>
  );
  return href ? (
    <Link href={href} className="row-link" style={{ paddingTop: 13, paddingBottom: 13 }}>
      {inner}
    </Link>
  ) : (
    <div className="row-link" style={{ paddingTop: 13, paddingBottom: 13 }}>
      {inner}
    </div>
  );
}
