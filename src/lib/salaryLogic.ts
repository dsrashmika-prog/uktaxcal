export interface SalaryInput {
  grossSalary: number;
  taxCode: string;
  studentLoanPlan1: boolean;
  studentLoanPlan2: boolean;
  studentLoanPlan4: boolean;
  studentLoanPlan5: boolean;
  postgraduateLoan: boolean;
  pensionContributionPercent: number; // default 5
  location: 'Rest of UK' | 'Scotland';
}

export interface SalaryBreakdown {
  gross: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: {
    basic: number; // For Rest of UK, this is the main basic rate.
    higher: number;
    additional: number;
    // Scotland specific properties
    scotlandStarter?: number;
    scotlandBasic?: number;
    scotlandIntermediate?: number;
    scotlandHigher?: number;
    scotlandAdvanced?: number;
    scotlandTop?: number;
    total: number;
  };
  employeeNI: number;
  employerNI: number;
  studentLoan: number;
  pension: number;
  takeHome: number;
  totalCostToEmployer: number;
  takeHomeFrequencies: {
    yearly: number;
    monthly: number;
    fourWeekly: number;
    twoWeekly: number;
    weekly: number;
    daily: number; // Based on 260 working days/year
  };
}

export function calculateSalaryBreakdown(input: SalaryInput): SalaryBreakdown {
  const {
    grossSalary,
    taxCode = '1257L',
    studentLoanPlan1,
    studentLoanPlan2,
    studentLoanPlan4,
    studentLoanPlan5,
    postgraduateLoan,
    pensionContributionPercent,
    location,
  } = input;

  // --- Tax Code Parsing ---
  let parsedLocation = location;
  let code = taxCode.toUpperCase().replace(/\s/g, '');

  if (code.startsWith('S')) {
    parsedLocation = 'Scotland';
    code = code.substring(1);
  } else if (code.startsWith('C')) {
    parsedLocation = 'Rest of UK'; // Wales uses same bands as England/NI
    code = code.substring(1);
  }

  let isKCode = false;
  let isLType = false;
  let isFlatRate = false;
  let flatRateType = '';
  let allowanceFromCode = 12570;

  const flatRates = ['BR', 'D0', 'D1', '0T', 'NT', 'SD1', 'SD2', 'SD3'];
  if (flatRates.includes(code)) {
    isFlatRate = true;
    flatRateType = code;
    allowanceFromCode = 0;
  } else if (code.startsWith('K')) {
    isKCode = true;
    const digits = parseInt(code.substring(1), 10);
    allowanceFromCode = isNaN(digits) ? 0 : digits * 10;
  } else {
    isLType = true;
    const match = code.match(/\d+/);
    if (match) {
      allowanceFromCode = parseInt(match[0], 10) * 10;
    } else {
      allowanceFromCode = 12570;
    }
  }

  // 1. Pension Calculation (Qualifying Earnings: £6,240 – £50,270)
  const pensionLowerBound = 6240;
  const pensionUpperBound = 50270;
  let pensionableEarnings = 0;
  if (grossSalary > pensionLowerBound) {
    pensionableEarnings = Math.min(grossSalary, pensionUpperBound) - pensionLowerBound;
  }
  const pension = pensionableEarnings * (pensionContributionPercent / 100);

  // Auto-enrolment pension is usually deducted before tax calculation (Net Pay Arrangement)
  let salaryForTax = grossSalary - pension;

  // Apply K Code negative allowance logic
  if (isKCode) {
    salaryForTax += allowanceFromCode;
  }

  // 2. Personal Allowance & Tax Trap
  let personalAllowance = (isFlatRate || isKCode) ? 0 : allowanceFromCode;
  if (isLType && salaryForTax > 100000) {
    const excess = salaryForTax - 100000;
    const reduction = Math.floor(excess / 2);
    personalAllowance = Math.max(0, personalAllowance - reduction);
  }

  // 3. Taxable Income
  const taxableIncome = Math.max(0, salaryForTax - personalAllowance);

  // 4. Income Tax
  let totalIncomeTax = 0;

  let basicTax = 0;
  let higherTax = 0;
  let additionalTax = 0;

  let scotlandStarter = 0;
  let scotlandBasic = 0;
  let scotlandIntermediate = 0;
  let scotlandHigher = 0;
  let scotlandAdvanced = 0;
  let scotlandTop = 0;

  if (isFlatRate && flatRateType !== '0T') {
    if (flatRateType === 'NT') {
      totalIncomeTax = 0;
    } else if (flatRateType === 'BR') {
      totalIncomeTax = taxableIncome * 0.20;
      if (parsedLocation === 'Rest of UK') basicTax = totalIncomeTax;
      else scotlandBasic = totalIncomeTax;
    } else if (flatRateType === 'D0') {
      totalIncomeTax = taxableIncome * 0.40;
      if (parsedLocation === 'Rest of UK') higherTax = totalIncomeTax;
      else scotlandHigher = totalIncomeTax; // D0 in Scotland applies 40% (if applicable) or we bucket it to higher
    } else if (flatRateType === 'D1') {
      totalIncomeTax = taxableIncome * 0.45;
      if (parsedLocation === 'Rest of UK') additionalTax = totalIncomeTax;
      else scotlandAdvanced = totalIncomeTax;
    } else if (flatRateType === 'SD1') {
      totalIncomeTax = taxableIncome * 0.45;
      scotlandAdvanced = totalIncomeTax;
    } else if (flatRateType === 'SD2' || flatRateType === 'SD3') {
      totalIncomeTax = taxableIncome * 0.48;
      scotlandTop = totalIncomeTax;
    }
  } else {
    // Standard calculation for Rest of UK & Scotland, including 0T (which sets PA=0)
    if (parsedLocation === 'Rest of UK') {
      const basicLimit = personalAllowance + 37700;
      const higherLimit = 125140;

      if (salaryForTax > personalAllowance) {
        basicTax = Math.min(salaryForTax - personalAllowance, basicLimit - personalAllowance) * 0.20;
      }
      if (salaryForTax > basicLimit) {
        higherTax = Math.min(salaryForTax - basicLimit, higherLimit - basicLimit) * 0.40;
      }
      if (salaryForTax > higherLimit) {
        additionalTax = (salaryForTax - higherLimit) * 0.45;
      }
      totalIncomeTax = basicTax + higherTax + additionalTax;
    } else if (parsedLocation === 'Scotland') {
      const starterWidth = 3967;
      const basicWidth = 12989;
      const intermediateWidth = 14136;
      const higherWidth = 31338;

      const starterLimit = personalAllowance + starterWidth;
      const basicLimit = starterLimit + basicWidth;
      const intermediateLimit = basicLimit + intermediateWidth;
      const higherLimit = intermediateLimit + higherWidth;
      const advancedLimit = 125140; // Fixed absolute limit for Top rate (48%)

      if (salaryForTax > personalAllowance) {
        scotlandStarter = Math.min(salaryForTax - personalAllowance, starterLimit - personalAllowance) * 0.19;
      }
      if (salaryForTax > starterLimit) {
        scotlandBasic = Math.min(salaryForTax - starterLimit, basicLimit - starterLimit) * 0.20;
      }
      if (salaryForTax > basicLimit) {
        scotlandIntermediate = Math.min(salaryForTax - basicLimit, intermediateLimit - basicLimit) * 0.21;
      }
      if (salaryForTax > intermediateLimit) {
        scotlandHigher = Math.min(salaryForTax - intermediateLimit, higherLimit - intermediateLimit) * 0.42;
      }
      if (salaryForTax > higherLimit) {
        scotlandAdvanced = Math.min(salaryForTax - higherLimit, advancedLimit - higherLimit) * 0.45;
      }
      if (salaryForTax > advancedLimit) {
        scotlandTop = (salaryForTax - advancedLimit) * 0.48;
      }

      totalIncomeTax = scotlandStarter + scotlandBasic + scotlandIntermediate + scotlandHigher + scotlandAdvanced + scotlandTop;
    }
  }

  // Ensure tax doesn't exceed 50% of gross salary for K codes and Flat Rates
  const maxTax = grossSalary * 0.50;
  if (totalIncomeTax > maxTax) {
    totalIncomeTax = maxTax;
  }

  // 5. Employee NI (On Gross)
  let employeeNI = 0;
  if (grossSalary > 12570) {
    const mainRateEarnings = Math.min(grossSalary, 50270) - 12570;
    employeeNI += mainRateEarnings * 0.08;
  }
  if (grossSalary > 50270) {
    employeeNI += (grossSalary - 50270) * 0.02;
  }

  // 6. Employer NI (On Gross)
  let employerNI = 0;
  if (grossSalary > 5000) {
    employerNI = (grossSalary - 5000) * 0.15;
  }

  // 7. Student Loans (On Gross)
  let studentLoan = 0;
  if (studentLoanPlan1 && grossSalary > 26900) {
    studentLoan += (grossSalary - 26900) * 0.09;
  }
  if (studentLoanPlan2 && grossSalary > 29385) {
    studentLoan += (grossSalary - 29385) * 0.09;
  }
  if (studentLoanPlan4 && grossSalary > 33795) {
    studentLoan += (grossSalary - 33795) * 0.09;
  }
  if (studentLoanPlan5 && grossSalary > 25000) {
    studentLoan += (grossSalary - 25000) * 0.09;
  }
  if (postgraduateLoan && grossSalary > 21000) {
    studentLoan += (grossSalary - 21000) * 0.06;
  }

  // 8. Take Home Pay
  const totalDeductions = totalIncomeTax + employeeNI + studentLoan + pension;
  const takeHome = grossSalary - totalDeductions;

  const totalCostToEmployer = grossSalary + employerNI;

  const takeHomeFrequencies = {
    yearly: takeHome,
    monthly: takeHome / 12,
    fourWeekly: takeHome / 13,
    twoWeekly: takeHome / 26,
    weekly: takeHome / 52,
    daily: takeHome / 260,
  };

  return {
    gross: grossSalary,
    personalAllowance,
    taxableIncome,
    incomeTax: {
      basic: basicTax,
      higher: higherTax,
      additional: additionalTax,
      scotlandStarter,
      scotlandBasic,
      scotlandIntermediate,
      scotlandHigher,
      scotlandAdvanced,
      scotlandTop,
      total: totalIncomeTax,
    },
    employeeNI,
    employerNI,
    studentLoan,
    pension,
    takeHome,
    totalCostToEmployer,
    takeHomeFrequencies,
  };
}
