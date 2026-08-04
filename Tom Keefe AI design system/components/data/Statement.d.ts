/**
 * A numbered opinion, set large. The claim is the whole component.
 *
 * `annotation` is the optional supporting line that ties the claim to a
 * project — the claim is the assertion, the annotation is the receipt. It is
 * clearly subordinate: --size-row in --muted against --size-principle above.
 * Only some opinions carry one, and the layout reserves nothing when absent, so
 * an unannotated statement never reads as missing something.
 *
 * `index` is optional. Numbering implies sequence; if these are unranked
 * assertions, omit it and put the count in the section heading instead.
 */
export interface StatementProps {
  /** Mono index (01, 02…). Optional — omit for unranked assertions. */
  index?: string;
  children?: React.ReactNode;
  /** The receipt. One or two sentences; longer than the claim is fine. */
  annotation?: React.ReactNode;
  last?: boolean;
}
export declare function Statement(props: StatementProps): JSX.Element;
