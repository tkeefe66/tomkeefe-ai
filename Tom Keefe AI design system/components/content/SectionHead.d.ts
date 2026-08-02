import * as React from 'react';

/** Section opener — strong 2px top rule, flush-left h2, right-aligned uppercase index kicker. */
export interface SectionHeadProps {
  /** Index label, e.g. "02 — Principles" */
  index?: string;
  title: string;
  style?: React.CSSProperties;
}
export declare function SectionHead(props: SectionHeadProps): JSX.Element;
