/**
 * Mono-label action. Primary is a filled accent (or white on a deep field);
 * secondary is a hairline outline. Never more than one primary per group.
 */
export interface ButtonProps {
  /** Visual weight. Default "primary". */
  variant?: "primary" | "secondary" | "disabled";
  /** Renders as an anchor when set. */
  href?: string;
  /** Set true when the button sits on an --acc-deep color field. */
  onField?: boolean;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
