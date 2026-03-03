export interface SalaryInput {
    grossIncome: number;
    payFrequency: 'Yearly' | 'Monthly' | '4 Weekly' | 'Weekly' | 'Daily';
    taxYear: '2024/25' | '2025/26';
    isScottish: boolean;
    taxCode: string;
    studentLoanPlan: 'None' | 'Plan 1' | 'Plan 2' | 'Plan 4' | 'Plan 5';
    hasPostgradLoan: boolean;
    pensionScheme: 'Auto-enrolment' | 'Employer' | 'Salary sacrifice' | 'Personal';
    pensionType: 'Percentage' | 'Amount';
    pensionValue: number;
    bonusAmount: number;
    overtimeHours: number;
    overtimeRate: number; // e.g., £20/hr
    childcareVoucher: number; // Monthly voucher amount
    excludeNI: boolean;
    isBlind: boolean;
    isMarried: boolean; // Born before 6th April 1935
    giveAsYouEarn: number; // Monthly GAYE
    giftAid: number; // Monthly Gift Aid
    daysPerWeek: number;
}

export interface BreakdownItem {
    yearly: number;
    monthly: number;
    fourWeekly: number;
    weekly: number;
    daily: number;
}

export interface SalaryBreakdown {
    grossIncome: BreakdownItem;
    taxableIncome: BreakdownItem;
    incomeTax: BreakdownItem;
    nationalInsurance: BreakdownItem;
    studentLoan: BreakdownItem;
    pension: BreakdownItem;
    employerPension: BreakdownItem;
    bonus: BreakdownItem;
    overtime: BreakdownItem;
    childcareVouchers: BreakdownItem;
    giveAsYouEarn: BreakdownItem;
    takeHome: BreakdownItem;
}

const parseTaxCode = (code: string, isScottish: boolean): { allowance: number; rate?: number } => {
    if (!code) return { allowance: 12570 }; // Default 1257L

    const upperCode = code.toUpperCase().trim();

    if (upperCode === 'BR' || upperCode === 'SBR') return { allowance: 0, rate: 0.20 };
    if (upperCode === 'D0' || upperCode === 'SD0') return { allowance: 0, rate: isScottish ? 0.21 : 0.40 };
    if (upperCode === 'D1' || upperCode === 'SD1') return { allowance: 0, rate: isScottish ? 0.42 : 0.45 };
    if (upperCode === '0T' || upperCode === 'S0T') return { allowance: 0 };
    if (upperCode === 'NT') return { allowance: 0, rate: 0 }; // No tax

    // Parse numeric part (e.g., 1257L -> 12570 allowance)
    const match = upperCode.match(/(\\d+)/);
    if (match) {
        return { allowance: parseInt(match[1], 10) * 10 };
    }

    return { allowance: 12570 };
};

const calculateIncomeTax = (
    taxableIncome: number,
    isScottish: boolean,
    taxCodeInfo: { allowance: number; rate?: number },
    giftAidYearly: number
): number => {
    if (taxCodeInfo.rate !== undefined) {
        return taxableIncome * taxCodeInfo.rate;
    }

    // Extend basic rate band by Grossed-up Gift Aid (Gift Aid * 1.25)
    const grossGiftAid = giftAidYearly * 1.25;

    let tax = 0;
    let remainingIncome = taxableIncome;

    if (isScottish) {
        const bands = [
            { limit: 2306, rate: 0.19 }, // Starter
            { limit: 13991 - 2306, rate: 0.20 }, // Basic
            { limit: 31092 - 13991, rate: 0.21 }, // Intermediate
            { limit: 62430 - 31092, rate: 0.42 }, // Higher
            { limit: 125140 - 62430, rate: 0.45 }, // Advanced
            { limit: Infinity, rate: 0.48 }, // Top
        ];

        for (const band of bands) {
            if (remainingIncome <= 0) break;
            const taxableInBand = Math.min(remainingIncome, band.limit);
            tax += taxableInBand * band.rate;
            remainingIncome -= taxableInBand;
        }
    } else {
        // UK Bands (England, Wales, NI)
        const basicLimit = 37700 + grossGiftAid;
        const higherLimit = 125140 - 12570; // Adjusted for PA loss above 100k

        const bands = [
            { limit: basicLimit, rate: 0.20 },
            { limit: higherLimit - basicLimit, rate: 0.40 },
            { limit: Infinity, rate: 0.45 },
        ];

        for (const band of bands) {
            if (remainingIncome <= 0) break;
            const taxableInBand = Math.min(remainingIncome, band.limit);
            tax += taxableInBand * band.rate;
            remainingIncome -= taxableInBand;
        }
    }

    return tax;
};

