import ProjectCard from "@/components/ProjectCard";
import ProseBlock from "@/components/ProseBlock";
import { projects, projectsIntro } from "@/content/projects";

/* Two-up catalogue (2026-08-14). The essay cards grew ~293px per project and
   the list is heading past nine, so each project collapses to name, status and
   one sentence, with the whole card as the link. The long-form copy lives on
   the project pages. This is the one place the site uses a grid for project
   rows; design v2 §Project rows says otherwise and is overridden by decision.
   Collapses to one column at ≤900px alongside every other multi-column row. */
export default function ProjectsList() {
  return (
    <section id="projects" className="pt-12">
      <h2 className="section-h2 max-w-[22ch]">Things I built instead of waiting for a vendor.</h2>
      <ProseBlock paragraphs={projectsIntro} className="mt-[18px]" />
      <div
        className="mt-[26px] grid grid-cols-1 gap-x-11 min-[901px]:grid-cols-2"
        style={{ borderTop: "1px solid var(--ink)" }}
      >
        {projects.map((p) => (
          <ProjectCard
            key={p.name}
            name={p.name}
            state={p.state}
            status={p.status}
            line={p.line}
            href={p.slug ? `/projects/${p.slug}` : undefined}
          />
        ))}
      </div>
    </section>
  );
}
