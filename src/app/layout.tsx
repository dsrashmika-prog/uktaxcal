import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
    title: "NetPayHome – UK Tax & Salary Calculator 2025/26",
    description: "Free, accurate UK salary and take-home pay calculator. Covers Income Tax, National Insurance, Student Loans, Pension contributions and the 60% tax trap.",
    keywords: ["UK tax calculator", "salary calculator UK", "take home pay", "income tax calculator", "wage calculator", "national insurance calculator", "tax trap"],
    applicationName: "NetPayHome",
    metadataBase: new URL('https://netpayhome.co.uk'),
    openGraph: {
        title: "NetPayHome – UK Tax & Salary Calculator 2025/26",
        description: "Calculate your take-home pay after income tax, national insurance, student loans, and pensions.",
        url: "https://netpayhome.co.uk",
        siteName: "NetPayHome",
        locale: "en_GB",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "NetPayHome – UK Tax & Salary Calculator 2025/26",
        description: "Calculate your take-home pay after tax, NI, and pension deductions.",
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
                <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body>
                {children}
                <Script src="/tax.js" strategy="lazyOnload" />
                <Script src="/taxcode.js" strategy="lazyOnload" />
                <Script src="/comparison.js" strategy="lazyOnload" />
            </body>
        </html>
    );
}
