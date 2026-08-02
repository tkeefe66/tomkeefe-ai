import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Archivo is the design system's single family — headings and body,
// three weights (400/600/800). See "Tom Keefe AI design system/readme.md".
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

// Applies the persisted theme before first paint to avoid a light flash.
const themeInit = `try{if(localStorage.getItem('tk-theme')==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}`;

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
      className={`${archivo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
