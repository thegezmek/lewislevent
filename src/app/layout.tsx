import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fullName, roleLine, siteDescription, siteUrl } from "@/data/bio";

const siteTitle = `${fullName}. ${roleLine}`;

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? siteUrl,
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteTitle,
    template: `%s \u00b7 ${fullName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: fullName,
    title: siteTitle,
    description: siteDescription,
    // New filenames on purpose: WhatsApp and the rest cache a preview against
    // the image URL, so reusing a name leaves the old picture in place.
    images: [
      {
        url: "/images/og-cover-landscape-v3.jpg",
        width: 1200,
        height: 630,
        alt: "Lewis Levent",
      },
      {
        url: "/images/og-cover-v3.jpg",
        width: 1200,
        height: 1200,
        alt: "Lewis Levent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/og-cover-landscape-v3.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/icon.png?v=3", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png?v=3",
        type: "image/png",
        sizes: "180x180",
      },
    ],
    shortcut: "/favicon.ico?v=3",
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
