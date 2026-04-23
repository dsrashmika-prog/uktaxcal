import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UK Tax Code Checker 2026/27: Calculate Your Take-Home Pay Instantly',
  description: 'Check if your 2026/27 tax code is correct with our instant calculator. If your code is wrong, follow our simple steps to claim overpaid tax or resolve underpayments with HMRC today.',
  alternates: {
    canonical: '/tax-code',
  },
};

export default function TaxCodePage() {
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
      <div class="tax-year-badge">2026 / 27</div>
    </div>
  </div>
</header>

<nav class="tool-nav">
  <div class="tool-nav-inner">
    <a class="tool-nav-link" href="/">&#127919; Full Calculator</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link" href="/quick-calc">&#9889; Quick Calculator</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link active" href="/tax-code">&#128221; Tax Code Checker</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link" href="/salary-comparison">&#9878; Salary Comparison</a>
  </div>
</nav>

<div class="tc-page">

  <div class="page-title" style="margin-bottom:36px;">
    <h1>Free UK Tax Code Calculator & Guide (Updated for 2026/27)</h1>
    <p>Enter your tax code to instantly understand what it means, your personal allowance, and what to do if it&apos;s wrong.</p>
  </div>

  <div class="tc-search-card">
    <div class="tc-search-header">
      <span class="fch-icon">&#128269;</span> Enter Your Tax Code
    </div>
    <div class="tc-search-body">
      <div class="tc-input-row">
        <div class="tc-input-field" id="tcInputField">
          <input type="text" id="tcInput" placeholder="e.g. 1257L, BR, D0, K500..." maxlength="10" autocomplete="off" spellcheck="false">
        </div>
        <button class="tc-decode-btn" id="tcDecodeBtn">Decode &#8594;</button>
      </div>
      <div class="tc-input-hint">Common codes:
        <span class="tc-hint-pill" data-code="1257L">1257L</span>
        <span class="tc-hint-pill" data-code="BR">BR</span>
        <span class="tc-hint-pill" data-code="D0">D0</span>
        <span class="tc-hint-pill" data-code="S1257L">S1257L</span>
        <span class="tc-hint-pill" data-code="K500">K500</span>
        <span class="tc-hint-pill" data-code="NT">NT</span>
        <span class="tc-hint-pill" data-code="1257L W1">1257L W1</span>
      </div>
    </div>
  </div>

  <div class="tc-result-panel" id="tcResultPanel">
    <div class="tc-allowance-hero">
      <div class="tc-ah-left">
        <div class="tc-ah-label">Tax Code</div>
        <div class="tc-ah-code" id="tcDisplayCode">1257L</div>
      </div>
      <div class="tc-ah-divider"></div>
      <div class="tc-ah-right">
        <div class="tc-ah-label">Personal Allowance</div>
        <div class="tc-ah-amount" id="tcAllowanceAmt">&#163;12,570</div>
        <div class="tc-ah-sublabel" id="tcAllowanceSub">per year, tax-free</div>
      </div>
    </div>

    <div class="tc-breakdown-card">
      <div class="tc-breakdown-header"><span>&#128161;</span> What This Code Means</div>
      <div class="tc-breakdown-body">
        <div id="tcNumberMeaning" class="tc-meaning-row" style="display:none;">
          <div class="tcm-icon">&#128290;</div>
          <div>
            <div class="tcm-title" id="tcNumberTitle">Numbers</div>
            <div class="tcm-desc" id="tcNumberDesc"></div>
          </div>
        </div>
        <div id="tcLetterMeaning" class="tc-meaning-row">
          <div class="tcm-icon">&#128290;</div>
          <div>
            <div class="tcm-title" id="tcLetterTitle">Letter</div>
            <div class="tcm-desc" id="tcLetterDesc"></div>
          </div>
        </div>
        <div id="tcPrefixMeaning" class="tc-meaning-row" style="display:none;">
          <div class="tcm-icon">&#128205;</div>
          <div>
            <div class="tcm-title">Location Prefix</div>
            <div class="tcm-desc" id="tcPrefixDesc"></div>
          </div>
        </div>
        <div id="tcEmergencyNote" class="tc-warning-row" style="display:none;">
          <div class="tcm-icon">&#9888;&#65039;</div>
          <div>
            <div class="tcm-title" style="color:#b7850a;">Emergency / Temporary Code</div>
            <div class="tcm-desc" id="tcEmergencyDesc"></div>
          </div>
        </div>
        <div class="tc-meaning-row" style="border-top:1px solid var(--border);padding-top:14px;">
          <div class="tcm-icon">&#128176;</div>
          <div>
            <div class="tcm-title">Tax You&apos;ll Pay</div>
            <div class="tcm-desc" id="tcTaxNoteText"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="tc-faq-section">
    <h2>Frequently Asked Questions: UK Tax Codes 2026/27</h2>
    
    <div class="tc-faq-item">
      <h3>1. What does the 1257L tax code mean for 2026?</h3>
      <p>The 1257L tax code is the most common code for the 2026/27 tax year. It signifies that you are entitled to the standard Personal Allowance of £12,570, which is the amount of income you can earn tax-free. If you see this code, it usually means you have one job and no taxable employer benefits.</p>
    </div>

    <div class="tc-faq-item">
      <h3>2. How do I know if my tax code is wrong?</h3>
      <p>Your tax code might be wrong if you’ve recently changed jobs, started receiving a company car, or have multiple sources of income. Common signs of an incorrect code include a sudden drop in take-home pay or being placed on an emergency tax code (like 1257L W1, M1, or X). Use our <a href="#tcInputField">tax code calculator</a> above to verify your details.</p>
    </div>

    <div class="tc-faq-item">
      <h3>3. What should I do if I am overpaying tax?</h3>
      <p>If our checker suggests you are overpaying, you must contact HMRC to update your records. You can do this through your Personal Tax Account online or by calling the HMRC helpline. Once updated, HMRC will issue a new tax code to your employer, and any overpaid tax is usually refunded through your next payslip.</p>
    </div>

    <div class="tc-faq-item">
      <h3>4. Why do I have a &apos;BR&apos; or &apos;K&apos; tax code?</h3>
      <p><strong>BR (Basic Rate):</strong> This usually happens if you have a second job or pension and your entire Personal Allowance is already used up by your main income.<br/><br/><strong>K Code:</strong> This means your untaxed income (like company benefits or state pension) is higher than your Personal Allowance. Effectively, you are being taxed on more than your total salary.</p>
    </div>

    <div class="tc-faq-item">
      <h3>5. How long does it take HMRC to change a tax code?</h3>
      <p>Once HMRC is notified of a change, it typically takes 5 to 10 working days for them to process the update and send a &quot;P6&quot; or &quot;P9&quot; notice to your employer. Your employer will then apply the new code in the next available payroll cycle.</p>
    </div>
  </div>

  <div class="tc-guide-section">
    <div class="tc-guide-header" style="margin-bottom:20px;">
      <div class="tc-guide-icon">&#128203;</div>
      <div>
        <h2>Common UK Tax Code Letters &#8212; Reference</h2>
        <p>Source: <a href="https://www.gov.uk/tax-codes/what-your-tax-code-means" target="_blank" rel="noopener">gov.uk &#8212; What your tax code means</a></p>
      </div>
    </div>
    <table class="tc-ref-table">
      <thead>
        <tr><th>Letter(s)</th><th>Meaning</th><th>Personal Allowance?</th></tr>
      </thead>
      <tbody>
        <tr><td><span class="tc-code-pill">L</span></td><td>Standard Personal Allowance (most common code)</td><td class="tc-yes">Yes &#8212; standard</td></tr>
        <tr><td><span class="tc-code-pill">M</span></td><td>Received 10% of partner&apos;s allowance via Marriage Allowance</td><td class="tc-yes">Yes &#8212; increased</td></tr>
        <tr><td><span class="tc-code-pill">N</span></td><td>Transferred 10% of your allowance to your partner</td><td class="tc-yes">Yes &#8212; reduced</td></tr>
        <tr><td><span class="tc-code-pill">T</span></td><td>Other calculations apply; HMRC reviewing your affairs</td><td class="tc-yes">Depends</td></tr>
        <tr><td><span class="tc-code-pill">0T</span></td><td>No Personal Allowance &#8212; emergency code, new job without P45</td><td class="tc-no">No</td></tr>
        <tr><td><span class="tc-code-pill">BR</span></td><td>All income taxed at 20% Basic Rate &#8212; common for second jobs</td><td class="tc-no">No</td></tr>
        <tr><td><span class="tc-code-pill">D0</span></td><td>All income taxed at 40% Higher Rate &#8212; additional jobs/pensions</td><td class="tc-no">No</td></tr>
        <tr><td><span class="tc-code-pill">D1</span></td><td>All income taxed at 45% Additional Rate</td><td class="tc-no">No</td></tr>
        <tr><td><span class="tc-code-pill">NT</span></td><td>No tax to pay on this income</td><td class="tc-no">N/A</td></tr>
        <tr><td><span class="tc-code-pill">K</span></td><td>Negative allowance &#8212; unpaid tax, taxable benefits (e.g. company car) added to your taxable income</td><td class="tc-no">Negative</td></tr>
        <tr><td><span class="tc-code-pill">S prefix</span></td><td>Scottish taxpayer &#8212; Scottish Income Tax rates apply</td><td class="tc-yes">Yes (Scottish)</td></tr>
        <tr><td><span class="tc-code-pill">C prefix</span></td><td>Welsh taxpayer &#8212; Welsh rates of Income Tax apply</td><td class="tc-yes">Yes (Welsh)</td></tr>
        <tr><td><span class="tc-code-pill">W1 / M1</span></td><td>Emergency code &#8212; tax calculated per pay period, not cumulatively</td><td class="tc-warn">Temporary</td></tr>
      </tbody>
    </table>
  </div>



  <div class="tc-section-divider"></div>

  <div class="tc-guide-section">
    <div class="tc-guide-header">

      <div>
        <h2>What To Do If Your Tax Code Is Wrong</h2>
        <p>Source: <a href="https://www.gov.uk/tax-codes/how-to-update-your-tax-code" target="_blank" rel="noopener">gov.uk/tax-codes</a></p>
      </div>
    </div>

    <div class="tc-steps">
      <div class="tc-step">
        <div class="tc-step-num">1</div>
        <div class="tc-step-body">
          <div class="tc-step-title">Check your tax code online</div>
          <div class="tc-step-desc">Sign in to the <strong>Check your Income Tax</strong> service at HMRC to see what information they hold about your income, benefits, and allowances.</div>
          <a href="https://www.gov.uk/check-income-tax-current-year" target="_blank" rel="noopener" class="tc-gov-link">&#127963;&#65039; Check your Income Tax on GOV.UK &#8594;</a>
        </div>
      </div>
      <div class="tc-step">
        <div class="tc-step-num">2</div>
        <div class="tc-step-body">
          <div class="tc-step-title">Review and update your details</div>
          <div class="tc-step-desc">Check that your <strong>employment</strong>, <strong>pension</strong>, estimated taxable income, company benefits, and expenses are all correct. Update anything wrong or missing &#8212; this is the fastest way to fix a wrong code.</div>
        </div>
      </div>
      <div class="tc-step">
        <div class="tc-step-num">3</div>
        <div class="tc-step-body">
          <div class="tc-step-title">Wait for HMRC to update your code</div>
          <div class="tc-step-desc">If your tax code needs to change, HMRC will update it and notify <strong>you and your employer</strong> within <strong>15 working days</strong>.</div>
          <div class="tc-info-chip">&#128236; Monthly paid: next/following payslip &middot; Weekly paid: appears on your 3rd payslip</div>
        </div>
      </div>
      <div class="tc-step">
        <div class="tc-step-num">4</div>
        <div class="tc-step-body">
          <div class="tc-step-title">Claim a refund if you've overpaid</div>
          <div class="tc-step-desc">If a wrong tax code caused you to overpay, you can claim a refund &#8212; or HMRC may contact you if you've underpaid.</div>
          <a href="https://www.gov.uk/tax-codes/if-youve-paid-too-much-or-too-little-tax" target="_blank" rel="noopener" class="tc-gov-link">&#127963;&#65039; Get a refund or pay what you owe &#8594;</a>
        </div>
      </div>
    </div>

    <div class="tc-tip-box">
      <span>&#128161;</span>
      <div><strong>Tip:</strong> If you've just started a new job, wait <strong>35 days</strong> before contacting HMRC &#8212; it takes time for them to receive new income details from your employer.</div>
    </div>
  </div>

  <div class="tc-guide-section">
    <div class="tc-guide-header">
      <div class="tc-guide-icon">&#128222;</div>
      <div>
        <h2>How To Contact HMRC To Change Your Code</h2>
        <p>Source: <a href="https://www.gov.uk/government/organisations/hm-revenue-customs/contact/income-tax-enquiries-for-individuals-pensioners-and-employees" target="_blank" rel="noopener">gov.uk &#8212; HMRC contact</a></p>
      </div>
    </div>

    <div class="tc-contact-grid">
      <div class="tc-contact-card tc-contact-primary">
        <div class="tc-contact-icon">&#128187;</div>
        <div class="tc-contact-title">Online &#8212; Fastest</div>
        <div class="tc-contact-desc">Use your Personal Tax Account to check and update your tax code without waiting on hold.</div>
        <a href="https://www.gov.uk/personal-tax-account" target="_blank" rel="noopener" class="tc-gov-link">&#127963;&#65039; Sign in to Personal Tax Account &#8594;</a>
        <div class="tc-contact-note">You'll need a Government Gateway ID or GOV.UK One Login to access.</div>
      </div>
      <div class="tc-contact-card">
        <div class="tc-contact-icon">&#128222;</div>
        <div class="tc-contact-title">By Phone</div>
        <div class="tc-contact-desc">Speak to HMRC's Income Tax helpline for individuals and employees.</div>
        <div class="tc-phone-num">0300 200 3300</div>
        <div class="tc-contact-note">Mon&#8211;Fri 8am&#8211;6pm. Have your National Insurance number ready. Calls may be recorded.</div>
      </div>
      <div class="tc-contact-card">
        <div class="tc-contact-icon">&#9993;&#65039;</div>
        <div class="tc-contact-title">By Post</div>
        <div class="tc-contact-desc">Write to HMRC with your National Insurance number and details of the error.</div>
        <div class="tc-address">Pay As You Earn and Self Assessment<br>HM Revenue and Customs<br><strong>BX9 1AS</strong><br>United Kingdom</div>
        <div class="tc-contact-note">Allow 15 working days for a response.</div>
      </div>
    </div>

    <div class="tc-tip-box" style="margin-top:20px;">
      <span>&#9888;&#65039;</span>
      <div><strong>Before you call:</strong> Have your <strong>National Insurance number</strong>, payslip, and tax code ready. This speeds up any query significantly.</div>
    </div>
  </div>



</div>

<!-- SEO Content Section to help the page rank -->
<div style="max-width: 900px; margin: 0 auto; padding: 20px 24px 60px;">
  <h2 style="font-size: 20px; font-weight: 700; color: var(--navy); margin-bottom: 16px;">Understanding Your UK Tax Code</h2>
  <p style="font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 16px;">
    Your tax code is used by your employer or pension provider to work out how much Income Tax to take from your pay or pension. HM Revenue and Customs (HMRC) tells them which code to use. The <strong>UK Tax Code Checker</strong> tool helps you decode your tax code instantly so you know exactly what your Personal Allowance is and if you are on an emergency tax code.
  </p>
  <p style="font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 24px;">
    The most common tax code for the 2026/27 tax year is <strong>1257L</strong>. This means you have the standard tax-free Personal Allowance of £12,570.
  </p>
  
  <h2 style="font-size: 20px; font-weight: 700; color: var(--navy); margin-bottom: 16px;">What if my tax code is wrong?</h2>
  <p style="font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 16px;">
    If you think your tax code is wrong (for example, you are lacking a tax-free allowance or are on a W1/M1 emergency code unexpectedly), you could be paying too much or too little tax. You should contact HMRC directly or use your personal tax account online to update your employment details.
  </p>
  <p style="font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 24px;">
    To see how your tax code affects your monthly pay packet, enter your salary and tax code into our <a href="/" style="color: var(--teal); font-weight: 600; text-decoration: none;">Full UK Tax Calculator</a>.
  </p>
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
          <li><a href="/">Full Calculator</a></li>
          <li><a href="/quick-calc">Quick Calculator</a></li>
          <li><a href="/tax-code">Tax Code Checker</a></li>
          <li><a href="/salary-comparison">Salary Comparison</a></li>
        </ul>
      </div>
      <div></div>
    </div>
    <div class="footer-bottom">
      <span>&#169; 2026 NetPayHome. For informational purposes only &#8212; not financial advice. Data sourced from <a href="https://www.gov.uk/tax-codes" target="_blank" rel="noopener" style="color:rgba(255,255,255,0.4);text-decoration:none;">GOV.UK</a>.</span>
      <span class="footer-badge">2026 / 27 Tax Year</span>
    </div>
  </div>
</footer>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does the 1257L tax code mean for 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 1257L tax code is the most common code for the 2026/27 tax year. It signifies that you are entitled to the standard Personal Allowance of £12,570, which is the amount of income you can earn tax-free. If you see this code, it usually means you have one job and no taxable employer benefits."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know if my tax code is wrong?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your tax code might be wrong if you’ve recently changed jobs, started receiving a company car, or have multiple sources of income. Common signs of an incorrect code include a sudden drop in take-home pay or being placed on an emergency tax code (like 1257L W1, M1, or X). Use our tax code calculator above to verify your details."
      }
    },
    {
      "@type": "Question",
      "name": "What should I do if I am overpaying tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If our checker suggests you are overpaying, you must contact HMRC to update your records. You can do this through your Personal Tax Account online or by calling the HMRC helpline. Once updated, HMRC will issue a new tax code to your employer, and any overpaid tax is usually refunded through your next payslip."
      }
    },
    {
      "@type": "Question",
      "name": "Why do I have a 'BR' or 'K' tax code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BR (Basic Rate): This usually happens if you have a second job or pension and your entire Personal Allowance is already used up by your main income. K Code: This means your untaxed income (like company benefits or state pension) is higher than your Personal Allowance. Effectively, you are being taxed on more than your total salary."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take HMRC to change a tax code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once HMRC is notified of a change, it typically takes 5 to 10 working days for them to process the update and send a \"P6\" or \"P9\" notice to your employer. Your employer will then apply the new code in the next available payroll cycle."
      }
    }
  ]
}
</script>

`}} />
  );
}
