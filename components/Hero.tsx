import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center px-5 py-32 sm:px-8">
      {/* Photo slot intentionally omitted: no photo asset exists yet.
          Renders nothing rather than a placeholder box. */}
      <h1 className="animate-rise-in max-w-5xl text-balance font-display text-[clamp(3rem,10vw,7rem)] font-black leading-[0.94] tracking-[-0.02em] text-ink">
        {site.tagline}
      </h1>
      <p
        className="animate-rise-in mt-7 max-w-xl font-body text-lg font-medium text-muted sm:mt-9 sm:text-2xl"
        style={{ animationDelay: "120ms" }}
      >
        {site.credential}
      </p>
      <a
        href="#principles"
        aria-label="Scroll to principles"
        className="animate-rise-in absolute bottom-10 left-5 flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-accent transition-colors hover:border-accent sm:left-8"
        style={{ animationDelay: "260ms" }}
      >
        <span className="animate-drift flex">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 1v11M2 7l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </section>
  );
}
