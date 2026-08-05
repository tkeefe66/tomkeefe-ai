import { Fragment } from "react";

/* Dot-separated annotation under a card body: scale, cost, and what went
   wrong. Fragments wrap as whole units; the separators are real flex
   children, so a wrapped row never orphans a "·" at a line start. Never
   truncated — the third fragment is usually a full clause and is the point. */
export default function MetaRow({
  items,
}: {
  items: Array<string | false | null | undefined>;
}) {
  const parts = items.filter((i): i is string => Boolean(i));
  if (parts.length === 0) return null;
  return (
    <div
      className="flex max-w-[68ch] flex-wrap items-baseline gap-x-[9px] gap-y-[3px] text-[15px] leading-[1.5] text-pretty"
      style={{ color: "var(--muted)" }}
    >
      {parts.map((item, i) => (
        <Fragment key={`${i}-${item}`}>
          {i > 0 && (
            <span aria-hidden="true" style={{ color: "var(--faint)" }}>
              ·
            </span>
          )}
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );
}
