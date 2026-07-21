import type { SiteContent } from "./types";

export const site: SiteContent = {
  name: "Tom Keefe",
  domain: "tomkeefe.ai",
  tagline: "GTM runs on systems. I build them.",
  // Alternates Tom can swap in:
  taglineAlternates: [
    "I automate the work GTM teams shouldn't do by hand.",
    "I build the systems that make GTM teams move faster.",
  ],
  credential: "Director of GTM Experts @ Demandbase",
  about: {
    bio: "GTM engineer and ops builder. I spend my days making go-to-market teams faster with systems, data, and AI agents — and my nights building apps for the things I care about. [PLACEHOLDER BIO — replace with Tom's real bio.]",
  },
  skills: [
    { title: "GTM Automation", items: ["Workflow design", "Process automation", "Playbook systems"] },
    { title: "Data & Enrichment", items: ["Account data", "Signal pipelines", "SQL"] },
    { title: "AI Agents", items: ["Claude Code", "Agent workflows", "LLM integrations"] },
    { title: "RevOps Tooling", items: ["CRM systems", "Routing & territories", "Reporting"] },
  ],
  contact: [
    { label: "LinkedIn", href: "#", comingSoon: true },
    { label: "Email", href: "#", comingSoon: true },
    { label: "GitHub", href: "#", comingSoon: true },
  ],
  notFound: {
    headline: "404",
    line: "This page doesn't exist. The systems do.",
    cta: "Back to home",
  },
};
