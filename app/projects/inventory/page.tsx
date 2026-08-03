import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";
import { getProjectDetail } from "@/content/projects";

const project = getProjectDetail("inventory");

export const metadata: Metadata = {
  title: `${project.title} — Tom Keefe`,
  description: project.premise,
  alternates: { canonical: "/projects/inventory" },
  openGraph: {
    title: `${project.title} — Tom Keefe`,
    description: project.premise,
    url: "/projects/inventory",
    type: "website",
  },
};

export default function Page() {
  return <ProjectPage slug="inventory" />;
}
