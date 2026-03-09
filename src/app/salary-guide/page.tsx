import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'UK Take-Home Pay Guide 2025/26 | £30k, £50k, £100k | NetPayHome',
    description: 'Find out exactly how much you take home on a £30,000, £50,000 or £100,000 salary in the UK for the 2025/26 tax year — with charts showing income tax, National Insurance, and net pay.',
    openGraph: {
        title: 'UK Take-Home Pay Guide 2025/26: £30k, £50k, £100k',
        description: 'Detailed breakdown of UK take-home pay at three key salary levels with 2025/26 tax figures, interactive charts, and plain-English explanations.',
        url: 'https://netpayhome.co.uk/salary-guide',
        siteName: 'NetPayHome',
        type: 'article',
    },
};

// ── Colour tokens ─────────────────────────────────────────────────────────────
const BLUE = '#1e3a8a';
const LBLUE = '#162d6e';
const YELLOW = '#facc15';

// ── 2025/26 calculations (hardcoded for performance — no client JS needed) ────
const scenarios = [
    {
        gross: 30_000,
        label: '£30,000',
        incomeTax: 3_486,
        ni: 1_454,
        takeHome: 25_060,
        effectiveRate: 16.5,
        color: '#3b82f6',
        lightColor: '#dbeafe',
    },
    {
        gross: 50_000,
        label: '£50,000',
        incomeTax: 7_486,
        ni: 4_524,
        takeHome: 37_990,
        effectiveRate: 23.9,
        color: '#8b5cf6',
        lightColor: '#ede9fe',
    },
    {
        gross: 100_000,
        label: '£100,000',
        incomeTax: 27_432,
        ni: 5_814,
        takeHome: 66_754,
        effectiveRate: 33.2,
        color: '#c62035',
        lightColor: '#fee2e2',
    },
];

const fmt = (n: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);

const pct = (n: number) => `${((n / (n + 0)) * 100).toFixed(1)}%`;

