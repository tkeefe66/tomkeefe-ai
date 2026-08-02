import * as React from 'react';

/**
 * Project card — surface fill, zero radius; kicker, status tag, title, description, stack meta row.
 * @startingPoint section="Content" subtitle="Portfolio project tile with status" viewport="360x220"
 */
export interface ProjectCardProps {
  /** Uppercase index label, e.g. "01" */
  kicker?: string;
  title: string;
  /** Status tag variant */
  status?: 'live' | 'draft' | 'neutral' | 'accent' | 'outline';
  /** Visible status text, e.g. "In development" */
  statusLabel?: string;
  body?: string;
  /** Stack/meta strings, e.g. ["Next.js","Tailwind"] */
  meta?: string[];
  style?: React.CSSProperties;
}
export declare function ProjectCard(props: ProjectCardProps): JSX.Element;
