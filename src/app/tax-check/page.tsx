import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tax Code Reality Check 2026/27 | NetPayHome',
  description: 'Check if your UK tax code is correct for 2026/27. Instant Red/Amber/Green health check, monthly leakage calculator and personalised HMRC contact script.',
  alternates: { canonical: '/tax-check' },
};

export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `

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
      <div class="tax-year-badge">2026 / 27</div>
      <button class="ham-btn" id="hamBtn" aria-label="Open navigation menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="ham-overlay" id="hamOverlay"></div>
<div class="ham-menu" id="hamMenu">
  <a class="ham-menu-link" href="/">&#128221; Tax Code Checker</a>
  <div class="ham-menu-divider"></div>
  <a class="ham-menu-link" href="/full-calc">&#127919; Full Calculator</a>
  <a class="ham-menu-link" href="/quick-calc">&#9889; Quick Calculator</a>
  <a class="ham-menu-link" href="/salary-comparison">&#9878; Salary Comparison</a>
  <a class="ham-menu-link active" href="/tax-check">&#128270; Reality Check</a>
</div>

<style>
.tc-page{max-width:860px;margin:0 auto;padding:40px 20px 80px;}
.tc-hero{text-align:center;margin-bottom:36px;}
.tc-hero .badge{display:inline-flex;align-items:center;gap:6px;background:rgba(0,169,157,0.1);border:1px solid rgba(0,169,157,0.25);color:var(--teal);border-radius:20px;padding:5px 14px;font-size:12px;font-weight:700;letter-spacing:0.5px;margin-bottom:14px;text-transform:uppercase;}
.tc-hero h1{font-size:clamp(24px,4vw,38px);font-weight:800;color:var(--navy);letter-spacing:-0.8px;line-height:1.15;margin-bottom:10px;}
.tc-hero p{color:var(--muted);font-size:15px;max-width:560px;margin:0 auto;}

.tc-card{background:var(--card);border-radius:14px;border:1px solid var(--border);box-shadow:0 4px 28px rgba(15,31,61,0.09);overflow:hidden;margin-bottom:24px;}
.tc-card-header{background:linear-gradient(135deg,#0f1f3d,#1a3060);color:white;padding:16px 24px;display:flex;align-items:center;gap:10px;font-size:15px;font-weight:700;}
.tc-card-body{padding:24px;}

.tc-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
@media(max-width:600px){.tc-grid{grid-template-columns:1fr;}}

.tc-field{display:flex;flex-direction:column;gap:6px;}
.tc-label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.8px;}
.tc-input-wrap{display:flex;align-items:center;background:#f0f2f7;border:2px solid transparent;border-radius:10px;transition:all 0.2s;}
.tc-input-wrap:focus-within{border-color:var(--teal);box-shadow:0 0 0 3px rgba(0,169,157,0.1);background:white;}
.tc-sym{color:var(--teal);font-size:17px;font-weight:700;padding:0 6px 0 14px;flex-shrink:0;}
.tc-input-wrap input,.tc-input-wrap select{background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:19px;font-weight:700;color:var(--navy);padding:12px 14px 12px 0;width:100%;}
.tc-input-wrap select{padding-left:14px;font-size:14px;}

.tc-checks{display:flex;flex-direction:column;gap:12px;margin-top:4px;}
.tc-check{display:flex;align-items:flex-start;gap:12px;padding:14px;background:var(--light);border-radius:10px;border:1px solid var(--border);cursor:pointer;transition:border-color 0.2s;}
.tc-check:hover{border-color:var(--teal);}
.tc-check input[type=checkbox]{width:18px;height:18px;accent-color:var(--teal);flex-shrink:0;margin-top:2px;cursor:pointer;}
.tc-check-label{font-size:13px;font-weight:600;color:var(--navy);line-height:1.5;}
.tc-check-sub{font-size:11px;color:var(--muted);margin-top:2px;}

.tc-btn{width:100%;padding:16px;background:linear-gradient(135deg,var(--teal) 0%,#008a80 100%);color:white;border:none;border-radius:12px;font-size:16px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;margin-top:20px;transition:all 0.2s;box-shadow:0 4px 16px rgba(0,169,157,0.35);}
.tc-btn:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(0,169,157,0.45);}

/* RESULTS */
#tcResults{display:none;}

.health-hero{border-radius:14px;padding:28px;text-align:center;margin-bottom:20px;}
.health-hero.green{background:linear-gradient(135deg,#27ae60,#1e8449);}
.health-hero.amber{background:linear-gradient(135deg,#f5a623,#d4891e);}
.health-hero.red{background:linear-gradient(135deg,#e8463a,#c0392b);}
.hh-icon{font-size:48px;margin-bottom:10px;display:block;}
.hh-status{color:rgba(255,255,255,0.8);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;}
.hh-title{color:white;font-size:clamp(20px,3vw,28px);font-weight:900;letter-spacing:-0.5px;margin-bottom:6px;}
.hh-sub{color:rgba(255,255,255,0.75);font-size:13px;line-height:1.6;}

.flags-grid{display:flex;flex-direction:column;gap:10px;margin-bottom:20px;}
.flag-item{display:flex;align-items:flex-start;gap:12px;padding:14px 16px;border-radius:10px;border-left:4px solid;}
.flag-item.ok{background:#e8f8f0;border-color:#27ae60;}
.flag-item.warn{background:#fff8e6;border-color:#f5a623;}
.flag-item.bad{background:#fdecea;border-color:#e8463a;}
.flag-item.info{background:#eef1fb;border-color:#6366f1;}
.flag-icon{font-size:20px;flex-shrink:0;}
.flag-title{font-size:13px;font-weight:700;color:var(--navy);margin-bottom:2px;}
.flag-desc{font-size:12px;color:var(--muted);line-height:1.5;}

.leakage-box{background:linear-gradient(135deg,#0f1f3d,#1a3060);border-radius:12px;padding:22px;margin-bottom:20px;text-align:center;}
.lb-label{color:rgba(255,255,255,0.6);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;}
.lb-amount{color:#f5a623;font-size:clamp(32px,6vw,52px);font-weight:900;letter-spacing:-1.5px;font-family:'DM Sans',sans-serif;}
.lb-sub{color:rgba(255,255,255,0.55);font-size:12px;margin-top:6px;}
.lb-annual{color:rgba(255,255,255,0.8);font-size:14px;font-weight:600;margin-top:8px;}

.script-box{background:var(--light);border:1px solid var(--border);border-radius:10px;padding:18px;font-family:monospace;font-size:12px;line-height:1.8;color:var(--text);white-space:pre-wrap;word-break:break-word;}
.copy-btn{margin-top:12px;padding:10px 20px;background:var(--navy);color:white;border:none;border-radius:8px;font-size:13px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;}
.copy-btn:hover{background:var(--teal);}
</style>

<div class="tc-page">

  <div class="tc-hero">
    <div class="badge">&#128270; 2026/27 Tax Reality Check</div>
    <h1>Is Your Tax Code Costing You Money?</h1>
    <p>Answer 3 quick questions. We'll run your code through our logic engine and tell you exactly where you stand — Green, Amber or Red.</p>
  </div>

  <!-- INPUT CARD -->
  <div class="tc-card">
    <div class="tc-card-header">&#128221; Your Details</div>
    <div class="tc-card-body">
      <div class="tc-grid">
        <div class="tc-field">
          <label class="tc-label" for="tcMonthlyPay">Monthly Gross Pay</label>
          <div class="tc-input-wrap"><span class="tc-sym">£</span><input id="tcMonthlyPay" type="number" placeholder="2,500" min="0"></div>
        </div>
        <div class="tc-field">
          <label class="tc-label" for="tcCode">Tax Code</label>
          <div class="tc-input-wrap"><input id="tcCode" type="text" placeholder="1257L" maxlength="10" style="padding-left:14px;text-transform:uppercase;"></div>
        </div>
        <div class="tc-field" style="grid-column:1/-1;">
          <label class="tc-label" for="tcLocation">Your Location</label>
          <div class="tc-input-wrap">
            <select id="tcLocation">
              <option value="england">England / Wales / Northern Ireland</option>
              <option value="scotland">Scotland</option>
            </select>
          </div>
        </div>
      </div>

      <div style="margin-top:22px;">
        <div class="tc-label" style="margin-bottom:12px;">Reality Check — tick all that apply to you</div>
        <div class="tc-checks">
          <label class="tc-check">
            <input type="checkbox" id="chkOnlyJob">
            <div><div class="tc-check-label">This is my only current job or pension</div><div class="tc-check-sub">No second employer, no side employment</div></div>
          </label>
          <label class="tc-check">
            <input type="checkbox" id="chkPerks">
            <div><div class="tc-check-label">I receive company benefits (car, medical, etc.)</div><div class="tc-check-sub">Taxable benefits-in-kind reduce your allowance</div></div>
          </label>
          <label class="tc-check">
            <input type="checkbox" id="chkThreeMonths">
            <div><div class="tc-check-label">I have been with this employer for more than 3 months</div><div class="tc-check-sub">Emergency codes should be resolved after first payroll</div></div>
          </label>
        </div>
      </div>

      <button class="tc-btn" id="tcAnalyseBtn">&#128270; Analyse My Tax Code</button>
    </div>
  </div>

  <!-- RESULTS -->
  <div id="tcResults">

    <div id="healthHero" class="health-hero green">
      <span id="hhIcon" class="hh-icon">&#9989;</span>
      <div class="hh-status" id="hhStatus">TAX HEALTH</div>
      <div class="hh-title" id="hhTitle">Your Code Looks Correct</div>
      <div class="hh-sub" id="hhSub">No obvious issues detected based on your answers.</div>
    </div>

    <div class="flags-grid" id="flagsGrid"></div>

    <div id="leakageSection" style="display:none;">
      <div class="tc-card-header" style="border-radius:14px 14px 0 0;background:linear-gradient(135deg,#0f1f3d,#1a3060);color:white;padding:14px 22px;font-size:14px;font-weight:700;">&#128200; Monthly Tax Leakage</div>
      <div class="leakage-box" style="border-radius:0 0 14px 14px;margin-bottom:20px;">
        <div class="lb-label">Estimated Monthly Overpayment</div>
        <div class="lb-amount" id="leakageAmount">£0</div>
        <div class="lb-sub">Based on your gross pay vs. what you should be paying</div>
        <div class="lb-annual" id="leakageAnnual"></div>
      </div>
    </div>

    <div class="tc-card">
      <div class="tc-card-header">&#128172; Your Personalised HMRC Contact Script</div>
      <div class="tc-card-body">
        <p style="font-size:13px;color:var(--muted);margin-bottom:14px;line-height:1.6;">Copy and paste this into HMRC web chat or read it over the phone on <strong>0300 200 3300</strong>:</p>
        <div class="script-box" id="hmrcScript"></div>
        <button class="copy-btn" id="copyScriptBtn">&#128203; Copy Script</button>
        <p style="font-size:11px;color:var(--muted);margin-top:10px;">HMRC lines open Mon–Fri 8am–6pm. Average wait: 20 mins. Web chat is usually faster.</p>
      </div>
    </div>

  </div>
</div>

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
        <p>Free, accurate UK salary and take-home pay calculator. Updated for 2026/27.</p>
      </div>
      <div>
        <div class="footer-col-title">Tools</div>
        <ul class="footer-links">
          <li><a href="/full-calc">Full Calculator</a></li>
          <li><a href="/quick-calc">Quick Calculator</a></li>
          <li><a href="/">Tax Code Checker</a></li>
          <li><a href="/salary-comparison">Salary Comparison</a></li>
          <li><a href="/tax-check">Reality Check</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 NetPayHome. For informational purposes only — not financial advice.</span>
      <span class="footer-badge">2026 / 27 Tax Year</span>
    </div>
  </div>
</footer>

<script>
(function(){
  var STANDARD = 12570;

  document.getElementById('tcCode').addEventListener('input', function(){ this.value = this.value.toUpperCase(); });

  document.getElementById('tcAnalyseBtn').addEventListener('click', function(){
    var pay    = parseFloat(document.getElementById('tcMonthlyPay').value) || 0;
    var code   = (document.getElementById('tcCode').value || '').trim().toUpperCase();
    var loc    = document.getElementById('tcLocation').value;
    var only   = document.getElementById('chkOnlyJob').checked;
    var perks  = document.getElementById('chkPerks').checked;
    var months = document.getElementById('chkThreeMonths').checked;

    if (!pay || !code) { alert('Please enter your monthly pay and tax code.'); return; }

    var flags = [];
    var overallColor = 'green';
    var overallIcon  = '&#9989;';
    var overallTitle = 'Your Code Looks Correct';
    var overallSub   = 'No obvious issues detected based on your answers.';

    // Rule C — Emergency basis (check first, highest priority)
    var isEmergency = /W1|M1/.test(code) || code.endsWith('X');
    if (isEmergency) {
      flags.push({ type:'warn', icon:'&#9888;&#65039;', title:'Rule C: Emergency Tax Basis Detected', desc:'Your code contains W1, M1, or X — meaning tax is calculated on a non-cumulative (week/month-by-week) basis. You may be overpaying if earlier months were under-utilised. Ask HMRC to update to a cumulative code.' });
      if (months) {
        flags.push({ type:'bad', icon:'&#128680;', title:'Emergency Code After 3+ Months', desc:'You have been with this employer for over 3 months. Your emergency code should have been resolved by now. HMRC or your payroll team needs to act immediately.' });
      }
      overallColor = 'amber'; overallIcon = '&#9888;&#65039;'; overallTitle = 'Emergency Tax Basis — Act Now'; overallSub = 'Your code runs on a non-cumulative basis. You may be missing your full annual allowance each month.';
    }

    // Rule D — Scottish prefix
    if (loc === 'scotland' && !code.startsWith('S')) {
      flags.push({ type:'bad', icon:'&#127988;', title:'Rule D: Missing Scottish Prefix', desc:'You said you are in Scotland, but your code does not start with S (e.g. S1257L). This means you are being taxed at England/Wales rates — likely underpaying Scottish tax or missing the correct bands. Contact HMRC to add the S prefix.' });
      overallColor = 'red'; overallIcon = '&#128308;'; overallTitle = 'Wrong Tax Region Applied'; overallSub = 'Your code does not match your Scottish residence — your rates are wrong.';
    }
    if (loc !== 'scotland' && code.startsWith('S')) {
      flags.push({ type:'bad', icon:'&#128308;', title:'Scottish Code on Non-Scottish Employment', desc:'Your code starts with S but you selected England/Wales/NI. You may be paying Scottish tax rates when you should not be.' });
      overallColor = 'red'; overallIcon = '&#128308;'; overallTitle = 'Region Mismatch on Tax Code'; overallSub = 'Your S-prefixed code does not match your stated location.';
    }

    // Rule A — Overpayment
    var codeBase = code.replace(/^[SD]/,'').replace(/W1|M1|X/g,'').trim();
    var isStandard = codeBase === '1257L';
    if (only && !perks && !isStandard && !isEmergency) {
      flags.push({ type:'bad', icon:'&#128308;', title:'Rule A: Likely Overpaying Tax', desc:'This is your only job, you have no company benefits, but your code is not 1257L. Most people in this situation should be on 1257L giving a £12,570 personal allowance. You may be overpaying every month.' });
      overallColor = 'red'; overallIcon = '&#128308;'; overallTitle = 'You Are Likely Overpaying Tax'; overallSub = 'Your code does not match the expected standard for your situation.';
    }

    // Rule B — Underpayment
    if (perks && isStandard) {
      flags.push({ type:'warn', icon:'&#128993;', title:'Rule B: Possible Underpayment', desc:'You have company benefits (car, medical, etc.) but are on code 1257L. HMRC should have reduced your allowance to account for the taxable value of those benefits. You may owe tax at year end.' });
      if (overallColor !== 'red') { overallColor = 'amber'; overallIcon = '&#128993;'; overallTitle = 'Possible Underpayment — Check Benefits'; overallSub = 'You may owe tax at year end if your benefits-in-kind are not accounted for.'; }
    }

    // Green checks
    if (only && !perks && isStandard && !isEmergency) {
      flags.push({ type:'ok', icon:'&#9989;', title:'Standard Code Correct for Your Situation', desc:'1257L is the right code for a single job with no company benefits. Your allowance of £12,570 is being applied correctly.' });
    }
    if (months && !isEmergency) {
      flags.push({ type:'ok', icon:'&#9989;', title:'Employer Tenure — No Emergency Code Issue', desc:'You have been with this employer over 3 months and are not on an emergency code. Good — no forced correction needed.' });
    }

    // Info
    flags.push({ type:'info', icon:'&#128203;', title:'Your Code: ' + code + ' | Annual Pay: £' + (pay*12).toLocaleString('en-GB',{maximumFractionDigits:0}), desc:'Gross monthly pay: £' + pay.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2}) + ' | Location: ' + (loc==='scotland'?'Scotland':'England/Wales/NI') });

    // Leakage calc
    var leakage = 0;
    var showLeakage = false;
    var cleanCode = code.replace(/^[SD]/,'').replace(/W1|M1|X/g,'').trim();
    if (cleanCode === 'BR' || cleanCode === '0T' || cleanCode === 'D0') {
      leakage = (STANDARD / 12) * 0.20;
      showLeakage = true;
    } else if (overallColor === 'red' && !isStandard && only && !perks) {
      // estimate partial loss based on difference from 1257L allowance
      var codeNum = parseInt(cleanCode.replace(/[A-Z]/g,''), 10);
      if (!isNaN(codeNum)) {
        var theirAllowance = codeNum * 10;
        var diff = STANDARD - theirAllowance;
        if (diff > 0) { leakage = (diff / 12) * 0.20; showLeakage = true; }
      }
    }

    // Render health hero
    document.getElementById('healthHero').className = 'health-hero ' + overallColor;
    document.getElementById('hhIcon').innerHTML = overallIcon;
    document.getElementById('hhStatus').textContent = 'TAX HEALTH STATUS';
    document.getElementById('hhTitle').textContent = overallTitle;
    document.getElementById('hhSub').textContent = overallSub;

    // Render flags
    var fg = document.getElementById('flagsGrid');
    fg.innerHTML = '';
    flags.forEach(function(f){
      fg.innerHTML += '<div class="flag-item ' + f.type + '"><span class="flag-icon">' + f.icon + '</span><div><div class="flag-title">' + f.title + '</div><div class="flag-desc">' + f.desc + '</div></div></div>';
    });

    // Leakage
    var ls = document.getElementById('leakageSection');
    if (showLeakage && leakage > 0) {
      ls.style.display = 'block';
      document.getElementById('leakageAmount').textContent = '£' + leakage.toFixed(2);
      document.getElementById('leakageAnnual').textContent = '≈ £' + (leakage*12).toFixed(0) + ' lost per year if not corrected';
    } else {
      ls.style.display = 'none';
    }

    // HMRC Script
    var annualPay = (pay * 12).toLocaleString('en-GB', {maximumFractionDigits:0});
    var script = 'Hello, I am calling to query my tax code for the 2026/27 tax year.\n\n';
    script += 'My details:\n';
    script += '  - Current Tax Code: ' + code + '\n';
    script += '  - Annual Gross Salary: £' + annualPay + '\n';
    script += '  - Monthly Gross Pay: £' + pay.toLocaleString('en-GB',{minimumFractionDigits:2}) + '\n';
    script += '  - Location: ' + (loc==='scotland'?'Scotland':'England/Wales/NI') + '\n';
    script += '  - Only job: ' + (only?'Yes':'No') + '\n';
    script += '  - Company benefits: ' + (perks?'Yes':'No') + '\n\n';
    if (overallColor === 'red' && only && !perks) {
      script += 'I believe my code should be ' + (loc==='scotland'?'S':'') + '1257L as this is my only employment and I have no taxable benefits-in-kind. My current code of ' + code + ' appears to be incorrect.\n\n';
      script += 'I would like you to:\n  1. Confirm the reason for my current code.\n  2. Issue an updated tax code of ' + (loc==='scotland'?'S':'') + '1257L if no adjustments apply.\n  3. Confirm whether I am owed any repayment for the current tax year.\n';
    } else if (isEmergency) {
      script += 'My code contains an emergency basis indicator (W1/M1/X). I have been with my employer for ' + (months?'more than 3 months':'less than 3 months') + ' and believe this should now be converted to a cumulative code.\n\nPlease update my code to a cumulative basis and confirm if I am owed any repayment for the current year.\n';
    } else if (perks && isStandard) {
      script += 'I am on code 1257L but receive company benefits. I want to confirm whether my benefits-in-kind have been included in my code and whether I may owe tax at year end.\n\nPlease review my record and confirm whether my code needs adjustment.\n';
    } else if (loc==='scotland' && !code.startsWith('S')) {
      script += 'I am a Scottish taxpayer but my code does not start with S. Please update my record to apply the correct Scottish tax rates and reissue my code with the S prefix.\n';
    } else {
      script += 'I would like to confirm my tax code is correct for my circumstances and that the right Personal Allowance of £12,570 is being applied for 2026/27.\n';
    }
    script += '\nThank you.';

    document.getElementById('hmrcScript').textContent = script;
    document.getElementById('tcResults').style.display = 'block';
    document.getElementById('tcResults').scrollIntoView({ behavior:'smooth', block:'start' });
  });

  document.getElementById('copyScriptBtn').addEventListener('click', function(){
    var text = document.getElementById('hmrcScript').textContent;
    navigator.clipboard.writeText(text).then(function(){
      var btn = document.getElementById('copyScriptBtn');
      btn.textContent = '&#10003; Copied!';
      setTimeout(function(){ btn.innerHTML = '&#128203; Copy Script'; }, 2000);
    });
  });
})();
</script>

` }} />
  );
}
