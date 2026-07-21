import { site } from "@/content/site";

export default function About() {
  return (
    <section id="about" className="border-b border-border px-5 py-24 sm:px-8 sm:py-32">
      <h2 className="mb-12 font-display text-3xl font-black uppercase tracking-tight text-ink sm:mb-16 sm:text-5xl">
        About
      </h2>
      <div className="grid gap-10 sm:gap-16 md:grid-cols-[1.1fr_1fr] md:items-start">
        <p className="max-w-[65ch] text-pretty font-body text-lg font-medium leading-relaxed text-ink/90 sm:text-xl">
          {site.about.bio}
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          {site.skills.map((category) => (
            <div key={category.title}>
              <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-accent sm:text-base">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-1.5 font-body text-sm text-muted sm:text-base">
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
