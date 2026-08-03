import { range } from "@/content/range";

export default function Range() {
  return (
    <section id="range" className="pt-12">
      <h2 className="section-h2 max-w-[20ch]">{range.headline}</h2>
      <p className="section-sub max-w-[44ch]">{range.subhead}</p>
      <p className="mb-[34px] mt-6 max-w-[66ch] leading-relaxed" style={{ color: "var(--body)" }}>
        {range.paragraph}
      </p>
      <div style={{ borderTop: "1px solid var(--ink)" }}>
        {range.altitudes.map((a, i) => (
          <div
            key={a.label}
            className="flex items-baseline gap-[26px] py-[15px] max-[700px]:block"
            style={{
              borderBottom: i < range.altitudes.length - 1 ? "1px solid var(--hair)" : undefined,
            }}
          >
            <span
              className="mono flex-none basis-[118px] text-[11px] tracking-[0.06em] max-[700px]:mb-[5px] max-[700px]:block"
              style={{ color: "var(--acc)" }}
            >
              {a.label}
            </span>
            <span className="min-w-0 leading-normal">{a.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
