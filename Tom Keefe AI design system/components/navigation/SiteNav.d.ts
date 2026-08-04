/**
 * Sticky top bar on the deep color field, so it reads as continuous with the masthead.
 * Anchor targets need a -64px scroll offset to clear it.
 *
 * Below 760px the inline links are replaced by a mono MENU / CLOSE button that opens
 * them as a full-width panel on the field; the projects dropdown renders inline in
 * that panel rather than as a floating card.
 */
export interface NavItem { label: string; href: string; }
export interface NavProject {
  title: string;
  meta: string;
  href: string;
  /** Intercepts the click for in-page routing. Falls back to href when omitted. */
  onClick?: (e: React.MouseEvent) => void;
}
export interface SiteNavProps {
  brand?: string;
  /** Anchor links, mono uppercase. */
  items?: NavItem[];
  /** Populates the dropdown, which opens on click as well as hover. Only list projects with real pages. */
  projects?: NavProject[];
  cta?: { label: string; href: string };
  /** Intercepts the brand click — use it to route home from a project page. */
  onBrandClick?: (e: React.MouseEvent) => void;
}
export declare function SiteNav(props: SiteNavProps): JSX.Element;
