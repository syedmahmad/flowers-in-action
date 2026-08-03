import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import { siteConfig } from "@/data/config";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#720016",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Flowers In Action | Flower Shop & Bouquet Delivery in Lahore",
    template: "%s | Flowers In Action",
  },
  description: siteConfig.description,
  keywords: [
    "flower shop in Lahore",
    "flowers delivery Lahore",
    "florist in Lahore",
    "bouquet delivery Lahore",
    "flower shop near DHA Phase 4 Lahore",
    "wedding flowers Lahore",
    "bridal bouquet Lahore",
    "same-day flowers Lahore",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Flowers In Action | Flower Shop & Bouquet Delivery in Lahore",
    description: siteConfig.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowers In Action | Flower Shop & Bouquet Delivery in Lahore",
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: siteConfig.allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-ivory text-charcoal antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
