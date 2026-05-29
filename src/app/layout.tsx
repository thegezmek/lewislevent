import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteDescription = "Directorial debut collection (2021–2026).";

const metadataBase =
  process.env.NEXT_PUBLIC_SITE_URL != null
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : process.env.VERCEL_URL != null
      ? new URL(`https://${process.env.VERCEL_URL}`)
      : undefined;

export const metadata: Metadata = {
  ...(metadataBase != null ? { metadataBase } : {}),
  title: "Lewis Levent — Director",
  description: siteDescription,
  openGraph: {
    type: "website",
    title: "Lewis Levent — Director",
    description: siteDescription,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 747,
        height: 853,
        alt: "Lewis Levent — Director",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lewis Levent — Director",
    description: siteDescription,
    images: ["/images/og-cover.jpg"],
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
