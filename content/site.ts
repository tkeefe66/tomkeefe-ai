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
  subline:
    "Automation, internal tooling, and revenue data infrastructure for B2B teams.",
  contactHeadline: "Let's wire something together.",
  about: {
    bio: "Player-coach GTM systems leader with 13+ years building the technical backbone of B2B revenue engines. Architects automation, internal tooling, and revenue data infrastructure that connect Sales, SDR, Marketing, and CS into a single operating system. Customer Zero by instinct — operates the GTM product daily, invents the workflows customers later adopt, and feeds that operating knowledge back into the product org. Currently building AI-driven workflows in Claude.",
  },
  skills: [
    { title: "GTM Automation", items: ["Workflow design", "Process automation", "Playbook systems"] },
    { title: "Data & Enrichment", items: ["Account data", "Signal pipelines", "SQL"] },
    { title: "AI Agents", items: ["Claude Code", "Agent workflows", "LLM integrations"] },
    { title: "RevOps Tooling", items: ["CRM systems", "Routing & territories", "Reporting"] },
  ],
  contact: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tomkeefesmc" },
    { label: "Email", href: "mailto:tkeefe66@gmail.com" },
    { label: "GitHub", href: "https://github.com/tkeefe66" },
  ],
  notFound: {
    headline: "404",
    line: "This page doesn't exist. The systems do.",
    cta: "Back to home",
  },
};
