import type { SiteContent } from "./types";

export const site: SiteContent = {
  name: "Tom Keefe",
  domain: "tomkeefe.ai",
  tagline: "Building Products that I need",
  // Ledger is the shipped masthead; Column is the approved backup. Flip to
  // "column" to compare — do not delete either variant.
  mastheadVariant: "ledger",
  masthead: {
    lead: "Building Products that I need",
    ledger: [
      { label: "ROLE", value: "Director, GTM Experts at Demandbase" },
      // Newline is intentional — the ledger value renders `pre-line` so the
      // second clause starts its own row instead of wrapping mid-sentence.
      { label: "YEARS", value: "13 in GTM Strategy/Ops\n6mo building AI products" },
      { label: "STATUS", value: "The agents are typing" },
    ],
    column: {
      headline: "Every GTM team is running on systems somebody had to build.",
      support:
        "Usually badly, usually undocumented, usually by whoever was closest. For thirteen years that person has been me — and I've made a career of turning that improvisation into infrastructure.",
      facts: ["DIRECTOR", "GTM EXPERTS", "DEMANDBASE", "13 YEARS IN GTM"],
    },
  },
  // Build-stack confirmed 2026-08-15 by scanning all 9 repos in ~/Code Apps
  // (manifests + infra files, then grep-verified).
  techStrip: [
    "Claude Code", "Anthropic API", "Python", "FastAPI", "TypeScript", "Next.js",
    "React", "Postgres", "Docker", "Railway", "Vercel", "Google Cloud",
    "AllTrails", "Telegram", "SimpleFin", "Cloudflare", "Porkbun", "Whispr API",
  ],
  links: [
    { label: "EMAIL", href: "mailto:tkeefe66@gmail.com" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/tomkeefesmc" },
    { label: "GITHUB", href: "https://github.com/tkeefe66" },
  ],
  contactHeadline: "Let's talk.",
  contactLine:
    "Most of what's on this page started as a problem I was annoyed about. Happy to talk through any of it, or yours.",
  footer: { left: "© 2026 Tom Keefe" },
  notFound: {
    headline: "404",
    line: "This page doesn't exist. The systems do.",
    cta: "← BACK TO HOME",
  },
};
