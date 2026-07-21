import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Tom Keefe — GTM Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex approximations of the OKLCH design tokens in app/globals.css:
// --bg oklch(0.09 0 0) -> #171717, --ink oklch(0.96 0 0) -> #f5f5f5,
// --accent oklch(0.76 0.19 168) -> #39e6ac, --muted oklch(0.64 0.01 95) -> #a3a09a
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#171717",
          padding: "80px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#39e6ac",
            marginBottom: 24,
          }}
        >
          {site.credential}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            color: "#f5f5f5",
            lineHeight: 1.05,
            marginBottom: 32,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 500,
            color: "#a3a09a",
            maxWidth: 900,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
