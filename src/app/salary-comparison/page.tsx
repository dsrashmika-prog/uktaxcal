export default function SalaryComparisonPage() {
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
    <a class="tool-nav-link" href="/quick-calc">&#9889; Quick Calculator</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link" href="/tax-code">&#128221; Tax Code Checker</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link active" href="/salary-comparison">&#9878; Salary Comparison</a>
  </div>
</nav>

<div class="page-title">
  <h1>Take-Home Pay Comparison</h1>
  <p>Compare two salaries side by side to see the difference in take-home pay, income tax, and National Insurance — 2025/26 rates.</p>
</div>

<div class="salary-comp-page">

  <!-- Options Bar -->
  <div class="comp-options-bar">
    <div class="comp-option-group">
      <label class="form-label">Tax Year</label>
      <div class="tax-year-row">
        <button class="year-btn" data-year="2023">2023/24</button>
        <button class="year-btn" data-year="2024">2024/25</button>
        <button class="year-btn active" data-year="2025">2025/26</button>
        <button class="year-btn" data-year="2026">2026/27</button>
      </div>
    </div>
    <div class="comp-option-group">
      <label class="form-label">Options</label>
      <div class="comp-toggles">
        <label class="scotland-unit" style="margin-bottom:0;">
          <span class="scotland-label">&#127988;&#917607;&#917602;&#917619;&#917603;&#917620;&#917631; Scotland</span>
          <span class="toggle"><input type="checkbox" id="compScotland"><span class="slider"></span></span>
        </label>
        <label class="scotland-unit" style="margin-bottom:0;">
          <span class="scotland-label">No NI</span>
          <span class="toggle"><input type="checkbox" id="compNoNI"><span class="slider"></span></span>
        </label>
      </div>
    </div>
  </div>

  <!-- Main Comparison Grid -->
  <div class="comp-page-grid">

    <!-- Salary A -->
    <div class="card comp-salary-card">
      <div class="card-header" style="background:linear-gradient(135deg,#0f1f3d,#1a3160);">
        <span class="card-header-icon">A</span>
        <h2>Salary A</h2>
      </div>
      <div class="card-body">
        <div class="salary-input-wrap" style="margin-bottom:20px;">
          <div class="salary-label">Annual Gross Salary</div>
          <div class="salary-field">
            <span class="salary-symbol">£</span>
            <input type="number" id="compPageSalaryA" placeholder="35,000" min="0" max="9999999">
          </div>
        </div>
        <div id="compPageResultsA" class="comp-page-results">
          <div class="comp-results-placeholder">
            <div style="font-size:32px;margin-bottom:8px;">💼</div>
            <p style="color:var(--muted);font-size:13px;">Enter a salary above</p>
          </div>
        </div>
      </div>
    </div>

    <!-- VS Badge -->
    <div class="comp-vs-col">
      <div class="comp-vs-badge">VS</div>
      <div class="comp-diff-vertical" id="compPageDiff">
        <span class="diff-placeholder" style="font-size:12px;color:var(--muted);text-align:center;">Enter both salaries to see the difference</span>
      </div>
    </div>

    <!-- Salary B -->
    <div class="card comp-salary-card">
      <div class="card-header" style="background:linear-gradient(135deg,#006a62,#009e94);">
        <span class="card-header-icon">B</span>
        <h2>Salary B</h2>
      </div>
      <div class="card-body">
        <div class="salary-input-wrap" style="margin-bottom:20px;">
          <div class="salary-label">Annual Gross Salary</div>
          <div class="salary-field">
            <span class="salary-symbol">£</span>
            <input type="number" id="compPageSalaryB" placeholder="45,000" min="0" max="9999999">
          </div>
        </div>
        <div id="compPageResultsB" class="comp-page-results">
          <div class="comp-results-placeholder">
            <div style="font-size:32px;margin-bottom:8px;">💼</div>
            <p style="color:var(--muted);font-size:13px;">Enter a salary above</p>
          </div>
        </div>
      </div>
    </div>

  </div><!-- end comp-page-grid -->

  <!-- Visual Bar Chart Comparison -->
  <div class="comp-bar-section" id="compBarSection" style="display:none;">
    <div class="faq-plain-header" style="margin-bottom:16px;">
      <span class="fch-icon">📊</span> Visual Breakdown Comparison
    </div>
    <div class="comp-bar-grid" id="compBarGrid"></div>
  </div>

  <!-- Helpful note -->
  <div style="padding:20px 28px;background:var(--light);border:1px solid var(--border);border-radius:12px;display:flex;align-items:center;gap:12px;margin-top:0;">
    <span style="font-size:22px;">🧮</span>
    <p style="font-size:13px;color:var(--muted);line-height:1.6;margin:0;">
      Want a full breakdown with pension, student loans and more?
      <a href="/" style="color:var(--teal);font-weight:600;text-decoration:none;">Use the full calculator →</a>
    </p>
  </div>

</div><!-- end salary-comp-page -->

<style>
.salary-comp-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.comp-options-bar {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 20px 24px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.comp-option-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comp-toggles {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.comp-page-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: start;
}

.comp-salary-card {
  min-height: 360px;
}

.comp-vs-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 80px;
}

.comp-vs-badge {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--navy), var(--teal));
  color: white;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(0,196,183,0.3);
}

