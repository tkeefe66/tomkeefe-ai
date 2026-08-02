import * as React from 'react';

/**
 * Small tinted label. `live`/`draft` variants carry the site's status vocabulary
 * (Live, Draft, In development, Internal, TBC) with a leading status square.
 */
export interface TagProps {
  variant?: 'accent' | 'neutral' | 'outline' | 'live' | 'draft';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
