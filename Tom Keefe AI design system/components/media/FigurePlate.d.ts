/**
 * How every product screenshot is shown. The image renders WIDER than its
 * container so a real region reads at native scale; the crop fades into the page.
 * Never scale a whole UI down to fit — it becomes illegible.
 */
export interface FigurePlateProps {
  src: string;
  alt: string;
  /** Mono, uppercase, numbered: "FIG. 01 — NEWS FEED." */
  caption?: string;
  /** Fixed crop height in px. 480–520 on project pages. */
  height?: number;
  /** Image width as a % of container. 190 for wide retina captures; 100 for narrow ones. */
  zoom?: number;
  /** Whether the screenshot itself is a light or dark interface. Light captures are dimmed to 82% in dark mode so they do not glare; dark captures are left alone. */
  capture?: "light" | "dark";
}
export declare function FigurePlate(props: FigurePlateProps): JSX.Element;
