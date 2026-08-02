import { site } from "@/content/site";

export default function Contact() {
  return (
    <section id="contact" className="poster poster-ink">
      <div className="page">
        <h2 className="poster-title">{site.contactHeadline}</h2>
        <div className="poster-links">
          {site.contact.map((link) =>
            link.comingSoon ? (
              <span key={link.label} className="text-muted" aria-disabled="true">
                {link.label} — soon
              </span>
            ) : (
              <a key={link.label} href={link.href}>
                {link.label} →
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
