import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";
import { getProjectDetail } from "@/content/projects";

const project = getProjectDetail("life-tracker");

export const metadata: Metadata = {
  title: `${project.title} — Tom Keefe`,
  description: project.premise,
  alternates: { canonical: "/projects/life-tracker" },
  openGraph: {
    title: `${project.title} — Tom Keefe`,
    description: project.premise,
    url: "/projects/life-tracker",
    type: "website",
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return <ProjectPage slug="life-tracker" />;
}
