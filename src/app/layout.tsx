import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
    title: "UK Tax Code Checker 2026/27: Calculate Your Take-Home Pay Instantly",
    description: "Check if your 2026/27 tax code is correct with our instant calculator. If your code is wrong, follow our simple steps to claim overpaid tax or resolve underpayments with HMRC today.",
    keywords: ["UK tax calculator", "salary calculator UK", "take home pay", "income tax calculator", "wage calculator", "national insurance calculator", "tax trap"],
    applicationName: "NetPayHome",
    metadataBase: new URL('https://netpayhome.co.uk'),
    openGraph: {
        title: "UK Tax Code Checker 2026/27: Calculate Your Take-Home Pay Instantly",
        description: "Check if your 2026/27 tax code is correct with our instant calculator. If your code is wrong, follow our simple steps to claim overpaid tax or resolve underpayments with HMRC today.",
        url: "https://netpayhome.co.uk",
        siteName: "NetPayHome",
        locale: "en_GB",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "UK Tax Code Checker 2026/27: Calculate Your Take-Home Pay Instantly",
        description: "Check if your 2026/27 tax code is correct with our instant calculator. If your code is wrong, follow our simple steps to claim overpaid tax or resolve underpayments with HMRC today.",
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
