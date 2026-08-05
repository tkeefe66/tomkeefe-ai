/* Three states. LIVE is the loudest because it is the only one that is
   actionable; PROGRESS and LAUNCHING are both quieter than it by design.
   LAUNCHING carries a date and is the only state that gets a tinted capsule —
   it must read as a different state than LIVE in the same list without
   competing with it. `tone` covers the non-state uses (PROJECT 01, READ →). */
export default function StatusLabel({
  state,
  tone = "faint",
  children,
}: {
  state?: "live" | "progress" | "launching";
  tone?: "accent" | "faint" | "muted" | "onField";
  children: React.ReactNode;
}) {
  const base = "mono whitespace-nowrap text-[10.5px] tracking-[0.08em]";
  if (state === "launching") {
    return (
      <span
        className={`${base} rounded-full px-[9px] py-[3px]`}
        style={{
          color: "var(--acc)",
          background: "var(--tint)",
          border: "1px solid var(--tint-edge)",
        }}
      >
        {children}
      </span>
    );
  }
  const tones = {
    accent: "var(--acc)",
    faint: "var(--faint)",
    muted: "var(--muted)",
    onField: "var(--acc-soft)",
  } as const;
  const color =
    state === "live" ? tones.accent : state === "progress" ? tones.muted : tones[tone];
  return (
    <span className={base} style={{ color }}>
      {children}
    </span>
  );
}
