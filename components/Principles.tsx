import Statement from "@/components/Statement";
import { principles } from "@/content/principles";

export default function Principles() {
  return (
    <section id="principles" className="mt-11 pb-2">
      <div className="pt-2">
        <h2 className="section-h2 max-w-[22ch]">Five opinions, held firmly.</h2>
        <p className="section-sub mb-[34px] max-w-[52ch]">Each one cost at least a quarter to learn.</p>
      </div>
      <div>
        {principles.map((p, i) => (
          <Statement
            key={p.text}
            index={String(i + 1).padStart(2, "0")}
            text={p.text}
            annotation={p.annotation}
            last={i === principles.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
