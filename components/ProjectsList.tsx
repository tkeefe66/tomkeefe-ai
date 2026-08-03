import Link from "next/link";
import { projects } from "@/content/projects";

function RowBody({ p }: { p: (typeof projects)[number] }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-6">
        <span
          className="text-[21px] font-semibold tracking-[-0.03em]"
          style={{ color: p.slug ? undefined : "var(--muted)" }}
        >
          {p.name}
        </span>
        <span
          className="mono whitespace-nowrap text-[10.5px] tracking-[0.08em]"
          style={{ color: p.slug ? "var(--acc)" : "var(--faint)" }}
        >
          {p.slug ? "READ →" : p.status}
        </span>
      </div>
      <p className="mt-[7px] max-w-[68ch] text-[15px] leading-normal" style={{ color: "var(--muted)" }}>
        {p.description}
      </p>
    </>
  );
}

export default function ProjectsList() {
  return (
    <section id="projects" className="mt-11">
      <div className="pt-2">
        <h2 className="section-h2 max-w-[22ch]">Things I built instead of waiting for a vendor.</h2>
        <p className="section-sub max-w-[52ch]">
          Two are running today. Read either one for the problem, the build and what it cost.
        </p>
      </div>
      <div className="mt-[26px]" style={{ borderTop: "1px solid var(--ink)" }}>
        {projects.map((p) =>
          p.slug ? (
            <Link key={p.name} href={`/projects/${p.slug}`} className="row-link last:border-b-0">
              <RowBody p={p} />
            </Link>
          ) : (
            <div key={p.name} className="row-link last:border-b-0">
              <RowBody p={p} />
            </div>
          ),
        )}
      </div>
    </section>
  );
}
