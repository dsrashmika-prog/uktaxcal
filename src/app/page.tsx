import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NetPayHome – UK Tax & Salary Calculator 2025/26',
  description: 'Calculate your take-home pay after income tax, national insurance, student loans, and pensions.',
  alternates: {
    canonical: '/',
  },
};

export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{
      __html: `

<header>
  <div class="header-inner">
    <a class="logo" href="/">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 185 42" fill="none" style="height:38px;width:auto;">
        <!-- Wordmark: NetPayHome -->
        <text font-family="'DM Sans',Arial,sans-serif" font-weight="800" font-size="20" letter-spacing="-0.4">
          <tspan x="0" y="22" fill="white">Net</tspan><tspan fill="#00c4b7">Pay</tspan><tspan fill="rgba(255,255,255,0.85)">Home</tspan>
        </text>
        <!-- Tagline -->
        <text x="1" y="36" font-family="'DM Sans',Arial,sans-serif" font-size="8.5" font-weight="600" fill="rgba(255,255,255,0.45)" letter-spacing="2">UK TAX CALCULATOR</text>
      </svg>
    </a>
    <div class="header-right">
      <div class="tax-year-badge" id="headerYearBadge">2025 / 26</div>
    </div>
  </div>
</header>

<nav class="tool-nav">
  <div class="tool-nav-inner">
    <a class="tool-nav-link active" href="/">&#127919; Full Calculator</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link" href="/quick-calc">&#9889; Quick Calculator</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link" href="/tax-code">&#128221; Tax Code Checker</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link" href="/salary-comparison">&#9878; Salary Comparison</a>
  </div>
</nav>

<div class="main">
  <div class="page-title">
    <h1>UK Tax Calculator</h1>
    <p>Calculate your take-home pay after income tax, national insurance, and more. Updated for 2025/2026 UK.</p>
  </div>

  <div class="layout">
    <!-- LEFT: INPUT PANEL -->
    <div>
      <div class="card">
        <div class="card-header">
          <span class="card-header-icon">📝</span>
          <h2>Your Details</h2>
        </div>
        <div class="card-body">

          <!-- SALARY INPUT -->
          <div class="salary-input-wrap">
            <div class="salary-label">Annual Gross Salary</div>
            <div class="salary-field">
              <span class="salary-symbol">£</span>
              <input type="number" id="salaryInput" placeholder="35,000" min="0" max="9999999">
            </div>
            <div class="period-tabs">
              <button class="period-tab active" data-period="annual">Annual</button>
              <button class="period-tab" data-period="monthly">Monthly</button>
              <button class="period-tab" data-period="twoweekly">2-Weekly</button>
              <button class="period-tab" data-period="weekly">Weekly</button>
              <button class="period-tab" data-period="hourly">Hourly</button>
            </div>
          </div>

          <!-- TAX YEAR -->
          <div class="form-group">
            <div class="form-label">Tax Year</div>
            <div class="tax-year-row">
              <button class="year-btn" data-year="2023">2023/24</button>
              <button class="year-btn" data-year="2024">2024/25</button>
              <button class="year-btn active" data-year="2025">2025/26</button>
            </div>
          </div>

          <!-- BASIC OPTIONS -->
          <div class="form-group">
            <label class="form-label">Tax Code <span class="help-icon" title="Your tax code determines your Personal Allowance. Default is 1257L.">?</span></label>
            <input type="text" class="form-control" id="taxCode" placeholder="1257L" maxlength="8">
          </div>

          <!-- SCOTLAND -->
          <label class="scotland-unit">
            <span class="scotland-label">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Resident in Scotland</span>
            <span class="toggle"><input type="checkbox" id="scotlandToggle"><span class="slider"></span></span>
          </label>

          <div class="section-divider"></div>

          <!-- ACCORDION SECTIONS -->
          <div id="accordion">

            <!-- PENSION -->
            <div class="accordion-item">
              <button class="accordion-trigger" data-target="pension-content">
                <span class="acc-left"><span class="acc-icon">🏦</span> Pension Contributions</span>
                <span class="acc-arrow">▼</span>
              </button>
              <div class="accordion-content" id="pension-content">
                <div class="form-group">
                  <label class="form-label">Contribution Type</label>
                  <div class="pension-type-row">
                    <button class="pension-type-btn active" data-ptype="percent">%</button>
                    <button class="pension-type-btn" data-ptype="amount">£ Amount</button>
                  </div>
                </div>
                <div class="form-group" id="pension-pct-group">
                  <label class="form-label">Percentage of Salary</label>
                  <div class="input-prefix-wrap">
                    <span class="prefix" style="right:12px;left:auto;color:var(--muted)">%</span>
                    <input type="number" class="form-control" id="pensionPct" placeholder="5" min="0" max="100" style="padding-right:28px">
                  </div>
                </div>
                <div class="form-group" id="pension-amt-group" style="display:none">
                  <label class="form-label">Monthly Amount</label>
                  <div class="input-prefix-wrap">
                    <span class="prefix">£</span>
                    <input type="number" class="form-control" id="pensionAmt" placeholder="200" min="0">
                  </div>
                </div>
                <div class="toggle-row">
                  <span class="toggle-label-text">Salary Sacrifice Pension</span>
                  <label class="toggle"><input type="checkbox" id="salarySacrificeToggle"><span class="slider"></span></label>
                </div>
              </div>
            </div>

            <!-- STUDENT LOANS -->
            <div class="accordion-item">
              <button class="accordion-trigger" data-target="loan-content">
                <span class="acc-left"><span class="acc-icon">🎓</span> Student Loan</span>
                <span class="acc-arrow">▼</span>
              </button>
              <div class="accordion-content" id="loan-content">
                <label class="form-label">Repayment Plan</label>
                <div class="checkbox-group">
                  <label class="checkbox-item"><input type="checkbox" id="plan1"><span>Plan 1 (pre-Sep 2012 / N.Ireland)</span></label>
                  <label class="checkbox-item"><input type="checkbox" id="plan2"><span>Plan 2 (post-Sep 2012 England/Wales)</span></label>
                  <label class="checkbox-item"><input type="checkbox" id="plan4"><span>Plan 4 (Scotland)</span></label>
                  <label class="checkbox-item"><input type="checkbox" id="plan5"><span>Plan 5 (post-Aug 2023 England)</span></label>
                  <label class="checkbox-item"><input type="checkbox" id="planPG"><span>Postgraduate Loan</span></label>
                </div>
              </div>
            </div>

            <!-- BONUS -->
            <div class="accordion-item">
              <button class="accordion-trigger" data-target="bonus-content">
                <span class="acc-left"><span class="acc-icon">🎯</span> Bonus Payment</span>
                <span class="acc-arrow">▼</span>
              </button>
              <div class="accordion-content" id="bonus-content">
                <div class="form-group">
                  <label class="form-label">Annual Bonus Amount</label>
                  <div class="input-prefix-wrap">
                    <span class="prefix">£</span>
                    <input type="number" class="form-control" id="bonusAmt" placeholder="0" min="0">
                  </div>
                </div>
              </div>
            </div>

            <!-- OVERTIME -->
            <div class="accordion-item">
              <button class="accordion-trigger" data-target="overtime-content">
                <span class="acc-left"><span class="acc-icon">⏰</span> Overtime</span>
                <span class="acc-arrow">▼</span>
              </button>
              <div class="accordion-content" id="overtime-content">
                <div class="form-group">
                  <label class="form-label">Monthly Overtime Pay</label>
                  <div class="input-prefix-wrap">
                    <span class="prefix">£</span>
                    <input type="number" class="form-control" id="overtimeAmt" placeholder="0" min="0">
                  </div>
                </div>
              </div>
            </div>

            <!-- CHILDCARE -->
            <div class="accordion-item">
              <button class="accordion-trigger" data-target="childcare-content">
                <span class="acc-left"><span class="acc-icon">👶</span> Childcare Vouchers</span>
                <span class="acc-arrow">▼</span>
              </button>
              <div class="accordion-content" id="childcare-content">
                <div class="form-group">
                  <label class="form-label">Monthly Voucher Value</label>
                  <div class="input-prefix-wrap">
                    <span class="prefix">£</span>
                    <input type="number" class="form-control" id="childcareAmt" placeholder="0" min="0">
                  </div>
                </div>
                <div class="toggle-row">
                  <span class="toggle-label-text">Joined before 6 Apr 2011</span>
                  <label class="toggle"><input type="checkbox" id="childcarePre2011"><span class="slider"></span></label>
                </div>
              </div>
            </div>

            <!-- ADDITIONAL OPTIONS -->
            <div class="accordion-item">
              <button class="accordion-trigger" data-target="options-content">
                <span class="acc-left"><span class="acc-icon">⚙️</span> Additional Options</span>
                <span class="acc-arrow">▼</span>
              </button>
              <div class="accordion-content" id="options-content">
                <div class="toggle-row">
                  <span class="toggle-label-text">No National Insurance (e.g. over State Pension Age)</span>
                  <label class="toggle"><input type="checkbox" id="noNI"><span class="slider"></span></label>
                </div>
                <div class="toggle-row">
                  <span class="toggle-label-text">Blind Person's Allowance</span>
                  <label class="toggle"><input type="checkbox" id="blindToggle"><span class="slider"></span></label>
                </div>
                <div class="toggle-row">
                  <span class="toggle-label-text">Show Employer's NI</span>
                  <label class="toggle"><input type="checkbox" id="employerNI"><span class="slider"></span></label>
                </div>
                <div class="form-group" style="margin-top:12px">
                  <label class="form-label">Age Range</label>
                  <select class="form-control" id="ageRange">
                    <option value="under77">Under 77</option>
                    <option value="77to86">77 – 86</option>
                    <option value="87plus">87 or over</option>
                  </select>
                </div>
              </div>
            </div>

          </div><!-- end accordion -->

          <button class="btn-calculate" id="calcBtn">Calculate My Take-Home Pay →</button>

        </div>
      </div>
    </div>

    <!-- RIGHT: RESULTS PANEL -->
    <div>
      <div class="card">
        <div class="card-header">
          <span class="card-header-icon">📊</span>
          <h2>Your Results</h2>
        </div>
        <div class="card-body">

          <!-- PLACEHOLDER -->
          <div class="results-placeholder" id="resultsPlaceholder">
            <div class="placeholder-icon">🧮</div>
            <h3>Ready to Calculate</h3>
            <p>Enter your salary on the left and hit <strong>Calculate</strong> to see your full breakdown including Income Tax, National Insurance, and take-home pay.</p>
          </div>

          <!-- RESULTS -->
          <div class="results-panel" id="resultsPanel">

            <!-- SALARY COMPARISON LINK -->
            <a href="/salary-comparison" class="comparison-toggle-bar" style="text-decoration:none;display:flex;cursor:pointer;">
              <div class="toggle-info">
                <h3>Take-Home Pay Comparison</h3>
                <p>Compare two salaries side by side</p>
              </div>
              <span style="display:flex;align-items:center;gap:6px;color:var(--teal);font-weight:600;font-size:13px;white-space:nowrap;">Open tool →</span>
            </a>

            <!-- Hidden elements kept for JS compatibility -->
            <div style="display:none">
              <input type="checkbox" id="comparisonToggle">
              <div id="comparisonPanel"></div>
              <input type="number" id="compSalaryA">
              <input type="number" id="compSalaryB">
              <div id="compResultsA"></div>
              <div id="compResultsB"></div>
              <div id="compDiff"></div>
            </div>

            <!-- TAKEHOME HERO -->
            <div class="takehome-hero">
              <div class="th-label">Annual Take-Home Pay</div>
              <div class="th-amount" id="annualTakeHome">£0</div>
              <div class="th-period" id="annualGross">of £0 gross</div>
              <div class="th-sub-amounts">
                <div class="th-sub">
                  <div class="th-sub-val" id="monthlyTakeHome">£0</div>
                  <div class="th-sub-lbl">Per Month</div>
                </div>
                <div class="th-sub">
                  <div class="th-sub-val" id="weeklyTakeHome">£0</div>
                  <div class="th-sub-lbl">Per Week</div>
                </div>
                <div class="th-sub">
                  <div class="th-sub-val" id="dailyTakeHome">£0</div>
                  <div class="th-sub-lbl">Per Day</div>
                </div>
              </div>
            </div>

            <!-- RESULT VIEW TABS -->
            <div class="result-view-tabs">
              <button class="rv-tab active" data-view="annual">Annual</button>
              <button class="rv-tab" data-view="monthly">Monthly</button>
              <button class="rv-tab" data-view="twoweekly">2-Weekly</button>
              <button class="rv-tab" data-view="weekly">Weekly</button>
              <button class="rv-tab" data-view="daily">Daily</button>
            </div>

            <!-- BREAKDOWN TABLE -->
            <table class="breakdown-table" id="breakdownTable">
              <thead>
                <tr>
                  <th>Item</th>
                  <th id="colPeriod">Annual</th>
                  <th>Monthly</th>
                </tr>
              </thead>
              <tbody id="breakdownBody"></tbody>
            </table>

            <div class="section-divider"></div>

            <!-- DONUT CHART -->
            <div class="chart-wrap">
              <div class="donut-container">
                <svg viewBox="0 0 42 42" class="donut">
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#eef1f8" stroke-width="5"/>
                  <circle id="donutTax" cx="21" cy="21" r="15.9" fill="none" stroke="#e8463a" stroke-width="5" stroke-dasharray="0 100" stroke-dashoffset="25" style="transition:stroke-dasharray 0.7s"/>
                  <circle id="donutNI" cx="21" cy="21" r="15.9" fill="none" stroke="#f5a623" stroke-width="5" stroke-dasharray="0 100" stroke-dashoffset="25" style="transition:stroke-dasharray 0.7s"/>
                  <circle id="donutTakeHome" cx="21" cy="21" r="15.9" fill="none" stroke="#00a99d" stroke-width="5" stroke-dasharray="0 100" stroke-dashoffset="25" style="transition:stroke-dasharray 0.7s"/>
                </svg>
                <div class="donut-center">
                  <div class="donut-pct" id="takeHomePct">0%</div>
                  <div class="donut-pct-label">kept</div>
                </div>
              </div>
              <div class="chart-legend" id="chartLegend"></div>
            </div>

            <!-- EFFECTIVE RATE -->
            <div class="rate-bar-wrap">
              <div class="rate-bar-labels">
                <span>Effective Tax Rate</span>
                <strong id="effectiveTaxRate">0%</strong>
              </div>
              <div class="rate-bar-track">
                <div class="rate-bar-fill" id="taxRateBar" style="width:0%"></div>
              </div>
            </div>

            <div id="infoBoxWrap"></div>

          </div><!-- end results panel -->

        </div>
      </div>
    </div>
  </div>
</div>

<!-- ===================== FAQ / EXPLAINER SECTION ===================== -->
<section class="faq-section" aria-label="How UK Tax is Calculated">

  <div class="faq-section-title">
    <h2>How Is UK Tax Calculated?</h2>
    <p>A simple, visual guide to Income Tax, National Insurance and take-home pay for 2025/26.</p>
  </div>

  <div class="faq-grid">

    <!-- SECTION 1: Income Tax Bands (no card) -->
    <div class="faq-plain-section">
      <div class="faq-plain-header">
        <span class="fch-icon">📊</span> Income Tax Bands 2025/26
      </div>
      <div class="faq-plain-body">
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px;line-height:1.6;">
          UK Income Tax is charged in <strong>progressive bands</strong> — you only pay the higher rate on earnings <em>above</em> each threshold, never on your whole income.
        </p>
        <div class="band-chart">
          <div class="band-row">
            <span class="band-label">Personal<br>Allowance</span>
            <div class="band-bar-track">
              <div class="band-bar-fill" style="width:100%;background:#5cb85c;">Up to £12,570</div>
            </div>
            <span class="band-rate" style="color:#27ae60;">0%</span>
          </div>
          <div class="band-row">
            <span class="band-label">Basic<br>Rate</span>
            <div class="band-bar-track">
              <div class="band-bar-fill" style="width:78%;background:var(--teal);">£12,571 – £50,270</div>
            </div>
            <span class="band-rate" style="color:var(--teal);">20%</span>
          </div>
          <div class="band-row">
            <span class="band-label">Higher<br>Rate</span>
            <div class="band-bar-track">
              <div class="band-bar-fill" style="width:52%;background:var(--amber);">£50,271 – £125,140</div>
            </div>
            <span class="band-rate" style="color:var(--amber);">40%</span>
          </div>
          <div class="band-row">
            <span class="band-label">Additional<br>Rate</span>
            <div class="band-bar-track">
              <div class="band-bar-fill" style="width:24%;background:var(--red);">Over £125,140</div>
            </div>
            <span class="band-rate" style="color:var(--red);">45%</span>
          </div>
        </div>
        <div style="margin-top:14px;padding:10px 12px;background:var(--light);border-radius:7px;font-size:12px;color:var(--muted);line-height:1.6;">
          ⚠️ <strong>Tax Trap:</strong> Earning between £100,000–£125,140? Your Personal Allowance tapers at £1 per £2 earned, creating an effective <strong>60% marginal rate</strong> in this band.
        </div>
      </div>
    </div>

    <!-- SECTION 2: NI (no card) -->
    <div class="faq-plain-section">
      <div class="faq-plain-header">
        <span class="fch-icon">🛡️</span> National Insurance 2025/26
      </div>
      <div class="faq-plain-body">
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px;line-height:1.6;">
          National Insurance (NI) contributions fund the NHS and State Pension. In 2025/26, the employee rate was cut to <strong>8%</strong> on earnings between the Primary Threshold and Upper Earnings Limit.
        </p>
        <table class="faq-info-table">
          <thead>
            <tr><th>Earnings</th><th>Rate</th><th>What it Funds</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Up to £12,570</td>
              <td><span class="td-rate" style="background:#e8f5e9;color:#27ae60;">0%</span></td>
              <td>No NI due</td>
            </tr>
            <tr>
              <td>£12,571 – £50,270</td>
              <td><span class="td-rate" style="background:#e3f6f5;color:var(--teal);">8%</span></td>
              <td>NHS, State Pension, Benefits</td>
            </tr>
            <tr>
              <td>Over £50,270</td>
              <td><span class="td-rate" style="background:#fff8e1;color:#b7850a;">2%</span></td>
              <td>Additional rate on excess</td>
            </tr>
          </tbody>
        </table>
        <p style="font-size:12px;color:var(--muted);margin-top:12px;line-height:1.6;">
          🏢 <strong>Employer NI:</strong> Your employer also pays 15% NI on earnings above £5,000 — this is a cost to them, not deducted from your salary. Toggle it on in the calculator to see the full employment cost.
        </p>
      </div>
    </div>


    <!-- SECTION 4: Scottish Tax Bands (no card) -->
    <div class="faq-plain-section">
      <div class="faq-plain-header">
        <span class="fch-icon">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span> Scottish Income Tax Bands 2025/26
      </div>
      <div class="faq-plain-body">
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px;line-height:1.6;">
          Scotland has its own income tax rates, with <strong>six bands</strong> compared to England's three. Scottish taxpayers pay less tax on lower incomes but slightly more at higher incomes.
        </p>
        <table class="faq-info-table">
          <thead>
            <tr><th>Band</th><th>Threshold</th><th>Rate</th></tr>
          </thead>
          <tbody>
            <tr><td>Starter Rate</td><td>£12,571 – £15,397</td><td><span class="td-rate" style="background:#e3f6f5;color:var(--teal);">19%</span></td></tr>
            <tr><td>Basic Rate</td><td>£15,397 – £27,491</td><td><span class="td-rate" style="background:#e3f6f5;color:#008a7e;">20%</span></td></tr>
            <tr><td>Intermediate</td><td>£27,491 – £43,662</td><td><span class="td-rate" style="background:#fff8e1;color:#b7850a;">21%</span></td></tr>
            <tr><td>Higher Rate</td><td>£43,662 – £75,000</td><td><span class="td-rate" style="background:#fff3e0;color:#e67e22;">42%</span></td></tr>
            <tr><td>Advanced Rate</td><td>£75,000 – £125,140</td><td><span class="td-rate" style="background:#fde8e7;color:var(--red);">45%</span></td></tr>
            <tr><td>Top Rate</td><td>Over £125,140</td><td><span class="td-rate" style="background:#f5d0d0;color:#c0392b;">48%</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>

  <!-- FAQ Open Table (no card) -->
  <div class="faq-plain-section" style="margin-bottom:0;">
    <div class="faq-plain-header">
      <span class="fch-icon">❓</span> Frequently Asked Questions
    </div>
    <div style="padding:0;">
      <dl class="faq-open-list">

        <div class="faq-open-item">
          <dt class="faq-open-q">What is the Personal Allowance and how does it work?</dt>
          <dd class="faq-open-a">The Personal Allowance (£12,570 for 2025/26) is the amount you can earn each year completely tax-free. It applies before any Income Tax is calculated. If you earn over £100,000, your allowance is reduced by £1 for every £2 above that threshold — disappearing entirely at £125,140.</dd>
        </div>

        <div class="faq-open-item">
          <dt class="faq-open-q">What is a tax code and why does it matter?</dt>
          <dd class="faq-open-a">Your tax code tells your employer or pension provider how much tax-free income you are entitled to. The most common code is <strong>1257L</strong>, which gives you the standard £12,570 Personal Allowance. Emergency codes or codes ending in 0T mean you get no allowance and pay tax from the first pound. You can find your tax code on a payslip or by logging into HMRC online.</dd>
        </div>

        <div class="faq-open-item">
          <dt class="faq-open-q">How does Salary Sacrifice affect my take-home pay?</dt>
          <dd class="faq-open-a">Salary Sacrifice lets you swap part of your salary for a non-cash benefit (usually pension contributions). Because your gross salary is reduced, you pay <strong>less Income Tax and NI</strong> — making this one of the most tax-efficient ways to save for retirement. For example, a £40,000 earner putting 5% into a salary sacrifice pension saves roughly £300/year in NI alone compared to a standard pension deduction.</dd>
        </div>

        <div class="faq-open-item">
          <dt class="faq-open-q">When do I need to repay a Student Loan?</dt>
          <dd class="faq-open-a">You only repay once your income exceeds your plan's threshold. For 2025/26: <strong>Plan 1</strong> — £26,065/year; <strong>Plan 2</strong> — £28,470/year; <strong>Plan 4 (Scotland)</strong> — £32,745/year; <strong>Plan 5</strong> — £25,000/year. You repay 9% of income above the threshold. Postgraduate loans have a 6% rate above £21,000.</dd>
        </div>

        <div class="faq-open-item">
          <dt class="faq-open-q">What is the 60% tax trap?</dt>
          <dd class="faq-open-a">If your income falls between £100,000 and £125,140, you lose £1 of Personal Allowance for every £2 earned above £100,000. Combined with the 40% Higher Rate tax, this creates an effective marginal rate of <strong>60%</strong> on earnings in this range. Common solutions include making pension contributions to bring taxable income below £100,000.</dd>
        </div>

        <div class="faq-open-item">
          <dt class="faq-open-q">How is the effective tax rate different from the marginal rate?</dt>
          <dd class="faq-open-a">The <strong>marginal rate</strong> is the rate applied to your last pound of earnings (e.g. 40%). The <strong>effective rate</strong> is your total tax as a percentage of your gross salary — always lower because lower bands are taxed at lower rates. A £60,000 earner might have a 40% marginal rate but only a 24% effective rate, since most of their income is taxed at 20% or 0%.</dd>
        </div>

      </dl>
    </div>
  </div>

</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Personal Allowance and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Personal Allowance (£12,570 for 2025/26) is the amount you can earn each year completely tax-free. If you earn over £100,000, your allowance is reduced by £1 for every £2 above that threshold, disappearing entirely at £125,140."
      }
    },
    {
      "@type": "Question",
      "name": "What is a UK tax code and why does it matter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your tax code tells your employer how much tax-free income you are entitled to. The most common code is 1257L, giving the standard £12,570 Personal Allowance for 2025/26."
      }
    },
    {
      "@type": "Question",
      "name": "How does Salary Sacrifice affect my take-home pay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Salary Sacrifice reduces your gross salary, meaning you pay less Income Tax and National Insurance. It is one of the most tax-efficient ways to contribute to a pension."
      }
    },
    {
      "@type": "Question",
      "name": "When do I need to repay a Student Loan in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You repay 9% of income above your plan's threshold. For 2025/26: Plan 1 £26,065, Plan 2 £28,470, Plan 4 £32,745, Plan 5 £25,000. Postgraduate loans are repaid at 6% above £21,000."
      }
    },
    {
      "@type": "Question",
      "name": "What is the 60% tax trap in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Earners between £100,000–£125,140 face an effective 60% marginal rate because their £12,570 Personal Allowance is tapered away at £1 per £2 earned above £100,000, on top of the 40% Higher Rate income tax."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between effective and marginal tax rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The marginal rate is the rate on your last pound earned. The effective rate is total tax as a percentage of gross income — always lower because progressive bands mean lower earnings are taxed less."
      }
    }
  ]
}
</script>

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-top">

      <!-- Brand -->
      <div class="footer-brand">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 185 42" fill="none" style="height:34px;width:auto;">
          <text font-family="'DM Sans',Arial,sans-serif" font-weight="800" font-size="20" letter-spacing="-0.4">
            <tspan x="0" y="22" fill="white">Net</tspan><tspan fill="#00c4b7">Pay</tspan><tspan fill="rgba(255,255,255,0.85)">Home</tspan>
          </text>
          <text x="1" y="36" font-family="'DM Sans',Arial,sans-serif" font-size="8.5" font-weight="600" fill="rgba(255,255,255,0.35)" letter-spacing="2">UK TAX CALCULATOR</text>
        </svg>
        <p>Free, accurate UK salary and take-home pay calculator. Covers Income Tax, National Insurance, Student Loans, Pension contributions, and more — updated for 2025/26.</p>
      </div>

      <!-- Quick Links -->
      <div>
        <div class="footer-col-title">Tools</div>
        <ul class="footer-links">
          <li><a href="/">Full Calculator</a></li>
          <li><a href="/quick-calc">Quick Calculator</a></li>
          <li><a href="/tax-code">Tax Code Checker</a></li>
          <li><a href="/salary-comparison">Salary Comparison</a></li>
        </ul>
      </div>

      <!-- Legal Placeholder -->
      <div>
        <!-- Removed broken Legal links -->
      </div>

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