// ── Donut chart ────────────────────────────────────────────────────────────────
function DonutChart({ gross, incomeTax, ni, takeHome, color }: {
    gross: number; incomeTax: number; ni: number; takeHome: number; color: string;
}) {
    const R = 60, cx = 80, cy = 80, strokeW = 22;
    const circum = 2 * Math.PI * R;

    const segments = [
        { value: takeHome, color },
        { value: incomeTax, color: '#f97316' },
        { value: ni, color: '#facc15' },
    ];

    let offset = 0;
    const arcs = segments.map(s => {
        const dash = (s.value / gross) * circum;
        const gap = circum - dash;
        const arc = (
            <circle
                key={s.color}
                r={R}
                cx={cx}
                cy={cy}
                fill="none"
                stroke={s.color}
                strokeWidth={strokeW}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${cx} ${cy})`}
            />
        );
        offset += dash;
        return arc;
    });

    return (
        <svg viewBox="0 0 160 160" width={160} height={160} aria-hidden="true">
            <circle r={R} cx={cx} cy={cy} fill="none" stroke="#e5e7eb" strokeWidth={strokeW} />
            {arcs}
            <text x={cx} y={cy - 8} textAnchor="middle" fontSize={11} fill="#6b7280" fontFamily="inherit">Take home</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize={14} fontWeight={700} fill={BLUE} fontFamily="inherit">
                {Math.round((takeHome / gross) * 100)}%
            </text>
        </svg>
    );
}

// ── Bar chart (three salaries side-by-side) ───────────────────────────────────
function BarChart() {
    const max = 100_000;
    const barW = 56;
    const gap = 32;
    const chartH = 200;
    const totalW = scenarios.length * (barW + gap) + gap;

    return (
        <svg viewBox={`0 0 ${totalW} ${chartH + 40}`} width="100%" aria-label="Comparative take-home pay bar chart" style={{ maxWidth: 480 }}>
            {/* gridlines */}
            {[0, 25000, 50000, 75000, 100000].map(v => {
                const y = chartH - (v / max) * chartH;
                return (
                    <g key={v}>
                        <line x1={0} y1={y} x2={totalW} y2={y} stroke="#e5e7eb" strokeWidth={1} />
                        <text x={2} y={y - 3} fontSize={9} fill="#9ca3af" fontFamily="inherit">£{(v / 1000).toFixed(0)}k</text>
                    </g>
                );
            })}

            {scenarios.map((s, i) => {
                const x = gap + i * (barW + gap);
                const grossH = (s.gross / max) * chartH;
                const thH = (s.takeHome / max) * chartH;
                return (
                    <g key={s.label}>
                        {/* Gross (faint) */}
                        <rect x={x} y={chartH - grossH} width={barW} height={grossH} fill={s.lightColor} rx={4} />
                        {/* Take-home */}
                        <rect x={x} y={chartH - thH} width={barW} height={thH} fill={s.color} rx={4} />
                        {/* Label */}
                        <text x={x + barW / 2} y={chartH + 16} textAnchor="middle" fontSize={11} fill="#374151" fontFamily="inherit" fontWeight={600}>{s.label}</text>
                        <text x={x + barW / 2} y={chartH + 28} textAnchor="middle" fontSize={9} fill="#6b7280" fontFamily="inherit">take home</text>
                    </g>
                );
            })}
        </svg>
    );
}

// ── Shared card style ─────────────────────────────────────────────────────────
const card: React.CSSProperties = {
    background: 'white',
    border: '1px solid #dde3f0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 32,
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SalaryGuidePage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f6f6f6', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#333' }}>

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
                <div className="scrollbar-hide" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", gap: "32px", overflowX: "auto", whiteSpace: "nowrap" }}>
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

            {/* ── Main ── */}
            <main style={{ flex: 1, padding: '40px 24px', maxWidth: 860, margin: '0 auto', width: '100%' }}>

                {/* ── Article header ── */}
                <div style={{ ...card, padding: '32px 36px' }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Salary Guide · 2025/26 Tax Year</p>
                    <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: BLUE, lineHeight: 1.2, margin: '0 0 16px' }}>
                        What Is the UK Take-Home Pay for <span style={{ color: '#c62035' }}>£30k, £50k, and £100k</span>?
                    </h2>
                    <p style={{ fontSize: 16, lineHeight: 1.8, color: '#444', margin: 0 }}>
                        Whether you are comparing a new job offer, planning your finances, or just curious about how HMRC divides your salary, this guide gives you the real numbers for three of the most common UK salary benchmarks — using precise 2025/26 tax figures.
                    </p>
                    <div style={{ marginTop: 20, padding: '12px 16px', background: '#fffbeb', borderLeft: '4px solid #f59e0b', borderRadius: '0 4px 4px 0' }}>
                        <p style={{ margin: 0, fontSize: 13, color: '#555' }}>
                            <strong>Assumptions:</strong> Employee, England, standard 1257L tax code, no pension, no student loan, no benefits-in-kind. Tax year 2025/26. <Link href="/" style={{ color: BLUE, fontWeight: 600 }}>Use the full calculator</Link> to personalise your result.
                        </p>
                    </div>
                </div>

                {/* ── Comparison bar chart ── */}
                <div style={card}>
                    <div style={{ background: BLUE, padding: '14px 24px' }}>
                        <h3 style={{ color: 'white', fontWeight: 700, fontSize: 16, margin: 0 }}>Take-Home Pay vs. Gross Salary</h3>
                        <p style={{ color: '#bfdbfe', fontSize: 13, margin: '4px 0 0' }}>Coloured bar = take-home · Faint bar = gross salary</p>
                    </div>
                    <div style={{ padding: '28px 24px', display: 'flex', justifyContent: 'center' }}>
                        <BarChart />
                    </div>
                    <div style={{ padding: '0 24px 24px', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                        {scenarios.map(s => (
                            <div key={s.gross} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ display: 'inline-block', width: 14, height: 14, background: s.color, borderRadius: 3 }} />
                                <span style={{ fontSize: 13, color: '#555' }}>{s.label} take-home</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Per-salary cards ── */}
                {scenarios.map(s => {
                    const totalDeductions = s.incomeTax + s.ni;
                    return (
                        <div key={s.gross} style={card}>
                            {/* Card header */}
                            <div style={{ background: s.color, padding: '16px 24px' }}>
                                <h3 style={{ color: 'white', fontWeight: 800, fontSize: 20, margin: 0 }}>{s.label} Salary</h3>
                                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, margin: '4px 0 0' }}>
                                    2025/26 · Standard tax code · England
                                </p>
                            </div>

                            {/* Key numbers row */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, borderBottom: '1px solid #eef0f7' }}>
                                {[
                                    { label: 'Monthly take-home', value: fmt(s.takeHome / 12), highlight: true },
                                    { label: 'Annual take-home', value: fmt(s.takeHome), highlight: false },
                                    { label: 'Effective tax rate', value: `${s.effectiveRate}%`, highlight: false },
                                ].map((item, idx) => (
                                    <div key={idx} style={{
                                        flex: '1 1 160px',
                                        padding: '20px 24px',
                                        borderRight: idx < 2 ? '1px solid #eef0f7' : 'none',
                                        background: item.highlight ? '#f5f7fe' : 'white',
                                    }}>
                                        <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</p>
                                        <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: s.color }}>{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Chart + breakdown */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: '24px 24px' }}>
                                {/* Donut */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                                    <DonutChart gross={s.gross} incomeTax={s.incomeTax} ni={s.ni} takeHome={s.takeHome} color={s.color} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                        {[
                                            { color: s.color, label: 'Take-home' },
                                            { color: '#f97316', label: 'Income Tax' },
                                            { color: YELLOW, label: 'National Insurance' },
                                        ].map(item => (
                                            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span style={{ width: 12, height: 12, background: item.color, borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
                                                <span style={{ fontSize: 12, color: '#555' }}>{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Table */}
                                <div style={{ flex: '1 1 280px', minWidth: 0 }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                                        <thead>
                                            <tr style={{ background: '#f5f7fe', borderBottom: '1px solid #dde3f0' }}>
                                                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#273157' }}></th>
                                                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#273157' }}>Yearly</th>
                                                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#273157' }}>Monthly</th>
                                                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#273157' }}>Weekly</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { label: 'Gross Salary', value: s.gross, bold: true, color: '#273157' },
                                                { label: '− Income Tax', value: s.incomeTax, bold: false, color: '#c62035' },
                                                { label: '− National Ins.', value: s.ni, bold: false, color: '#c62035' },
                                                { label: '= Take-Home', value: s.takeHome, bold: true, color: s.color },
                                            ].map((row, idx) => (
                                                <tr key={row.label} style={{ background: idx % 2 === 0 ? 'white' : '#f9fbff', ...(row.label.startsWith('=') ? { background: '#e8eeff', borderTop: `2px solid ${s.color}` } : {}) }}>
                                                    <td style={{ padding: '10px 14px', fontWeight: row.bold ? 700 : 400, color: '#273157', fontSize: 13 }}>{row.label}</td>
                                                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: row.bold ? 700 : 400, color: row.color }}>{fmt(row.value)}</td>
                                                    <td style={{ padding: '10px 12px', textAlign: 'right', color: row.color }}>{fmt(row.value / 12)}</td>
                                                    <td style={{ padding: '10px 12px', textAlign: 'right', color: '#888', fontSize: 13 }}>{fmt(row.value / 52)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Plain-English note per salary */}
                                    {s.gross === 30_000 && (
                                        <div style={{ marginTop: 16, fontSize: 13, lineHeight: 1.7, color: '#555' }}>
                                            <p style={{ margin: '0 0 8px' }}>On a <strong>£30,000 salary</strong> you pay only the basic rate of income tax (20%) on income above the £12,570 Personal Allowance. Since your earnings stay below the higher-rate threshold (£50,270), every pound of tax-free pension or Gift Aid contribution saves you 20p in tax.</p>
                                        </div>
                                    )}
                                    {s.gross === 50_000 && (
                                        <div style={{ marginTop: 16, fontSize: 13, lineHeight: 1.7, color: '#555' }}>
                                            <p style={{ margin: '0 0 8px' }}>At <strong>£50,000</strong> you are right at the top of the basic-rate band. Be aware of the <strong>High Income Child Benefit Charge</strong> — if you or your partner claim Child Benefit, a salary over £60,000 triggers a 100% clawback. A salary sacrifice pension can keep you under the threshold.</p>
                                        </div>
                                    )}
                                    {s.gross === 100_000 && (
                                        <div style={{ marginTop: 16, fontSize: 13, lineHeight: 1.7, color: '#555' }}>
                                            <p style={{ margin: '0 0 8px' }}>The <strong>£100,000 salary</strong> is famous for the UK&apos;s stealth <strong>&quot;60% tax trap&quot;</strong>. Between £100k and £125,140 your Personal Allowance is withdrawn at £1 for every £2 earned, creating an effective marginal rate of 60%. Consider salary sacrifice into a pension to reduce adjusted net income below £100,000.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* ── Effective tax rate bar ── */}
                <div style={card}>
                    <div style={{ background: BLUE, padding: '14px 24px' }}>
                        <h3 style={{ color: 'white', fontWeight: 700, fontSize: 16, margin: 0 }}>Effective Total Deduction Rate</h3>
                        <p style={{ color: '#bfdbfe', fontSize: 13, margin: '4px 0 0' }}>How much of your gross salary goes to HMRC (Income Tax + NI combined)</p>
                    </div>
                    <div style={{ padding: '24px 24px' }}>
                        {scenarios.map(s => (
                            <div key={s.gross} style={{ marginBottom: 20 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontWeight: 700, fontSize: 14, color: '#273157' }}>{s.label}</span>
                                    <span style={{ fontWeight: 600, fontSize: 14, color: s.color }}>{s.effectiveRate}% deducted</span>
                                </div>
                                <div style={{ height: 28, background: '#e5e7eb', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: 0, top: 0, bottom: 0,
                                        width: `${s.effectiveRate}%`,
                                        background: `linear-gradient(90deg, ${s.color}dd, ${s.color})`,
                                        borderRadius: 6,
                                        display: 'flex', alignItems: 'center', paddingLeft: 12,
                                    }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{fmt(s.incomeTax + s.ni)} deducted</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── FAQ / article body ── */}
                <div style={{ ...card, padding: '32px 36px' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: BLUE, marginTop: 0 }}>Key Takeaways</h3>
                    <ul style={{ lineHeight: 2, paddingLeft: 20, color: '#444', fontSize: 15 }}>
                        <li>On <strong>£30,000</strong> you keep <strong>83.5%</strong> of your salary — paying £3,486 in Income Tax and £1,454 in NI.</li>
                        <li>On <strong>£50,000</strong> you keep <strong>76.0%</strong> — higher-rate tax starts at £50,270 so you are just inside the basic band.</li>
                        <li>On <strong>£100,000</strong> you keep only <strong>66.8%</strong>, largely because the Personal Allowance is wiped out, creating the 60% marginal trap between £100k–£125k.</li>
                        <li>A salary sacrifice pension contribution is the most tax-efficient way to reduce your bill at all three salary levels.</li>
                    </ul>
                    <div style={{ borderTop: '1px solid #eef0f7', paddingTop: 20, marginTop: 20 }}>
                        <Link
                            href="/"
                            style={{
                                display: 'inline-block',
                                background: '#c62035',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: 16,
                                padding: '14px 32px',
                                borderRadius: 6,
                                textDecoration: 'none',
                            }}
                        >
                            Calculate your own take-home pay →
                        </Link>
                    </div>
                </div>

            </main>

            {/* ── Footer ── */}
            <footer style={{ background: BLUE, color: 'white', marginTop: 'auto' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 24px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 24, borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 24, marginBottom: 24 }}>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: 20 }}>
                                <span style={{ color: '#93c5fd' }}>netpay</span><span style={{ color: YELLOW }}>home</span><span style={{ color: '#93c5fd' }}>.</span>
                            </div>
                            <p style={{ color: '#93c5fd', fontSize: 13, marginTop: 8, maxWidth: 280 }}>Free, accurate UK salary calculator for employees, directors, and sole traders.</p>
                        </div>
                        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                            {[{ href: '/about', label: 'About Us' }, { href: '/how-to', label: 'How to Use' }, { href: '/sources', label: 'Data Sources' }, { href: '/privacy', label: 'Privacy & Terms' }].map(link => (
                                <Link key={link.href} href={link.href} style={{ color: '#93c5fd', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>{link.label}</Link>
                            ))}
                        </div>
                    </div>
                    <p style={{ color: '#64748b', fontSize: 12, margin: 0 }}>© 2026 NetPayHome. For informational purposes only. Always confirm tax figures with HMRC or a qualified accountant.</p>
                </div>
            </footer>
        </div>
    );
}
