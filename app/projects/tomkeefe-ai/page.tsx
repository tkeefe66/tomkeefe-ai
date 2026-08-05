import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";
import { getProjectDetail } from "@/content/projects";

const project = getProjectDetail("tomkeefe-ai");

export const metadata: Metadata = {
  title: `${project.title} — Tom Keefe`,
  description: project.premise,
  alternates: { canonical: "/projects/tomkeefe-ai" },
  openGraph: {
    title: `${project.title} — Tom Keefe`,
    description: project.premise,
    url: "/projects/tomkeefe-ai",
    type: "website",
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return <ProjectPage slug="tomkeefe-ai" />;
}
