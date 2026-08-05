import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";
import { getProjectDetail } from "@/content/projects";

const project = getProjectDetail("dynasty-analyzer");

export const metadata: Metadata = {
  title: `${project.title} — Tom Keefe`,
  description: project.premise,
  alternates: { canonical: "/projects/dynasty-analyzer" },
  openGraph: {
    title: `${project.title} — Tom Keefe`,
    description: project.premise,
    url: "/projects/dynasty-analyzer",
    type: "website",
  },
};

export default function Page() {
  return <ProjectPage slug="dynasty-analyzer" />;
}
