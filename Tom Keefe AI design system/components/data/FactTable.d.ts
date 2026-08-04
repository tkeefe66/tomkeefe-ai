/**
 * The ledger. Label left, value right, mono throughout, opened by a heavy rule.
 * Used in the masthead and on every project page — it is the brand's signature element.
 */
export interface FactTableRow { label: string; value: string; }
export interface FactTableProps {
  /** Labels are UPPERCASE single words where possible. Four to six rows. */
  rows: FactTableRow[];
  /** Set true on an --acc-deep field so the rules and text flip to white alphas. */
  onField?: boolean;
  /** Collapses the rows behind a mono disclosure line at or below --bp-mobile. Desktop is unaffected. */
  collapsible?: boolean;
  /** Label on the collapsed disclosure line. */
  summary?: string;
}
export declare function FactTable(props: FactTableProps): JSX.Element;
