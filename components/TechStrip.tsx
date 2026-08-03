import { site } from "@/content/site";

function Items({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className="flex items-center gap-[22px]"
      aria-hidden={hidden || undefined}
      data-marquee-copy={hidden ? "" : undefined}
    >
      {site.techStrip.map((item) => (
        <span key={item} className="flex items-center gap-[22px]">
          <span className="whitespace-nowrap text-[14.5px] text-white/78">{item}</span>
          <span className="h-[3px] w-[3px] flex-none rounded-full bg-white/30" />
        </span>
      ))}
    </div>
  );
}

// Full-bleed band of its own so it survives either masthead variant
// (design README §Technology strip).
export default function TechStrip() {
  return (
    <div className="band">
      <div className="container-page">
        <div className="flex items-center gap-[22px] border-t border-white/16 pb-[19px] pt-[17px]">
          <span className="mono flex-none text-[10.5px] tracking-[0.12em] text-white/50">
            Built across
          </span>
          <div className="marquee-mask min-w-0 flex-1">
            <div className="marquee-track">
              <Items />
              <Items hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
