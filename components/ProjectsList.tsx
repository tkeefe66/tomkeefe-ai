import ProjectCard from "@/components/ProjectCard";
import ProseBlock from "@/components/ProseBlock";
import { projects } from "@/content/projects";

const intro = [
  "Four tools and this website. Three run in production with a user base of one, which is me, and one of them I open every single day. That's the point rather than the apology: I don't recommend a workflow I haven't already run against my own data for months.",
  "The fourth goes public in September, at which point I find out whether any of this survives contact with strangers.",
  "Each writeup covers the problem, the build, what it costs to run, and the part where it didn't work.",
];

export default function ProjectsList() {
  return (
    <section id="projects" className="pt-12">
      <h2 className="section-h2 max-w-[22ch]">Things I built instead of waiting for a vendor.</h2>
      <ProseBlock paragraphs={intro} className="mt-[18px]" />
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
