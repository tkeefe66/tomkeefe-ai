import Link from "next/link";
import { site } from "@/content/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="page flex flex-1 flex-col justify-center py-24">
        <h1
          style={{
            fontSize: "var(--text-display)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-4)",
          }}
        >
          {site.notFound.headline}
          <em className="accent">.</em>
        </h1>
        <p className="text-muted" style={{ fontSize: "var(--text-h4)" }}>
          {site.notFound.line}
        </p>
        <div className="mt-6">
          <Link href="/" className="btn btn-secondary">
            {site.notFound.cta}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
