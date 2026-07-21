import type { Metadata } from "next";
import { Big_Shoulders, Archivo } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Big Shoulders: a condensed industrial grotesque drawn from Chicago
// signage — the "systems/plumbing/engineering" voice, not a training-data
// default (rejects Space Grotesk / Inter reflexes). Used for display type:
// headlines, section labels, stat numerals, principle numbers.
const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

// Archivo: a working grotesque with its own mechanical wood-type roots —
// pairs with Big Shoulders on a width contrast axis (ultra-condensed
// display vs. normal-width text) rather than two near-identical sans faces.
// Used for body copy, nav, badges, labels.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tom Keefe — GTM Engineer",
  description: site.tagline,
  metadataBase: new URL("https://tomkeefe.ai"),
  openGraph: {
    title: "Tom Keefe — GTM Engineer",
    description: site.tagline,
    url: "https://tomkeefe.ai",
    siteName: "Tom Keefe",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-body">
        {children}
      </body>
    </html>
  );
}
