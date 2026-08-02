import * as React from 'react';

/** Numbered aphorism row — accent index number, semibold statement, optional Draft tag; 1px bottom rule. */
export interface PrincipleProps {
  /** Two-digit index, e.g. "01" */
  num: string;
  /** Optional status tag text, e.g. "Draft" */
  tag?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Principle(props: PrincipleProps): JSX.Element;
