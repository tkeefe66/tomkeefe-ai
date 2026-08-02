import Link from "next/link";
import { site } from "@/content/site";
import ThemeToggle from "@/components/ThemeToggle";

const sections = [
  { href: "#principles", label: "Principles" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main">
        <Link href="/" className="nav-brand">
          {site.name}
          <em>.</em>
        </Link>
        {sections.map((s) => (
          <Link key={s.href} href={s.href}>
            {s.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
