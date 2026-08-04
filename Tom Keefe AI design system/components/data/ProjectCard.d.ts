/**
 * The project card — one component for all five projects, replacing the old
 * two-tier split of featured cards plus one-line entries. Every project now has
 * a detail page and equal weight.
 *
 * Stacked full-width rows, height following content. Do NOT put these in a
 * uniform-height grid: the bodies are deliberately unequal (one runs three
 * paragraphs because it carries an origin story) and a stretched grid leaves the
 * short cards looking unfinished.
 */
export interface ProjectCardProps {
  name: string;
  /** One to three paragraphs. A single string is accepted. */
  body?: string | string[];
  /** Lifecycle state — sets the badge color. */
  state?: "live" | "progress" | "launching";
  /** Badge text: LIVE, IN PROGRESS, LAUNCHING SEPT 2026. */
  status?: string;
  /** Fragments for the annotation row. Falsy entries are dropped. */
  meta?: React.ReactNode[];
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  /** Link affordance. Default "READ →". Pass false to omit. */
  cta?: string | false;
  last?: boolean;
}
export declare function ProjectCard(props: ProjectCardProps): JSX.Element;
