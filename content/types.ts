export type LedgerRow = { label: string; value: string };
export type SiteLink = { label: "EMAIL" | "LINKEDIN" | "GITHUB"; href: string };

export type SiteContent = {
  name: string;
  domain: string;
  /** One-line description used in <title>/meta. */
  tagline: string;
  mastheadVariant: "ledger" | "column";
  masthead: {
    lead: string;
    ledger: LedgerRow[];
    column: { headline: string; support: string; facts: string[] };
  };
  techStrip: string[];
  links: SiteLink[];
  /** Short invitation. The long sentence lives in contactLine. */
  contactHeadline: string;
  contactLine: string;
  /** right is absent while the changelog values are unfilled (OPEN.md). */
  footer: { left: string; right?: string };
  notFound: { headline: string; line: string; cta: string };
};

export type RangeContent = {
  headline: string;
  /** Two paragraphs; subhead and the altitude ladder were cut in the 2026-08 rewrite. */
  paragraphs: string[];
};

export type Principle = {
  text: string;
  /** Optional receipt line tying the claim to a project (DS5 Statement annotation). */
  annotation?: string;
};

/** A homepage prose section: heading + consecutive paragraphs (ProseBlock). */
export type ProseSection = { heading: string; paragraphs: string[] };

export type ProjectRow = {
  name: string;
  /** Present = card links to /projects/<slug> and shows READ →. */
  slug?: string;
  /** Drives StatusLabel; "launching" gets the tinted capsule. */
  state: "live" | "progress" | "launching";
  /** Badge text, e.g. "LIVE" or "LAUNCHING SEPT 2026". */
  status: string;
  /** The single sentence the homepage card shows. Written to sit alone on one line. */
  line: string;
};

export type ProjectSection = {
  heading: string;
  body: string;
};

export type ProjectFigure = {
  src: string;
  alt: string;
  caption: string;
  /** Fixed plate height in px. */
  height: number;
  /** true = image at 190% width (crop pattern); false = 100% width. */
  wide: boolean;
  /** Light captures are dimmed in dark mode; dark captures opt out. */
  capture: "light" | "dark";
  /** Natural image dimensions for next/image. */
  width: number;
  naturalHeight: number;
};

export type ProjectDetail = {
  slug: string;
  number: string;
  title: string;
  menuSubtitle: string;
  premise: string;
  sections: ProjectSection[];
  facts: LedgerRow[];
  figures: ProjectFigure[];
  /** CTA pair rendered under the facts sidebar. Placeholder "#" hrefs until wired up. */
  links: { live: string; repo: string };
  /** Optional paragraph set beside the page's last figure (Life Tracker). */
  digestNote?: string;
  /** Renders the LAUNCHING SEPT 2026 capsule in the page header (Dynasty). */
  launch?: true;
  /** Per-route social card; stubs omit it and inherit the root image. */
  og?: { image: string; alt: string };
  next: { slug: string };
};
