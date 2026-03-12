
// ===================== TAX RATES =====================
const TAX_YEARS = {
  2023: {
    personalAllowance: 12570,
    basicRateLimit: 50270,
    higherRateLimit: 125140,
    basicRate: 0.20,
    higherRate: 0.40,
    additionalRate: 0.45,
    ni_primary_threshold: 12570,
    ni_upper_threshold: 50270,
    ni_basic_rate: 0.12,
    ni_higher_rate: 0.02,
    ni_employer_secondary: 13760,
    ni_employer_rate: 0.138,
    // Scotland
    scot_starter_threshold: 14876,
    scot_basic_threshold: 26561,
    scot_intermediate_threshold: 43662,
    scot_higher_threshold: 75000,
    scot_advanced_threshold: 125140,
    scot_starter_rate: 0.19,
    scot_basic_rate: 0.20,
    scot_intermediate_rate: 0.21,
    scot_higher_rate: 0.42,
    scot_advanced_rate: 0.45,
    scot_top_rate: 0.48,
    // Student Loans
    plan1_threshold: 22015, plan1_rate: 0.09,
    plan2_threshold: 27295, plan2_rate: 0.09,
    plan4_threshold: 27660, plan4_rate: 0.09,
    plan5_threshold: 25000, plan5_rate: 0.09,
    pg_threshold: 21000, pg_rate: 0.06,
  },
  2024: {
    personalAllowance: 12570,
    basicRateLimit: 50270,
    higherRateLimit: 125140,
    basicRate: 0.20,
    higherRate: 0.40,
    additionalRate: 0.45,
    ni_primary_threshold: 12570,
    ni_upper_threshold: 50270,
    ni_basic_rate: 0.08,
    ni_higher_rate: 0.02,
    ni_employer_secondary: 9100,
    ni_employer_rate: 0.138,
    scot_starter_threshold: 14876, scot_basic_threshold: 26561,
    scot_intermediate_threshold: 43662, scot_higher_threshold: 75000,
    scot_advanced_threshold: 125140,
    scot_starter_rate: 0.19, scot_basic_rate: 0.20,
    scot_intermediate_rate: 0.21, scot_higher_rate: 0.42,
    scot_advanced_rate: 0.45, scot_top_rate: 0.48,
    plan1_threshold: 24990, plan1_rate: 0.09,
    plan2_threshold: 27295, plan2_rate: 0.09,
    plan4_threshold: 31395, plan4_rate: 0.09,
    plan5_threshold: 25000, plan5_rate: 0.09,
    pg_threshold: 21000, pg_rate: 0.06,
  },
  2025: {
    personalAllowance: 12570,
    basicRateLimit: 50270,
    higherRateLimit: 125140,
    basicRate: 0.20,
    higherRate: 0.40,
    additionalRate: 0.45,
    ni_primary_threshold: 12570,
    ni_upper_threshold: 50270,
    ni_basic_rate: 0.08,
    ni_higher_rate: 0.02,
    ni_employer_secondary: 5000,
    ni_employer_rate: 0.150,
    scot_starter_threshold: 15397, scot_basic_threshold: 27491,
    scot_intermediate_threshold: 43662, scot_higher_threshold: 75000,
    scot_advanced_threshold: 125140,
    scot_starter_rate: 0.19, scot_basic_rate: 0.20,
    scot_intermediate_rate: 0.21, scot_higher_rate: 0.42,
    scot_advanced_rate: 0.45, scot_top_rate: 0.48,
    plan1_threshold: 26065, plan1_rate: 0.09,
    plan2_threshold: 28470, plan2_rate: 0.09,
    plan4_threshold: 32745, plan4_rate: 0.09,
    plan5_threshold: 25000, plan5_rate: 0.09,
    pg_threshold: 21000, pg_rate: 0.06,
  },
  2026: {
    personalAllowance: 12570,
    basicRateLimit: 50270,
    higherRateLimit: 125140,
    basicRate: 0.20,
    higherRate: 0.40,
    additionalRate: 0.45,
    ni_primary_threshold: 12570,
    ni_upper_threshold: 50270,
    ni_basic_rate: 0.08,
    ni_higher_rate: 0.02,
    ni_employer_secondary: 5000,
    ni_employer_rate: 0.150,
    scot_starter_threshold: 15397, scot_basic_threshold: 27491,
    scot_intermediate_threshold: 43662, scot_higher_threshold: 75000,
    scot_advanced_threshold: 125140,
    scot_starter_rate: 0.19, scot_basic_rate: 0.20,
    scot_intermediate_rate: 0.21, scot_higher_rate: 0.42,
    scot_advanced_rate: 0.45, scot_top_rate: 0.48,
    plan1_threshold: 26065, plan1_rate: 0.09,
    plan2_threshold: 28470, plan2_rate: 0.09,
    plan4_threshold: 32745, plan4_rate: 0.09,
    plan5_threshold: 25000, plan5_rate: 0.09,
    pg_threshold: 21000, pg_rate: 0.06,
  }
};

