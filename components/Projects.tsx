import { projects } from "@/content/projects";
import type { ProjectStatus } from "@/content/types";

const statusTag: Record<ProjectStatus, string> = {
  Live: "tag-live",
  "In development": "tag-draft",
  Internal: "tag-neutral",
};

export default function Projects() {
  return (
    <section id="projects" className="page pb-16">
      <div className="section-head">
        <h2>Projects</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <article
            key={project.name}
            className={`card ${project.flagship ? "sm:col-span-2" : ""}`}
          >
            <div className="flex items-center gap-2">
              <span className="card-kicker flex-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`tag ${statusTag[project.status]}`}>
                {project.status}
              </span>
            </div>
            <h3 className="card-title">{project.name}</h3>
            <p className="card-body">{project.description}</p>
            <div className="card-meta">
              {project.stack.map((tech, t) => (
                <span key={tech}>
                  {tech}
                  {t < project.stack.length - 1 && " ·"}
                </span>
              ))}
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                {project.link.replace(/^https?:\/\//, "")} →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
