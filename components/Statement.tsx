/* A numbered opinion. `annotation` is the optional receipt — the line that
   ties the claim to a project. The ones without must not read as missing
   something, so the annotation adds nothing to the layout when absent. */
export default function Statement({
  index,
  text,
  annotation,
  last = false,
}: {
  index?: string;
  text: string;
  annotation?: string;
  last?: boolean;
}) {
  return (
    <div
      className="flex items-start gap-6 py-6"
      style={{ borderBottom: last ? undefined : "1px solid var(--hair)" }}
    >
      {index ? (
        <span
          className="mono flex-none basis-[30px] pt-[9px] text-[11.5px]"
          style={{ color: "var(--acc)" }}
        >
          {index}
        </span>
      ) : null}
      <div className="min-w-0">
        <p className="m-0 max-w-[32ch] text-[26px] font-medium leading-[1.28] tracking-[-0.028em] text-pretty">
          {text}
        </p>
        {annotation ? (
          <p
            className="m-0 mt-[11px] max-w-[68ch] text-[15px] leading-[1.5] text-pretty"
            style={{ color: "var(--muted)" }}
          >
            {annotation}
          </p>
        ) : null}
      </div>
    </div>
  );
}
