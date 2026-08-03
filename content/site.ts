import type { SiteContent } from "./types";

export const site: SiteContent = {
  name: "Tom Keefe",
  domain: "tomkeefe.ai",
  tagline:
    "I build the systems that carry go-to-market — the automation, the data model, and the tooling underneath the number.",
  // Ledger is the shipped masthead; Column is the approved backup. Flip to
  // "column" to compare — do not delete either variant.
  mastheadVariant: "ledger",
  masthead: {
    lead: "I build the systems that carry go-to-market — the automation, the data model, and the tooling underneath the number.",
    ledger: [
      { label: "ROLE", value: "Director, GTM Experts" },
      { label: "COMPANY", value: "Demandbase" },
      { label: "FIELD", value: "MOps · RevOps · GTM" },
      { label: "YEARS", value: "13" },
      { label: "STATUS", value: "Open to conversation" },
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
    "If something in your stack is held together by a Friday afternoon, let's talk.",
  footer: { left: "© 2026 TOM KEEFE", right: "DIRECTED BY A HUMAN. BUILT WITH AGENTS." },
  notFound: {
    headline: "404",
    line: "This page doesn't exist. The systems do.",
    cta: "← BACK TO HOME",
  },
};
