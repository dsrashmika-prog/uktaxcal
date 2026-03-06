import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'How to Use the Calculator | NetPayHome',
    description: 'A simple, step-by-step guide on how to use the NetPayHome UK Salary Calculator to find your true take-home pay, understand tax traps, and calculate pension deductions.',
    alternates: {
        canonical: 'https://netpayhome.co.uk/how-to',
    },
};

export default function HowToPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-[#1e3a8a] selection:text-white flex flex-col">
            {/* Header Navigation */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <h1 className="text-2xl font-extrabold tracking-tight">
                            <span className="text-[#1e3a8a]">netpay</span>
                            <span className="text-[#c02636]">home</span>
                            <span className="text-[#1e3a8a]">.</span>
                        </h1>
                    </Link>
                    <nav className="flex space-x-6">
                        <Link
                            href="/"
                            className="text-sm font-semibold text-slate-600 hover:text-[#1e3a8a] transition-colors"
                        >
                            Calculator
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-semibold text-slate-600 hover:text-[#1e3a8a] transition-colors"
                        >
                            About
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <article className="prose prose-slate prose-lg lg:prose-xl mx-auto prose-h2:text-[#1e3a8a] prose-h3:text-slate-800 prose-a:text-[#1e3a8a] prose-a:font-semibold">

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1e3a8a] mb-6 tracking-tight">
                        How to Use the Calculator
                    </h1>

                    <p className="lead text-xl text-slate-600 font-medium">
                        Welcome to NetPayHome! Taxes can be a bit of a headache, so we've designed this calculator to do all the heavy lifting for you. Whether you're an employee, a company director, or a sole trader, here is a quick, friendly guide on how to find out your true take-home pay.
                    </p>

                    <hr className="my-10 border-slate-200" />

                    <h2>Step 1: The Basics</h2>
                    <p>
                        When you first arrive on the calculator, you'll see a card titled <strong>Basic Details</strong>. This is where we need to know your "Tax Status" (or, as we call it, your Persona!).
                    </p>
                    <ul>
                        <li><strong>Employee (PAYE):</strong> Select this if you work for an employer and get a standard payslip.</li>
                        <li><strong>Sole Trader:</strong> Select this if you work for yourself. We'll automatically calculate your Class 4 National Insurance instead!</li>
                        <li><strong>Director:</strong> Select this if you own a limited company. This will unlock the "Dividends" section further down.</li>
                    </ul>
                    <p>
                        You'll also need to pop in your <strong>Age</strong> (this is important, as National Insurance stops when you hit state pension age!) and let us know if you live in <strong>Scotland</strong> or <strong>Wales</strong>, as they have their own specific tax bands.
                    </p>

                    <div className="my-8 border-4 border-slate-100 rounded-xl overflow-hidden shadow-sm">
                        <Image
                            src="/guides/step1-main.png"
                            alt="Screenshot of the Basic Details section of the calculator"
                            width={800}
                            height={400}
                            className="w-full object-cover m-0"
                        />
                    </div>

                    <h2>Step 2: Income & Bonuses</h2>
                    <p>
                        Next up is the <strong>Income</strong> tab. Simply type your salary into the "Gross income (pre-tax)" box. You can change the dropdown next to it to tell us if that figure is your yearly salary, your monthly wage, or even your hourly rate!
                    </p>
                    <p>
                        If you are expecting a bonus this year, click on the "Bonus" section to add it in. The calculator will automatically figure out how much tax will be sliced off your bonus before it hits your bank account.
                    </p>

                    <div className="bg-blue-50 border-l-4 border-[#1e3a8a] p-6 rounded-r-lg my-8">
                        <h3 className="text-[#1e3a8a] font-bold text-xl mt-0 mb-2">Notice the Tax Code?</h3>
                        <p className="text-slate-700 m-0 text-base">
                            We automatically fill in the standard UK tax code for you (<strong>1257L</strong>). If you have a different tax code from HMRC (perhaps due to underpaid tax last year or company benefits), you can just type it straight into the box and we'll adjust your tax-free allowance instantly!
                        </p>
                    </div>

                    <h2>Step 3: Pensions, Loans & Families</h2>
                    <p>
                        Now for the clever bit. Tucked away in the <strong>Additional Options</strong> area, you'll find three very important tabs:
                    </p>
                    <ul>
                        <li><strong>Student Loan:</strong> Tick the box that matches your loan plan (Plan 1, Plan 2, Plan 4, etc.). We'll handle the complex thresholds.</li>
                        <li><strong>Pension:</strong> This is a big one! Tell us how much you contribute to your pension. Crucially, make sure you select the correct <em>Pension Type</em> (like Salary Sacrifice or Auto-enrolment), as this completely changes how your National Insurance is calculated.</li>
                        <li><strong>Family & Child Benefit:</strong> If you claim child benefit, let us know how many children you have here.</li>
                    </ul>

                    <div className="my-8 border-4 border-slate-100 rounded-xl overflow-hidden shadow-sm">
                        <Image
                            src="/guides/step3-options.webp"
                            alt="Screenshot of the Additional Options tabs"
                            width={800}
                            height={400}
                            className="w-full object-cover m-0"
                        />
                    </div>

                    <h2>Step 4: Click CALCULATE!</h2>
                    <p>
                        Once you've entered your details, hit the big red <strong>CALCULATE!</strong> button.
                    </p>
                    <p>
                        On the right side of your screen (or at the bottom if you're on a mobile phone), your fully broken-down payslip will appear. We show you exactly how much Income Tax, National Insurance, and Student Loan is being deducted.
                    </p>

                    <div className="my-8 border-4 border-slate-100 rounded-xl overflow-hidden shadow-sm">
                        <Image
                            src="/guides/step2-results.png"
                            alt="Screenshot of the final results table"
                            width={800}
                            height={400}
                            className="w-full object-cover m-0"
                        />
                    </div>

                    <h3>Watch out for Tax Traps!</h3>
                    <p>
                        If you earn over £50,000 and claim Child Benefit, or if you earn over £100,000, our system will automatically flash a bright orange warning box above your results.
                    </p>
                    <p>
                        These are known as <strong>Tax Traps</strong>. We will show you exactly how much money you are losing to these hidden government charges (like the High Income Child Benefit Charge, or the infamous 60% marginal tax rate) so you aren't caught off guard.
                    </p>

                    <div className="mt-12 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-md bg-[#c02636] px-8 py-4 text-lg font-bold text-white shadow-sm hover:bg-rose-700 transition-colors"
                        >
                            Return to Calculator
                        </Link>
                    </div>

                </article>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <p className="mt-8 text-center text-sm leading-5 text-slate-400">
                        &copy; {new Date().getFullYear()} NetPayHome. Designed for accurate UK 2024/2025 & 2025/2026 Salary calculations.
                    </p>
                </div>
            </footer>
        </div>
    );
}
