import type { AnchorHTMLAttributes } from "react";

/** True for any absolute http(s) URL — the only hrefs that navigate off-site. */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Drop-in replacement for <a> that opens off-site hrefs (http/https) in a new
 * tab with rel="noopener noreferrer". Internal paths and non-navigating
 * schemes (mailto:, tel:, #anchor) render as a plain link, unchanged.
 */
export default function ExternalLink({ href, ...rest }: ExternalLinkProps) {
  const external = isExternalHref(href);
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...rest} />
  );
}
