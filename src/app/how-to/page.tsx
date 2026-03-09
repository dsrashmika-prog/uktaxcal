import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "How to Use NetPayHome - UK Take Home Pay Calculator",
    description: "A simple, friendly guide to using the NetPayHome salary calculator. Learn how to spot the 60% tax trap, calculate child benefit charges, and use salary sacrifice to keep more of your money.",
    openGraph: {
        title: "How to Use NetPayHome - UK Take Home Pay Calculator",
        description: "A simple, friendly guide to using the NetPayHome salary calculator. Learn how to spot tax traps and keep more of your money.",
        url: "https://netpayhome.co.uk/how-to",
        siteName: "NetPayHome",
    },
    alternates: {
        canonical: "https://netpayhome.co.uk/how-to",
    },
};

export default function HowToUse() {
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
                <article className="prose prose-slate prose-lg lg:prose-xl mx-auto prose-h2:text-[#1e3a8a] prose-h3:text-slate-800 prose-a:text-[#1e3a8a] prose-a:font-semibold prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-slate-200">

                    <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1e3a8a] mb-6 tracking-tight">
                        How to use the calculator
                    </h1>

                    <p className="lead text-xl text-slate-600 font-medium mb-12">
                        Working out your exact take home pay shouldn't require a degree in accountancy. We've built NetPayHome to be as simple as possible, whilst still handling the really complex bits of the UK tax system automatically behind the scenes.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6">1. The Standard Calculation</h2>
                    <p>
                        Getting a basic breakdown of your salary is a doddle. Simply pop your age and gross income into the <strong>Basic Details</strong> box at the top. For most folks earning a standard salary—say, £50,000 a year—you'll get an instant, clean breakdown showing exactly what you pay in Income Tax and National Insurance, and what you actually get to take home.
                    </p>
                    <div className="my-8 relative w-full max-w-sm mx-auto aspect-[4/5] sm:aspect-[4/3] sm:max-w-xl">
                        <Image
                            src="/guide/1-standard.jpg"
                            alt="Standard tax calculation for a £50,000 salary"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <h2 className="text-2xl font-bold mt-16 mb-6">2. Spotting the 60% Tax Trap</h2>
                    <p>
                        Things start to get a bit tricky when your earnings cross the £100,000 mark. The government slowly takes away your tax-free Personal Allowance—meaning for every £2 you earn over £100k, you lose £1 of your allowance. This creates a hidden marginal tax rate of 60%!
                    </p>
                    <p>
                        Our calculator spots this instantly. If you type in £110,000, you'll immediately see a red alert warning you that you've been caught in the trap and exactly how much allowance you've lost.
                    </p>
                    <div className="my-8 relative w-full max-w-sm mx-auto aspect-[3/5] sm:aspect-[4/5] sm:max-w-lg">
                        <Image
                            src="/guide/2-tax-trap.jpg"
                            alt="The 60% tax trap appearing on a £110,000 salary"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <h2 className="text-2xl font-bold mt-16 mb-6">3. The High Income Child Benefit Charge (HICBC)</h2>
                    <p>
                        If you or your partner earn over £60,000 and you claim Child Benefit, you'll have to start paying some of it back. Earn over £80,000, and you have to pay it all back. It's a bit of a nightmare to work out manually.
                    </p>
                    <p>
                        We do the heavy lifting for you. Just open the <strong>Family & Child Benefit</strong> section, tick the box, and tell us how many kids you have. If your salary triggers a repayment (like earning £70,000 with 2 kids), we'll calculate the exact charge and highlight it in amber on your results breakdown so there are no nasty surprises on your tax return.
                    </p>
                    <div className="my-8 relative w-full max-w-sm mx-auto aspect-[3/5] sm:aspect-[4/5] sm:max-w-lg">
                        <Image
                            src="/guide/3-child-benefit-trap.jpg"
                            alt="Child benefit clawback charge highlighted in amber"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <h2 className="text-2xl font-bold mt-16 mb-6">4. Beating the Traps with Salary Sacrifice</h2>
                    <p>
                        The best way to dodge both the 60% trap and the Child Benefit charge is to lower your 'Adjusted Net Income'. The easiest way to do that? Pay more into your pension using Salary Sacrifice.
                    </p>
                    <p>
                        Open the <strong>Pension & Deductions</strong> section, select Salary Sacrifice, and punch in a percentage.
                    </p>
                    <div className="my-8 relative w-full max-w-sm mx-auto aspect-square sm:max-w-md">
                        <Image
                            src="/guide/4-salary-sacrifice-input.jpg"
                            alt="Inputting a 10% salary sacrifice pension contribution"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <p>
                        If we look at that £110,000 earner again—by sacrificing 10% of their salary into a pension, their taxable income drops to £86,430. Suddenly, the red 60% Tax Trap warning vanishes, and they get to keep their entire Personal Allowance!
                    </p>
                    <div className="my-8 relative w-full max-w-sm mx-auto aspect-square sm:aspect-[4/3] sm:max-w-xl">
                        <Image
                            src="/guide/5-salary-sacrifice-result.jpg"
                            alt="The results table showing the tax trap has been beaten"
                            fill
                            className="object-contain"
                        />
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
