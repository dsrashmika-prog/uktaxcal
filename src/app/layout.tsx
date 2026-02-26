import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteFooter } from "@/components/SiteFooter";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UK Salary Calculator 2025/26 | Precise Take-Home Pay & Tax Codes",
  description: "Calculate your 2025/26 UK take-home pay with precision. Supports Scottish tax bands, K-codes, Employer NI (15%), and Student Loan Plans 1-5. Updated for the new tax year.",
  keywords: "UK Salary Calculator, 2025/26 Tax Year, Take-Home Pay Scotland, Employer NI 15%, Tax Code Calculator",
  openGraph: {
    title: "UK Salary Calculator 2025/26 | Precise Take-Home Pay",
    description: "Calculate your 2025/26 UK take-home pay with precision. Supports Scottish tax bands, K-codes, and more.",
    url: "https://taxcalcuk.com",
    siteName: "taxcaluk",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Salary Calculator 2025/26",
    description: "Accurately calculate your UK take-home pay for the 25/26 tax year.",
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["SoftwareApplication", "FinancialProduct"],
              name: "UK Salary Calculator 2025/26",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "GBP",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is the standard 2025/26 tax code?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The standard tax code for 2025/26 is 1257L, providing a £12,570 tax-free personal allowance.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How is Scottish tax different?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Scotland uses a 6-band system (Starter, Basic, Intermediate, Higher, Advanced, Top) with rates currently ranging from 19% to 48%.",
                  },
                },
              ],
            }),
          }}
        />
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col overflow-auto bg-slate-50 w-full min-h-screen">
              <div className="flex items-center p-4 lg:hidden border-b bg-white">
                <SidebarTrigger />
                <Link href="/" className="ml-4 font-bold text-lg text-slate-800">taxcaluk</Link>
              </div>
              <div className="flex-1">
                {children}
              </div>
              <SiteFooter />
            </main>
          </SidebarProvider>
        </TooltipProvider>
        <Analytics />
      </body>
    </html >
  );
}
