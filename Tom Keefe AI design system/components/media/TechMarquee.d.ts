/**
 * The tools strip: a slow edge-masked scroll on a deep color field, sitting
 * directly beneath the masthead. The item list is rendered twice so the loop is seamless.
 */
export interface TechMarqueeProps {
  /** Mono label pinned left. Default "BUILT ACROSS". */
  label?: string;
  /** Tool names in sentence case. 12–15 reads best. */
  items: string[];
  /** Seconds per loop. Default 46 — slow enough to read, quiet enough to ignore. */
  duration?: number;
}
export declare function TechMarquee(props: TechMarqueeProps): JSX.Element;
