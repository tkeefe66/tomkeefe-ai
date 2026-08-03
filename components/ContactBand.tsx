import { site } from "@/content/site";

export default function ContactBand() {
  return (
    <section id="contact" className="band mt-14">
      <div className="container-page pb-[26px] pt-16">
        <h2 className="m-0 max-w-[22ch] text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.06] tracking-[-0.038em] text-white">
          {site.contactHeadline}
        </h2>
        <div className="mt-7 flex flex-wrap gap-2">
          {site.links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              className={i === 0 ? "band-btn px-[18px] py-[11px]" : "band-btn-ghost px-[18px] py-[11px]"}
            >
              {l.label}
            </a>
          ))}
        </div>
        <footer className="mono mt-15 flex flex-wrap justify-between gap-5 border-t border-white/18 pt-[18px] text-[10.5px] tracking-[0.06em] text-white/55">
          <span>{site.footer.left}</span>
          <span>{site.footer.right}</span>
        </footer>
      </div>
    </section>
  );
}
