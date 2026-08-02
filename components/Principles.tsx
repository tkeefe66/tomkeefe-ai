import { principles } from "@/content/principles";

export default function Principles() {
  return (
    <section id="principles" className="page pb-16">
      <div className="section-head">
        <h2>Principles</h2>
      </div>
      <ol className="m-0 list-none p-0">
        {principles.map((principle, i) => (
          <li key={principle.text} className="principle">
            <span className="principle-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="principle-text">{principle.text}</p>
            {principle.draft && <span className="tag tag-draft">Draft</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
