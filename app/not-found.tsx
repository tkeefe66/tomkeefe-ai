import Link from "next/link";
import { site } from "@/content/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-32 sm:px-8">
        <div className="flex max-w-2xl flex-col items-center text-center">
          <h1 className="animate-rise-in font-display text-[clamp(5rem,20vw,10rem)] font-black leading-[0.94] tracking-[-0.02em] text-ink">
            {site.notFound.headline}
          </h1>
          <p
            className="animate-rise-in mt-7 font-body text-lg font-medium text-muted sm:mt-9 sm:text-2xl"
            style={{ animationDelay: "120ms" }}
          >
            {site.notFound.line}
          </p>
          <Link
            href="/"
            className="animate-rise-in mt-9 inline-flex items-center gap-2 border border-border-strong px-6 py-3 font-body font-medium text-ink transition-colors hover:border-accent hover:text-accent sm:mt-12"
            style={{ animationDelay: "240ms" }}
          >
            {site.notFound.cta}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
