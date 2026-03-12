export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{
      __html: `

<header>
  <div class="header-inner">
    <a class="logo" href="#">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 185 42" fill="none" style="height:38px;width:auto;">
        <!-- Wordmark: NetPayHome -->
        <text font-family="'DM Sans',Arial,sans-serif" font-weight="800" font-size="20" letter-spacing="-0.4">
          <tspan x="0" y="22" fill="white">Net</tspan><tspan fill="#00c4b7">Pay</tspan><tspan fill="rgba(255,255,255,0.85)">Home</tspan>
        </text>
        <!-- Tagline -->
        <text x="1" y="36" font-family="'DM Sans',Arial,sans-serif" font-size="8.5" font-weight="600" fill="rgba(255,255,255,0.45)" letter-spacing="2">UK TAX CALCULATOR</text>
      </svg>
    </a>
    <div class="tax-year-badge" id="headerYearBadge">2025 / 26</div>
  </div>
</header>

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

            <!-- TAKE-HOME COMPARISON TOGGLE -->
            <div class="comparison-toggle-bar">
              <div class="toggle-info">
                <h3>Take-Home Pay Comparison</h3>
                <p>Compare two salaries side by side</p>
              </div>
              <label class="toggle"><input type="checkbox" id="comparisonToggle"><span class="slider"></span></label>
            </div>

            <!-- COMPARISON PANEL -->
            <div class="comparison-panel" id="comparisonPanel">
              <div class="comparison-header">⚖️ Side-by-Side Comparison</div>
              <div class="comparison-grid">
                <div class="comparison-col">
                  <div class="comp-col-label">Salary A</div>
                  <div class="comp-salary-input"><span>£</span><input type="number" id="compSalaryA" placeholder="35000"></div>
                  <div id="compResultsA"></div>
                </div>
                <div class="comparison-col">
                  <div class="comp-col-label">Salary B</div>
                  <div class="comp-salary-input"><span>£</span><input type="number" id="compSalaryB" placeholder="45000"></div>
                  <div id="compResultsB"></div>
                </div>
              </div>
              <div class="comp-diff-bar" id="compDiff">
                <span class="diff-placeholder">Enter both salaries to compare</span>
              </div>
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
        <div class="footer-col-title">Quick Links</div>
        <ul class="footer-links">
          <li><a href="/">Calculator</a></li>
          <li><a href="/salary-guide">Salary Guide</a></li>
          <li><a href="/how-to">How It Works</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <div class="footer-col-title">Legal</div>
        <ul class="footer-links">
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/sources">Data Sources</a></li>
        </ul>
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
