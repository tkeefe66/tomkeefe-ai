/**
 * Small mono status marker — LIVE, IN PROGRESS, LAUNCHING SEPT 2026, PROJECT 01, READ →.
 *
 * Three project states, in descending loudness: `live` (accent — the only
 * actionable one), `progress` (muted), `launching` (accent type in a tinted
 * capsule, so it reads as anticipation rather than alert and stays legible
 * beside a LIVE badge in the same row). Never wraps.
 *
 * On the week a project ships, swap `state="launching"` for `state="live"` and
 * change the text to LIVE — the two are designed to coexist mid-transition.
 */
export interface StatusLabelProps {
  children?: React.ReactNode;
  /** Project lifecycle state. Sets its own color; overrides `tone`. */
  state?: "live" | "progress" | "launching";
  /** For non-state markers (PROJECT 01, READ →). Default "faint". */
  tone?: "accent" | "faint" | "muted" | "onField";
}
export declare function StatusLabel(props: StatusLabelProps): JSX.Element;
