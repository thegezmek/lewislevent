import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lewis Levent — Director",
  description:
    "Directorial debut collection (2021–2026). Cinematic, minimal, land-rooted storytelling.",
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
