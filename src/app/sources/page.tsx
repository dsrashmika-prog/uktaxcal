import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Our Tax Data Sources | NetPayHome",
    description: "Discover the official UK government sources and accurate logic behind the NetPayHome salary calculator, including rates for England, Scotland, Wales, and Northern Ireland.",
    openGraph: {
        title: "Our Tax Data Sources | NetPayHome",
        description: "Discover the official UK government sources and accurate logic behind the NetPayHome salary calculator.",
        url: "https://netpayhome.co.uk/sources",
        siteName: "NetPayHome",
    },
    alternates: {
        canonical: "https://netpayhome.co.uk/sources",
    },
};

export default function SourcesPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* ===== HEADER (Standardised) ===== */}
            <header style={{ background: "#1e3a8a", color: "white" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 24px" }}>
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
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", gap: "32px", overflowX: "auto", whiteSpace: "nowrap" }}>
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
            <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
                <article className="prose prose-slate prose-lg lg:prose-xl mx-auto prose-h2:text-[#1e3a8a] prose-h3:text-slate-800 prose-a:text-[#1e3a8a] prose-a:font-semibold">

                    <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1e3a8a] mb-6 tracking-tight">
                        Our Tax Data Sources
                    </h1>

                    <p className="lead text-xl text-slate-600 font-medium mb-12">
                        At NetPayHome, precision is our priority. Our salary calculator's logic is built entirely upon official documentation and data published directly by the UK Government, HM Revenue & Customs (HMRC), and devolved administrations.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6">Why Our Logic is Trusted</h2>
                    <p>
                        Calculating take-home pay involves much more than simply applying a flat percentage to your salary. The UK tax system is notoriously complex involving tiered bands, personal allowance tapering (the 60% trap), differing National Insurance categories, and distinct calculations for those residing in Scotland or Wales.
                    </p>
                    <p>
                        We programmatically map the exact progressive thresholds and margins legally defined by HMRC into our codebase. This ensures that every penny diverted to Income Tax, National Insurance, Student Loans, and the High Income Child Benefit Charge is accounted for exactly as an accountant would calculate it.
                    </p>

                    <h2 className="text-2xl font-bold mt-16 mb-4">Official Government References</h2>
                    <p className="mb-6">
                        Below are the direct links to the official GOV.UK pages and documentation where we source our calculation rates for the current tax years.
                    </p>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm not-prose mb-12">
                        <h3 className="text-[#1e3a8a] font-bold text-xl mb-4 border-b pb-2">1. UK Income Tax (England & Northern Ireland)</h3>
                        <p className="text-slate-600 mb-4">The standard UK Income Tax rates, covering the Basic, Higher, and Additional rates, as well as the standard Personal Allowance.</p>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] hover:text-rose-600 font-medium underline underline-offset-4 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    GOV.UK: Income Tax rates and Personal Allowances
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm not-prose mb-12">
                        <h3 className="text-[#1e3a8a] font-bold text-xl mb-4 border-b pb-2">2. Scottish Income Tax</h3>
                        <p className="text-slate-600 mb-4">Scotland has devolved powers to set its own Income Tax rates and bands. Our calculator fully supports the Starter, Basic, Intermediate, Higher, Advanced, and Top rates defined by the Scottish Government.</p>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://www.gov.uk/scottish-income-tax" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] hover:text-rose-600 font-medium underline underline-offset-4 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    GOV.UK: Scottish Income Tax Rates
                                </a>
                            </li>
                            <li>
                                <a href="https://www.gov.scot/policies/taxes/income-tax/" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] hover:text-rose-600 font-medium underline underline-offset-4 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    Scottish Government Official Tax Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm not-prose mb-12">
                        <h3 className="text-[#1e3a8a] font-bold text-xl mb-4 border-b pb-2">3. Welsh Income Tax</h3>
                        <p className="text-slate-600 mb-4">Wales also holds devolved tax powers. Currently, the Welsh Rates of Income Tax (WRIT) are set so that overall rates match those in England and Northern Ireland, but we calculate this distinctly to ensure future accuracy if the Welsh Government diverges.</p>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://www.gov.uk/welsh-income-tax" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] hover:text-rose-600 font-medium underline underline-offset-4 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    GOV.UK: Welsh Income Tax
                                </a>
                            </li>
                            <li>
                                <a href="https://www.gov.wales/welsh-rates-income-tax" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] hover:text-rose-600 font-medium underline underline-offset-4 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    Welsh Government: Income Tax Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm not-prose mb-12">
                        <h3 className="text-[#1e3a8a] font-bold text-xl mb-4 border-b pb-2">4. National Insurance (NI)</h3>
                        <p className="text-slate-600 mb-4">National Insurance contributions are calculated differently depending on your employment status. We apply Class 1 rates for Employees and Directors, and Class 4 rates for Sole Traders (Self-Employed).</p>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://www.gov.uk/national-insurance-rates-letters" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] hover:text-rose-600 font-medium underline underline-offset-4 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    GOV.UK: National Insurance Rates and Categories
                                </a>
                            </li>
                            <li>
                                <a href="https://www.gov.uk/self-employed-national-insurance-rates" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] hover:text-rose-600 font-medium underline underline-offset-4 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    GOV.UK: Self-Employed National Insurance Rates
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm not-prose mb-12">
                        <h3 className="text-[#1e3a8a] font-bold text-xl mb-4 border-b pb-2">5. High Income Child Benefit Charge (HICBC)</h3>
                        <p className="text-slate-600 mb-4">When a taxpayer or their partner earns over £60,000, they must repay a portion (or all) of their Child Benefit. We automate this calculation to clearly highlight exactly what is being clawed back.</p>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://www.gov.uk/child-benefit-tax-charge" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] hover:text-rose-600 font-medium underline underline-offset-4 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    GOV.UK: High Income Child Benefit Charge
                                </a>
                            </li>
                        </ul>
                    </div>

                </article>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 text-sm font-medium text-slate-400">
                        <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                        <Link href="/how-to" className="hover:text-white transition-colors">How to Use</Link>
                        <Link href="/sources" className="hover:text-white transition-colors">Data Sources</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy & Terms</Link>
                    </div>
                    <div className="text-center">
                        <span className="text-xl font-bold tracking-tight text-white mb-2 block">
                            netpayhome<span className="text-[#c02636]">.</span>
                        </span>
                        <p className="text-slate-500 text-sm">
                            © {new Date().getFullYear()} NetPayHome. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
