import { Landmark } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 w-full mt-auto">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-800">

                    {/* Left: Logo & Tagline */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-bold text-xl text-emerald-500">
                            <Landmark className="h-6 w-6" />
                            <span>taxcaluk</span>
                        </div>
                        <p className="text-sm text-slate-400 max-w-sm">
                            Your modern, legislation-first salary calculator for the UK Tax Year 2026/27. Taking the guesswork out of your take-home pay.
                        </p>
                    </div>

                    {/* Middle: Links */}
                    <div className="space-y-4">
                        <h3 className="text-slate-100 font-semibold">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li>
                                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                                    Sources
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right: Last Updated & Socials */}
                    <div className="space-y-4">
                        <h3 className="text-slate-100 font-semibold mb-2">Data Model</h3>
                        <div className="inline-flex items-center bg-slate-800 border border-slate-700 rounded-full px-3 py-1 text-xs font-medium text-emerald-400 mb-4">
                            Last Updated: February 2026
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="text-center space-y-4">
                    <p className="text-xs text-slate-500 leading-relaxed max-w-4xl mx-auto">
                        Disclaimer: This calculator is for illustrative purposes only. Calculations are estimates based on 2026/27 tax legislation and do not account for individual circumstances such as specific pension types, company benefits, or other personal deductions. We are not financial advisors. Please consult a qualified accountant or HMRC for official tax advice.
                    </p>
                    <p className="text-xs text-slate-600">
                        Copyright &copy; 2026 taxcaluk. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
