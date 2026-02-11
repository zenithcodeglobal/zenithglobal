import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Manrope } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zenith | AI & Digital Engineering",
  description: "Turning Complexity Into Clarity - AI & Digital Engineering Solutions",
  icons: {
    icon: [
      { url: "/zenith_logo.png" },
      { url: "/zenith_logo.png", type: "image/png" },
    ],
    shortcut: "/zenith_logo.png",
    apple: "/zenith_logo.png",
  },
};

import SmoothScroll from "../components/SmoothScroll";
import BackgroundVideo from "../components/BackgroundVideo";
import IntroOverlay from "../components/IntroOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${manrope.variable} antialiased`}
      >
        <div
          id="intro-overlay-ssr"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', zIndex: 999 }}
        />
        <SmoothScroll />
        <BackgroundVideo />
        <IntroOverlay />
        {children}
      </body>
    </html>
  );
}
