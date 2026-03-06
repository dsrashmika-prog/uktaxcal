import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy & Disclaimer | NetPayHome',
    description: 'Privacy policy and legal disclaimers for NetPayHome UK Salary Calculator. Please read our terms regarding data usage and financial information.',
    alternates: {
        canonical: 'https://netpayhome.co.uk/privacy',
    },
};

export default function PrivacyPage() {
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

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1e3a8a] mb-2 tracking-tight">
                        Privacy Policy & Disclaimer
                    </h1>
                    <p className="text-slate-500 text-sm mb-12 font-medium">Last updated: March 2024</p>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-12 shadow-sm">
                        <h2 className="text-amber-800 font-bold text-2xl mt-0 mb-4 flex items-center gap-2">
                            <span className="text-2xl">⚠️</span> Important Legal Disclaimer
                        </h2>
                        <p className="text-amber-900 m-0 text-base font-medium leading-relaxed">
                            <strong>NetPayHome is for informational and educational purposes only.</strong> The calculations, estimates, and tax information provided by this website do <strong>not</strong> constitute professional financial, tax, or legal advice.
                            <br /><br />
                            While we strive for mathematically rigorous accuracy based on standard HMRC tax bands for the 2024/25 and 2025/26 tax years (including Scottish & Welsh variations), individual tax circumstances are highly complex. Variables such as underpaid tax from previous years, specific benefit-in-kind arrangements, changing legislation, or unique employment statuses can significantly alter your real-world take-home pay.
                            <br /><br />
                            We strongly recommend consulting a qualified accountant, financial advisor, or directly contacting Her Majesty's Revenue and Customs (HMRC) before making any critical financial decisions or relying solely on the outputs of this calculator.
                        </p>
                    </div>

                    <hr className="my-10 border-slate-200" />

                    <h2>Privacy Policy</h2>

                    <p>
                        At NetPayHome, we believe your financial data is exactly that—yours. This Privacy Policy explains our approach to data collection and how we protect your privacy when you use our UK Salary Calculator.
                    </p>

                    <h3>1. Data Collection & Usage</h3>
                    <p>
                        <strong>We do not collect, store, or transmit your financial data.</strong>
                        <br />
                        All calculations performed on NetPayHome occur entirely locally within your internet browser on your personal device (client-side processing). When you input your salary, age, pension information, or tax code, that information is temporarily held in your browser's memory to perform the requested calculation. Once you close the tab or refresh the page, that session data is permanently erased.
                    </p>
                    <p>
                        We do not run databases that store user inputs. We do not have user accounts or login systems that track your history.
                    </p>

                    <h3>2. Cookies and Tracking</h3>
                    <p>
                        NetPayHome is designed to be as lightweight and privacy-respecting as possible. We do not use invasive tracking cookies or third-party advertising trackers that follow you across the internet.
                    </p>
                    <p>
                        If we implement analytics in the future (such as Vercel Web Analytics), it will be strictly for aggregate, anonymized performance monitoring (e.g., counting total page views or identifying slow-loading components) and will never be tied back to your specific financial inputs or personal identity.
                    </p>

                    <h3>3. Third-Party Links</h3>
                    <p>
                        Our website may contain links to external sites (such as HMRC, Gov.uk, or other resources) that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                    </p>

                    <h3>4. Changes to This Policy</h3>
                    <p>
                        We may update our Privacy Policy and Disclaimer from time to time. We will notify you of any changes by posting the new document on this page and updating the "Last updated" date at the top of this document. You are advised to review this Privacy Policy periodically for any changes.
                    </p>

                    <h3>5. Contact Us</h3>
                    <p>
                        If you have any questions about this Privacy Policy or the calculations on this site, please feel free to reach out via our GitHub repository or contact the developer directly.
                    </p>

                </article>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="flex space-x-6">
                        <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                            About NetPayHome
                        </Link>
                        <Link href="/how-to" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                            How to Use
                        </Link>
                        <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                            Privacy Policy
                        </Link>
                    </div>
                    <p className="mt-8 text-center text-sm leading-5 text-slate-400">
                        &copy; {new Date().getFullYear()} NetPayHome. Designed for accurate UK 2024/2025 & 2025/2026 Salary calculations.
                    </p>
                </div>
            </footer>
        </div>
    );
}
