import type { SiteContent } from "./types";

export const site: SiteContent = {
  name: "Tom Keefe",
  domain: "tomkeefe.ai",
  tagline: "I build the tools I got tired of waiting for.",
  // Ledger is the shipped masthead; Column is the approved backup. Flip to
  // "column" to compare — do not delete either variant.
  mastheadVariant: "ledger",
  masthead: {
    lead: "I build the tools I got tired of waiting for.",
    ledger: [
      { label: "ROLE", value: "Director, GTM Experts at Demandbase" },
      // Newline is intentional — the ledger value renders `pre-line` so the
      // second clause starts its own row instead of wrapping mid-sentence.
      { label: "YEARS", value: "13 in revenue operations.\n2 building things that run without me." },
      { label: "STATUS", value: "The agents are typing." },
    ],
    column: {
      headline: "Every GTM team is running on systems somebody had to build.",
      support:
        "Usually badly, usually undocumented, usually by whoever was closest. For thirteen years that person has been me — and I've made a career of turning that improvisation into infrastructure.",
      facts: ["DIRECTOR", "GTM EXPERTS", "DEMANDBASE", "13 YEARS IN GTM"],
    },
  },
  // Unconfirmed by Tom — inferred from the old site (design README §Outstanding 3).
  techStrip: [
    "Salesforce", "Marketo", "Demandbase", "HubSpot", "Outreach", "Snowflake",
    "SQL", "dbt", "Claude Code", "Next.js", "TypeScript", "Railway", "REST APIs",
  ],
  links: [
    { label: "EMAIL", href: "mailto:tkeefe66@gmail.com" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/tomkeefesmc" },
    { label: "GITHUB", href: "https://github.com/tkeefe66" },
  ],
  contactHeadline:
    "I answer email. Especially about GTM systems, agent architecture, or why your enrichment pipeline is quietly lying to you.",
  footer: { left: "© 2026 Tom Keefe" },
  notFound: {
    headline: "404",
    line: "This page doesn't exist. The systems do.",
    cta: "← BACK TO HOME",
  },
};
