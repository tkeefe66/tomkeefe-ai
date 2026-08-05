import type { ProjectDetail, ProjectRow } from "./types";

export const projectsIntro: string[] = [
  "Four tools and this website. Three run in production with a user base of one, which is me, and one of them I open every single day. That's the point rather than the apology: I don't recommend a workflow I haven't already run against my own data for months.",
  "The fourth goes public in September, at which point I find out whether any of this survives contact with strangers.",
  "Each writeup covers the problem, the build, what it costs to run, and the part where it didn't work.",
];

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
    slug: "life-tracker",
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
    slug: "dynasty-analyzer",
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
    slug: "tomkeefe-ai",
    state: "live",
    status: "LIVE",
    body: [
      "This site. Written, designed and deployed by agents under my direction. The footer isn't a joke.",
    ],
    // B7 wholly unfilled — third line dropped entirely rather than partial (OPEN.md).
  },
];

export const projectDetails: ProjectDetail[] = [
  {
    slug: "b2b-martech-intel",
    number: "PROJECT 01",
    title: "MarTech Intel",
    menuSubtitle: "MARKET INTELLIGENCE · INTERNAL",
    premise:
      "A market intelligence function for a GTM org that doesn't have one — filtered against the topics and companies I care about, delivered as one digest email every morning.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "Market and account signal lived in a dozen places — newsletters, alerts, analyst notes, someone's bookmarks. By the time it reached a seller it was stale, and nobody owned the job of curating it.",
      },
      {
        heading: "WHAT I BUILT",
        body: "A continuous ingest across news, GTM tech and AI sources that categorizes and tags every article, tracks named companies, and refreshes every twelve minutes. On top of the same corpus sit the things people actually asked for: briefings, trend analysis, an AI analyst, and drafting tools for thought leadership and field enablement. It also tracks how the narrative moves over weeks, not just what happened yesterday.",
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
        alt: "MarTech Intel news feed",
        caption: "FIG. 01 — NEWS FEED. CATEGORY, SOURCE AND TAG FILTERS ACROSS THE FULL CORPUS.",
        height: 520,
        wide: true,
        capture: "light",
        width: 3292,
        naturalHeight: 1740,
      },
    ],
    meta: [
      "63,731 articles ingested",
      "under $10/month to run",
      "took over a month, mostly because v1 also insisted on building slide decks",
    ],
    next: { slug: "inventory" },
  },
  {
    slug: "inventory",
    number: "PROJECT 02",
    title: "Inventory",
    menuSubtitle: "LEDGER + DIGEST · LIVE",
    premise:
      "Started as a way to stop losing track of outdoor gear: it learns what I own by parsing receipts and email, so buying a jacket is the same act as cataloguing one.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "Purchase history is scattered across receipts, order confirmations and card statements, none of which agree on what a thing is. Spending questions that should take a second take an afternoon.",
      },
      {
        heading: "WHAT I BUILT",
        body: "An agent ingest that parses receipts and email into a single ledger — 491 items with brand, price, category, domain and type resolved automatically, and a review queue for anything it can't place confidently. From there it reads the forecast, talks to AllTrails, and answers over Telegram: what to pack for Saturday, what's missing, and what to buy before I find out about it on the trail.",
      },
      {
        heading: "THE CAMERA DETOUR",
        body: "Then I bought a Sony camera I couldn't operate. The manual assumed I knew what aperture was for; the tutorials assumed I had evenings free. Instead of working through either, I taught the same system to teach me — which is how Field Assistant became a module rather than a project. It already knew my gear, my trails and my weekends from the ledger; now it reads light, conditions, location and timing for a shoot, and folds the answer into the same Telegram thread as the packing list. I still can't recite the exposure triangle. The camera comes home with usable photographs anyway, which was the actual requirement.",
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
    meta: [
      null,
      "under $20/month",
      "began life as a spreadsheet replacement and now has opinions about golden hour",
    ],
    next: { slug: "life-tracker" },
  },
  // Stub by decision (B1/B2 deferred) — card body + short intro only (OPEN.md).
  {
    slug: "life-tracker",
    number: "PROJECT 03",
    title: "Life Tracker",
    menuSubtitle: "SPEND + HABITS · LIVE",
    premise:
      "Spending and habits, tracked and then actually interpreted — the only thing I've built that I open every day without deciding to.",
    sections: [
      {
        heading: "THE SHORT VERSION",
        body: "Inventory reads my receipts to learn what I own; this one reads them to learn what I keep doing. Two systems parsing the same input for different reasons, which is a design I intend to fix and haven't. The full writeup lands when the tool's own findings are ready to publish.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Built and operated" },
      { label: "STATUS", value: "Live, personal" },
    ],
    figures: [],
    next: { slug: "dynasty-analyzer" },
  },
  // Stub gated on B4 — card body + launch marker only.
  {
    slug: "dynasty-analyzer",
    number: "PROJECT 04",
    title: "Dynasty Analyzer",
    menuSubtitle: "SLEEPER ANALYTICS · SEPT 2026",
    launch: true,
    premise:
      "Trade evaluation, roster valuation and draft-capital modeling for Sleeper dynasty leagues.",
    sections: [
      {
        heading: "THE SHORT VERSION",
        body: "Built across one offseason so my league could stop arguing about whether a trade was fair and start losing that argument with numbers. Launching in September because that's when the arguing starts.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Built and operated" },
      { label: "PRICE", value: "Free, and staying free" },
      { label: "STATUS", value: "Launching Sept 2026" },
    ],
    figures: [],
    meta: [
      "Free, and staying free",
      null,
      "built entirely in the offseason, which means it goes live having never been tested under real traffic",
    ],
    next: { slug: "tomkeefe-ai" },
  },
  // Stub pending B7 — card body + short intro only.
  {
    slug: "tomkeefe-ai",
    number: "PROJECT 05",
    title: "tomkeefe.ai",
    menuSubtitle: "THIS SITE · LIVE",
    premise: "This site. Written, designed and deployed by agents under my direction.",
    sections: [
      {
        heading: "THE SHORT VERSION",
        body: "The footer isn't a joke: every page here was built with Claude Code doing the typing, under the working agreement described on the homepage — Directed by a human. Built with agents.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Directed" },
      { label: "STATUS", value: "Live" },
    ],
    figures: [],
    next: { slug: "b2b-martech-intel" },
  },
];

export function getProjectDetail(slug: string): ProjectDetail {
  const detail = projectDetails.find((d) => d.slug === slug);
  if (!detail) throw new Error(`Unknown project slug: ${slug}`);
  return detail;
}
