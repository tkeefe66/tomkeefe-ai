/**
 * Opens every section: a headline plus one line of muted subhead.
 * There are no mono section labels and no rules between sections — this is the only divider.
 */
export interface SectionHeadingProps {
  /** Written as a full sentence, ending in a period. */
  title: string;
  /** One line. Optional but used almost everywhere. */
  subhead?: string;
  /** "contact" is a size up, for the closing band. Default "section". */
  size?: "section" | "contact";
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
