import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif_Hebrew, Noto_Sans_Hebrew } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerifHebrew = Noto_Serif_Hebrew({
  variable: "--font-hebrew-serif",
  subsets: ["hebrew"],
  weight: ["400", "700"],
});

const notoSansHebrew = Noto_Sans_Hebrew({
  variable: "--font-hebrew-sans",
  subsets: ["hebrew"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AlephDavening — Master the Art of Davening",
  description:
    "Learn to daven with confidence, keep up in shul, and lead from the amud. Follow along with every service and master the art of davening.",
  keywords: ["davening", "siddur", "Jewish", "prayer", "amud", "shaliach tzibbur", "shul", "kiruv"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1B4965",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable}
          ${notoSerifHebrew.variable}
          ${notoSansHebrew.variable}
          font-sans antialiased bg-[#FEFDFB] text-[#2D3142] min-h-screen
        `}
      >
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
