import { principles } from "@/content/principles";

export default function Principles() {
  return (
    <section id="principles" className="mt-11 pb-2">
      <div className="pt-2">
        <h2 className="section-h2 max-w-[22ch]">Five opinions, held firmly.</h2>
        <p className="section-sub mb-[34px] max-w-[52ch]">
          Earned the expensive way. Disagreement welcome — bring the data.
        </p>
      </div>
      <div>
        {principles.map((p, i) => (
          <div
            key={p.text}
            className="flex items-start gap-6 py-6"
            style={{
              borderBottom: i < principles.length - 1 ? "1px solid var(--hair)" : undefined,
            }}
          >
            <span
              className="mono flex-none basis-[30px] pt-[9px] text-[11.5px]"
              style={{ color: "var(--acc)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="m-0 max-w-[32ch] text-[26px] font-medium leading-[1.28] tracking-[-0.028em]">
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
