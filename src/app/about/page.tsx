import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About | NetPayHome - UK Salary & Tax Calculator 2025/2026',
    description: 'Learn about NetPayHome, the most accurate UK salary calculator. Discover how we help you navigate tax traps, calculate take-home pay, and understand salary sacrifice.',
    openGraph: {
        title: 'About | NetPayHome - UK Salary Calculator',
        description: 'Understand your true take-home pay with NetPayHome. We automatically detect 60% tax traps, child benefit clawbacks, and calculate complex pension rules.',
        url: 'https://netpayhome.co.uk/about',
        siteName: 'NetPayHome',
        type: 'website',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen font-sans text-slate-800 selection:bg-[#1e3a8a] selection:text-white">
            {/* ===== HEADER (Standardised) ===== */}
            <header style={{ background: "#1e3a8a", color: "white" }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                        <div style={{ flex: 1 }}>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <h1 style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "8px", lineHeight: 1.1 }}>
                                    <span style={{ color: "white" }}>NetPayHome </span>
                                    <span style={{ color: "#facc15" }}>Calculator</span>
                                </h1>
                                <p style={{ color: "#bfdbfe", fontSize: "16px", maxWidth: "520px", marginTop: 0, marginBottom: 0 }}>
                                    Here is our accurate UK take home pay calculator to see your actual earnings for both standard and Scottish tax bands.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* ===== NAV STRIP ===== */}
            <nav style={{ background: "#162d6e", color: "white", borderBottom: "1px solid #1e3a8a", padding: "12px 0" }}>
                <div className="scrollbar-hide" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", gap: "32px", overflowX: "auto", whiteSpace: "nowrap" }}>
                    <Link href="/" style={{ color: "white", textDecoration: "none", fontWeight: 600, fontSize: "14px" }}>
                        Tax calculator
                    </Link>
                    <Link href="/salary-guide" style={{ color: "white", textDecoration: "none", fontWeight: 600, fontSize: "14px" }}>
                        Salary Guide
                    </Link>
                    <Link href="/how-to" style={{ color: "white", textDecoration: "none", fontWeight: 600, fontSize: "14px" }}>
                        How to use
                    </Link>
                    <Link href="/sources" style={{ color: "white", textDecoration: "none", fontWeight: 600, fontSize: "14px" }}>
                        Data sources
                    </Link>
                </div>
            </nav>


            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <article className="prose prose-slate prose-lg lg:prose-xl mx-auto prose-h2:text-[#1e3a8a] prose-a:text-[#1e3a8a] prose-a:font-semibold">

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1e3a8a] mb-8 tracking-tight">
                        Demystifying UK Taxes with Precision
                    </h1>

                    <p className="lead text-xl text-slate-600 font-medium">
                        At <strong>NetPayHome</strong>, our mission is to empower UK employees, sole traders, and company directors by providing the most transparent, accurate, and easy-to-use <strong>take home pay calculator</strong>.
                    </p>

                    <p>
                        Understanding the UK tax system is notoriously complex. Between National Insurance changes, complex pension schemes, and fluctuating tax bands across England, Scotland, and Wales, simply knowing what you will actually take home at the end of the month can feel like guesswork. We built NetPayHome to solve exactly this problem.
                    </p>

                    <hr className="my-8 border-slate-200" />

                    <h2>More Than Just a Basic Calculator</h2>
                    <p>
                        While many tools online provide generic estimates, NetPayHome is engineered for precision and edge cases. We focus on exposing the hidden mechanics of your payslip:
                    </p>

                    <ul>
                        <li>
                            <strong>Advanced Pension Handling:</strong> We natively support Auto-Enrolment, Employer Contributions, standard Personal Pensions, and complex <em>Salary Sacrifice</em> schemes to show exactly how your contributions impact your National Insurance exposure.
                        </li>
                        <li>
                            <strong>Tax Trap Detection:</strong> Not all income is created equal. NetPayHome automatically detects if you have crossed into the infamous <em>60% Marginal Tax Trap</em> (where personal allowances are stripped away above £100,000) or if you are subject to the <strong>High Income Child Benefit Charge (HICBC)</strong>.
                        </li>
                        <li>
                            <strong>Persona-Based Intelligence:</strong> Whether you are a classic PAYE Employee, a Sole Trader navigating Class 4 NI, or a Company Director drawing Dividends, NetPayHome dynamically alters its calculations and user interface to match your exact legal status.
                        </li>
                        <li>
                            <strong>Regional Accuracy:</strong> We fully support the specialized Scottish Tax Bands as well as the unique `C` prefix Welsh Rates of Income Tax (WRIT).
                        </li>
                    </ul>

                    <h2>Built for the 2024/25 & 2025/26 Tax Years</h2>
                    <p>
                        Tax laws change rapidly. Our calculation engine guarantees that factors like the recent reductions in National Insurance percentages, adjustments to child benefit clawback limits, and freeze on personal allowances are mathematically verifiable.
                    </p>

                    <div className="bg-blue-50 border-l-4 border-[#1e3a8a] p-6 rounded-r-lg mt-10">
                        <h3 className="text-[#1e3a8a] font-bold text-xl mt-0 mb-3">Ready to calculate your exact take-home pay?</h3>
                        <p className="text-slate-700 m-0 text-base">
                            Stop guessing and start planning. Find out exactly where your money is going instantly.
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-md bg-[#1e3a8a] px-6 py-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]"
                            >
                                Go to the Calculator
                            </Link>
                        </div>
                    </div>

                </article>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 text-sm font-medium text-slate-400">
                        <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                        <Link href="/how-to" className="hover:text-white transition-colors">How to Use</Link>
                        <Link href="/sources" className="hover:text-white transition-colors">Data Sources</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy & Terms</Link>
                    </div>
                    <p className="mt-8 text-center text-sm leading-5 text-slate-400">
                        &copy; {new Date().getFullYear()} NetPayHome. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
