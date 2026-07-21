export type Stat = { value: string; label: string; placeholder: boolean };

export type Principle = { text: string; draft: boolean };

export type ProjectStatus = "Live" | "In development" | "Internal";

export type Project = {
  name: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  link?: string;
  flagship?: boolean;
};

export type SkillCategory = { title: string; items: string[] };

export type ContactLink = { label: string; href: string; comingSoon?: boolean };

export type SiteContent = {
  name: string;
  domain: string;
  tagline: string;
  taglineAlternates: string[];
  credential: string;
  about: { bio: string };
  skills: SkillCategory[];
  contact: ContactLink[];
  notFound: { headline: string; line: string; cta: string };
};
