import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Overpaid Tax Refund Calculator 2026/27 | NetPayHome',
  description: 'Find out if you\'ve overpaid tax in 2026/27. Calculate your refund instantly, understand why it happened, and claim via HMRC P800.',
  alternates: { canonical: '/tax-refund' },
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
    </div>
  </div>
</header>

<nav class="tool-nav">
  <div class="tool-nav-inner">
    <a class="tool-nav-link" href="/">&#128221; Tax Code Checker</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link" href="/full-calc">&#127919; Full Calculator</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link" href="/quick-calc">&#9889; Quick Calculator</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link" href="/salary-comparison">&#9878; Salary Comparison</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link active" href="/tax-refund">&#128176; Refund Calculator</a>
  </div>
</nav>

<style>
:root{--refund-green:#00b87a;--refund-green-light:#e6f9f1;--refund-red:#e8463a;--refund-red-light:#fdecea;}

.refund-page{max-width:860px;margin:0 auto;padding:32px 20px 80px;}

.refund-hero{text-align:center;margin-bottom:36px;}
.refund-hero h1{font-size:clamp(24px,4vw,38px);font-weight:800;color:var(--navy);letter-spacing:-0.8px;line-height:1.15;margin-bottom:10px;}
.refund-hero p{color:var(--muted);font-size:15px;max-width:560px;margin:0 auto;}
.refund-hero .badge{display:inline-flex;align-items:center;gap:6px;background:rgba(0,169,157,0.1);border:1px solid rgba(0,169,157,0.25);color:var(--teal);border-radius:20px;padding:5px 14px;font-size:12px;font-weight:700;letter-spacing:0.5px;margin-bottom:16px;text-transform:uppercase;}

.refund-card{background:var(--card);border-radius:14px;border:1px solid var(--border);box-shadow:0 4px 32px rgba(15,31,61,0.09);overflow:hidden;margin-bottom:28px;}
.refund-card-header{background:var(--navy);color:white;padding:18px 26px;display:flex;align-items:center;gap:10px;}
.refund-card-header-icon{font-size:20px;}
.refund-card-header h2{font-size:15px;font-weight:600;flex:1;}
.refund-card-body{padding:26px;}

.refund-inputs{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
@media(max-width:600px){.refund-inputs{grid-template-columns:1fr;}}

.ri-group{display:flex;flex-direction:column;gap:6px;}
.ri-label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.8px;display:flex;align-items:center;gap:6px;}
.ri-label .tip{width:16px;height:16px;background:var(--light);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;color:var(--muted);cursor:help;flex-shrink:0;}
.ri-field{display:flex;align-items:center;background:#f0f2f7;border:2px solid transparent;border-radius:10px;transition:border-color 0.2s,box-shadow 0.2s;}
.ri-field:focus-within{border-color:var(--teal);box-shadow:0 0 0 3px rgba(0,169,157,0.1);background:white;}
.ri-symbol{color:var(--teal);font-size:18px;font-weight:700;padding:0 6px 0 14px;flex-shrink:0;}
.ri-field input{background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:20px;font-weight:700;color:var(--navy);padding:13px 14px 13px 0;width:100%;}
.ri-field input::placeholder{color:#b0bad0;font-weight:500;}

.ri-group-full{grid-column:1/-1;}

.refund-btn{width:100%;padding:17px;background:linear-gradient(135deg,var(--teal) 0%,#008a80 100%);color:white;border:none;border-radius:12px;font-size:16px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;margin-top:22px;transition:all 0.2s;box-shadow:0 4px 16px rgba(0,169,157,0.35);letter-spacing:0.3px;}
.refund-btn:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(0,169,157,0.45);}
.refund-btn:active{transform:translateY(0);}

/* RESULT */
#refundResult{display:none;}

.result-hero{border-radius:12px;padding:28px;text-align:center;margin-bottom:20px;position:relative;overflow:hidden;}
.result-hero.positive{background:linear-gradient(135deg,#00b87a 0%,#008a5e 100%);}
.result-hero.negative{background:linear-gradient(135deg,#e8463a 0%,#b8322a 100%);}
.result-hero-label{color:rgba(255,255,255,0.8);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:8px;}
.result-hero-amount{color:white;font-size:clamp(36px,8vw,60px);font-weight:900;letter-spacing:-2px;line-height:1;margin-bottom:6px;font-family:'DM Sans',sans-serif;}
.result-hero-sub{color:rgba(255,255,255,0.75);font-size:13px;}
.result-hero-icon{font-size:48px;margin-bottom:8px;display:block;}

.breakdown-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
@media(max-width:500px){.breakdown-grid{grid-template-columns:1fr;}}
.bk-item{background:var(--light);border-radius:9px;padding:14px 16px;}
.bk-label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.7px;margin-bottom:4px;}
.bk-value{font-size:20px;font-weight:800;color:var(--navy);font-family:'DM Sans',sans-serif;letter-spacing:-0.5px;}
.bk-value.green{color:var(--refund-green);}
.bk-value.red{color:var(--refund-red);}

/* HEALTH METER */
.meter-wrap{margin-bottom:20px;}
.meter-title{font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;}
.meter-track{height:14px;border-radius:10px;background:linear-gradient(to right,#e8463a,#f5a623,#27ae60);position:relative;overflow:hidden;}
.meter-needle{position:absolute;top:-3px;width:4px;height:20px;background:var(--navy);border-radius:2px;transform:translateX(-50%);transition:left 0.8s cubic-bezier(.34,1.56,.64,1);box-shadow:0 2px 6px rgba(0,0,0,0.3);}
.meter-labels{display:flex;justify-content:space-between;margin-top:5px;font-size:10px;color:var(--muted);}

/* WHY DID I OVERPAY */
.reason-list{display:flex;flex-direction:column;gap:10px;margin-bottom:0;}
.reason-item{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;background:var(--light);border-radius:9px;border-left:3px solid var(--teal);}
.reason-icon{font-size:18px;flex-shrink:0;margin-top:1px;}
.reason-body strong{display:block;font-size:13px;font-weight:700;color:var(--navy);margin-bottom:2px;}
.reason-body p{font-size:12px;color:var(--muted);line-height:1.5;margin:0;}

/* CLAIM BUTTON */
.claim-cta{display:flex;flex-direction:column;align-items:center;gap:12px;padding:26px;background:linear-gradient(135deg,#0f1f3d 0%,#1a3060 100%);border-radius:12px;text-align:center;}
.claim-cta h3{color:white;font-size:16px;font-weight:700;margin-bottom:2px;}
.claim-cta p{color:rgba(255,255,255,0.65);font-size:13px;margin-bottom:4px;}
.claim-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--refund-green) 0%,#008a5e 100%);color:white;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:15px;font-weight:700;font-family:'DM Sans',sans-serif;transition:all 0.2s;box-shadow:0 4px 16px rgba(0,184,122,0.4);}
.claim-btn:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(0,184,122,0.55);}

.tax-band-pill{display:inline-block;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;}

@media(max-width:600px){.refund-card-body{padding:18px;}}
</style>

<div class="refund-page">

  <div class="refund-hero">
    <div class="badge">&#128176; 2026/27 Tax Year</div>
    <h1>Overpaid Tax Refund<br>Calculator</h1>
    <p>Enter your gross salary and how much tax you've paid. We'll instantly calculate if HMRC owes you a refund — or if there's a balance to settle.</p>
  </div>

  <!-- INPUT CARD -->
  <div class="refund-card">
    <div class="refund-card-header">
      <span class="refund-card-header-icon">&#128221;</span>
      <h2>Your Tax Details</h2>
    </div>
    <div class="refund-card-body">
      <div class="refund-inputs">
        <div class="ri-group">
          <label class="ri-label" for="ri-salary">Annual Gross Salary <span class="tip" title="Your total salary before any deductions">?</span></label>
          <div class="ri-field"><span class="ri-symbol">£</span><input id="ri-salary" type="number" placeholder="35,000" min="0" max="9999999"></div>
        </div>
        <div class="ri-group">
          <label class="ri-label" for="ri-taxpaid">Total Tax Paid So Far <span class="tip" title="Find this on your P60 or payslips">?</span></label>
          <div class="ri-field"><span class="ri-symbol">£</span><input id="ri-taxpaid" type="number" placeholder="6,200" min="0"></div>
        </div>
        <div class="ri-group ri-group-full">
          <label class="ri-label" for="ri-taxcode">Tax Code <span class="tip" title="Found on your payslip. Default 1257L gives the standard £12,570 personal allowance">?</span></label>
          <div class="ri-field" style="max-width:220px;"><input id="ri-taxcode" type="text" placeholder="1257L" maxlength="8" style="text-transform:uppercase;"></div>
        </div>
      </div>
      <button class="refund-btn" id="ri-calcBtn">Calculate My Refund &#8594;</button>
    </div>
  </div>

  <!-- RESULTS CARD -->
  <div id="refundResult">

    <div class="refund-card">
      <div class="refund-card-header">
        <span class="refund-card-header-icon">&#128200;</span>
        <h2>Your Result</h2>
      </div>
      <div class="refund-card-body">

        <div id="resultHero" class="result-hero positive">
          <span id="resultIcon" class="result-hero-icon">&#127881;</span>
          <div id="resultLabel" class="result-hero-label">Estimated Refund</div>
          <div id="resultAmount" class="result-hero-amount">£0</div>
          <div id="resultSub" class="result-hero-sub">HMRC should return this to you</div>
        </div>

        <div class="breakdown-grid">
          <div class="bk-item">
            <div class="bk-label">Gross Salary</div>
            <div class="bk-value" id="bk-salary">£0</div>
          </div>
          <div class="bk-item">
            <div class="bk-label">Personal Allowance</div>
            <div class="bk-value" id="bk-pa">£12,570</div>
          </div>
          <div class="bk-item">
            <div class="bk-label">Taxable Income</div>
            <div class="bk-value" id="bk-taxable">£0</div>
          </div>
          <div class="bk-item">
            <div class="bk-label">Tax Due</div>
            <div class="bk-value" id="bk-due">£0</div>
          </div>
          <div class="bk-item">
            <div class="bk-label">Tax Paid</div>
            <div class="bk-value" id="bk-paid">£0</div>
          </div>
          <div class="bk-item">
            <div class="bk-label">Difference</div>
            <div class="bk-value" id="bk-diff">£0</div>
          </div>
        </div>

        <div class="meter-wrap">
          <div class="meter-title">
            <span>Tax Code Health Meter</span>
            <span id="meterStatus" style="font-weight:800;font-size:13px;"></span>
          </div>
          <div class="meter-track">
            <div class="meter-needle" id="meterNeedle" style="left:50%;"></div>
          </div>
          <div class="meter-labels">
            <span>&#128308; Heavily Overpaid</span>
            <span>&#128994; Spot On</span>
            <span>&#128308; Underpaid</span>
          </div>
        </div>

      </div>
    </div>

    <!-- HOW TO CLAIM -->
    <div class="refund-card">
      <div class="refund-card-header">
        <span class="refund-card-header-icon">&#9203;</span>
        <h2>How to Claim Your Refund</h2>
      </div>
      <div class="refund-card-body">
        <div class="claim-cta">
          <div>
            <h3>&#128226; Claim via the Official HMRC P800 Portal</h3>
            <p>If HMRC calculates you've overpaid, they'll send a P800 tax calculation. You can claim online — refunds usually arrive within 5 working days.</p>
          </div>
          <a class="claim-btn" href="https://www.tax.service.gov.uk/check-if-you-need-to-send-a-self-assessment-tax-return" target="_blank" rel="noopener noreferrer">
            &#128176; Claim on HMRC.gov.uk &#8599;
          </a>
        </div>
      </div>
    </div>

  </div>

  <!-- WHY DID I OVERPAY -->
  <div class="refund-card">
    <div class="refund-card-header">
      <span class="refund-card-header-icon">&#10067;</span>
      <h2>Why Did I Overpay Tax?</h2>
    </div>
    <div class="refund-card-body">
      <div class="reason-list">
        <div class="reason-item">
          <span class="reason-icon">&#128680;</span>
          <div class="reason-body">
            <strong>Emergency Tax Code (BR or 0T)</strong>
            <p>If HMRC didn't receive your P45 from a previous employer, you're placed on an emergency code that taxes all your income — giving you zero Personal Allowance (£12,570) until corrected.</p>
          </div>
        </div>
        <div class="reason-item">
          <span class="reason-icon">&#128197;</span>
          <div class="reason-body">
            <strong>Starting a Job Mid-Year</strong>
            <p>Tax-free allowances are spread equally over 12 months. If you join in, say, October, your employer may collect tax as if you'd earned more earlier in the year than you actually had.</p>
          </div>
        </div>
        <div class="reason-item">
          <span class="reason-icon">&#128200;</span>
          <div class="reason-body">
            <strong>Incorrect Tax Code from HMRC</strong>
            <p>Outdated benefit-in-kind data, old job records, or system errors can leave your tax code showing a lower allowance than you're entitled to — costing you money every payday.</p>
          </div>
        </div>
        <div class="reason-item">
          <span class="reason-icon">&#128188;</span>
          <div class="reason-body">
            <strong>Multiple Jobs or Pensions</strong>
            <p>Your Personal Allowance only applies once. If HMRC hasn't correctly split it between employers or pension providers, some income may be taxed more than it should be.</p>
          </div>
        </div>
        <div class="reason-item">
          <span class="reason-icon">&#128176;</span>
          <div class="reason-body">
            <strong>Leaving Work or Taking a Career Break</strong>
            <p>If you stopped working part-way through the tax year, you may have unused allowance. Tax already paid via PAYE in earlier months can't be reclaimed automatically — you must claim it.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>

<script>
(function(){
  function fmt(n){return'£'+Math.abs(n).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2});}
  function parseTaxCode(code){
    code=(code||'1257L').trim().toUpperCase();
    var m=code.match(/^([SD]?)(\\d+)([LMNTY])$/);
    if(m){return parseInt(m[2],10)*10;}
    if(code==='BR'||code==='0T'||code==='D0'||code==='D1'||code==='NT'){return 0;}
    return 12570;
  }
  function calcTax(salary,pa){
    var taxable=Math.max(0,salary-pa);
    var tax=0;
    var basic=Math.min(taxable,50270-pa);if(basic>0)tax+=basic*0.20;
    var higher=Math.min(Math.max(0,taxable-(50270-pa)),125140-50270);if(higher>0)tax+=higher*0.40;
    var add=Math.max(0,taxable-(125140-pa));if(add>0)tax+=add*0.45;
    return tax;
  }
  document.getElementById('ri-taxcode').addEventListener('input',function(){this.value=this.value.toUpperCase();});
  document.getElementById('ri-calcBtn').addEventListener('click',function(){
    var salary=parseFloat(document.getElementById('ri-salary').value)||0;
    var taxPaid=parseFloat(document.getElementById('ri-taxpaid').value)||0;
    var codeRaw=document.getElementById('ri-taxcode').value||'1257L';
    var pa=parseTaxCode(codeRaw);
    if(salary>100000){var taper=Math.min(pa,Math.floor((salary-100000)/2));pa=Math.max(0,pa-taper);}
    var taxDue=calcTax(salary,pa);
    var diff=taxPaid-taxDue;
    var isRefund=diff>0;
    document.getElementById('refundResult').style.display='block';
    var hero=document.getElementById('resultHero');
    hero.className='result-hero '+(isRefund?'positive':'negative');
    document.getElementById('resultIcon').textContent=isRefund?'🎉':'⚠️';
    document.getElementById('resultLabel').textContent=isRefund?'Estimated Refund':'Tax Balance Owed';
    document.getElementById('resultAmount').textContent=fmt(diff);
    document.getElementById('resultSub').textContent=isRefund?'HMRC should return this to you':'You may owe HMRC this amount';
    document.getElementById('bk-salary').textContent=fmt(salary);
    document.getElementById('bk-pa').textContent=fmt(pa);
    document.getElementById('bk-taxable').textContent=fmt(Math.max(0,salary-pa));
    document.getElementById('bk-due').textContent=fmt(taxDue);
    document.getElementById('bk-paid').textContent=fmt(taxPaid);
    var diffEl=document.getElementById('bk-diff');
    diffEl.textContent=(diff>=0?'+':'')+fmt(diff);
    diffEl.className='bk-value '+(diff>=0?'green':'red');
    // Health meter: 50% = spot on. Range: -£5000 to +£5000
    var clamp=Math.max(-5000,Math.min(5000,diff));
    var pct=50-(clamp/5000)*45; // over=left(red), under=right(red), spot on=center(green)
    document.getElementById('meterNeedle').style.left=pct+'%';
    var absDiff=Math.abs(diff);
    var statusText=absDiff<50?'✅ Spot On':isRefund?'💚 Overpaid by '+fmt(diff):'🔴 Underpaid by '+fmt(diff);
    document.getElementById('meterStatus').textContent=statusText;
    document.getElementById('refundResult').scrollIntoView({behavior:'smooth',block:'nearest'});
  });
})();
</script>

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
        <p>Free UK salary and tax refund calculators. Updated for the 2026/27 tax year.</p>
      </div>
      <div>
        <div class="footer-col-title">Tools</div>
        <ul class="footer-links">
          <li><a href="/full-calc">Full Calculator</a></li>
          <li><a href="/quick-calc">Quick Calculator</a></li>
          <li><a href="/">Tax Code Checker</a></li>
          <li><a href="/salary-comparison">Salary Comparison</a></li>
          <li><a href="/tax-refund">Refund Calculator</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 NetPayHome. For informational purposes only — not financial advice.</span>
      <span class="footer-badge">2026 / 27 Tax Year</span>
    </div>
  </div>
</footer>

` }} />
  );
}
