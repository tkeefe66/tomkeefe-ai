import ProseBlock from "@/components/ProseBlock";
import { wrong } from "@/content/wrong";

export default function WrongSection() {
  return (
    <section id="wrong" className="mt-11">
      <h2 className="section-h2 max-w-[24ch]">{wrong.heading}</h2>
      <ProseBlock paragraphs={wrong.paragraphs} className="mt-[26px]" />
    </section>
  );
}
