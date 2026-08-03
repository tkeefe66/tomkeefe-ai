import type { ProjectDetail, ProjectRow } from "./types";

export const projects: ProjectRow[] = [
  {
    name: "B2B MarTech Intel",
    slug: "b2b-martech-intel",
    description:
      "Market intelligence for the GTM org — 63,731 articles ingested, categorised and tagged, with briefings, trend analysis and drafting tools on top.",
  },
  {
    name: "Inventory",
    slug: "inventory",
    description:
      "Every purchase parsed from receipts and email into one queryable ledger, with a daily digest that reads a week as behaviour.",
  },
  {
    name: "Dynasty Analyzer",
    status: "IN PROGRESS",
    description: "Trade, roster-value and draft-capital analytics for Sleeper dynasty leagues.",
  },
  {
    name: "Field Assistant",
    status: "IN PROGRESS",
    description: "Trip and photography planner — conditions, light, locations, timing.",
  },
  {
    name: "tomkeefe.ai",
    status: "LIVE",
    description: "This site — designed, written and deployed by AI agents under my direction.",
  },
];

// Narrative copy inferred from screenshots by the designer — pending Tom's
// verification (design README §Outstanding 2).
export const projectDetails: ProjectDetail[] = [
  {
    slug: "b2b-martech-intel",
    number: "PROJECT 01",
    title: "B2B MarTech Intel",
    menuSubtitle: "MARKET INTELLIGENCE · INTERNAL",
    premise:
      "A market-intelligence system for a go-to-market organisation, built so the field stops guessing what changed this week.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "Market and account signal lived in a dozen places — newsletters, alerts, analyst notes, someone's bookmarks. By the time it reached a seller it was stale, and nobody owned the job of curating it.",
      },
      {
        heading: "WHAT I BUILT",
        body: "A continuous ingest across news, GTM tech and AI sources that categorises and tags every article, tracks named companies, and refreshes every twelve minutes. On top of the same corpus sit the things people actually asked for: briefings, trend analysis, an AI analyst, and drafting tools for thought leadership and field enablement.",
      },
      {
        heading: "WHAT CHANGED",
        body: "[Outcome pending — the number you want to lead with goes here.]",
        pending: true,
      },
    ],
    facts: [
      { label: "ROLE", value: "Built and operated" },
      { label: "STACK", value: "Next.js · Claude · RSS" },
      { label: "CORPUS", value: "63,731 articles" },
      { label: "REFRESH", value: "Every 12 minutes" },
      { label: "STATUS", value: "Internal" },
    ],
    figures: [
      {
        src: "/projects/martech-intel.png",
        alt: "B2B MarTech Intel news feed",
        caption: "FIG. 01 — NEWS FEED. CATEGORY, SOURCE AND TAG FILTERS ACROSS THE FULL CORPUS.",
        height: 520,
        wide: true,
        width: 3292,
        naturalHeight: 1740,
      },
    ],
    next: { slug: "inventory", label: "NEXT — INVENTORY →" },
  },
  {
    slug: "inventory",
    number: "PROJECT 02",
    title: "Inventory",
    menuSubtitle: "LEDGER + DIGEST · LIVE",
    premise:
      "The same discipline I apply to a revenue stack, pointed at my own household: parse everything, categorise it once, query it forever.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "Purchase history is scattered across receipts, order confirmations and card statements, none of which agree on what a thing is. Spending questions that should take a second take an afternoon.",
      },
      {
        heading: "WHAT I BUILT",
        body: "An agent ingest that parses receipts and email into a single ledger — 491 items with brand, price, category, domain and type resolved automatically, and a review queue for anything it can't place confidently. Spend is tracked against the same month last year, and a daily digest rolls it up by day with behavioural tags rather than merchant names.",
      },
      {
        heading: "WHY IT MATTERS AT WORK",
        body: "It is a signal pipeline with a different subject: messy inputs, an enrichment layer, a confidence threshold, and a human review queue. Every problem in it is a problem I've solved in a CRM.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Designed and built" },
      { label: "STACK", value: "Local-first · agent ingest" },
      { label: "RECORDS", value: "491 items · 168 active" },
      { label: "NEEDS REVIEW", value: "0" },
      { label: "STATUS", value: "Live, personal" },
    ],
    figures: [
      {
        src: "/projects/inventory.png",
        alt: "Inventory items table",
        caption: "FIG. 01 — ITEM LEDGER. 491 RECORDS, AUTO-CATEGORISED, 0 AWAITING REVIEW.",
        height: 480,
        wide: true,
        width: 3302,
        naturalHeight: 1760,
      },
      {
        src: "/projects/spend-digest.png",
        alt: "Daily spend digest",
        caption: "FIG. 02 — DAILY DIGEST.",
        height: 360,
        wide: false,
        width: 918,
        naturalHeight: 1636,
      },
    ],
    digestNote:
      "Days are tagged by shape — social, delivery, rides, date — so a week reads as behaviour instead of a list of charges. It's the same instinct as a signal feed: the raw event is less useful than the pattern it belongs to.",
    next: { slug: "b2b-martech-intel", label: "NEXT — B2B MARTECH INTEL →" },
  },
];

export function getProjectDetail(slug: string): ProjectDetail {
  const detail = projectDetails.find((d) => d.slug === slug);
  if (!detail) throw new Error(`Unknown project slug: ${slug}`);
  return detail;
}
