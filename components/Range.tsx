import ProseBlock from "@/components/ProseBlock";
import { range } from "@/content/range";

export default function Range() {
  return (
    <section id="range" className="mt-11">
      <h2 className="section-h2 max-w-[20ch]">{range.headline}</h2>
      <ProseBlock paragraphs={range.paragraphs} className="mt-[26px]" />
    </section>
  );
}
