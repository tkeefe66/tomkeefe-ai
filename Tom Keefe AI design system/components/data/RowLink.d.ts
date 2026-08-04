/**
 * A project index row: name, status marker, description beneath.
 * Rows that link shift 10px right on hover; unbuilt rows render muted and inert.
 */
export interface RowLinkProps {
  title: string;
  description?: string;
  /** e.g. "READ →", "IN PROGRESS", "LIVE". */
  status?: string;
  /** "accent" only when the row navigates somewhere. */
  statusTone?: "accent" | "faint";
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  /** Grays out the title for work that isn't real yet. */
  muted?: boolean;
  /** Drops the bottom hairline on the final row. */
  last?: boolean;
}
export declare function RowLink(props: RowLinkProps): JSX.Element;
