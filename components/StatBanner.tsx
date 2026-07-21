import { stats } from "@/content/stats";

export default function StatBanner() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-2 border-border px-5 py-10 sm:px-8 sm:py-14 ${
              i % 2 === 1 ? "border-l" : ""
            } ${i >= 2 ? "border-t sm:border-t-0" : ""} ${
              i >= 1 ? "sm:border-l" : ""
            }`}
          >
            <span
              className={`font-display text-[clamp(2rem,6vw,3.75rem)] font-black leading-none tabular-nums ${
                stat.placeholder
                  ? "border-b-2 border-dashed border-muted/70 pb-1 text-muted"
                  : "text-accent-vivid"
              }`}
            >
              {stat.value}
            </span>
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-muted sm:text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
