import type { Metadata } from "next";
import { Onest, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Onest carries UI and headings; IBM Plex Mono carries labels and metadata
// (design v2 README §Typography).
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

// Not a variable font — the weight array is REQUIRED (Next 16 font docs).
const plexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Applies the persisted theme before first paint; falls back to the OS
// preference when nothing is stored (design README §Interactions).
const themeInit = `try{var t=localStorage.getItem('tk-theme');if(t==null)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}`;

export const metadata: Metadata = {
  title: "Tom Keefe — GTM systems",
  description: site.tagline,
  metadataBase: new URL("https://tomkeefe.ai"),
  openGraph: {
    title: "Tom Keefe — GTM systems",
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
      className={`${onest.variable} ${plexMono.variable} h-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
