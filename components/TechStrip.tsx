"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function Items({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <div
      className="flex items-center gap-[22px]"
      aria-hidden={hidden || undefined}
      data-marquee-copy={hidden ? "" : undefined}
    >
      {items.map((item) => (
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
  // Render the fixed order for SSR/first paint, then shuffle client-side so
  // the strip doesn't always lead with the same words on every load.
  const [items, setItems] = useState(site.techStrip);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: order must match SSR on first paint, then randomize once mounted client-side.
    setItems(shuffle(site.techStrip));
  }, []);

  return (
    <div className="band">
      <div className="container-page">
        <div className="flex items-center gap-[22px] border-t border-white/16 pb-[19px] pt-[17px]">
          <span className="mono flex-none text-[10.5px] tracking-[0.12em] text-white/50">
            Built across
          </span>
          <div className="marquee-mask min-w-0 flex-1">
            <div className="marquee-track">
              <Items items={items} />
              <Items items={items} hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
