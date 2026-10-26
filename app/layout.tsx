import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { MotionProvider } from "./components/motion";
import { PROFILE, SITE_URL } from "./content";
import { NextCanvasOverlay } from '@rishi-thak/nextcanvas';

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

// Only used for the name in the hero.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const title = `${PROFILE.fullName} — Software Engineer & CS Student at Cal Poly SLO`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s · ${PROFILE.name}`,
  },
  description: PROFILE.description,
  authors: [{ name: PROFILE.fullName, url: SITE_URL }],
  creator: PROFILE.fullName,
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    title,
    description: PROFILE.description,
    siteName: PROFILE.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrains.variable} font-sans antialiased`}>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        {process.env.NODE_ENV === 'development' && <NextCanvasOverlay />}
      </body>
    </html>
  );
}
