export default function QuickCalcPage() {
  return (
    <div dangerouslySetInnerHTML={{
      __html: `

<header>
  <div class="header-inner">
    <a class="logo" href="/">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 185 42" fill="none" style="height:38px;width:auto;">
        <text font-family="'DM Sans',Arial,sans-serif" font-weight="800" font-size="20" letter-spacing="-0.4">
          <tspan x="0" y="22" fill="white">Net</tspan><tspan fill="#00c4b7">Pay</tspan><tspan fill="rgba(255,255,255,0.85)">Home</tspan>
        </text>
        <text x="1" y="36" font-family="'DM Sans',Arial,sans-serif" font-size="8.5" font-weight="600" fill="rgba(255,255,255,0.45)" letter-spacing="2">UK TAX CALCULATOR</text>
      </svg>
    </a>
    <div class="header-right">
      <div class="tax-year-badge">2025 / 26</div>
    </div>
  </div>
</header>

<nav class="tool-nav">
  <div class="tool-nav-inner">
    <a class="tool-nav-link" href="/">&#127919; Full Calculator</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link active" href="/quick-calc">&#9889; Quick Calculator</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link" href="/tax-code">&#128221; Tax Code Checker</a>
  </div>
</nav>

  <div class="page-title">
    <h1>Quick Tax Calculator</h1>
    <p>Enter any salary to instantly see your take-home pay, tax and National Insurance — 2025/26 rates.</p>
  </div>

  <div class="quick-calc-card">

    <!-- Header -->
    <div class="quick-calc-card-header">
      <span class="fch-icon">💡</span>
      Interactive Example — Enter Any Salary
    </div>

    <!-- Salary Input -->
    <div class="quick-calc-salary-row">
      <span class="quick-calc-salary-label">Annual Salary</span>
      <div class="quick-calc-salary-field">
        <span class="qs-symbol">£</span>
        <input
          type="number"
          id="exampleSalaryInput"
          placeholder="40000"
          min="0"
          max="9999999"
        >
      </div>
    </div>

    <!-- Result Card -->
    <div class="example-card" style="border-radius:0;margin:0;">
      <div class="example-title">2025/26 — Standard Tax Code 1257L</div>
      <div class="example-salary" id="exSalaryDisplay">£40,000 / year</div>
      <div class="example-rows">
        <div class="ex-row"><span class="ex-label">Personal Allowance (tax-free)</span><span class="ex-val" id="exPersonalAllowance">£12,570</span></div>
        <div class="ex-row"><span class="ex-label">Taxable Income</span><span class="ex-val" id="exTaxableIncome">£27,430</span></div>
        <div class="ex-row"><span class="ex-label" id="exTaxRateLabel">Income Tax (up to 20%)</span><span class="ex-val deduction" id="exIncomeTax">−£5,486</span></div>
        <div class="ex-row"><span class="ex-label" id="exNIRateLabel">National Insurance (8%)</span><span class="ex-val deduction" id="exNI">−£2,234</span></div>
        <div class="ex-row" style="margin-top:4px;border-top:1px solid rgba(255,255,255,0.2);padding-top:10px;">
          <span class="ex-label" style="color:white;font-weight:600;">Annual Take-Home</span>
          <span class="ex-val takehome" id="exAnnualTakeHome">£32,280</span>
        </div>
        <div class="ex-row">
          <span class="ex-label">Monthly Take-Home</span>
          <span class="ex-val takehome" id="exMonthlyTakeHome">£2,690</span>
        </div>
        <div class="ex-row">
          <span class="ex-label">Effective Tax Rate</span>
          <span class="ex-val" id="exEffectiveRate" style="color:rgba(255,255,255,0.8);">19.3%</span>
        </div>
      </div>
      <div id="exTaxTrapWarn" style="display:none;margin-top:14px;padding:10px 12px;background:rgba(245,166,35,0.15);border:1px solid rgba(245,166,35,0.4);border-radius:7px;font-size:12px;color:#f5c842;line-height:1.6;">
        ⚠️ <strong>Tax Trap:</strong> Your salary sits in the £100k–£125,140 taper zone. You face an effective 60% marginal rate here.
      </div>
    </div>

    <!-- Helpful note -->
    <div style="padding:18px 28px;background:var(--light);border-top:1px solid var(--border);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">🧮</span>
      <p style="font-size:13px;color:var(--muted);line-height:1.6;margin:0;">
        Want a more detailed breakdown with pension, student loans and more?
        <a href="/" style="color:var(--teal);font-weight:600;text-decoration:none;">Use the full calculator →</a>
      </p>
    </div>

  </div><!-- end quick-calc-card -->

</div><!-- end quick-calc-page -->

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 185 42" fill="none" style="height:34px;width:auto;">
          <text font-family="'DM Sans',Arial,sans-serif" font-weight="800" font-size="20" letter-spacing="-0.4">
            <tspan x="0" y="22" fill="white">Net</tspan><tspan fill="#00c4b7">Pay</tspan><tspan fill="rgba(255,255,255,0.85)">Home</tspan>
          </text>
          <text x="1" y="36" font-family="'DM Sans',Arial,sans-serif" font-size="8.5" font-weight="600" fill="rgba(255,255,255,0.35)" letter-spacing="2">UK TAX CALCULATOR</text>
        </svg>
        <p>Free, accurate UK salary and take-home pay calculator. Covers Income Tax, National Insurance, Student Loans, Pension contributions, and more — updated for 2025/26.</p>
      </div>
      <div>
        <div class="footer-col-title">Tools</div>
        <ul class="footer-links">
          <li><a href="/">Full Calculator</a></li>
          <li><a href="/quick-calc">Quick Calculator</a></li>
          <li><a href="/tax-code">Tax Code Checker</a></li>
        </ul>
      </div>
      <div></div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 NetPayHome. All rights reserved. For informational purposes only — not financial advice.</span>
      <span class="footer-badge">2025 / 26 Tax Year</span>
    </div>
  </div>
</footer>

` }} />
  );
}