.comp-diff-vertical {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.comp-page-results {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.comp-results-placeholder {
  text-align: center;
  padding: 32px 0;
}

.comp-page-result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

.comp-page-result-row:last-child {
  border-bottom: none;
}

.comp-page-result-row .cpr-label {
  color: var(--muted);
}

.comp-page-result-row .cpr-val {
  font-weight: 600;
  color: var(--navy);
}

.comp-page-result-row.cpr-takehome .cpr-val {
  color: var(--teal);
  font-size: 18px;
  font-weight: 800;
}

.comp-page-result-row.cpr-deduction .cpr-val {
  color: var(--red);
}

.comp-diff-chip {
  padding: 8px 14px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  white-space: nowrap;
}

.comp-diff-chip.positive { background: #e3f6f5; color: var(--teal); }
.comp-diff-chip.negative { background: #fde8e7; color: var(--red); }
.comp-diff-chip.neutral  { background: var(--light); color: var(--muted); }

.comp-bar-section {
  padding: 24px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.comp-bar-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comp-bar-row {
  display: grid;
  grid-template-columns: 130px 1fr 1fr;
  gap: 12px;
  align-items: center;
}

.comp-bar-label {
  font-size: 12px;
  color: var(--muted);
  font-weight: 500;
  text-align: right;
}

.comp-bar-track-wrap {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.comp-bar-track {
  height: 22px;
  background: var(--light);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.comp-bar-fill {
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 6px;
  font-size: 11px;
  font-weight: 700;
  color: white;
  transition: width 0.5s ease;
  min-width: 2px;
}

.comp-bar-lbl {
  font-size: 11px;
  color: var(--muted);
  margin-top: 1px;
}

@media (max-width: 768px) {
  .salary-comp-page {
    padding: 0 16px 40px;
    gap: 16px;
  }
  .comp-options-bar {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
  .comp-toggles {
    flex-direction: column;
    gap: 10px;
  }
  .comp-page-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .comp-vs-col {
    flex-direction: row;
    padding-top: 0;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 4px 0;
  }
  .comp-diff-vertical {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
  .comp-diff-chip {
    font-size: 12px;
    padding: 6px 12px;
  }
  .comp-salary-card {
    min-height: unset;
  }
  /* Bar chart: stack label above bars on mobile */
  .comp-bar-row {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 6px 8px;
  }
  .comp-bar-label {
    grid-column: 1 / -1;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    color: var(--navy);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .comp-bar-fill {
    font-size: 10px;
    padding-right: 4px;
  }
  .comp-bar-lbl {
    font-size: 10px;
  }
  .comp-bar-section {
    padding: 16px;
  }
}
</style>

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
          <li><a href="/salary-comparison">Salary Comparison</a></li>
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
