export default function Footer() {
  return (
    <footer
      className="page mt-auto flex w-full flex-wrap items-center justify-between gap-2 py-4"
      style={{ fontSize: "var(--text-caption)", color: "var(--color-muted)" }}
    >
      <span>© 2026 Tom Keefe</span>
      <span>Built by AI agents, directed by a human.</span>
    </footer>
  );
}
