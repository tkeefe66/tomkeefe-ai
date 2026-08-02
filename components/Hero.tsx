import { site } from "@/content/site";

export default function Hero() {
  // "GTM runs on systems. I build them." — one sentence per line, and the
  // terminal period prints accent red (the typographic brand mark).
  const sentences = site.tagline.split(". ");
  const lines = sentences.map((s, i) =>
    i < sentences.length - 1 ? `${s}.` : s.replace(/\.$/, ""),
  );
  const last = lines[lines.length - 1];

  return (
    <header className="page pt-24 pb-16">
      <h1
        className="text-balance"
        style={{
          fontSize: "var(--text-display)",
          lineHeight: "var(--leading-tight)",
          letterSpacing: "-0.02em",
          marginBottom: "var(--space-6)",
        }}
      >
        {lines.slice(0, -1).map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
        {last}
        <em className="accent">.</em>
      </h1>
      <p className="text-muted max-w-[44ch]" style={{ fontSize: "var(--text-h4)" }}>
        {site.credential}. {site.subline}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a className="btn btn-primary" href="#projects">
          View projects
        </a>
        <a className="btn btn-secondary" href="#contact">
          Get in touch
        </a>
      </div>
    </header>
  );
}
