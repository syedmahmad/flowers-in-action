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
  themeColor: "#1b4332",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seoTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seoDescription,
  keywords: [...siteConfig.seoKeywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: siteConfig.allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: [{ url: "/images/brand/logo-icon.png", type: "image/png" }],
    apple: "/images/brand/logo-icon.png",
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
      className={`${playfair.variable} ${inter.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-ivory text-charcoal antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
