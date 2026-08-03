import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Tom Keefe — GTM systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Navy field (--acc-deep light #152C4B), white name, --acc-soft kicker.
// ImageResponse can't load next/font — system sans approximates Onest.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#152C4B",
          padding: "80px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.12em",
            color: "#A6BCD8",
            marginBottom: 24,
          }}
        >
          TOMKEEFE.AI
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#FFFFFF",
            marginBottom: 32,
          }}
        >
          Tom Keefe
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.8)",
            maxWidth: 900,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
