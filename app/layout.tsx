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
const description = "Rishi Thakkar is a Computer Science student at California Polytechnic State University (Cal Poly SLO) and AI Engineer Intern at AHEAD, where he ships RAG systems and model inference on KServe and Triton. Creator of NextCanvas (2,500+ downloads), co-founder & lead engineer of Vectr (RedBrick VC seed grant), founding engineer at Scoop, and Technical Lead & President of CodeBox. Building with Rust, TypeScript, Python, Next.js, FastAPI, PostgreSQL, and pgvector.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rishithakkar.com"),
  title,
  description,
  keywords: [
    "Rishi Thakkar", "Rishi Jay Thakkar", "Rishi Thakkar Cal Poly",
    "Rishi Cal Poly", "Rishi Thakkar CS", "Rishi Thakkar AHEAD",
    "Rishi Thakkar software engineer", "Rishi Thakkar Vectr",
    "Rishi Thakkar CodeBox", "Rishi Thakkar Scoop",
    "Rishi Thakkar NextCanvas", "NextCanvas Next.js visual editor",
    "Cal Poly SLO computer science", "Cal Poly software engineer",
    "Rishi Thakkar portfolio", "Rishi Thakkar developer"
  ],
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
