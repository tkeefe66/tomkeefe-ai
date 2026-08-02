import Image from "next/image";
import { site } from "@/content/site";

export default function About() {
  return (
    <section id="about" className="page pb-16">
      <div className="section-head">
        <h2>About</h2>
      </div>
      <div className="grid items-start gap-8 md:grid-cols-[1.2fr_1fr]">
        <p
          className="max-w-[52ch]"
          style={{ fontSize: "var(--text-h4)", lineHeight: 1.45 }}
        >
          {site.about.bio}
        </p>
        <figure>
          <div className="grayscale-photo relative h-[260px]">
            <Image
              src="/about-photo.jpg"
              alt="Modernist house among rhododendrons — placeholder photograph"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption>
            Placeholder photograph — photography prints black &amp; white.
          </figcaption>
        </figure>
      </div>
      <div
        className="mt-8 grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-4"
        style={{ borderTop: "var(--rule-thin) solid var(--color-divider)" }}
      >
        {site.skills.map((category) => (
          <div key={category.title}>
            <h6 className="mb-2">{category.title}</h6>
            <p className="text-muted" style={{ fontSize: "var(--text-small)" }}>
              {category.items.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