const calculateNI = (gross: number, exclude: boolean): number => {
    if (exclude) return 0;
    // Category A 2024/25
    const pt = 12570; // Primary Threshold
    const uel = 50270; // Upper Earnings Limit

    if (gross <= pt) return 0;

    let ni = 0;
    if (gross <= uel) {
        ni = (gross - pt) * 0.08; // 8% main rate for 24/25
    } else {
        ni = (uel - pt) * 0.08 + (gross - uel) * 0.02; // 2% above UEL
    }
    return ni;
};

const calculateStudentLoan = (gross: number, plan: string, hasPostgrad: boolean): number => {
    let sl = 0;
    if (plan === 'Plan 1') sl = Math.max(0, gross - 24990) * 0.09;
    if (plan === 'Plan 2') sl = Math.max(0, gross - 27295) * 0.09;
    if (plan === 'Plan 4') sl = Math.max(0, gross - 31395) * 0.09;
    if (plan === 'Plan 5') sl = Math.max(0, gross - 25000) * 0.09;

    let pg = 0;
    if (hasPostgrad) pg = Math.max(0, gross - 21000) * 0.06;

    return sl + pg;
};

const createBreakdown = (yearlyValue: number, daysPerWeek: number): BreakdownItem => ({
    yearly: yearlyValue,
    monthly: yearlyValue / 12,
    fourWeekly: yearlyValue / 13,
    weekly: yearlyValue / 52,
    daily: yearlyValue / (52 * daysPerWeek),
});

