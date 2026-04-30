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
  <a class="ham-menu-link active" href="/tax-check">&#128270; Reality Check</a>
</div>

<style>
header .header-inner, .site-footer .footer-inner { max-width: 820px !important; }
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
    <h1>Free UK Tax Code Checker &amp; Guide (Updated for 2026/27)</h1>
    <p>Answer 3 quick questions. We'll run your code through our logic engine and tell you exactly where you stand — Green, Amber or Red.</p>
  </div>

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

  <div id="tcResults">
    <div id="healthHero" class="health-hero green">
      <span id="hhIcon" class="hh-icon">&#9989;</span>
      <div class="hh-status" id="hhStatus">TAX HEALTH STATUS</div>
      <div class="hh-title" id="hhTitle">Your Code Looks Correct</div>
      <div class="hh-sub" id="hhSub">No obvious issues detected based on your answers.</div>
    </div>
    <div class="flags-grid" id="flagsGrid"></div>
    <div id="leakageSection" style="display:none;">
      <div class="tc-card-header" style="border-radius:14px 14px 0 0;margin-bottom:0;">&#128200; Monthly Tax Leakage</div>
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
        <p style="font-size:11px;color:var(--muted);margin-top:10px;">HMRC lines open Mon–Fri 8am–6pm. Web chat is usually faster.</p>
      </div>
    </div>
  </div>
  
  <div class="tc-faq" style="margin-top:60px;">
    <h2 style="font-size:24px;font-weight:800;color:var(--navy);margin-bottom:24px;text-align:center;">Frequently Asked Questions</h2>
    <div class="tc-card" style="margin-bottom:16px;">
      <div class="tc-card-body" style="padding:20px;">
        <h3 style="font-size:16px;font-weight:700;color:var(--navy);margin-bottom:8px;">What does the 'L' mean in my tax code?</h3>
        <p style="font-size:14px;color:var(--muted);line-height:1.6;margin:0;">The 'L' is the most common suffix and means you are entitled to the standard tax-free Personal Allowance. For 2026/27, the standard code is 1257L, giving you £12,570 tax-free.</p>
      </div>
    </div>
    <div class="tc-card" style="margin-bottom:16px;">
      <div class="tc-card-body" style="padding:20px;">
        <h3 style="font-size:16px;font-weight:700;color:var(--navy);margin-bottom:8px;">Why is my code 'BR', 'D0' or '0T'?</h3>
        <p style="font-size:14px;color:var(--muted);line-height:1.6;margin:0;">These are typically used for a second job or pension. 'BR' taxes all income at the basic rate (20%), 'D0' at the higher rate (40%). '0T' means you have no Personal Allowance, possibly because your employer doesn't have the necessary details to give you a tax code.</p>
      </div>
    </div>
    <div class="tc-card" style="margin-bottom:16px;">
      <div class="tc-card-body" style="padding:20px;">
        <h3 style="font-size:16px;font-weight:700;color:var(--navy);margin-bottom:8px;">What does 'W1' or 'M1' at the end of my code mean?</h3>
        <p style="font-size:14px;color:var(--muted);line-height:1.6;margin:0;">These are "emergency tax codes" (e.g., 1257L W1). They calculate tax only on what you earn in the current pay period, ignoring previous pay and tax. It often happens when you start a new job. Your employer should automatically fix this once they receive your P45 or HMRC details.</p>
      </div>
    </div>
    <div class="tc-card" style="margin-bottom:16px;">
      <div class="tc-card-body" style="padding:20px;">
        <h3 style="font-size:16px;font-weight:700;color:var(--navy);margin-bottom:8px;">How do I update my tax code?</h3>
        <p style="font-size:14px;color:var(--muted);line-height:1.6;margin:0;">The easiest way is to use your personal tax account online or the HMRC app. Alternatively, use our generated script above and call HMRC directly on 0300 200 3300.</p>
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
        <p>Free, accurate UK salary and tax calculators. Updated for 2026/27.</p>
      </div>
      <div>
        <div class="footer-col-title">Tools</div>
        <ul class="footer-links">
          <li><a href="/">Tax Code Checker</a></li>
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

` }} />
  );
}
