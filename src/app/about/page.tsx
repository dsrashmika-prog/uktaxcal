"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Target, Link as LinkIcon, Info, HelpCircle } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                    <Info className="w-8 h-8 text-emerald-600" />
                    About taxcaluk
                </h1>
                <p className="text-slate-500 mt-2 text-lg">
                    Learn about our methodology, mission, and the official data sources powering our calculator.
                </p>
            </header>

            <div className="space-y-6">
                {/* Section 1: Our Mission */}
                <Card className="border border-slate-200 shadow-sm bg-white">
                    <CardHeader className="bg-emerald-50/50 border-b border-slate-100 pb-4">
                        <CardTitle className="text-xl text-emerald-900 flex items-center gap-2">
                            <Target className="w-5 h-5 text-emerald-600" />
                            Our Mission
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 text-slate-700 leading-relaxed space-y-4">
                        <p>
                            Our mission is to provide unparalleled financial clarity for UK taxpayers through a &apos;legislation-first&apos; approach. We believe that understanding your take-home pay shouldn&apos;t require a degree in accounting.
                        </p>
                        <p>
                            By translating complex HMRC rules into an intuitive, accessible interface, we empower individuals, freelancers, and small business owners to make informed decisions about their income, pensions, and financial planning.
                        </p>
                    </CardContent>
                </Card>

                {/* Section 2: Why Accuracy Matters */}
                <Card className="border border-slate-200 shadow-sm bg-white">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                        <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                            Why Accuracy Matters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 text-slate-700 leading-relaxed space-y-4">
                        <p>
                            Tax legislation is constantly evolving. Relying on outdated calculators can lead to significant financial surprises. That&apos;s why we obsess over accuracy, strictly adhering to the latest comprehensive tax data for the <strong>2025/26</strong> tax years and beyond.
                        </p>
                        <p>
                            Our calculator has been rigorously updated to align with the significant <strong>2025 Autumn Budget</strong> changes. This includes the major shifts to Employer National Insurance, which increased to a 15% rate with a lowered £5,000 threshold. We also natively support the highly specific 6-band Scottish Tax system, ensuring that your location doesn&apos;t compromise your calculation&apos;s precision.
                        </p>
                    </CardContent>
                </Card>

                {/* Section 4: Features Explained */}
                <Card className="border border-slate-200 shadow-sm bg-white">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                        <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-indigo-600" />
                            Features Explained
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 text-slate-700 leading-relaxed space-y-4">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <strong className="text-slate-900 block mb-1">Advanced Tax Codes</strong>
                                Supports standard (L), Scottish (S), negative allowance (K), and basic rate (BR/D0/D1) codes automatically.
                            </li>
                            <li className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <strong className="text-slate-900 block mb-1">Employment Types</strong>
                                Calculates accurately whether you are Employed (PAYE) or Self-Employed (Sole Trader) factoring in exact Class 2 and Class 4 NI rules.
                            </li>
                            <li className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <strong className="text-slate-900 block mb-1">Student Loans</strong>
                                Full array of repayment thresholds including Plan 1, Plan 2, Plan 4 (Scotland), Plan 5, and Postgraduate loans.
                            </li>
                            <li className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <strong className="text-slate-900 block mb-1">Pension Contributions</strong>
                                Adjustable auto-enrolment pension sliders that correctly map deductive logic against qualifying earnings.
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Section 3: Official Data Sources */}
                <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="bg-slate-900 border-b border-slate-800 pb-4">
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-slate-300" />
                            Official Data Sources
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            We don&apos;t guess the numbers. Our logic is built directly from official government publications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 p-0">
                        <div className="divide-y divide-slate-100">
                            <a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" className="block p-4 md:px-6 hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">Income Tax (England/Wales/NI)</span>
                                    <LinkIcon className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                                </div>
                                <p className="text-sm text-slate-500 mt-1">gov.uk/income-tax-rates</p>
                            </a>
                            <a href="https://www.gov.scot/publications/scottish-income-tax-2025-2026-factsheet/" target="_blank" rel="noopener noreferrer" className="block p-4 md:px-6 hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">Scottish Income Tax (2025/26 Factsheet)</span>
                                    <LinkIcon className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                                </div>
                                <p className="text-sm text-slate-500 mt-1">gov.scot/publications/scottish-income-tax</p>
                            </a>
                            <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026" target="_blank" rel="noopener noreferrer" className="block p-4 md:px-6 hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">National Insurance (Employers)</span>
                                    <LinkIcon className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                                </div>
                                <p className="text-sm text-slate-500 mt-1">gov.uk/guidance/rates-and-thresholds-for-employers</p>
                            </a>
                            <a href="https://www.gov.uk/repaying-your-student-loan/what-you-pay" target="_blank" rel="noopener noreferrer" className="block p-4 md:px-6 hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">Student Loan Repayments</span>
                                    <LinkIcon className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                                </div>
                                <p className="text-sm text-slate-500 mt-1">gov.uk/repaying-your-student-loan/what-you-pay</p>
                            </a>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 5: Disclaimer */}
                <div className="bg-slate-100 rounded-lg p-6 text-sm text-slate-600 text-center border border-slate-200">
                    <p className="font-semibold text-slate-800 mb-2">Disclaimer</p>
                    <p>
                        This calculator is provided for illustrative and educational purposes only. While every effort is made to ensure the accuracy of the calculations based on the latest available data, it does not constitute official financial or tax advice. We strongly recommend consulting a qualified accountant or financial professional before making any significant financial decisions.
                    </p>
                </div>

            </div>
        </div>
    );
}
