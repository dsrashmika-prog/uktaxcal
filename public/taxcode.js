
// ===================== TAX CODE DECODER =====================
// Only runs on pages that have the #tcDecodeBtn element

if (document.getElementById('tcDecodeBtn')) {

  function parseTaxCode(raw) {
    var code = raw.trim().toUpperCase().replace(/\s/g, '');
    if (!code) return null;

    var prefix = '';
    var emergency = '';
    var workingCode = code;

    // Detect S / C prefix (Scottish / Welsh)
    if (/^[SC]/.test(workingCode) && workingCode.length > 1) {
      prefix = workingCode[0];
      workingCode = workingCode.slice(1);
    }

    // Detect W1 / M1 / X suffix (emergency non-cumulative)
    if (/W1$/.test(workingCode)) { emergency = 'W1'; workingCode = workingCode.replace(/W1$/, ''); }
    else if (/M1$/.test(workingCode)) { emergency = 'M1'; workingCode = workingCode.replace(/M1$/, ''); }
    else if (/X$/.test(workingCode)) { emergency = 'X'; workingCode = workingCode.replace(/X$/, ''); }

    // Fixed codes (no number)
    var fixed = { 'BR': true, 'D0': true, 'D1': true, 'NT': true, '0T': true };
    if (fixed[workingCode]) {
      return { code: code, prefix: prefix, letter: workingCode, number: null, emergency: emergency, isK: false, isFixed: true };
    }

    // K codes
    if (/^K\d+$/.test(workingCode)) {
      var num = parseInt(workingCode.slice(1));
      return { code: code, prefix: prefix, letter: 'K', number: num, emergency: emergency, isK: true, isFixed: false };
    }

    // Standard number + letter
    var match = workingCode.match(/^(\d+)([A-Z]+)$/);
    if (match) {
      var numPart = parseInt(match[1]);
      var letterPart = match[2];
      return { code: code, prefix: prefix, letter: letterPart, number: numPart, emergency: emergency, isK: false, isFixed: false };
    }

    return null;
  }

  function getPersonalAllowance(parsed) {
    if (!parsed) return null;
    if (parsed.isFixed) return 0;
    if (parsed.isK) return -(parsed.number * 10);
    if (parsed.number != null) return parsed.number * 10;
    return 0;
  }

  function fmtTC(n) {
    return '\u00a3' + Math.abs(n).toLocaleString('en-GB');
  }

  var LETTER_INFO = {
    L: {
      title: 'Standard Personal Allowance (L)',
      desc: 'You are entitled to the standard Personal Allowance for the year. This is the most common tax code in the UK.'
    },
    M: {
      title: 'Marriage Allowance Recipient (M)',
      desc: 'You have received 10% of your spouse or civil partner\'s Personal Allowance via Marriage Allowance. Your allowance is slightly higher than standard.'
    },
    N: {
      title: 'Marriage Allowance Transferred (N)',
      desc: 'You have transferred 10% of your Personal Allowance to your spouse or civil partner. Your allowance is slightly lower than standard.'
    },
    T: {
      title: 'Other Calculations Apply (T)',
      desc: 'Your tax code involves other calculations \u2014 for example, if you have asked HMRC not to include any untaxed income or company benefits. Contact HMRC to find out the exact reason.'
    },
    '0T': {
      title: 'No Personal Allowance (0T)',
      desc: 'You have no Personal Allowance \u2014 all income from this source is taxed. This often happens on emergency tax, after starting a new job without a P45, or if your allowance has been fully used up elsewhere.'
    },
    BR: {
      title: 'Basic Rate Tax (BR \u2014 20%)',
      desc: 'All income from this source is taxed at 20% (the Basic Rate). There is no Personal Allowance applied to this income. This is typical for a second job, a second pension, or while HMRC works out your correct code.'
    },
    D0: {
      title: 'Higher Rate Tax (D0 \u2014 40%)',
      desc: 'All income from this source is taxed at 40% (the Higher Rate). Usually used for a second job or pension where you are already using your Basic Rate band elsewhere.'
    },
    D1: {
      title: 'Additional Rate Tax (D1 \u2014 45%)',
      desc: 'All income from this source is taxed at 45% (the Additional Rate). Applies to very high earners with multiple income sources.'
    },
    NT: {
      title: 'No Tax (NT)',
      desc: 'No tax at all should be deducted from this income. This is rare and typically applies to specific situations such as working and paying tax overseas.'
    },
    K: {
      title: 'Negative Allowance (K code)',
      desc: 'A K code means you have income that needs extra tax collecting \u2014 for example unpaid tax from a previous year, taxable benefits such as a company car, or State Pension that exceeds your Personal Allowance. The K number is added to your income (not deducted), increasing your taxable amount. Note: your employer cannot deduct more than 50% of your pay in any one period to cover this.'
    }
  };

  function decodeCode() {
    var raw = document.getElementById('tcInput').value;
    var parsed = parseTaxCode(raw);
    var panel = document.getElementById('tcResultPanel');
    var inputField = document.getElementById('tcInputField');

    if (!parsed) {
      inputField.style.borderColor = 'var(--red)';
      document.getElementById('tcInput').style.borderColor = 'var(--red)';
      setTimeout(function() {
        inputField.style.borderColor = '';
        document.getElementById('tcInput').style.borderColor = '';
      }, 2000);
      return;
    }
    inputField.style.borderColor = '';

    var pa = getPersonalAllowance(parsed);

    // Allowance hero
    document.getElementById('tcDisplayCode').textContent = parsed.code;

    if (parsed.letter === 'NT') {
      document.getElementById('tcAllowanceAmt').textContent = 'No Tax';
      document.getElementById('tcAllowanceSub').textContent = 'No income tax deducted from this source';
    } else if (parsed.isK) {
      document.getElementById('tcAllowanceAmt').textContent = '+' + fmtTC(pa);
      document.getElementById('tcAllowanceSub').textContent = 'added to your taxable income (negative allowance)';
    } else if (pa === 0) {
      document.getElementById('tcAllowanceAmt').textContent = '\u00a30';
      document.getElementById('tcAllowanceSub').textContent = 'no tax-free amount — all income taxed';
    } else {
      document.getElementById('tcAllowanceAmt').textContent = fmtTC(pa);
      document.getElementById('tcAllowanceSub').textContent = 'per year, tax-free on this income source';
    }

    // Number row
    var numRow = document.getElementById('tcNumberMeaning');
    if (parsed.number != null && !parsed.isFixed && !parsed.isK) {
      numRow.style.display = 'flex';
      document.getElementById('tcNumberTitle').textContent = 'Number: ' + parsed.number;
      document.getElementById('tcNumberDesc').textContent =
        parsed.number + ' \u00d7 10 = ' + fmtTC(pa) + ' Personal Allowance. You can earn ' + fmtTC(pa) + ' tax-free from this employer or pension this tax year.';
    } else if (parsed.isK) {
      numRow.style.display = 'flex';
      document.getElementById('tcNumberTitle').textContent = 'K Number: ' + parsed.number;
      document.getElementById('tcNumberDesc').textContent =
        'K' + parsed.number + ' means \u00a3' + (parsed.number * 10).toLocaleString('en-GB') + ' is added to your taxable income each year to collect outstanding tax.';
    } else {
      numRow.style.display = 'none';
    }

    // Letter row
    var letterKey = parsed.isK ? 'K' : parsed.letter;
    var letterInfo = LETTER_INFO[letterKey] || {
      title: 'Letter: ' + parsed.letter,
      desc: 'This is a less common tax code letter. Contact HMRC for specific details about what it means for your situation.'
    };
    document.getElementById('tcLetterTitle').textContent = letterInfo.title;
    document.getElementById('tcLetterDesc').textContent = letterInfo.desc;

    // Prefix row
    var prefixRow = document.getElementById('tcPrefixMeaning');
    if (parsed.prefix === 'S') {
      prefixRow.style.display = 'flex';
      document.getElementById('tcPrefixDesc').textContent = 'The S prefix means you are a Scottish taxpayer. Scottish Income Tax rates set by the Scottish Government apply to your non-savings, non-dividend income.';
    } else if (parsed.prefix === 'C') {
      prefixRow.style.display = 'flex';
      document.getElementById('tcPrefixDesc').textContent = 'The C prefix means you are a Welsh taxpayer (Cymru). Welsh rates of Income Tax apply to your non-savings, non-dividend income.';
    } else {
      prefixRow.style.display = 'none';
    }

    // Emergency row
    var emergRow = document.getElementById('tcEmergencyNote');
    if (parsed.emergency) {
      emergRow.style.display = 'flex';
      var label = parsed.emergency === 'W1' ? 'Week 1 basis' : parsed.emergency === 'M1' ? 'Month 1 basis' : 'Non-cumulative';
      document.getElementById('tcEmergencyDesc').textContent =
        label + ' \u2014 this is an emergency tax code. Tax is calculated on each pay period individually, not your full year-to-date earnings. This often leads to overpaying tax temporarily. Contact HMRC or update your details online to get the correct cumulative code.';
    } else {
      emergRow.style.display = 'none';
    }

    // Tax note
    var taxNote = '';
    if (parsed.letter === 'BR') {
      taxNote = 'All income from this source is taxed at 20% (Basic Rate). No Personal Allowance applies here. Ensure your employer only uses this code for a second or supplementary income.';
    } else if (parsed.letter === 'D0') {
      taxNote = 'All income taxed at 40% (Higher Rate). This should only be applied to a second job or pension where you already use the Basic Rate band elsewhere.';
    } else if (parsed.letter === 'D1') {
      taxNote = 'All income taxed at 45% (Additional Rate).';
    } else if (parsed.letter === 'NT') {
      taxNote = 'No Income Tax is deducted from this income at all. This is unusual — confirm this is correct with HMRC if unexpected.';
    } else if (parsed.letter === '0T') {
      taxNote = 'Tax is collected on all earnings with no tax-free amount. This is usually temporary \u2014 update your details on HMRC to restore your allowance.';
    } else if (parsed.isK) {
      taxNote = 'Tax is collected on your normal salary plus the extra \u00a3' + (parsed.number * 10).toLocaleString('en-GB') + ' K-code amount each year. Your take-home will be lower than expected until the debt is cleared.';
    } else if (pa > 12570) {
      taxNote = 'You have more than the standard Personal Allowance of \u00a312,570 \u2014 possibly due to Marriage Allowance or unused allowances from a previous year. Income above your allowance is taxed at the usual rates (20%, 40%, or 45%).';
    } else if (pa > 0 && pa < 12570) {
      taxNote = 'Your Personal Allowance is lower than the standard \u00a312,570, meaning slightly more of your income is taxable. Income above your allowance is taxed at the usual rates.';
    } else {
      taxNote = 'Income above your ' + fmtTC(pa) + ' allowance is taxed at the standard rates: 20% (Basic Rate), 40% (Higher Rate), or 45% (Additional Rate) depending on your total earnings.';
    }

    document.getElementById('tcTaxNoteText').textContent = taxNote;

    // Show panel with animation
    panel.classList.add('visible');
    setTimeout(function() {
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  }

  // Decode button
  document.getElementById('tcDecodeBtn').addEventListener('click', decodeCode);

  // Enter key
  document.getElementById('tcInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') decodeCode();
  });

  // Input auto-uppercase
  document.getElementById('tcInput').addEventListener('input', function() {
    var pos = this.selectionStart;
    this.value = this.value.toUpperCase();
    this.setSelectionRange(pos, pos);
  });

  // Hint pills
  document.querySelectorAll('.tc-hint-pill').forEach(function(pill) {
    pill.addEventListener('click', function() {
      document.getElementById('tcInput').value = pill.dataset.code;
      decodeCode();
    });
  });

} // end if #tcDecodeBtn
