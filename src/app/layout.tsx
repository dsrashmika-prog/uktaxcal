import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NetPayHome - UK Take Home Pay Calculator 2025/2026",
  description: "The most accurate UK take home pay calculator. Instantly calculate Income Tax, National Insurance, Student Loans, and detect hidden 60% Tax Traps & Child Benefit clawbacks.",
  keywords: ["take home pay calculator", "UK salary calculator", "uk take home pay", "tax traps", "60% tax trap", "salary sacrifice pension", "HICBC", "UK tax calculator 2024", "UK tax calculator 2025"],
  metadataBase: new URL("https://netpayhome.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NetPayHome - UK Take Home Pay Calculator 2025/2026",
    description: "Find out your true earnings with our take home pay calculator. We automatically detect 60% tax traps, child benefit clawbacks, and calculate complex pension rules.",
    url: "https://netpayhome.co.uk",
    siteName: "NetPayHome",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NetPayHome - UK Take Home Pay Calculator",
    description: "Find out your true earnings with our take home pay calculator.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
