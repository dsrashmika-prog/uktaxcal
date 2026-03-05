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
  title: "LitFinance - UK Salary & Tax Calculator 2025/2026",
  description: "The most accurate UK take-home pay calculator. Instantly calculate Income Tax, National Insurance, Student Loans, and detect hidden 60% Tax Traps & Child Benefit clawbacks.",
  keywords: ["UK salary calculator", "take home pay", "tax traps", "60% tax trap", "salary sacrifice pension", "HICBC", "UK tax calculator 2024", "UK tax calculator 2025"],
  metadataBase: new URL("https://uktaxcal.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LitFinance - UK Salary & Tax Calculator 2025/2026",
    description: "Find out your true take-home pay. We automatically detect 60% tax traps, child benefit clawbacks, and calculate complex pension rules.",
    url: "https://uktaxcal.vercel.app",
    siteName: "LitFinance",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LitFinance - UK Salary Calculator",
    description: "Find out your true take-home pay with LitFinance.",
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
