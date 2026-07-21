import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Tom Keefe — GTM Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex approximations of the OKLCH design tokens in app/globals.css:
// --bg oklch(0.985 0.004 165) -> #f8fbf9, --ink oklch(0.19 0.014 165) -> #0e1612,
// --accent-vivid oklch(0.58 0.19 163) -> #009a58, --muted oklch(0.42 0.02 165) -> #43514a
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
          backgroundColor: "#f8fbf9",
          padding: "80px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 20,
              height: 20,
              backgroundColor: "#009a58",
              marginRight: 16,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#009a58",
            }}
          >
            {site.credential}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            color: "#0e1612",
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
            color: "#43514a",
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