export const calculateSalary = (input: SalaryInput): SalaryBreakdown => {
    // 1. Annualize Base Gross Income
    let annualGross = input.grossIncome;
    if (input.payFrequency === 'Monthly') annualGross *= 12;
    if (input.payFrequency === '4 Weekly') annualGross *= 13;
    if (input.payFrequency === 'Weekly') annualGross *= 52;
    if (input.payFrequency === 'Daily') annualGross *= (52 * input.daysPerWeek);

    // 2. Additions (Overtime + Bonus)
    const annualOvertime = input.overtimeHours * input.overtimeRate * 12; // Assuming hours are per month
    const annualBonus = input.bonusAmount; // Assuming bonus is a single yearly lump sum
    const totalAnnualGross = annualGross + annualOvertime + annualBonus;

    // 3. Pension 
    let annualPension = 0;
    let annualEmployerPension = 0;

    // Auto-enrolment minimums often apply to qualifying earnings, but strictly following 
    // the user's reference tool: standard calculation applies the % to the gross input.
    let basePensionAmount = 0;
    if (input.pensionValue > 0) {
        if (input.pensionType === 'Percentage') {
            basePensionAmount = totalAnnualGross * (input.pensionValue / 100);
        } else {
            basePensionAmount = input.pensionValue * 12; // monthly amount
        }
    }

    if (input.pensionScheme === 'Employer') {
        annualEmployerPension = basePensionAmount;
    } else {
        annualPension = basePensionAmount;
    }

    // 4. Pre-Tax / Pre-NI Deductions (Salary Sacrifice reduces BOTH gross and NI-able gross)
    let preTaxDeductions = input.giveAsYouEarn * 12;
    const annualChildcare = input.childcareVoucher * 12;
    preTaxDeductions += annualChildcare;

    let adjustedNetIncome = totalAnnualGross;
    let niLiableGross = totalAnnualGross - annualChildcare;

    if (input.pensionScheme === 'Salary sacrifice') {
        preTaxDeductions += annualPension;
        niLiableGross -= annualPension; // Salary sacrifice specifically reduces NI exposure
    }

    adjustedNetIncome = Math.max(0, totalAnnualGross - preTaxDeductions);

    // 6. Allowance Overrides
    const taxCodeInfo = parseTaxCode(input.taxCode, input.isScottish);
    let personalAllowance = taxCodeInfo.allowance;

    // Reduce PA by £1 for every £2 over £100,000
    if (adjustedNetIncome > 100000 && taxCodeInfo.allowance > 0) {
        const reduction = Math.floor((adjustedNetIncome - 100000) / 2);
        personalAllowance = Math.max(0, personalAllowance - reduction);
    }

    // Add Blind Person's Allowance (£3070 for 24/25)
    if (input.isBlind) {
        personalAllowance += 3070;
    }

    // Note: Married Couple's Allowance reduces the TAX bill directly by 10% of the allowance
    // Not the taxable income threshold.

    // 7. Calculate Tax
    // Personal/Auto-enrolment (Relief at source): Extend Basic Rate Band by the grossed-up pension contribution
    // Note: Auto-enrolment can technically operate under Net Pay arrangements (pre-tax), but standard
    // default for simple selection assumes Relief at Source (post-tax deduction).
    let grossedUpRelief = input.giftAid * 12 * 1.25;
    if (input.pensionScheme === 'Personal' || input.pensionScheme === 'Auto-enrolment') {
        grossedUpRelief += (annualPension * 1.25); // Extend basic rate band
    }

    // If scheme is 'Auto-enrolment' under Net Pay Arrangement, it would be deducted in step 4.
    // For exact feature parity with reference, 'Salary Sacrifice' = pre-everything. 
    // 'Auto-enrolment' and 'Personal' often act as Relief At Source in this layout context.

    const taxableIncome = Math.max(0, adjustedNetIncome - personalAllowance);
    let annualTax = calculateIncomeTax(taxableIncome, input.isScottish, taxCodeInfo, grossedUpRelief);

    if (input.isMarried) {
        // Max MCA is £11080 (gives £1108 tax reduction)
        annualTax = Math.max(0, annualTax - 1108);
    }

    // 8. Calculate NI (NI is typically calculated on Gross, before Pension unless Salary Sacrifice, assuming not SalSac for standard calculation)
    // Childcare vouchers DO reduce NI usually (Salary Sacrifice).
    const annualNI = calculateNI(niLiableGross, input.excludeNI);

    // 9. Calculate Student Loan (Calculated on gross before tax, sometimes after pension depending on scheme, standard is on gross)
    const annualStudentLoan = calculateStudentLoan(totalAnnualGross, input.studentLoanPlan, input.hasPostgradLoan);

    // 10. Total Deductions & Take Home
    let totalDeductions = annualTax + annualNI + annualStudentLoan + (input.giveAsYouEarn * 12) + annualChildcare;

    // If not Salary sacrifice (which already docked preTaxDeductions), deduct post-tax here
    if (input.pensionScheme === 'Auto-enrolment' || input.pensionScheme === 'Personal') {
        totalDeductions += annualPension;
    }

    // Salary Sacrifice was already deducted in preTaxDeductions.
    if (input.pensionScheme === 'Salary sacrifice') {
        totalDeductions += annualPension;
    }

    const annualTakeHome = totalAnnualGross - totalDeductions;

    return {
        grossIncome: createBreakdown(annualGross, input.daysPerWeek),
        bonus: createBreakdown(annualBonus, input.daysPerWeek),
        overtime: createBreakdown(annualOvertime, input.daysPerWeek),
        taxableIncome: createBreakdown(taxableIncome, input.daysPerWeek),
        incomeTax: createBreakdown(annualTax, input.daysPerWeek),
        nationalInsurance: createBreakdown(annualNI, input.daysPerWeek),
        studentLoan: createBreakdown(annualStudentLoan, input.daysPerWeek),
        pension: createBreakdown(annualPension, input.daysPerWeek),
        employerPension: createBreakdown(annualEmployerPension, input.daysPerWeek),
        childcareVouchers: createBreakdown(annualChildcare, input.daysPerWeek),
        giveAsYouEarn: createBreakdown((input.giveAsYouEarn * 12), input.daysPerWeek),
        takeHome: createBreakdown(annualTakeHome, input.daysPerWeek),
    };
};
