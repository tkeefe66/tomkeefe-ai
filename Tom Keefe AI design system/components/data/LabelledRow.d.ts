/**
 * A mono label in a fixed 118px column with prose beside it — the Range ladder.
 * The label column is fixed; the prose column must stay fluid.
 */
export interface LabelledRowProps {
  /** UPPERCASE, one word where possible: C-SUITE, LEADERSHIP, PROGRAM. */
  label: string;
  children?: React.ReactNode;
  last?: boolean;
}
export declare function LabelledRow(props: LabelledRowProps): JSX.Element;
