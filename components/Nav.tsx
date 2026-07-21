import Link from "next/link";
import { site } from "@/content/site";

const sections = [
  { href: "#principles", label: "Principles" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur-md">
      <nav className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="shrink-0 font-display text-lg font-extrabold uppercase tracking-tight text-ink transition-colors hover:text-accent"
        >
          {site.name}
        </Link>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-x-8">
          {sections.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="font-body text-xs font-semibold uppercase tracking-wide text-muted decoration-accent-vivid decoration-2 underline-offset-4 transition-colors hover:text-accent hover:underline sm:text-sm"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
