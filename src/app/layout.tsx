import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
    title: "NetPayHome – UK Tax Calculator",
    description: "Calculate your take-home pay after income tax, national insurance, and more.",
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
            </body>
        </html>
    );
}
