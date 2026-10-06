import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileWarning from "./components/mobile-warning";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Rishi Jay Thakkar — Software Engineer & CS Student at Cal Poly SLO";
const description = "Rishi Thakkar is a CS student at Cal Poly SLO, former AI Engineer Intern at AHEAD, and creator of NextCanvas, a Rust/Wasm visual editor for Next.js.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rishithakkar.com"),
  title,
  description,
  authors: [{ name: "Rishi Jay Thakkar", url: "https://rishithakkar.com" }],
  creator: "Rishi Jay Thakkar",
  alternates: {
    canonical: "https://rishithakkar.com/",
  },
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Rishi Thakkar — Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishi Jay Thakkar — Software Engineer",
    description,
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Bangers&family=Kalam:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MobileWarning />
        {children}
      </body>
    </html>
  );
}
