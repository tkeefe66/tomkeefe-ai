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
  contactHeadline: string;
  footer: { left: string; right: string };
  notFound: { headline: string; line: string; cta: string };
};

export type RangeContent = {
  headline: string;
  subhead: string;
  paragraph: string;
  altitudes: { label: string; text: string }[];
};

export type Principle = { text: string };

export type ProjectRow = {
  name: string;
  description: string;
  /** Present = row links to /projects/<slug> and shows READ →. */
  slug?: string;
  /** Inert rows only. */
  status?: "IN PROGRESS" | "LIVE";
};

export type ProjectSection = {
  heading: string;
  body: string;
  /** Renders in --faint: outcome placeholder awaiting a real metric. */
  pending?: boolean;
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
  /** Inventory only: paragraph beside FIG. 02. */
  digestNote?: string;
  next: { slug: string };
};