// ===================== STATE =====================
let state = {
  selectedYear: 2025,
  period: 'annual',
  resultView: 'annual',
  lastResults: null
};

// ===================== FORMAT =====================
function fmt(n) {
  return '£' + Math.round(n).toLocaleString('en-GB');
}
function fmtD(n) {
  return '£' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ===================== CALCULATE =====================
function calculateTax(grossAnnual, options = {}) {
  const yr = TAX_YEARS[state.selectedYear];
  const {
    scotland = false,
    noNI = false,
    blindAllowance = false,
    pensionPct = 0,
    pensionAmt = 0,
    pensionSacrifice = false,
    plan1 = false, plan2 = false, plan4 = false, plan5 = false, planPG = false,
    bonusAmt = 0,
    overtimeAmt = 0,
    childcareAmt = 0,
    showEmployerNI = false,
  } = options;

  let gross = grossAnnual + bonusAmt + (overtimeAmt * 12);

  // Pension
  let pensionDeduction = 0;
  if (pensionPct > 0) pensionDeduction = gross * (pensionPct / 100);
  else if (pensionAmt > 0) pensionDeduction = pensionAmt * 12;

  let grossForTax = pensionSacrifice ? gross - pensionDeduction : gross;

  // Blind Person
  let personalAllowance = yr.personalAllowance + (blindAllowance ? 2870 : 0) + (childcareAmt * 12 / 2);

  // Taper personal allowance above 100k
  if (grossForTax > 100000) {
    const taper = Math.floor((grossForTax - 100000) / 2);
    personalAllowance = Math.max(0, personalAllowance - taper);
  }

  const taxableIncome = Math.max(0, grossForTax - personalAllowance);

  // Income Tax
  let incomeTax = 0;
  if (scotland) {
    incomeTax = calcScottishTax(grossForTax, personalAllowance, yr);
  } else {
    if (taxableIncome > 0) {
      const basic = Math.min(taxableIncome, yr.basicRateLimit - yr.personalAllowance);
      const higher = taxableIncome > (yr.basicRateLimit - yr.personalAllowance) ?
        Math.min(taxableIncome - (yr.basicRateLimit - yr.personalAllowance), yr.higherRateLimit - yr.basicRateLimit) : 0;
      const additional = taxableIncome > (yr.higherRateLimit - yr.personalAllowance) ?
        taxableIncome - (yr.higherRateLimit - yr.personalAllowance) : 0;
      incomeTax = (Math.max(0, basic) * yr.basicRate) + (Math.max(0, higher) * yr.higherRate) + (Math.max(0, additional) * yr.additionalRate);
    }
  }

  // National Insurance
  let ni = 0;
  if (!noNI) {
    const niBase = pensionSacrifice ? gross - pensionDeduction : gross;
    if (niBase > yr.ni_primary_threshold) {
      const primary = Math.min(niBase, yr.ni_upper_threshold) - yr.ni_primary_threshold;
      const secondary = niBase > yr.ni_upper_threshold ? niBase - yr.ni_upper_threshold : 0;
      ni = (Math.max(0, primary) * yr.ni_basic_rate) + (Math.max(0, secondary) * yr.ni_higher_rate);
    }
  }

  // Employer NI
  let employerNI = 0;
  if (showEmployerNI && gross > yr.ni_employer_secondary) {
    employerNI = (gross - yr.ni_employer_secondary) * yr.ni_employer_rate;
  }

  // Student Loans
  let studentLoan = 0;
  if (plan1 && gross > yr.plan1_threshold) studentLoan += (gross - yr.plan1_threshold) * yr.plan1_rate;
  if (plan2 && gross > yr.plan2_threshold) studentLoan += (gross - yr.plan2_threshold) * yr.plan2_rate;
  if (plan4 && gross > yr.plan4_threshold) studentLoan += (gross - yr.plan4_threshold) * yr.plan4_rate;
  if (plan5 && gross > yr.plan5_threshold) studentLoan += (gross - yr.plan5_threshold) * yr.plan5_rate;
  if (planPG && gross > yr.pg_threshold) studentLoan += (gross - yr.pg_threshold) * yr.pg_rate;

  const totalDeductions = incomeTax + ni + studentLoan + (!pensionSacrifice ? pensionDeduction : 0);
  const takeHome = gross - totalDeductions;

  return {
    gross,
    grossAnnual,
    personalAllowance,
    taxableIncome,
    incomeTax,
    ni,
    employerNI,
    studentLoan,
    pensionDeduction,
    pensionSacrifice,
    totalDeductions,
    takeHome,
    effectiveRate: gross > 0 ? ((incomeTax + ni) / gross * 100) : 0
  };
}

function calcScottishTax(gross, personalAllowance, yr) {
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

function getOptions() {
  return {
    scotland: document.getElementById('scotlandToggle').checked,
    noNI: document.getElementById('noNI').checked,
    blindAllowance: document.getElementById('blindToggle').checked,
    pensionPct: parseFloat(document.getElementById('pensionPct').value) || 0,
    pensionAmt: parseFloat(document.getElementById('pensionAmt').value) || 0,
    pensionSacrifice: document.getElementById('salarySacrificeToggle').checked,
    plan1: document.getElementById('plan1').checked,
    plan2: document.getElementById('plan2').checked,
    plan4: document.getElementById('plan4').checked,
    plan5: document.getElementById('plan5').checked,
    planPG: document.getElementById('planPG').checked,
    bonusAmt: parseFloat(document.getElementById('bonusAmt').value) || 0,
    overtimeAmt: parseFloat(document.getElementById('overtimeAmt').value) || 0,
    childcareAmt: parseFloat(document.getElementById('childcareAmt').value) || 0,
    showEmployerNI: document.getElementById('employerNI').checked,
  };
}

// ===================== DISPLAY =====================
function renderResults(r) {
  document.getElementById('resultsPlaceholder').style.display = 'none';
  document.getElementById('resultsPanel').classList.add('visible');

  // Hero
  document.getElementById('annualTakeHome').textContent = fmt(r.takeHome);
  document.getElementById('annualGross').textContent = `of ${fmt(r.gross)} gross`;
  document.getElementById('monthlyTakeHome').textContent = fmt(r.takeHome / 12);
  document.getElementById('weeklyTakeHome').textContent = fmt(r.takeHome / 52);
  document.getElementById('dailyTakeHome').textContent = fmt(r.takeHome / 260);

  // Breakdown table
  const view = state.resultView;
  const div = { annual: 1, monthly: 12, twoweekly: 26, weekly: 52, daily: 260 }[view];
  const div2 = 12;

  const rows = [
    { label: '💰 Gross Salary', val: r.gross, cls: 'row-highlight' },
    { label: '🧾 Personal Allowance', val: r.personalAllowance, cls: '' },
    { label: '📊 Taxable Income', val: r.taxableIncome, cls: '' },
    { label: '🔴 Income Tax', val: -r.incomeTax, cls: 'row-deduction' },
    { label: '🟠 National Insurance', val: -r.ni, cls: 'row-deduction' },
    r.studentLoan > 0 ? { label: '🎓 Student Loan', val: -r.studentLoan, cls: 'row-deduction' } : null,
    r.pensionDeduction > 0 ? { label: '🏦 Pension', val: -r.pensionDeduction, cls: 'row-deduction' } : null,
    r.employerNI > 0 ? { label: '🏢 Employer NI', val: r.employerNI, cls: '' } : null,
    { label: '✅ Take-Home Pay', val: r.takeHome, cls: 'row-takehome' },
  ].filter(Boolean);

  const viewLabels = { annual: 'Annual', monthly: 'Monthly', twoweekly: '2 Weekly', weekly: 'Weekly', daily: 'Daily' };
  document.querySelector('#breakdownTable thead tr #colPeriod').textContent = viewLabels[view] || view;

  const tbody = document.getElementById('breakdownBody');
  tbody.innerHTML = rows.map(row => `
    <tr class="${row.cls}">
      <td>${row.label}</td>
      <td>${fmtD(Math.abs(row.val) / div)}${row.val < 0 && row.cls !== 'row-takehome' ? '' : ''}</td>
      <td>${fmtD(Math.abs(row.val) / div2)}</td>
    </tr>
  `).join('');

  // Donut
  const pct = r.gross > 0 ? r.takeHome / r.gross : 0;
  const taxPct = r.gross > 0 ? r.incomeTax / r.gross : 0;
  const niPct = r.gross > 0 ? r.ni / r.gross : 0;
  const otherPct = r.gross > 0 ? (r.studentLoan + r.pensionDeduction) / r.gross : 0;
  const circumference = 100;

  let offset = 25;
  function setArc(id, pct, color) {
    const el = document.getElementById(id);
    el.setAttribute('stroke-dasharray', `${pct * circumference} ${(1 - pct) * circumference}`);
    el.setAttribute('stroke-dashoffset', offset);
    offset -= pct * circumference;
  }

  setArc('donutTakeHome', pct, '#00a99d');
  offset = 25 - pct * circumference;
  setArc('donutTax', taxPct, '#e8463a');
  offset = 25 - pct * circumference - taxPct * circumference;
  setArc('donutNI', niPct, '#f5a623');

  document.getElementById('takeHomePct').textContent = Math.round(pct * 100) + '%';

  const legend = [
    { color: '#00a99d', label: 'Take-Home', val: fmt(r.takeHome) },
    { color: '#e8463a', label: 'Income Tax', val: fmt(r.incomeTax) },
    { color: '#f5a623', label: 'National Insurance', val: fmt(r.ni) },
    r.studentLoan > 0 ? { color: '#6366f1', label: 'Student Loan', val: fmt(r.studentLoan) } : null,
    r.pensionDeduction > 0 ? { color: '#0f1f3d', label: 'Pension', val: fmt(r.pensionDeduction) } : null,
  ].filter(Boolean);

  document.getElementById('chartLegend').innerHTML = legend.map(l => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${l.color}"></div>
      <span class="legend-text">${l.label}</span>
      <span class="legend-val">${l.val}</span>
    </div>
  `).join('');

  // Effective rate
  const effRate = r.effectiveRate.toFixed(1);
  document.getElementById('effectiveTaxRate').textContent = effRate + '%';
  document.getElementById('taxRateBar').style.width = Math.min(effRate, 60) + '%';

  // Info box
  let info = '';
  if (r.gross > 100000 && r.gross < 125140) {
    info = `<div class="info-box"><span class="info-box-icon">⚠️</span><div class="info-box-text">Your salary is in the <strong>Personal Allowance taper zone</strong> (£100k–£125,140). You effectively pay a 60% marginal rate here as your allowance is reduced by £1 for every £2 earned over £100,000.</div></div>`;
  } else if (r.gross > 50270 && r.gross < 100000) {
    info = `<div class="info-box"><span class="info-box-icon">💡</span><div class="info-box-text">You're a <strong>Higher Rate taxpayer</strong>. Pension contributions could reduce your tax bill — consider speaking with a financial adviser.</div></div>`;
  }
  document.getElementById('infoBoxWrap').innerHTML = info;

  state.lastResults = r;
}

// ===================== COMPARISON =====================
function updateComparison() {
  const salA = parseFloat(document.getElementById('compSalaryA').value) || 0;
  const salB = parseFloat(document.getElementById('compSalaryB').value) || 0;
  const opts = getOptions();

  function compRow(label, val) {
    return `<div class="comp-result-item"><span class="cri-label">${label}</span><span class="cri-val">${fmt(val)}</span></div>`;
  }

  if (salA > 0) {
    const rA = calculateTax(salA, opts);
    document.getElementById('compResultsA').innerHTML =
      compRow('Take-Home/yr', rA.takeHome) +
      compRow('Take-Home/mo', rA.takeHome / 12) +
      compRow('Income Tax', rA.incomeTax) +
      compRow('NI', rA.ni);
  }
  if (salB > 0) {
    const rB = calculateTax(salB, opts);
    document.getElementById('compResultsB').innerHTML =
      compRow('Take-Home/yr', rB.takeHome) +
      compRow('Take-Home/mo', rB.takeHome / 12) +
      compRow('Income Tax', rB.incomeTax) +
      compRow('NI', rB.ni);
  }
  if (salA > 0 && salB > 0) {
    const rA = calculateTax(salA, opts);
    const rB = calculateTax(salB, opts);
    const diff = rB.takeHome - rA.takeHome;
    const diffMo = diff / 12;
    const cls = diff > 0 ? 'positive' : diff < 0 ? 'negative' : 'neutral';
    const sign = diff >= 0 ? '+' : '';
    const verb = diff > 0 ? 'Salary B pays more' : diff < 0 ? 'Salary B pays less' : 'Same take-home';
    document.getElementById('compDiff').innerHTML = `
      <span class="diff-label">${verb}</span>
      <div class="diff-chips">
        <div class="diff-chip ${cls}">
          <span class="chip-val">${sign}${fmt(diff)}</span>
          <span class="chip-lbl">per year</span>
        </div>
        <div class="diff-chip ${cls}">
          <span class="chip-val">${sign}${fmt(diffMo)}</span>
          <span class="chip-lbl">per month</span>
        </div>
      </div>
    `;
  }
}

// ===================== MAIN CALCULATE =====================
function doCalculate() {
  let inputVal = parseFloat(document.getElementById('salaryInput').value) || 0;
  if (inputVal <= 0) {
    document.getElementById('salaryInput').focus();
    document.getElementById('salaryInput').style.border = '2px solid red';
    setTimeout(() => document.getElementById('salaryInput').style.border = '', 2000);
    return;
  }

  // Convert to annual
  const periodMultipliers = { annual: 1, monthly: 12, twoweekly: 26, weekly: 52, hourly: 2080 };
  const grossAnnual = inputVal * (periodMultipliers[state.period] || 1);

  const opts = getOptions();
  const results = calculateTax(grossAnnual, opts);
  renderResults(results);

  // Sync comparison A with current salary
  if (!document.getElementById('compSalaryA').value) {
    document.getElementById('compSalaryA').value = Math.round(grossAnnual);
    updateComparison();
  }

  // Scroll to results on mobile
  if (window.innerWidth < 900) {
    document.querySelector('.results-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ===================== EVENT LISTENERS =====================
document.getElementById('calcBtn').addEventListener('click', doCalculate);

// Period tabs
document.querySelectorAll('.period-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.period-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.period = btn.dataset.period;
    const placeholders = { annual: '35,000', monthly: '2,917', twoweekly: '1,346', weekly: '673', hourly: '16.83' };
    const labels = { annual: 'Annual Gross Salary', monthly: 'Monthly Gross Salary', twoweekly: '2-Weekly Gross Salary', weekly: 'Weekly Gross Salary', hourly: 'Hourly Rate' };
    document.getElementById('salaryInput').placeholder = placeholders[btn.dataset.period] || '35,000';
    document.querySelector('.salary-label').textContent = labels[btn.dataset.period] || 'Annual Gross Salary';
  });
});

// Tax year buttons
document.querySelectorAll('.year-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.selectedYear = parseInt(btn.dataset.year);
    const labels = { 2023: '2023/24', 2024: '2024/25', 2025: '2025/26', 2026: '2026/27' };
    document.getElementById('headerYearBadge').textContent = labels[state.selectedYear];
  });
});

