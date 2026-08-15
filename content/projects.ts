import type { ProjectDetail, ProjectRow } from "./types";

export const projectsIntro: string[] = [
  "Four tools and this website. Three run in production with a user base of one, which is me, and one of them I open every single day. That's the point rather than the apology: I don't recommend a workflow I haven't already run against my own data for months.",
  "The fourth goes public in September, at which point I find out whether any of this survives contact with strangers.",
  "The finished writeups cover the problem, the build, what it costs to run, and the part where it didn't work. The rest are stubs until their numbers exist — I'd rather ship a short page than invent one.",
];

export const projects: ProjectRow[] = [
  {
    name: "MarTech Intel",
    slug: "b2b-martech-intel",
    state: "live",
    status: "LIVE",
    line: "Market intelligence for a GTM org that doesn't have one.",
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
    name: "Outdoor Inventory Mgmt",
    slug: "inventory",
    state: "live",
    status: "LIVE",
    line: "Receipts and email become a gear ledger that answers back.",
    // Intentionally three units where others are two (brief: do not compress).
    body: [
      "Started as a way to stop losing track of outdoor gear. It learns what I own by parsing my receipts and email, so buying a jacket is the same act as cataloguing one. From there it reads the forecast, talks to AllTrails, and answers over Telegram: what to pack for Saturday, what's missing, what to buy before I find out about it on the trail.",
      "Then I bought a camera I couldn't operate. Instead of working through tutorials I taught the same system to teach me, which is how Field Assistant became a module rather than a project: light, conditions, location and timing for a shoot.",
    ],
    meta: [
      "over 1,000 items catalogued",
      "under $20/month",
      "began life as a spreadsheet replacement and now has opinions about golden hour",
    ],
  },
  {
    name: "Life Tracker",
    slug: "life-tracker",
    state: "live",
    status: "LIVE",
    line: "Spending and habits, tracked and then actually interpreted.",
    body: [
      "Spending and habits, tracked and then actually interpreted. Inventory reads my receipts to learn what I own; this one reads them to learn what I keep doing. Two systems parsing the same input for different reasons, which is a design I intend to fix and haven't.",
      "The only thing I've built that I open every day without deciding to.",
    ],
    // No meta row by decision: B1 + B2 deferred (OPEN.md). Do not pad.
  },
  {
    name: "Outdoor Telegram Agent",
    slug: "outdoor-telegram-agent",
    state: "live",
    status: "LIVE",
    line: "Writeup coming.",
    body: ["Not written up yet."],
  },
  {
    name: "Dynasty Analyzer",
    slug: "dynasty-analyzer",
    state: "live",
    status: "LIVE",
    line: "Trade and roster valuation for Sleeper dynasty leagues.",
    body: [
      "Trade evaluation, roster valuation and draft-capital modeling for Sleeper dynasty leagues. Built across one offseason so my league could stop arguing about whether a trade was fair and start losing that argument with numbers.",
      "Launching in September because that's when the arguing starts.",
    ],
    meta: [
      "Free, and staying free",
      "2 leagues in beta, both of them people I know",
      "built entirely in the offseason, which means it goes live having never been tested under real traffic",
    ],
  },
  {
    name: "tomkeefe.ai",
    slug: "tomkeefe-ai",
    state: "live",
    status: "LIVE",
    line: "This site. Written, designed and deployed by agents.",
    body: [
      "This site. Written, designed and deployed by agents under my direction. The footer isn't a joke.",
    ],
    // B7 fragments derived from the repo's own history (plan docs + commit
    // 2c69b08); cost fragment still unfilled — dropped cleanly by MetaRow.
    meta: [
      "three rewrites in its first two weeks",
      null,
      "shipped grays that failed WCAG AA until an audit caught them",
    ],
  },
  // Four added 2026-08-14 to get the full nine onto the layout. Copy is
  // deliberately a placeholder — no invented scale, cost or narrative.
  {
    name: "Camera Agent",
    slug: "camera-agent",
    state: "live",
    status: "LIVE",
    line: "Writeup coming.",
    body: ["Not written up yet."],
  },
  {
    name: "Job Search",
    slug: "job-search",
    state: "live",
    status: "LIVE",
    line: "Writeup coming.",
    body: ["Not written up yet."],
  },
  {
    name: "Family Tree",
    slug: "family-tree",
    state: "live",
    status: "LIVE",
    line: "Writeup coming.",
    body: ["Not written up yet."],
  },
  {
    name: "Code Coach",
    slug: "code-coach",
    state: "live",
    status: "LIVE",
    line: "Writeup coming.",
    body: ["Not written up yet."],
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
        heading: "WHAT IT DOES",
        body: "One email, every morning. Everything that moved overnight in B2B martech, filtered to the topics and the specific companies I care about — plus how the narrative shifted over the week, which is the part no newsletter gives you. It replaced a reading habit I kept failing to maintain, and it does the job a company this size would otherwise have to hire an analyst for.",
      },
      {
        heading: "WHAT I BUILT",
        body: "A continuous ingest across news, GTM tech and AI sources that categorizes and tags every article, tracks named companies, and refreshes every twelve minutes. On top of the same corpus sit the things people actually asked for: briefings, trend analysis, an AI analyst, and drafting tools for thought leadership and field enablement. It also tracks how the narrative moves over weeks, not just what happened yesterday.",
      },
      {
        heading: "WHERE IT BROKE",
        body: "The first version treated content generation as a slide-deck problem: eight rigid layout types, a dedicated outline-editing page, seven specialized slide-rendering functions. One commit tore all of it out — over 4,000 lines — and replaced it with a plain four-part format: headline, story arc, outline, talk track. The deck system was the single biggest thing this project built and then had to unbuild.",
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
    og: { image: "/og/b2b-martech-intel.png", alt: "MarTech Intel — Tom Keefe" },
    next: { slug: "inventory" },
  },
  {
    slug: "inventory",
    number: "PROJECT 02",
    title: "Outdoor Inventory Mgmt",
    menuSubtitle: "LEDGER + DIGEST · LIVE",
    premise:
      "Started as a way to stop losing track of outdoor gear: it learns what I own by parsing receipts and email, so buying a jacket is the same act as cataloguing one.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "Purchase history is scattered across receipts, order confirmations and card statements, none of which agree on what a thing is. Spending questions that should take a second take an afternoon.",
      },
      {
        heading: "WHAT IT DOES",
        body: "Buying a jacket and logging it are the same act — there's no separate step to forget. It reads the forecast, checks trail conditions on AllTrails, and answers back over Telegram: what to pack for Saturday, what's missing, and what to buy before I find out about it on the trail. It replaces a spreadsheet I never trusted to be current, and it catches a gear gap before the trip does, not after.",
      },
      {
        heading: "WHAT I BUILT",
        body: "An agent ingest that parses receipts and email into a single ledger — over 1,000 items with brand, price, category, domain and type resolved automatically, and a review queue for anything it can't place confidently.",
      },
      {
        heading: "THE CAMERA DETOUR",
        body: "Then I bought a Sony camera I couldn't operate. The manual assumed I knew what aperture was for; the tutorials assumed I had evenings free. Instead of working through either, I taught the same system to teach me — which is how Field Assistant became a module rather than a project. It already knew my gear, my trails and my weekends from the ledger; now it reads light, conditions, location and timing for a shoot, and folds the answer into the same Telegram thread as the packing list. I still can't recite the exposure triangle. The camera comes home with usable photographs anyway, which was the actual requirement.",
      },
      {
        heading: "WHERE IT BROKE",
        body: "A security audit against the live site found the login check failed open: if the WEB_USER and WEB_PASSWORD environment variables were ever unset, the middleware treated that as no login required instead of a 401 — silently, no log or alert — on every route, including the paid Claude endpoints. The variables were set the whole time the audit ran, so nothing was actually exposed, but the failure mode was the load-bearing one: a redeploy that dropped those two variables would have opened the entire app to anyone who found the URL. The fix replaced the fall-open check with a fail-closed authGate, tested directly instead of only through the live route.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Designed and built" },
      { label: "STACK", value: "Local-first · agent ingest" },
      { label: "RECORDS", value: "1,000+ items" },
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
    ],
    og: { image: "/og/inventory.png", alt: "Outdoor Inventory Mgmt — Tom Keefe" },
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
        heading: "THE PROBLEM",
        body: "The first version of this app demanded a log entry for everything, and it died from being too demanding to keep using. What I actually wanted was one honest weekly answer — am I doing the things I said I would — without turning the seeking of that answer into a chore. The nearest data was already sitting in email and on the calendar, which is also where Inventory looks for the same purchases, for a different reason: two systems reading the same receipts, one to learn what I own and one to learn what I keep doing. That's a design I intend to fix and haven't.",
      },
      {
        heading: "WHAT IT DOES",
        body: "One weekly question, answered without turning the answering into a chore: am I doing the things I said I would. Orders, rides and plans with other people show up on their own, pulled from the email and calendar I already keep — there's no separate step to log them, so nothing gets missed because logging it felt like a hassle. Gym, drinks, anything private stay manual, but manual means one tap, five seconds, from the same screen. A hit week reads as complete rather than celebrated, a miss reads as a fact rather than a scold — no streak, no gold star, no gamified guilt. It stays effortless enough to actually keep using, and in the same glance it answers a second question: not just whether I did the thing, but what the week actually cost.",
      },
      {
        heading: "WHAT I BUILT",
        body: "Passive ingestion runs as three scheduled jobs: email receipts route to an order or a ride by sender and subject rules, with an AI classifier as fallback for anything the rules can't place; calendar events get scored social or not by the same kind of model, with confirmed corrections on recurring series fed back as examples so one wrong call doesn't repeat all season; a bank sync reclassifies every transaction on every run, not just the new ones, so fixing an account's role retroactively fixes every row that touched it. One override-and-learning pattern covers all three — the AI verdict and the user's correction live in separate columns, resolved in SQL, and only a confirmed correction changes anything. Failures never crash the app or log raw error text — one of the outbound calls carries a credential that can never be allowed to reach an exception message. A weekly reflection is generated once, cached, and reused.",
      },
      {
        heading: "WHERE IT BROKE",
        body: "A credential tied to the bank sync reached the deploy logs anyway. httpx, the library making that outbound call, logs every request URL at INFO by default — a path the app's own safeguard doesn't cover, because that safeguard only intercepts raised exceptions, and nothing here was ever raised to trigger it. The fix didn't extend the exception boundary; it closed the leak at the source. main.py now pins httpx and httpcore to WARNING immediately after logging starts, so the credential-bearing request never reaches a log line at all. A regression test locks the exact configured level rather than the effective one, because under pytest the effective level already reads correctly — for the wrong reason, the same kind of pass that let the original gap through review once already.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Built and operated" },
      { label: "STACK", value: "Python · FastAPI · Claude · Postgres" },
      { label: "METRICS", value: "5 scored, weekly" },
      { label: "REFLECTION", value: "One Claude call, weekly" },
      { label: "STATUS", value: "Live, personal" },
    ],
    figures: [
      {
        src: "/projects/spend-digest.png",
        alt: "Daily spend digest",
        caption: "FIG. 01 — DAILY DIGEST.",
        height: 360,
        wide: false,
        capture: "light",
        width: 918,
        naturalHeight: 1636,
      },
    ],
    digestNote:
      "Days are tagged by shape — social, delivery, rides, date — so a week reads as behavior instead of a list of charges. It's the same instinct as a signal feed: the raw event is less useful than the pattern it belongs to.",
    next: { slug: "outdoor-telegram-agent" },
  },
  {
    slug: "outdoor-telegram-agent",
    number: "PROJECT 04",
    title: "Outdoor Telegram Agent",
    menuSubtitle: "LIVE",
    premise: "Not written up yet.",
    sections: [
      {
        heading: "THE SHORT VERSION",
        body: "This one is on the list and not yet documented. The writeup lands when there is something true to say about what it costs, what it does and where it broke.",
      },
    ],
    facts: [{ label: "STATUS", value: "Live" }],
    figures: [],
    next: { slug: "dynasty-analyzer" },
  },
  // Stub gated on B4 — card body + launch marker only.
  {
    slug: "dynasty-analyzer",
    number: "PROJECT 05",
    title: "Dynasty Analyzer",
    menuSubtitle: "SLEEPER ANALYTICS · SEPT 2026",
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
      { label: "STATUS", value: "Live" },
    ],
    figures: [],
    next: { slug: "tomkeefe-ai" },
  },
  // Stub pending B7 — card body + short intro only.
  {
    slug: "tomkeefe-ai",
    number: "PROJECT 06",
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
    next: { slug: "camera-agent" },
  },
  // Placeholder records for the four projects added on 2026-08-14. Each one
  // says only that it exists — the writeup replaces this wholesale.
  {
    slug: "camera-agent",
    number: "PROJECT 07",
    title: "Camera Agent",
    menuSubtitle: "LIVE",
    premise: "Not written up yet.",
    sections: [
      {
        heading: "THE SHORT VERSION",
        body: "This one is on the list and not yet documented. The writeup lands when there is something true to say about what it costs, what it does and where it broke.",
      },
    ],
    facts: [{ label: "STATUS", value: "Live" }],
    figures: [],
    next: { slug: "job-search" },
  },
  {
    slug: "job-search",
    number: "PROJECT 08",
    title: "Job Search",
    menuSubtitle: "LIVE",
    premise: "Not written up yet.",
    sections: [
      {
        heading: "THE SHORT VERSION",
        body: "This one is on the list and not yet documented. The writeup lands when there is something true to say about what it costs, what it does and where it broke.",
      },
    ],
    facts: [{ label: "STATUS", value: "Live" }],
    figures: [],
    next: { slug: "family-tree" },
  },
  {
    slug: "family-tree",
    number: "PROJECT 09",
    title: "Family Tree",
    menuSubtitle: "LIVE",
    premise: "Not written up yet.",
    sections: [
      {
        heading: "THE SHORT VERSION",
        body: "This one is on the list and not yet documented. The writeup lands when there is something true to say about what it costs, what it does and where it broke.",
      },
    ],
    facts: [{ label: "STATUS", value: "Live" }],
    figures: [],
    next: { slug: "code-coach" },
  },
  {
    slug: "code-coach",
    number: "PROJECT 10",
    title: "Code Coach",
    menuSubtitle: "LIVE",
    premise: "Not written up yet.",
    sections: [
      {
        heading: "THE SHORT VERSION",
        body: "This one is on the list and not yet documented. The writeup lands when there is something true to say about what it costs, what it does and where it broke.",
      },
    ],
    facts: [{ label: "STATUS", value: "Live" }],
    figures: [],
    next: { slug: "b2b-martech-intel" },
  },
];

export function getProjectDetail(slug: string): ProjectDetail {
  const detail = projectDetails.find((d) => d.slug === slug);
  if (!detail) throw new Error(`Unknown project slug: ${slug}`);
  return detail;
}
