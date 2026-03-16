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
    <a class="tool-nav-link active" href="/tax-code">&#128221; Tax Code Checker</a>
    <div class="tool-nav-divider"></div>
    <a class="tool-nav-link" href="/salary-comparison">&#9878; Salary Comparison</a>
  </div>
</nav>

<div class="tc-page">

  <div class="page-title" style="margin-bottom:36px;">
    <h1>UK Tax Code Checker</h1>
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
            <div class="tcm-title">Tax You'll Pay</div>
            <div class="tcm-desc" id="tcTaxNoteText"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="tc-section-divider"></div>

  <div class="tc-guide-section">
    <div class="tc-guide-header">
      <div class="tc-guide-icon">&#10060;</div>
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
        <tr><td><span class="tc-code-pill">M</span></td><td>Received 10% of partner's allowance via Marriage Allowance</td><td class="tc-yes">Yes &#8212; increased</td></tr>
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
        <p>Free, accurate UK salary and take-home pay calculator. Updated for 2025/26.</p>
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
      <span>&#169; 2025 NetPayHome. For informational purposes only &#8212; not financial advice. Data sourced from <a href="https://www.gov.uk/tax-codes" target="_blank" rel="noopener" style="color:rgba(255,255,255,0.4);text-decoration:none;">GOV.UK</a>.</span>
      <span class="footer-badge">2025 / 26 Tax Year</span>
    </div>
  </div>
</footer>

`}} />
  );
}
