import * as React from 'react';

/** Header bar — brand wordmark (red terminal period) flush left, links right, 2px bottom rule; optional theme toggle. */
export interface NavBarProps {
  links?: { label: string; href: string }[];
  /** href of the active link */
  current?: string;
  /** If given, renders a small theme toggle button */
  onToggleTheme?: () => void;
  themeLabel?: string;
  style?: React.CSSProperties;
}
export declare function NavBar(props: NavBarProps): JSX.Element;
