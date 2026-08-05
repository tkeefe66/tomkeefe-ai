import ProseBlock from "@/components/ProseBlock";
import { agents } from "@/content/agents";

export default function AgentsSection() {
  return (
    <section id="agents" className="mt-11">
      <h2 className="section-h2 max-w-[24ch]">{agents.heading}</h2>
      <ProseBlock paragraphs={agents.paragraphs} className="mt-[26px]" />
    </section>
  );
}
