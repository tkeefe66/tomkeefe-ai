import Link from "next/link";
import { site } from "@/content/site";
import Nav from "@/components/Nav";
import ContactBand from "@/components/ContactBand";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="container-page flex flex-1 flex-col justify-center py-24">
        <h1 className="m-0 text-[clamp(48px,6.6vw,80px)] font-bold leading-[0.92] tracking-[-0.052em]">
          {site.notFound.headline}
        </h1>
        <p className="section-sub max-w-[44ch]">{site.notFound.line}</p>
        <div className="mt-8">
          <Link
            href="/"
            className="mono text-[11px] tracking-[0.08em]"
            style={{ color: "var(--muted)" }}
          >
            {site.notFound.cta}
          </Link>
        </div>
      </main>
      <ContactBand />
    </>
  );
}
