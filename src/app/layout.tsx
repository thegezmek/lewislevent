import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteDescription = "Directorial debut collection (2021–2026).";
const siteUrl = "https://lewislevent.com";

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? siteUrl,
);

export const metadata: Metadata = {
  metadataBase,
  title: "Lewis Levent — Director",
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Lewis Levent",
    title: "Lewis Levent — Director",
    description: siteDescription,
    images: [
      {
        url: "/images/og-cover-landscape-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Lewis Levent on location during documentary production",
      },
      {
        url: "/images/og-cover-v2.jpg",
        width: 1200,
        height: 1200,
        alt: "Lewis Levent on location during documentary production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lewis Levent — Director",
    description: siteDescription,
    images: ["/images/og-cover-landscape-v2.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon.png?v=2", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png?v=2",
        type: "image/png",
        sizes: "180x180",
      },
    ],
    shortcut: "/favicon.ico?v=2",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <div className="grain-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}
