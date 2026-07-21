import { principles } from "@/content/principles";

export default function Principles() {
  return (
    <section id="principles" className="border-b border-border px-5 py-24 sm:px-8 sm:py-32">
      <h2 className="mb-12 font-display text-3xl font-black uppercase tracking-tight text-ink sm:mb-16 sm:text-5xl">
        Principles
      </h2>
      <ol className="flex flex-col">
        {principles.map((principle, i) => (
          <li
            key={principle.text}
            className="flex flex-col gap-3 border-t border-border py-7 last:border-b sm:flex-row sm:items-start sm:gap-8 sm:py-9"
          >
            <span className="shrink-0 font-display text-2xl font-bold tabular-nums text-accent sm:text-4xl sm:w-[3ch]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="max-w-[52ch] text-pretty font-body text-xl font-medium leading-snug text-ink sm:text-3xl">
              {principle.text}
            </p>
            {principle.draft && (
              <span className="shrink-0 self-start rounded-full border border-accent/50 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-widest text-accent sm:ml-auto">
                Draft
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
