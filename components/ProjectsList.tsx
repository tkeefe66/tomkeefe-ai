import ProjectCard from "@/components/ProjectCard";
import ProseBlock from "@/components/ProseBlock";
import { projects, projectsIntro } from "@/content/projects";

export default function ProjectsList() {
  return (
    <section id="projects" className="pt-12">
      <h2 className="section-h2 max-w-[22ch]">Things I built instead of waiting for a vendor.</h2>
      <ProseBlock paragraphs={projectsIntro} className="mt-[18px]" />
      <div className="mt-[26px]" style={{ borderTop: "1px solid var(--ink)" }}>
        {projects.map((p) => (
          <ProjectCard
            key={p.name}
            name={p.name}
            state={p.state}
            status={p.status}
            body={p.body}
            meta={p.meta}
            href={p.slug ? `/projects/${p.slug}` : undefined}
          />
        ))}
      </div>
    </section>
  );
}