// Result view tabs
document.querySelectorAll('.rv-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.rv-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.resultView = btn.dataset.view;
    if (state.lastResults) renderResults(state.lastResults);
  });
});

// Accordion
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const content = document.getElementById(targetId);
    const isOpen = content.classList.contains('open');
    content.classList.toggle('open', !isOpen);
    btn.classList.toggle('open', !isOpen);
  });
});

// Pension type
document.querySelectorAll('.pension-type-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pension-type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('pension-pct-group').style.display = btn.dataset.ptype === 'percent' ? '' : 'none';
    document.getElementById('pension-amt-group').style.display = btn.dataset.ptype === 'amount' ? '' : 'none';
  });
});

// Comparison toggle
document.getElementById('comparisonToggle').addEventListener('change', function () {
  document.getElementById('comparisonPanel').classList.toggle('visible', this.checked);
  if (this.checked) updateComparison();
});

document.getElementById('compSalaryA').addEventListener('input', updateComparison);
document.getElementById('compSalaryB').addEventListener('input', updateComparison);

// Enter key
document.getElementById('salaryInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') doCalculate();
});

// ===================== FAQ ACCORDION =====================
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  });
});

// ===================== INTERACTIVE WORKED EXAMPLE =====================
function fmtEx(n) {
  return '£' + Math.round(n).toLocaleString('en-GB');
}

