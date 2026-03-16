
// ===================== TAX RATES =====================
const COMP_TAX_YEARS = {
  2023: {
    personalAllowance: 12570, basicRateLimit: 50270, higherRateLimit: 125140,
    basicRate: 0.20, higherRate: 0.40, additionalRate: 0.45,
    ni_primary_threshold: 12570, ni_upper_threshold: 50270,
    ni_basic_rate: 0.12, ni_higher_rate: 0.02,
    scot_starter_threshold: 14876, scot_basic_threshold: 26561,
    scot_intermediate_threshold: 43662, scot_higher_threshold: 75000,
    scot_advanced_threshold: 125140,
    scot_starter_rate: 0.19, scot_basic_rate: 0.20,
    scot_intermediate_rate: 0.21, scot_higher_rate: 0.42,
    scot_advanced_rate: 0.45, scot_top_rate: 0.48,
  },
  2024: {
    personalAllowance: 12570, basicRateLimit: 50270, higherRateLimit: 125140,
    basicRate: 0.20, higherRate: 0.40, additionalRate: 0.45,
    ni_primary_threshold: 12570, ni_upper_threshold: 50270,
    ni_basic_rate: 0.08, ni_higher_rate: 0.02,
    scot_starter_threshold: 14876, scot_basic_threshold: 26561,
    scot_intermediate_threshold: 43662, scot_higher_threshold: 75000,
    scot_advanced_threshold: 125140,
    scot_starter_rate: 0.19, scot_basic_rate: 0.20,
    scot_intermediate_rate: 0.21, scot_higher_rate: 0.42,
    scot_advanced_rate: 0.45, scot_top_rate: 0.48,
  },
  2025: {
    personalAllowance: 12570, basicRateLimit: 50270, higherRateLimit: 125140,
    basicRate: 0.20, higherRate: 0.40, additionalRate: 0.45,
    ni_primary_threshold: 12570, ni_upper_threshold: 50270,
    ni_basic_rate: 0.08, ni_higher_rate: 0.02,
    scot_starter_threshold: 15397, scot_basic_threshold: 27491,
    scot_intermediate_threshold: 43662, scot_higher_threshold: 75000,
    scot_advanced_threshold: 125140,
    scot_starter_rate: 0.19, scot_basic_rate: 0.20,
    scot_intermediate_rate: 0.21, scot_higher_rate: 0.42,
    scot_advanced_rate: 0.45, scot_top_rate: 0.48,
  },
  2026: {
    personalAllowance: 12570, basicRateLimit: 50270, higherRateLimit: 125140,
    basicRate: 0.20, higherRate: 0.40, additionalRate: 0.45,
    ni_primary_threshold: 12570, ni_upper_threshold: 50270,
    ni_basic_rate: 0.08, ni_higher_rate: 0.02,
    scot_starter_threshold: 15397, scot_basic_threshold: 27491,
    scot_intermediate_threshold: 43662, scot_higher_threshold: 75000,
    scot_advanced_threshold: 125140,
    scot_starter_rate: 0.19, scot_basic_rate: 0.20,
    scot_intermediate_rate: 0.21, scot_higher_rate: 0.42,
    scot_advanced_rate: 0.45, scot_top_rate: 0.48,
  },
};

let compState = { selectedYear: 2025 };

function compFmt(n) {
  return '£' + Math.round(Math.abs(n)).toLocaleString('en-GB');
}

function compCalcScottish(gross, personalAllowance, yr) {
  const taxableIncome = Math.max(0, gross - personalAllowance);
  let tax = 0;
  const brackets = [
    [yr.scot_starter_threshold - personalAllowance, yr.scot_starter_rate],
    [yr.scot_basic_threshold - yr.scot_starter_threshold, yr.scot_basic_rate],
    [yr.scot_intermediate_threshold - yr.scot_basic_threshold, yr.scot_intermediate_rate],
    [yr.scot_higher_threshold - yr.scot_intermediate_threshold, yr.scot_higher_rate],
    [yr.scot_advanced_threshold - yr.scot_higher_threshold, yr.scot_advanced_rate],
    [Infinity, yr.scot_top_rate],
  ];
  let remaining = taxableIncome;
  for (const [band, rate] of brackets) {
    if (remaining <= 0) break;
    const taxed = Math.min(remaining, Math.max(0, band));
    tax += taxed * rate;
    remaining -= taxed;
  }
  return tax;
}

