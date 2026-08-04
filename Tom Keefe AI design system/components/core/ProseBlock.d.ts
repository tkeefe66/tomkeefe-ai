/**
 * Multi-paragraph running text. The site is otherwise display type, mono labels
 * and fragments; this is the only component set for sustained reading.
 *
 * Uses the existing type scale — no new sizes were needed. `prose` is
 * --size-body-lg at --measure-prose (66ch) in --body; `row` is the shorter,
 * muted variant used inside a project card. Paragraph gap is tighter than the
 * section rhythm on purpose, so paragraphs of unequal length still read as one
 * continuous argument rather than separate blocks.
 */
export interface ProseBlockProps {
  /** Paragraphs in order. A single string is accepted. Falsy entries are dropped. */
  paragraphs?: string | React.ReactNode[];
  /** "prose" for long-form sections, "row" for card bodies. Default "prose". */
  size?: "prose" | "row";
  /** Escape hatch for outer margin only — do not restyle type here. */
  style?: React.CSSProperties;
}
export declare function ProseBlock(props: ProseBlockProps): JSX.Element;
