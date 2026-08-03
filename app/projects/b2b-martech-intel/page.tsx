import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";
import { getProjectDetail } from "@/content/projects";

const project = getProjectDetail("b2b-martech-intel");

export const metadata: Metadata = {
  title: `${project.title} — Tom Keefe`,
  description: project.premise,
};

export default function Page() {
  return <ProjectPage slug="b2b-martech-intel" />;
}
