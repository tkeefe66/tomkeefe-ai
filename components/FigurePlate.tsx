import Image from "next/image";
import type { ProjectFigure } from "@/content/types";

// Screenshots are ~3300px retina captures; scaling one to fit the column
// makes it unreadable. Wide plates render the image at 190% width so a
// region shows near native scale, cropped by a fixed-height plate, with
// a fade into --bg (design README §Figure plates).
export default function FigurePlate({ figure }: { figure: ProjectFigure }) {
  return (
    <figure className="m-0">
      {/* Height flows through --plate-h so the responsive crop caps in
          globals.css can shorten it — an inline height could not be
          overridden by a media query (design v3 README §Responsive). */}
      <div
        className="fig-plate"
        data-capture={figure.capture}
        style={{ "--plate-h": `${figure.height}px` } as React.CSSProperties}
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.naturalHeight}
          sizes={figure.wide ? "(max-width: 1180px) 190vw, 2080px" : "(max-width: 640px) 100vw, 460px"}
          className="block h-auto"
          style={{ width: figure.wide ? "190%" : "100%", maxWidth: "none" }}
        />
        <div className="fig-fade" />
      </div>
      <figcaption className="fig-caption">{figure.caption}</figcaption>
    </figure>
  );
}
