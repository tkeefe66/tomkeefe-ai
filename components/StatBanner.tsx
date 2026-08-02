import { stats } from "@/content/stats";

export default function StatBanner() {
  return (
    <section className="page pb-16" aria-label="Stats">
      <div className="stat-grid">
        {stats.map((stat) => {
          // Trailing "+" prints as a red superscript per the stat spec.
          const plus = stat.value.endsWith("+");
          const value = plus ? stat.value.slice(0, -1) : stat.value;
          return (
            <div key={stat.label} className="stat">
              <div className={`stat-value ${stat.placeholder ? "text-muted" : ""}`}>
                {value}
                {plus && <sup>+</sup>}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
