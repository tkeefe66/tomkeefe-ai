import { site } from "@/content/site";

/* The invitation is a short heading with the long sentence demoted to body
   copy beneath it — at display size that sentence ran five lines across the
   full band and swamped the page's last screen (2026-08-14). */
export default function ContactBand() {
  return (
    <section id="contact" className="band mt-(--space-8)">
      <div className="container-page pb-[26px] pt-14">
        <h2 className="m-0 text-[clamp(28px,3.2vw,38px)] font-semibold leading-[1.1] tracking-[-0.038em] text-white">
          {site.contactHeadline}
        </h2>
        <p className="mt-3.5 max-w-[52ch] text-[16.5px] leading-relaxed text-white/75">
          {site.contactLine}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
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
        <footer className="mono mt-12 flex flex-wrap justify-between gap-5 border-t border-white/18 pt-[18px] text-[10.5px] tracking-[0.06em] text-white/55 max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-2.5">
          <span>{site.footer.left}</span>
          {site.footer.right ? <span>{site.footer.right}</span> : null}
        </footer>
      </div>
    </section>
  );
}
