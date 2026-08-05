import Link from "next/link";
import Nav from "@/components/Nav";
import ContactBand from "@/components/ContactBand";
import FigurePlate from "@/components/FigurePlate";
import MetaRow from "@/components/MetaRow";
import { getProjectDetail } from "@/content/projects";

export default function ProjectPage({ slug }: { slug: string }) {
  const project = getProjectDetail(slug);
  const next = getProjectDetail(project.next.slug);

  return (
    <>
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <header id="top" className="band">
        <div className="container-page mono flex items-center justify-between gap-5 py-[22px] text-[11px] tracking-[0.08em]">
          <Link href="/" className="text-white/82 hover:text-white">
            ← Tom Keefe
          </Link>
          <span style={{ color: "var(--acc-soft)" }}>{project.number}</span>
        </div>
        <div className="container-page border-t border-white/16 pb-(--space-8) pt-[34px]">
          <h1 className="m-0 text-[clamp(38px,5.4vw,64px)] font-bold leading-[0.98] tracking-[-0.045em] text-white">
            {project.title}
          </h1>
          <p className="mt-[18px] max-w-[46ch] text-xl leading-normal text-white/80">
            {project.premise}
          </p>
          {project.launch && (
            <div className="mt-[18px]">
              {/* Band-context variant of the launching capsule: the standard
                  --tint surface reads as a hole against the dark band, so on
                  the band the chip goes ghost, matching band-btn-ghost. */}
              <span
                className="mono whitespace-nowrap rounded-full border border-white/28 px-[9px] py-[3px] text-[10.5px] tracking-[0.08em]"
                style={{ color: "var(--acc-soft)" }}
              >
                LAUNCHING SEPT 2026
              </span>
            </div>
          )}
        </div>
      </header>
      <main className="container-page flex-1 pt-[46px]">
        <div className="grid items-start gap-8 min-[901px]:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] min-[901px]:gap-12">
          <div>
            {project.sections.map((s, i) => (
              <div key={s.heading} className={i > 0 ? "mt-8" : undefined}>
                <h2
                  className="mono m-0 text-[11px] font-medium tracking-[0.12em]"
                  style={{ color: "var(--acc)" }}
                >
                  {s.heading}
                </h2>
                <p
                  className="mt-3 max-w-[64ch] text-[16.5px] leading-relaxed"
                  style={{ color: "var(--body)" }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--ink)" }}>
            {project.facts.map((f) => (
              <div key={f.label} className="fact-row">
                <span style={{ color: "var(--muted)" }}>{f.label}</span>
                <span>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
        {project.figures[0] && (
          <div className="mt-(--section-gap)">
            <FigurePlate figure={project.figures[0]} />
          </div>
        )}
        {project.figures[1] && (
          <div className="mt-[38px] flex flex-wrap items-start gap-[26px]">
            <div className="min-w-[280px] flex-[0_1_460px]">
              <FigurePlate figure={project.figures[1]} />
            </div>
            {project.digestNote && (
              <p
                className="m-0 max-w-[46ch] flex-[1_1_300px] text-[15.5px] leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {project.digestNote}
              </p>
            )}
          </div>
        )}
        {project.meta?.some(Boolean) && (
          <div className="mt-(--space-8)">
            <MetaRow items={project.meta} />
          </div>
        )}
        <div
          className="mono mt-(--space-8) flex justify-between gap-5 pb-14 pt-5 text-[11px] tracking-[0.08em] max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-2.5"
          style={{ borderTop: "1px solid var(--hair)" }}
        >
          <Link href="/#projects" className="hover:text-(--acc)" style={{ color: "var(--muted)" }}>
            ← All projects
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="hover:text-(--acc)"
            style={{ color: "var(--muted)" }}
          >
            NEXT — {next.title} →
          </Link>
        </div>
      </main>
      <ContactBand />
    </>
  );
}
