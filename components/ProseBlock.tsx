/* Running prose. The rest of the site is set for scanning; this is set for
   reading. Paragraph spacing is deliberately tighter than the section rhythm
   so paragraphs of very different lengths still hold together as one
   argument. "prose" carries the long-form sections; "row" carries the
   shorter muted bodies inside a project card. */
export default function ProseBlock({
  paragraphs,
  size = "prose",
  className,
}: {
  paragraphs: string[];
  size?: "prose" | "row";
  className?: string;
}) {
  const reading = size === "prose";
  return (
    <div
      className={`flex flex-col text-pretty ${
        reading
          ? "max-w-[66ch] gap-4 text-[16.5px]"
          : "max-w-[68ch] gap-[11px] text-[15px]"
      } leading-[1.6]${className ? ` ${className}` : ""}`}
      style={{ color: reading ? "var(--body)" : "var(--muted)" }}
    >
      {paragraphs.filter(Boolean).map((p, i) => (
        <p key={`${i}-${p.slice(0, 40)}`} className="m-0">
          {p}
        </p>
      ))}
    </div>
  );
}
