import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Tom Keefe — GTM Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Design-system tokens (see app/globals.css):
// --color-bg #f3f2f2, --color-text #201e1d, --color-accent #ec3013,
// --color-accent-readable #ae1800, --color-neutral-700 #605d5d
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
          backgroundColor: "#f3f2f2",
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
              backgroundColor: "#ec3013",
              marginRight: 16,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#ae1800",
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
            color: "#201e1d",
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 32,
          }}
        >
          {site.name}
          <span style={{ color: "#ec3013" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 400,
            color: "#605d5d",
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