function compCalculate(grossAnnual, opts = {}) {
  const yr = COMP_TAX_YEARS[compState.selectedYear];
  const { scotland = false, noNI = false } = opts;

  let gross = grossAnnual;
  let personalAllowance = yr.personalAllowance;

  // Taper personal allowance above 100k
  if (gross > 100000) {
    const taper = Math.floor((gross - 100000) / 2);
    personalAllowance = Math.max(0, personalAllowance - taper);
  }

  const taxableIncome = Math.max(0, gross - personalAllowance);

  // Income Tax
  let incomeTax = 0;
  if (scotland) {
    incomeTax = compCalcScottish(gross, personalAllowance, yr);
  } else {
    if (taxableIncome > 0) {
      const basic = Math.min(taxableIncome, yr.basicRateLimit - yr.personalAllowance);
      const higher = taxableIncome > (yr.basicRateLimit - yr.personalAllowance)
        ? Math.min(taxableIncome - (yr.basicRateLimit - yr.personalAllowance), yr.higherRateLimit - yr.basicRateLimit)
        : 0;
      const additional = taxableIncome > (yr.higherRateLimit - yr.personalAllowance)
        ? taxableIncome - (yr.higherRateLimit - yr.personalAllowance)
        : 0;
      incomeTax = (Math.max(0, basic) * yr.basicRate) + (Math.max(0, higher) * yr.higherRate) + (Math.max(0, additional) * yr.additionalRate);
    }
  }

  // NI
  let ni = 0;
  if (!noNI && gross > yr.ni_primary_threshold) {
    const primary = Math.min(gross, yr.ni_upper_threshold) - yr.ni_primary_threshold;
    const secondary = gross > yr.ni_upper_threshold ? gross - yr.ni_upper_threshold : 0;
    ni = (Math.max(0, primary) * yr.ni_basic_rate) + (Math.max(0, secondary) * yr.ni_higher_rate);
  }

  const takeHome = gross - incomeTax - ni;
  const effectiveRate = gross > 0 ? ((incomeTax + ni) / gross * 100) : 0;

  return { gross, personalAllowance, taxableIncome, incomeTax, ni, takeHome, effectiveRate };
}

function renderCompResults(containerId, r, colorClass) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const barColor = colorClass === 'A' ? '#0f1f3d' : '#00c4b7';

  el.innerHTML = `
    <div class="comp-page-result-row cpr-takehome">
      <span class="cpr-label">Annual Take-Home</span>
      <span class="cpr-val">${compFmt(r.takeHome)}</span>
    </div>
    <div class="comp-page-result-row">
      <span class="cpr-label">Monthly Take-Home</span>
      <span class="cpr-val">${compFmt(r.takeHome / 12)}</span>
    </div>
    <div class="comp-page-result-row cpr-deduction">
      <span class="cpr-label">Income Tax</span>
      <span class="cpr-val">−${compFmt(r.incomeTax)}</span>
    </div>
    <div class="comp-page-result-row cpr-deduction">
      <span class="cpr-label">National Insurance</span>
      <span class="cpr-val">−${compFmt(r.ni)}</span>
    </div>
    <div class="comp-page-result-row">
      <span class="cpr-label">Effective Tax Rate</span>
      <span class="cpr-val" style="color:var(--muted)">${r.effectiveRate.toFixed(1)}%</span>
    </div>
    <div class="comp-page-result-row">
      <span class="cpr-label">Personal Allowance</span>
      <span class="cpr-val" style="color:var(--muted)">${compFmt(r.personalAllowance)}</span>
    </div>
  `;
}

