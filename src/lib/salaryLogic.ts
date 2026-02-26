export interface SalaryInput {

  grossSalary: number;
  payFrequency?: 'Yearly' | 'Monthly' | '4-Weekly' | '2-Weekly' | 'Weekly' | 'Daily' | '';
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
  locationUsed: 'Rest of UK' | 'Scotland';
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
    payFrequency = 'Yearly',
    taxCode = '1257L',
    studentLoanPlan1,
    studentLoanPlan2,
    studentLoanPlan4,
    studentLoanPlan5,
    postgraduateLoan,
    pensionContributionPercent,
    location,
  } = input;


  const multiplier = payFrequency === 'Monthly' ? 12 : payFrequency === '4-Weekly' ? 13 : payFrequency === '2-Weekly' ? 26 : payFrequency === 'Weekly' ? 52 : payFrequency === 'Daily' ? 260 : 1;
  const periodGross = grossSalary;
  const annualGross = grossSalary * multiplier;

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
  const pensionLowerBoundPeriod = 6240 / multiplier;
  const pensionUpperBoundPeriod = 50270 / multiplier;
  let periodPensionableEarnings = 0;
  if (periodGross > pensionLowerBoundPeriod) {
    periodPensionableEarnings = Math.min(periodGross, pensionUpperBoundPeriod) - pensionLowerBoundPeriod;
  }
  const periodPension = periodPensionableEarnings * (pensionContributionPercent / 100);
  const pension = periodPension * multiplier;

  // Auto-enrolment pension is usually deducted before tax calculation (Net Pay Arrangement)
  let salaryForTax = annualGross - pension;

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
      const starterWidth = 2827;
      const basicWidth = 12094;
      const intermediateWidth = 16171;
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
  const maxTax = annualGross * 0.50;
  if (totalIncomeTax > maxTax) {
    totalIncomeTax = maxTax;
  }

  // 5. Employee NI (Class 1) - Calculated per period
  let periodNI = 0;
  const niPT = payFrequency === 'Monthly' ? 1048 : payFrequency === 'Weekly' ? 242 : payFrequency === '4-Weekly' ? 968 : payFrequency === '2-Weekly' ? 484 : 12570 / multiplier;
  const niUEL = payFrequency === 'Monthly' ? 4189 : payFrequency === 'Weekly' ? 967 : payFrequency === '4-Weekly' ? 3867 : payFrequency === '2-Weekly' ? 1934 : 50270 / multiplier;

  if (periodGross > niPT) {
    const mainRateEarnings = Math.min(periodGross, niUEL) - niPT;
    periodNI += mainRateEarnings * 0.08;
  }
  if (periodGross > niUEL) {
    periodNI += (periodGross - niUEL) * 0.02;
  }
  const employeeNI = periodNI * multiplier;

  // 6. Employer NI (On Gross) - Calculated per period
  let periodEmployerNI = 0;
  const employerThreshold = 5000 / multiplier;
  if (periodGross > employerThreshold) {
    periodEmployerNI = (periodGross - employerThreshold) * 0.15;
  }
  const employerNI = periodEmployerNI * multiplier;

  // 7. Student Loans (On Gross) - Calculated per period
  let periodStudentLoan = 0;
  if (studentLoanPlan1 && periodGross > 26065 / multiplier) {
    periodStudentLoan += (periodGross - 26065 / multiplier) * 0.09;
  }
  if (studentLoanPlan2 && periodGross > 28470 / multiplier) {
    periodStudentLoan += (periodGross - 28470 / multiplier) * 0.09;
  }
  if (studentLoanPlan4 && periodGross > 32745 / multiplier) {
    periodStudentLoan += (periodGross - 32745 / multiplier) * 0.09;
  }
  if (studentLoanPlan5 && periodGross > 25000 / multiplier) {
    periodStudentLoan += (periodGross - 25000 / multiplier) * 0.09;
  }
  if (postgraduateLoan && periodGross > 21000 / multiplier) {
    periodStudentLoan += (periodGross - 21000 / multiplier) * 0.06;
  }
  const studentLoan = periodStudentLoan * multiplier;

  // 8. Take Home Pay
  const totalDeductions = totalIncomeTax + employeeNI + studentLoan + pension;
  const takeHome = annualGross - totalDeductions;

  const totalCostToEmployer = annualGross + employerNI;

  const takeHomeFrequencies = {
    yearly: takeHome,
    monthly: takeHome / 12,
    fourWeekly: takeHome / 13,
    twoWeekly: takeHome / 26,
    weekly: takeHome / 52,
    daily: takeHome / 260,
  };

  return {
    gross: annualGross,
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
    locationUsed: parsedLocation,
  };
}
