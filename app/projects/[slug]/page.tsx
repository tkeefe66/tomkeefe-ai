import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/ProjectPage";
import { projectDetails } from "@/content/projects";

export function generateStaticParams() {
  return projectDetails.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectDetails.find((d) => d.slug === slug);
  if (!project) notFound();

  return {
    title: `${project.title} — Tom Keefe`,
    description: project.premise,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} — Tom Keefe`,
      description: project.premise,
      url: `/projects/${slug}`,
      type: "website",
      images: project.og
        ? [{ url: project.og.image, alt: project.og.alt }]
        : ["/opengraph-image.png"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectDetails.find((d) => d.slug === slug);
  if (!project) notFound();

  return <ProjectPage slug={slug} />;
}
