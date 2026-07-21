import { projects } from "@/content/projects";
import type { ProjectStatus } from "@/content/types";

const statusStyles: Record<ProjectStatus, string> = {
  Live: "border-accent/60 text-accent",
  "In development": "border-ink/30 text-ink/80",
  Internal: "border-muted/40 text-muted",
};

const statusDot: Record<ProjectStatus, string> = {
  Live: "bg-accent",
  "In development": "bg-ink/60",
  Internal: "bg-muted/60",
};

export default function Projects() {
  return (
    <section id="projects" className="border-b border-border bg-surface/40 px-5 py-24 sm:px-8 sm:py-32">
      <h2 className="mb-12 font-display text-3xl font-black uppercase tracking-tight text-ink sm:mb-16 sm:text-5xl">
        Projects
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className={`flex flex-col gap-5 border border-border bg-surface p-6 transition-colors hover:border-border-strong sm:p-8 ${
              project.flagship ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink sm:text-3xl">
                {project.name}
              </h3>
              <span
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-widest ${statusStyles[project.status]}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusDot[project.status]}`} aria-hidden="true" />
                {project.status}
              </span>
            </div>
            <p className="max-w-[65ch] font-body text-sm font-medium leading-relaxed text-muted sm:text-base">
              {project.description}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border px-2 py-1 font-body text-[11px] font-semibold uppercase tracking-wide text-ink/70"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm font-semibold text-accent transition-colors hover:text-ink"
              >
                {project.link.replace(/^https?:\/\//, "")} ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
