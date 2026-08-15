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
    line: "One Telegram thread, routed to whichever agent should answer.",
    body: [
      "The Telegram side of Outdoor Inventory: one authorized thread that routes between the gear, camping and photography agents behind it, long-polled rather than served over a webhook.",
    ],
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
    line: "Tracks open roles against my own criteria, and keeps every link real.",
    body: [
      "A single-user tool that watches company career pages, scores every role against my own criteria, and keeps each link pointed at the real posting instead of a copy that will outlive it.",
    ],
  },
  {
    name: "Family Tree",
    slug: "family-tree",
    state: "live",
    status: "LIVE",
    line: "A private, invite-only family tree, walled off tenant by tenant.",
    body: [
      "A private, multi-tenant family tree that invites the relatives you want in and keeps every other family's tree out of reach — enforced by the database, not just the app.",
    ],
  },
  {
    name: "Code Coach",
    slug: "code-coach",
    state: "live",
    status: "LIVE",
    line: "Grades my own side projects and tracks what each one costs to run.",
    body: [
      "A private dashboard that grades every side project against real engineering work and tracks what each one costs to run, in place of a skill I had to remember to invoke by hand.",
    ],
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
        body: "The first version of this app died from being too demanding to keep using. What I actually wanted was one honest weekly answer — am I doing the things I said I would — without turning the seeking of that answer into a chore. The nearest data was already sitting in email and on the calendar, which is also where Inventory looks for the same purchases, for a different reason: two systems reading the same receipts, one to learn what I own and one to learn what I keep doing. That's a design I intend to fix and haven't.",
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
        body: "A credential tied to the bank sync reached the deploy logs anyway. httpx, the library making that outbound call, logs more about every call it sends than the app's own redaction boundary was built to catch — that boundary intercepts raised exceptions, and nothing here was ever raised to trigger it, so the library's own logging went uncovered by it entirely. The fix didn't extend the exception boundary; it closed the gap at the source. main.py now pins httpx and httpcore to WARNING immediately after logging starts, so the library stops narrating outbound calls at that level of detail at all. A regression test locks the exact configured level rather than the effective one, because under pytest the effective level already reads correctly — for the wrong reason, the same kind of pass that let the original gap through review once already.",
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
    menuSubtitle: "MODULE OF OUTDOOR INVENTORY · LIVE",
    premise:
      "The Telegram side of Outdoor Inventory: one authorized thread that routes between the gear, camping and photography agents, long-polled rather than served over a webhook.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "Telegram already carried the daily digest and error alerts by the time anyone asked for more — the actual want, on record, was to talk to the agent about the gear itself, from wherever, without opening claude.ai first. That's what started the whole agent phase of this project. But one channel for one agent doesn't stay one channel for long: camping and photography agents came later, and a single Telegram thread had to decide, on every incoming message, which of several agents should actually pick it up.",
      },
      {
        heading: "WHAT IT DOES",
        body: "One Telegram thread is the whole interface. The same channel that already sends the morning digest and error alerts is the one I talk back to — no separate app, no browser tab, no login screen. I can type a fast command or just ask a plain question and both get treated the same way; whichever agent actually knows the answer — gear, camping, or the newer photography one — gets the message without me choosing a screen for it first, and a photo dropped in with no explanation still lands somewhere sensible. Inside a short window the thread remembers what I was just doing, so a follow-up doesn't have to re-explain itself; wait long enough and it starts clean. It replaces opening claude.ai or a dedicated app every time I want to ask the ledger something, with a message to a thread that's already open.",
      },
      {
        heading: "WHAT I BUILT",
        body: "The bot process long-polls Telegram's getUpdates endpoint on a 25-second window instead of exposing a webhook, paging through updates by offset and dropping any chat ID that isn't on an authorized allowlist before a message reaches a handler. Incoming text tries slash-command dispatch first, then any multi-step flow already in progress, then falls back to whichever agent owns the chat's current mode — outdoor or photography — a per-chat setting persisted to disk so it survives a bot restart. Camping has no agent behind it the same way; its commands go straight through the dispatcher like every other slash command. Thirty-three distinct slash commands route through that dispatcher in total. Photos and Telegram Documents are handled differently on purpose: a compressed photo with no caption falls to whichever mode is currently set, while a file sent as a Document always routes to photography, because that's the only upload type Telegram doesn't strip EXIF data from. Outbound replies send as Markdown first; if Telegram rejects the formatting, the same text goes out a second time as plain text instead of failing silently. A separate setup script verifies the bot token against Telegram's API, captures a chat ID from a /start message, and writes it into the environment — the one manual step in an otherwise unattended deploy. The bot deploys as its own Railway service, a long-running process rather than a web server, restarted automatically if it ever exits.",
      },
      {
        heading: "WHERE IT BROKE",
        body: "Early on, replies went out with no parse_mode set at all, so any markdown an agent produced — bold text, formatting — arrived as literal asterisks instead of rendering, a bug that surfaced in acceptance testing rather than being caught before it shipped. The fix set replies to send as Markdown, wrapped in a fallback: if Telegram rejects the formatting as invalid, the same reply goes out a second time as plain text rather than never arriving at all. That fallback is still what runs today whenever a reply contains a markdown character Telegram won't parse.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Built and operated" },
      { label: "STACK", value: "TypeScript · Telegram long-polling · Railway" },
      { label: "COMMANDS", value: "33 slash commands" },
      { label: "DELIVERY", value: "25-second long-poll, no webhook" },
      { label: "STATUS", value: "Live, personal" },
    ],
    figures: [],
    next: { slug: "dynasty-analyzer" },
  },
  {
    slug: "dynasty-analyzer",
    number: "PROJECT 05",
    title: "Dynasty Analyzer",
    menuSubtitle: "SLEEPER ANALYTICS · LIVE",
    premise:
      "Trade evaluation, roster valuation and draft-capital modeling for Sleeper dynasty leagues.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "A dynasty league carries every trade on its books for years, but Sleeper keeps no verdict on any of them. Whether an old deal actually paid off is a question nobody can settle from memory — it takes the whole chain replayed against real production numbers, and the league has nothing that does that.",
      },
      {
        heading: "WHAT IT DOES",
        body: "Enter a Sleeper username, pick a league, and every trade it has ever made comes back graded — Trade Value, today's market swing, next to how each side's return actually produced across the regular season, the playoffs and the Toilet Bowl, with nothing cherry-picked out. Every owner also carries a single letter grade for the whole roster, so a standings argument and an old trade argument get settled by the same page. It replaces the group chat rehashing a deal from memory with a link someone pastes — the argument just ends there.",
      },
      {
        heading: "WHAT I BUILT",
        body: "One grading engine serves both a CLI — season simulation, trade grading, a savage weekly recap — and a multi-tenant web app, walking a league's full chain back to its origin. Trade Value is priced off KeepTradeCut and computed as a zero-sum swing between the two sides; the other four metrics work differently — received-only tallies, points scored by the assets each side received while on that side's roster, with no subtraction for what was given up. Playoff and Toilet Bowl splits are bracket-aware — a bye or an eliminated week scores zero, and placement games don't count as title-path. Every received asset carries its own journey, kept or flipped and linked forward to whatever it became. The Franchise Rating rolls a three-pillar composite into a grade off a 1500-centered number. Ingestion is platform-pluggable — a shared protocol defines the contract, and Sleeper implements it today.",
      },
      {
        heading: "WHERE IT BROKE",
        body: "One heuristic quietly ate a real league's only draft, every season. The grader read the Sleeper pool setting — whether a draft was restricted to rookies — as a stand-in for whether the draft itself was a startup, and treated an open pool as proof of one. Dynasty Chill runs its actual rookie draft every year with the pool left open, so a manager can grab a veteran instead — which meant its one draft a season was discarded from the grade, silently, every year. The fix stopped trusting the pool setting alone: an open pool is no longer read as a startup, and the question that actually separates the two — was this the league's first season — decides it instead.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Built and operated" },
      { label: "STACK", value: "Python · FastAPI · Alembic · Docker · Postgres" },
      { label: "METRICS", value: "5, every trade" },
      { label: "LEAGUES", value: "2, private beta" },
      { label: "STATUS", value: "Live, private beta" },
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
        heading: "THE PROBLEM",
        body: "The other tools on this site are real — a receipt ledger, a habit tracker, a trade grader, a news digest — but a résumé states a title and asks to be believed on faith. It doesn't link to a system that's actually running, and it never admits to what broke on the way to shipping it.",
      },
      {
        heading: "WHAT IT DOES",
        body: "A project page here follows one pattern: what it does, what it actually costs to run, and — where there's a real one — where it broke. That last part is what a résumé leaves out entirely, and it's the part that actually tells a stranger whether something works. Click through from the homepage and the whole record sits on that one page, nothing folded behind another click. It turns a claim into something anyone can go check for themselves.",
      },
      {
        heading: "WHAT I BUILT",
        body: "Content lives in typed files under content/, separate from the components that render it, so a copy edit never touches a component. Design tokens sync pull-only from a live Claude Design project into a local mirror and land as CSS custom properties in one stylesheet — every color and neutral on the site traces back to a token, never a hard-coded value in a component. Screenshots render as fixed-height figure plates, captured at roughly double width and cropped, with a gradient fade into the page background that has to hold up in both themes. A Vitest suite checks content shape — required fields present, nothing silently empty — so a bad content edit surfaces as a failing test instead of a blank page.",
      },
      {
        heading: "WHERE IT BROKE",
        body: "The band-link specificity bug took three commits in one afternoon to actually close. A catch-all rule that made every masthead-band link inherit white text beat the EMAIL button's own navy text color on specificity, rendering it white-on-white and invisible. The first fix scoped the rule to exclude the email button's class, which closed that hole but opened a related one — the ghost-button variant lost its own color the same way. A second commit extended the exclusion to cover it too. Neither felt durable, so a third commit dropped the exclusion list for a lower-specificity selector that lets any real button class win by source order instead of a hand-maintained list. In the same window, the muted gray token used for status labels and dropdown subtitles read as sufficiently faint to the eye but failed WCAG AA contrast outright — 2.60:1 light, 2.97:1 dark, against a 4.5:1 minimum. The first attempted fix didn't clear the bar either, landing at 3.82:1 and 4.12:1; a second correction was needed to actually pass, at 4.57:1 and 4.78:1.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Directed" },
      { label: "STACK", value: "Next.js · TypeScript · Railway" },
      { label: "DESIGN", value: "Navy enterprise-document, synced from Claude Design" },
      { label: "THEME", value: "Dark by default, no OS-preference fallback" },
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
    menuSubtitle: "DISCOVER + TRACK · LIVE",
    premise:
      "A single-user tool that watches company career pages, scores every role against my own criteria, and keeps each link pointed at the real posting.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "Openings for a specific function are scattered across funding and hiring news, dozens of company career pages each running a different applicant system, and job-board listings whose links usually outlive the posting they copied. Watching all of that by hand means revisiting the same pages on a schedule, and a link that still resolves says nothing about whether the role behind it is still open.",
      },
      {
        heading: "WHAT IT DOES",
        body: "It checks in on the companies I'm tracking on its own, so a new opening shows up without me revisiting the same list of career pages by hand, and it only surfaces a role once it has scored how well that specific listing matches criteria I set — title, location, tooling, pay floor — so I'm not making the same judgment call from scratch every time one appears. It also keeps the link honest: a posting that's actually closed gets marked closed instead of sitting there forever, and one that arrived through a board gets pointed back at the employer's own page instead of a copy that goes stale first. Doing any of that by hand across more than a handful of companies doesn't scale, and a link that still loads is no guarantee the role behind it still exists.",
      },
      {
        heading: "WHAT I BUILT",
        body: "Discovery runs two ways: a company mode that follows funding and hiring news for companies already being tracked, and a role mode that searches by title and by the specific tools a listing mentions, so a company that never turns up in funding coverage still surfaces. Watched companies are also crawled directly on a recurring schedule — a plain page fetch first, falling back to a broader search only when the page turns out to be a JS-rendered shell — and whichever method actually worked is remembered per company for next time. Every discovered role is scored against an editable rubric (titles, locations, tooling terms, an optional pay floor) that can be retuned from a settings page without a deploy, and a posting's compensation is parsed preferring the base figure over on-target earnings so a floor comparison isn't skewed by a number that assumes full commission. Link resolution checks a company's own applicant board through each vendor's public endpoint, but only after control-testing that vendor against a nonsense company slug — two candidates were excluded outright because they return a false success for a board that doesn't exist. A posting is only marked closed on a definitive not-found response; anything ambiguous is left for a manual pass instead of being closed against a false positive.",
      },
      {
        heading: "WHERE IT BROKE",
        body: "A sweep across the server actions looked for one specific shape: a database write's error comes back as a plain string, and an empty string is falsy, so a check written to catch a failure reads it as a success instead. That's not hypothetical: the Postgres driver rejects with an empty message whenever the database is entirely unreachable, so the failure mode is a clean build with a silently wrong screen. The sweep found the pattern in more than half a dozen places and fixed most of them in one pass; a second pass, the same day, caught the rest — including the path that saves newly discovered roles, where a failed insert would fall through to the same line that marks a role as saved, and the next scheduled check's dedupe would then treat it as already seen and skip it for good.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Built and operated" },
      { label: "STACK", value: "Next.js · TypeScript · Postgres · Anthropic" },
      { label: "BUILT", value: "164 commits, 38 test files" },
      { label: "PIPELINE", value: "13 stages, new to offer" },
      { label: "STATUS", value: "Live, personal" },
    ],
    figures: [],
    next: { slug: "family-tree" },
  },
  {
    slug: "family-tree",
    number: "PROJECT 09",
    title: "Family Tree",
    menuSubtitle: "INVITE-ONLY TREE · LIVE",
    premise:
      "A private, multi-tenant family tree: invite the relatives you want in, and the database — not just the app — keeps every other family's tree out of reach.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "A family tree usually lives in one of two places: a spreadsheet or a GEDCOM file one relative keeps and re-sends whenever it changes, or a public genealogy site that publishes it whether or not the people in it are still alive. Neither has a real notion of who's allowed to see what, and neither keeps a record of who changed a fact when someone later gets it wrong.",
      },
      {
        heading: "WHAT IT DOES",
        body: "You invite the relatives you want in, and that's the whole guest list — no public link, and nobody has to remember a separate login just to see it. A living relative's details stay out of view until you say otherwise, and correcting a fact never makes the old version disappear: it sits right next to the new one, so you can see what changed and put it back if the correction was wrong. It replaces the one shared spreadsheet nobody wanted to be the one editing, and it keeps private what a public genealogy site would otherwise publish by default.",
      },
      {
        heading: "WHAT I BUILT",
        body: "Tenancy is enforced twice — a repository layer that refuses to run a query without a tenant scope, and Postgres row-level security keyed to the same value at the database itself, so a bug in one layer alone doesn't leak one family into another's. Dates carry a qualifier — exact, about, before, after, between, unknown — alongside the raw text someone typed, so 'sometime in the 1850s' round-trips instead of getting forced into a false precision. Contact details are encrypted at rest with a key held apart from the database credentials; phone numbers are normalized to E.164 before a per-tenant HMAC hash is computed, so a duplicate can be caught without the value, or a hash of it, being comparable across two different trees. Sign-in supports a magic link, a password, or Google, and a Google account only ever links to an existing one if Google's own signing keys verify the token and report the email address confirmed. The tree can also be exported as a standard GEDCOM file, for anyone who wants a copy outside the app.",
      },
      {
        heading: "WHERE IT BROKE",
        body: "A 2026-08-11 deploy shipped code that read four new columns and a new enum before the migration adding them had been applied to production — nothing in the deploy step runs a migration automatically. The person page, the tree view and the person-details page all threw on every request for the fifteen minutes it took to apply the migration by hand. The fix wasn't just running it; it's now a written rule — migrate first, then push — plus a runbook that records exactly where the migration credential lives and how to reach it.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Built and operated" },
      { label: "STACK", value: "Next.js · Drizzle · Postgres · S3" },
      { label: "BUILT", value: "332 commits, 89 test files" },
      { label: "MIGRATIONS", value: "13, applied by hand" },
      { label: "STATUS", value: "Live, personal" },
    ],
    figures: [],
    next: { slug: "code-coach" },
  },
  {
    slug: "code-coach",
    number: "PROJECT 10",
    title: "Code Coach",
    menuSubtitle: "GRADE + COST · LIVE",
    premise:
      "Grades every side project I run against real engineering work, and tracks what each one actually costs to keep running.",
    sections: [
      {
        heading: "THE PROBLEM",
        body: "A classifier already read git history across every side project I run and tagged what kind of engineering work each commit represented, but seeing any of it meant remembering to invoke a skill by hand, so the picture went stale between runs and nothing tracked new Claude Code features as they shipped. Cost was worse: spend was scattered across eight separate Railway projects and a handful of separate Anthropic keys, with nothing that added any of it up in one place.",
      },
      {
        heading: "WHAT IT DOES",
        body: "A private dashboard, reachable from my phone, that answers two questions every morning: what am I actually building, and what does it cost to run. Every project I've shipped rolls up into one graded level, earned by the kind of engineering work that actually landed rather than a box I checked myself. It shows what the next level is still missing, flags a Claude Code feature I haven't picked up yet, and writes a short brief only when something material changed, so it never repeats yesterday's numbers back to me. What each project spends on model calls and what it costs to host both land on one page instead of chasing down each account separately. It replaces a skill I had to remember to run by hand with something that finds me instead.",
      },
      {
        heading: "WHAT I BUILT",
        body: "A local sweep runs nightly under launchd, reading git history across every registered repo and parsing Claude Code session transcripts on the same machine — raw history and prompt content never leave it. Each unit of work gets classified against a 25-tag capability taxonomy by a language model, then rolled into a rubric of count, complexity and recency gates that produces one of five levels, from Newcomer to Senior Engineer. The classified snapshot ships to a Postgres-backed API on Railway, which renders the dashboard and generates two kinds of coaching brief — a deep assessment and a short delta — gated behind a fingerprint over five underlying facts: tags used, adopted features, goal status, unit count, and the changelog watermark. A separate cost lane, built off a repo-root registry of eight projects, joins each to its Railway project and, where one exists, its Anthropic key; reporters copied into each deployed app post their own token usage back, and the sweep shells out to the Railway CLI per project, down to individual services, for infrastructure spend. The four hand-entered tables — goals, notes, dismissals, checked-off features — plus the ingested history back up to Cloudflare R2, encrypted, with the restore path verified end to end by hand; the schedule that would run it automatically hasn't been wired up yet.",
      },
      {
        heading: "WHERE IT BROKE",
        body: "Every repo-root config the server reads at boot has to be listed in the Dockerfile's COPY line. taxonomy.yaml shipped there from the start; rubric.yaml and then apps.yaml were each added to the registry later, and each time the container would have crash-looped on deploy the moment it tried to load a file the Dockerfile never copied in. Both were caught as review findings — labelled 'final-review fixes' and 'Review round 1' in the fixing commits — the same day each config was introduced, never in production. A new test, test_dockerfile_data_files.py, now asserts all three are actually copied into the image, so a fourth config landing here can't repeat the pattern.",
      },
    ],
    facts: [
      { label: "ROLE", value: "Built and operated" },
      { label: "STACK", value: "Python · FastAPI · SQLAlchemy · Anthropic" },
      { label: "BUILT", value: "198 commits, 170 test files" },
      { label: "LEVELS", value: "5, newcomer to senior" },
      { label: "STATUS", value: "Live, personal" },
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
