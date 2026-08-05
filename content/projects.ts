import type { ProjectDetail, ProjectRow } from "./types";

export const projects: ProjectRow[] = [
  {
    name: "MarTech Intel",
    slug: "b2b-martech-intel",
    state: "live",
    status: "LIVE",
    body: [
      "A market intelligence function for a GTM org that doesn't have one. It watches B2B martech coverage, filters against the topics and specific companies I care about, and sends one digest email every morning. It also tracks how the narrative moves over weeks, not just what happened yesterday.",
    ],
    meta: [
      "63,731 articles ingested",
      "under $10/month to run",
      "took over a month, mostly because v1 also insisted on building slide decks",
    ],
  },
  {
    name: "Inventory",
    slug: "inventory",
    state: "live",
    status: "LIVE",
    // Intentionally three units where others are two (brief: do not compress).
    body: [
      "Started as a way to stop losing track of outdoor gear. It learns what I own by parsing my receipts and email, so buying a jacket is the same act as cataloguing one. From there it reads the forecast, talks to AllTrails, and answers over Telegram: what to pack for Saturday, what's missing, what to buy before I find out about it on the trail.",
      "Then I bought a camera I couldn't operate. Instead of working through tutorials I taught the same system to teach me, which is how Field Assistant became a module rather than a project: light, conditions, location and timing for a shoot.",
    ],
    // B5 (items catalogued) unfilled — first clause omitted, logged in OPEN.md.
    meta: [
      null,
      "under $20/month",
      "began life as a spreadsheet replacement and now has opinions about golden hour",
    ],
  },
  {
    name: "Life Tracker",
    state: "live",
    status: "LIVE",
    body: [
      "Spending and habits, tracked and then actually interpreted. Inventory reads my receipts to learn what I own; this one reads them to learn what I keep doing. Two systems parsing the same input for different reasons, which is a design I intend to fix and haven't.",
      "The only thing I've built that I open every day without deciding to.",
    ],
    // No meta row by decision: B1 + B2 deferred (OPEN.md). Do not pad.
  },
  {
    name: "Dynasty Analyzer",
    state: "launching",
    status: "LAUNCHING SEPT 2026",
    body: [
      "Trade evaluation, roster valuation and draft-capital modeling for Sleeper dynasty leagues. Built across one offseason so my league could stop arguing about whether a trade was fair and start losing that argument with numbers.",
      "Launching in September because that's when the arguing starts.",
    ],
    // B4 (leagues modeled) unfilled — middle clause omitted, logged in OPEN.md.
    meta: [
      "Free, and staying free",
      null,
      "built entirely in the offseason, which means it goes live having never been tested under real traffic",
    ],
  },
  {
    name: "tomkeefe.ai",
    state: "live",
    status: "LIVE",
    body: [
      "This site. Written, designed and deployed by agents under my direction. The footer isn't a joke.",
    ],
    // B7 wholly unfilled — third line dropped entirely rather than partial (OPEN.md).
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
      "A market-intelligence system for a go-to-market organization, built so the field stops guessing what changed this week.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "Market and account signal lived in a dozen places — newsletters, alerts, analyst notes, someone's bookmarks. By the time it reached a seller it was stale, and nobody owned the job of curating it.",
      },
      {
        heading: "WHAT I BUILT",
        body: "A continuous ingest across news, GTM tech and AI sources that categorizes and tags every article, tracks named companies, and refreshes every twelve minutes. On top of the same corpus sit the things people actually asked for: briefings, trend analysis, an AI analyst, and drafting tools for thought leadership and field enablement.",
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
        capture: "light",
        width: 3292,
        naturalHeight: 1740,
      },
    ],
    next: { slug: "inventory" },
  },
  {
    slug: "inventory",
    number: "PROJECT 02",
    title: "Inventory",
    menuSubtitle: "LEDGER + DIGEST · LIVE",
    premise:
      "The same discipline I apply to a revenue stack, pointed at my own household: parse everything, categorize it once, query it forever.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "Purchase history is scattered across receipts, order confirmations and card statements, none of which agree on what a thing is. Spending questions that should take a second take an afternoon.",
      },
      {
        heading: "WHAT I BUILT",
        body: "An agent ingest that parses receipts and email into a single ledger — 491 items with brand, price, category, domain and type resolved automatically, and a review queue for anything it can't place confidently. Spend is tracked against the same month last year, and a daily digest rolls it up by day with behavioral tags rather than merchant names.",
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
        caption: "FIG. 01 — ITEM LEDGER. 491 RECORDS, AUTO-CATEGORIZED, 0 AWAITING REVIEW.",
        height: 480,
        wide: true,
        capture: "dark",
        width: 3302,
        naturalHeight: 1760,
      },
      {
        src: "/projects/spend-digest.png",
        alt: "Daily spend digest",
        caption: "FIG. 02 — DAILY DIGEST.",
        height: 360,
        wide: false,
        capture: "light",
        width: 918,
        naturalHeight: 1636,
      },
    ],
    digestNote:
      "Days are tagged by shape — social, delivery, rides, date — so a week reads as behavior instead of a list of charges. It's the same instinct as a signal feed: the raw event is less useful than the pattern it belongs to.",
    next: { slug: "b2b-martech-intel" },
  },
];

export function getProjectDetail(slug: string): ProjectDetail {
  const detail = projectDetails.find((d) => d.slug === slug);
  if (!detail) throw new Error(`Unknown project slug: ${slug}`);
  return detail;
}
