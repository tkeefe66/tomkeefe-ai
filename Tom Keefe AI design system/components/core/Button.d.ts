import * as React from 'react';

/**
 * Action button — solid accent primary, outlined secondary, ghost accent text.
 * Labels are flush left; trailing icon follows the label, never centered gaps.
 * @startingPoint section="Core" subtitle="Primary, secondary and ghost actions" viewport="700x170"
 */
export interface ButtonProps {
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  /** Full-width, label flush left */
  block?: boolean;
  /** Trailing icon node (Lucide SVG, 16px) */
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Renders an <a> instead of <button> */
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
