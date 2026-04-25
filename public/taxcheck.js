// ===================== TAX CODE REALITY CHECK =====================
(function () {
  var btn = document.getElementById('tcAnalyseBtn');
  if (!btn) return;

  var STANDARD = 12570;

  document.getElementById('tcCode').addEventListener('input', function () {
    this.value = this.value.toUpperCase();
  });

  btn.addEventListener('click', function () {
    var pay    = parseFloat(document.getElementById('tcMonthlyPay').value) || 0;
    var code   = (document.getElementById('tcCode').value || '').trim().toUpperCase();
    var loc    = document.getElementById('tcLocation').value;
    var only   = document.getElementById('chkOnlyJob').checked;
    var perks  = document.getElementById('chkPerks').checked;
    var months = document.getElementById('chkThreeMonths').checked;

    if (!pay || !code) {
      alert('Please enter your monthly gross pay and tax code before analysing.');
      return;
    }

    var flags = [];
    var overallColor = 'green';
    var overallIcon  = '&#9989;';
    var overallTitle = 'Your Code Looks Correct';
    var overallSub   = 'No obvious issues detected based on your answers.';

    // Rule C — Emergency basis
    var isEmergency = /W1|M1/.test(code) || code.endsWith('X');
    if (isEmergency) {
      flags.push({ type: 'warn', icon: '&#9888;&#65039;', title: 'Rule C: Emergency Tax Basis Detected', desc: 'Your code contains W1, M1 or X — tax is calculated non-cumulatively (week/month by week). You may be missing earlier unused allowance. Ask HMRC to switch to a cumulative code.' });
      if (months) {
        flags.push({ type: 'bad', icon: '&#128680;', title: 'Emergency Code After 3+ Months', desc: 'You have been with this employer over 3 months. An emergency code should have been resolved by now. Contact HMRC or your payroll team immediately.' });
        overallColor = 'red'; overallIcon = '&#128308;'; overallTitle = 'Emergency Code — Overdue Fix'; overallSub = 'Your emergency code has persisted too long and is likely costing you money.';
      } else {
        overallColor = 'amber'; overallIcon = '&#9888;&#65039;'; overallTitle = 'Emergency Tax Basis — Act Soon'; overallSub = 'Your code runs on a non-cumulative basis. Your full annual allowance may not be applied correctly.';
      }
    }

    // Rule D — Scottish prefix
    var codeForPrefix = code.replace(/W1|M1|X/g, '').trim();
    if (loc === 'scotland' && !codeForPrefix.startsWith('S')) {
      flags.push({ type: 'bad', icon: '&#127988;', title: 'Rule D: Missing Scottish Prefix', desc: 'You are in Scotland but your code does not start with S (e.g. S1257L). You are being taxed at England/Wales rates instead of Scottish rates. Contact HMRC to add the S prefix.' });
      overallColor = 'red'; overallIcon = '&#128308;'; overallTitle = 'Wrong Tax Region Applied'; overallSub = 'Your code does not match your Scottish residence.';
    }
    if (loc !== 'scotland' && codeForPrefix.startsWith('S')) {
      flags.push({ type: 'bad', icon: '&#128308;', title: 'Scottish Code on Non-Scottish Employment', desc: 'Your code starts with S but you selected England/Wales/NI. You may be paying Scottish tax rates incorrectly.' });
      overallColor = 'red'; overallIcon = '&#128308;'; overallTitle = 'Region Mismatch on Tax Code'; overallSub = 'Your S-prefixed code does not match your stated location.';
    }

    // Clean base code for numeric analysis
    var cleanCode = code.replace(/^[SD]/, '').replace(/W1|M1|X/g, '').trim();
    var isStandard = cleanCode === '1257L';

    // Rule A — Overpayment
    if (only && !perks && !isStandard && !isEmergency) {
      flags.push({ type: 'bad', icon: '&#128308;', title: 'Rule A: Likely Overpaying Tax', desc: 'This is your only job with no company benefits, but your code is not 1257L. You may be missing part of your £12,570 Personal Allowance every month.' });
      if (overallColor !== 'red') { overallColor = 'red'; overallIcon = '&#128308;'; overallTitle = 'You Are Likely Overpaying Tax'; overallSub = 'Your code does not match the expected standard for your situation.'; }
    }

    // Rule B — Underpayment
    if (perks && isStandard) {
      flags.push({ type: 'warn', icon: '&#128993;', title: 'Rule B: Possible Underpayment', desc: 'You have taxable company benefits but are on code 1257L. HMRC should have reduced your allowance to account for the benefit value. You may owe tax at year end.' });
      if (overallColor === 'green') { overallColor = 'amber'; overallIcon = '&#128993;'; overallTitle = 'Possible Underpayment — Check Benefits'; overallSub = 'You may owe tax at year end if your benefits-in-kind are not reflected in your code.'; }
    }

    // Green confirmation
    if (only && !perks && isStandard && !isEmergency) {
      flags.push({ type: 'ok', icon: '&#9989;', title: 'Standard Code Correct for Your Situation', desc: '1257L is the right code for a single job with no company benefits. Your £12,570 Personal Allowance is being applied correctly.' });
    }
    if (months && !isEmergency) {
      flags.push({ type: 'ok', icon: '&#9989;', title: 'Employer Tenure — No Emergency Code Issue', desc: 'You have been with this employer over 3 months and are not on an emergency code. No forced correction needed.' });
    }

    // Info row
    flags.push({ type: 'info', icon: '&#128203;', title: 'Your Code: ' + code + ' | Annual Pay: \u00a3' + (pay * 12).toLocaleString('en-GB', { maximumFractionDigits: 0 }), desc: 'Monthly gross: \u00a3' + pay.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' | Location: ' + (loc === 'scotland' ? 'Scotland' : 'England/Wales/NI') });

    // Leakage calculation
    var leakage = 0;
    var showLeakage = false;
    if (cleanCode === 'BR' || cleanCode === '0T' || cleanCode === 'D0') {
      leakage = (STANDARD / 12) * 0.20;
      showLeakage = true;
    } else if (overallColor === 'red' && !isStandard && only && !perks) {
      var codeNum = parseInt(cleanCode.replace(/[A-Z]/g, ''), 10);
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
    flags.forEach(function (f) {
      fg.innerHTML += '<div class="flag-item ' + f.type + '"><span class="flag-icon">' + f.icon + '</span><div><div class="flag-title">' + f.title + '</div><div class="flag-desc">' + f.desc + '</div></div></div>';
    });

    // Leakage
    var ls = document.getElementById('leakageSection');
    if (showLeakage && leakage > 0) {
      ls.style.display = 'block';
      document.getElementById('leakageAmount').textContent = '\u00a3' + leakage.toFixed(2);
      document.getElementById('leakageAnnual').textContent = '\u2248 \u00a3' + (leakage * 12).toFixed(0) + ' lost per year if not corrected';
    } else {
      ls.style.display = 'none';
    }

    // HMRC script
    var annualPay = (pay * 12).toLocaleString('en-GB', { maximumFractionDigits: 0 });
    var script = 'Hello, I am calling/writing to query my tax code for the 2026/27 tax year.\n\n';
    script += 'My details:\n';
    script += '  - Current Tax Code: ' + code + '\n';
    script += '  - Annual Gross Salary: \u00a3' + annualPay + '\n';
    script += '  - Monthly Gross Pay: \u00a3' + pay.toLocaleString('en-GB', { minimumFractionDigits: 2 }) + '\n';
    script += '  - Location: ' + (loc === 'scotland' ? 'Scotland' : 'England/Wales/NI') + '\n';
    script += '  - Only job: ' + (only ? 'Yes' : 'No') + '\n';
    script += '  - Company benefits: ' + (perks ? 'Yes' : 'No') + '\n\n';

    if (overallColor === 'red' && only && !perks) {
      var expectedCode = (loc === 'scotland' ? 'S' : '') + '1257L';
      script += 'I believe my code should be ' + expectedCode + ' as this is my only employment and I have no taxable benefits-in-kind. My current code of ' + code + ' appears to be incorrect.\n\nI would like you to:\n  1. Confirm the reason for my current code.\n  2. Issue an updated code of ' + expectedCode + ' if no adjustments apply.\n  3. Confirm whether I am owed any repayment for the current tax year.\n';
    } else if (isEmergency) {
      script += 'My code contains an emergency basis indicator (W1/M1/X). I have been with my employer for ' + (months ? 'more than 3 months' : 'less than 3 months') + ' and I need this converted to a cumulative code.\n\nPlease update my code to a cumulative basis and confirm if I am owed any repayment for the current year.\n';
    } else if (perks && isStandard) {
      script += 'I am on code 1257L but receive company benefits-in-kind. I want to confirm whether these benefits have been included in my code and whether I may owe tax at year end. Please review and confirm whether my code needs adjustment.\n';
    } else if (loc === 'scotland' && !codeForPrefix.startsWith('S')) {
      script += 'I am a Scottish taxpayer but my code does not start with S. Please update my record to apply correct Scottish tax rates and reissue my code with the S prefix.\n';
    } else {
      script += 'I would like to confirm my code is correct for my circumstances and that the right Personal Allowance of \u00a312,570 is being applied for 2026/27.\n';
    }
    script += '\nThank you.';

    document.getElementById('hmrcScript').textContent = script;
    document.getElementById('tcResults').style.display = 'block';
    document.getElementById('tcResults').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('copyScriptBtn').addEventListener('click', function () {
    var text = document.getElementById('hmrcScript').textContent;
    navigator.clipboard.writeText(text).then(function () {
      var b = document.getElementById('copyScriptBtn');
      b.textContent = '\u2713 Copied!';
      setTimeout(function () { b.textContent = '\uD83D\uDCCB Copy Script'; }, 2000);
    });
  });
})();