function updateExample(gross) {
  if (!gross || gross <= 0) return;

  const PA = 12570;
  const BASIC_LIMIT = 50270;
  const HIGHER_LIMIT = 125140;

  // Taper personal allowance above 100k
  let pa = PA;
  if (gross > 100000) {
    pa = Math.max(0, PA - Math.floor((gross - 100000) / 2));
  }

  const taxable = Math.max(0, gross - pa);

  // Income Tax
  let tax = 0;
  let topBand = '20%';
  if (taxable > 0) {
    const basic = Math.min(taxable, BASIC_LIMIT - PA);
    tax += Math.max(0, basic) * 0.20;
    if (taxable > (BASIC_LIMIT - PA)) {
      const higher = Math.min(taxable - (BASIC_LIMIT - PA), HIGHER_LIMIT - BASIC_LIMIT);
      tax += Math.max(0, higher) * 0.40;
      topBand = '40%';
    }
    if (taxable > (HIGHER_LIMIT - PA)) {
      const additional = taxable - (HIGHER_LIMIT - PA);
      tax += Math.max(0, additional) * 0.45;
      topBand = '45%';
    }
  }

  // NI (2025/26 rates)
  let ni = 0;
  let niRate = '8%';
  if (gross > 12570) {
    const primary = Math.min(gross, 50270) - 12570;
    ni += Math.max(0, primary) * 0.08;
    if (gross > 50270) {
      ni += (gross - 50270) * 0.02;
      niRate = '8% / 2%';
    }
  }

  const takeHome = gross - tax - ni;
  const effectiveRate = ((tax + ni) / gross * 100).toFixed(1);

  // Update DOM
  document.getElementById('exSalaryDisplay').textContent = fmtEx(gross) + ' / year';
  document.getElementById('exPersonalAllowance').textContent = fmtEx(pa);
  document.getElementById('exTaxableIncome').textContent = fmtEx(taxable);
  document.getElementById('exTaxRateLabel').textContent = 'Income Tax (up to ' + topBand + ')';
  document.getElementById('exIncomeTax').textContent = '−' + fmtEx(tax);
  document.getElementById('exNIRateLabel').textContent = 'National Insurance (' + niRate + ')';
  document.getElementById('exNI').textContent = '−' + fmtEx(ni);
  document.getElementById('exAnnualTakeHome').textContent = fmtEx(takeHome);
  document.getElementById('exMonthlyTakeHome').textContent = fmtEx(takeHome / 12);
  document.getElementById('exEffectiveRate').textContent = effectiveRate + '%';

  // Tax trap warning
  const warn = document.getElementById('exTaxTrapWarn');
  if (warn) warn.style.display = (gross > 100000 && gross < 125140) ? 'block' : 'none';
}

// Wire up the input
const exInput = document.getElementById('exampleSalaryInput');
if (exInput) {
  exInput.addEventListener('input', () => {
    const val = parseFloat(exInput.value);
    if (val > 0) updateExample(val);
  });
  // Run once on load with default
  updateExample(40000);
}