function renderBarChart(rA, rB) {
  const section = document.getElementById('compBarSection');
  const grid = document.getElementById('compBarGrid');
  if (!section || !grid) return;

  const maxGross = Math.max(rA.gross, rB.gross);

  function bar(label, valA, valB, colorA, colorB) {
    const maxV = Math.max(valA, valB, 1);
    const wA = (valA / maxV * 100).toFixed(1);
    const wB = (valB / maxV * 100).toFixed(1);
    return `
      <div class="comp-bar-row">
        <span class="comp-bar-label">${label}</span>
        <div class="comp-bar-track-wrap">
          <div class="comp-bar-track">
            <div class="comp-bar-fill" style="width:${wA}%;background:${colorA};">${compFmt(valA)}</div>
          </div>
          <div class="comp-bar-lbl">Salary A</div>
        </div>
        <div class="comp-bar-track-wrap">
          <div class="comp-bar-track">
            <div class="comp-bar-fill" style="width:${wB}%;background:${colorB};">${compFmt(valB)}</div>
          </div>
          <div class="comp-bar-lbl">Salary B</div>
        </div>
      </div>
    `;
  }

  grid.innerHTML =
    bar('Gross Salary', rA.gross, rB.gross, '#5a7fc0', '#2abcb4') +
    bar('Take-Home', rA.takeHome, rB.takeHome, '#00a99d', '#00c4b7') +
    bar('Income Tax', rA.incomeTax, rB.incomeTax, '#c0392b', '#e8463a') +
    bar('National Insurance', rA.ni, rB.ni, '#e67e22', '#f5a623');

  section.style.display = 'block';
}

function renderDiff(rA, rB) {
  const el = document.getElementById('compPageDiff');
  if (!el) return;

  const diff = rB.takeHome - rA.takeHome;
  const diffMo = diff / 12;
  const cls = diff > 0 ? 'positive' : diff < 0 ? 'negative' : 'neutral';
  const sign = diff >= 0 ? '+' : '';
  const verb = diff > 0 ? '↑ Salary B pays more' : diff < 0 ? '↓ Salary B pays less' : 'Same take-home';

  el.innerHTML = `
    <div style="font-size:12px;font-weight:600;color:var(--muted);text-align:center;margin-bottom:8px;">${verb}</div>
    <div class="comp-diff-chip ${cls}">${sign}${compFmt(diff)}<br><span style="font-weight:400;font-size:11px;">per year</span></div>
    <div class="comp-diff-chip ${cls}">${sign}${compFmt(diffMo)}<br><span style="font-weight:400;font-size:11px;">per month</span></div>
  `;
}

function doCompUpdate() {
  const salA = parseFloat(document.getElementById('compPageSalaryA').value) || 0;
  const salB = parseFloat(document.getElementById('compPageSalaryB').value) || 0;
  const scotland = document.getElementById('compScotland').checked;
  const noNI = document.getElementById('compNoNI').checked;
  const opts = { scotland, noNI };

  if (salA > 0) {
    const rA = compCalculate(salA, opts);
    renderCompResults('compPageResultsA', rA, 'A');
  } else {
    document.getElementById('compPageResultsA').innerHTML = `<div class="comp-results-placeholder"><div style="font-size:32px;margin-bottom:8px;">💼</div><p style="color:var(--muted);font-size:13px;">Enter a salary above</p></div>`;
  }

  if (salB > 0) {
    const rB = compCalculate(salB, opts);
    renderCompResults('compPageResultsB', rB, 'B');
  } else {
    document.getElementById('compPageResultsB').innerHTML = `<div class="comp-results-placeholder"><div style="font-size:32px;margin-bottom:8px;">💼</div><p style="color:var(--muted);font-size:13px;">Enter a salary above</p></div>`;
  }

  if (salA > 0 && salB > 0) {
    const rA = compCalculate(salA, opts);
    const rB = compCalculate(salB, opts);
    renderDiff(rA, rB);
    renderBarChart(rA, rB);
  } else {
    const diffEl = document.getElementById('compPageDiff');
    if (diffEl) diffEl.innerHTML = `<span class="diff-placeholder" style="font-size:12px;color:var(--muted);text-align:center;">Enter both salaries to see the difference</span>`;
    const barSection = document.getElementById('compBarSection');
    if (barSection) barSection.style.display = 'none';
  }
}

// ---- Wire up events (only on salary-comparison page) ----
const compInputA = document.getElementById('compPageSalaryA');
const compInputB = document.getElementById('compPageSalaryB');

if (compInputA && compInputB) {
  compInputA.addEventListener('input', doCompUpdate);
  compInputB.addEventListener('input', doCompUpdate);

  document.getElementById('compScotland').addEventListener('change', doCompUpdate);
  document.getElementById('compNoNI').addEventListener('change', doCompUpdate);

  // Tax year buttons
  document.querySelectorAll('.year-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      compState.selectedYear = parseInt(btn.dataset.year);
      doCompUpdate();
    });
  });

  // Pre-fill with example values
  compInputA.value = 35000;
  compInputB.value = 45000;
  doCompUpdate();
}
