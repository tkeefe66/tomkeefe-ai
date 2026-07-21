import { site } from "@/content/site";

export default function Contact() {
  return (
    <section id="contact" className="border-b border-border bg-surface/40 px-5 py-28 sm:px-8 sm:py-40">
      <h2 className="mb-10 flex items-center gap-5 font-display text-[clamp(2.25rem,7vw,5rem)] font-black uppercase leading-none tracking-[-0.02em] text-ink sm:mb-14">
        <span className="h-[0.5em] w-[0.5em] shrink-0 bg-accent-vivid" aria-hidden="true" />
        Contact
      </h2>
      <div className="flex flex-col divide-y divide-border border-t border-border">
        {site.contact.map((link) =>
          link.comingSoon ? (
            <span
              key={link.label}
              className="flex items-center justify-between py-5 font-display text-xl font-bold uppercase tracking-tight text-muted sm:py-6 sm:text-3xl"
              aria-disabled="true"
            >
              <span>{link.label}</span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="rounded-full border border-muted/40 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Soon
                </span>
              </span>
            </span>
          ) : (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center justify-between py-5 font-display text-xl font-bold uppercase tracking-tight text-ink underline decoration-2 decoration-transparent underline-offset-4 transition-colors hover:text-accent-vivid hover:decoration-accent-vivid sm:py-6 sm:text-3xl"
            >
              <span>{link.label}</span>
              <span
                className="text-accent-vivid transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          ),
        )}
      </div>
    </section>
  );
}
