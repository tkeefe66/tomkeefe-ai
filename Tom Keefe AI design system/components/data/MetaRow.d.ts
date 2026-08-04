/**
 * The annotation line under a project card body — dot-separated fragments,
 * muted and subordinate to the paragraph above it.
 *
 * Typically three fragments: scale, cost, and what went wrong. The third is
 * often a full clause longer than the other two combined; that is the point of
 * the row and it is never truncated or ellipsed. Two fragments is a supported
 * shape, not a broken one.
 *
 * Wrapping: fragments wrap as whole units and separators are real children, so
 * no line ever begins with an orphaned "·".
 */
export interface MetaRowProps {
  /** Fragments in order. Falsy entries are dropped, so a missing value can be passed through. */
  items?: React.ReactNode[];
}
export declare function MetaRow(props: MetaRowProps): JSX.Element;
