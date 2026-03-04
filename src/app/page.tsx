"use client";

import { useState } from "react";
import { Calculator, Info, PoundSterling } from "lucide-react";

import { calculateSalary, SalaryInput, SalaryBreakdown } from "@/lib/salaryLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Home() {
  // Input States
  const [grossIncome, setGrossIncome] = useState<string>("");
  const [payFrequency, setPayFrequency] = useState<SalaryInput['payFrequency']>('Yearly');
  const [taxYear, setTaxYear] = useState<SalaryInput['taxYear']>('2025/26');
  const [isScottish, setIsScottish] = useState(false);

  // Advanced States
  const [taxCode, setTaxCode] = useState("");
  const [studentLoanPlan, setStudentLoanPlan] = useState<SalaryInput['studentLoanPlan']>('None');
  const [hasPostgradLoan, setHasPostgradLoan] = useState(false);

  const [pensionScheme, setPensionScheme] = useState<SalaryInput['pensionScheme']>('Auto-enrolment');
  const [pensionType, setPensionType] = useState<SalaryInput['pensionType']>('Percentage');
  const [pensionValue, setPensionValue] = useState("");

  const [bonusAmount, setBonusAmount] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [overtimeRate, setOvertimeRate] = useState("");
  const [childcareVoucher, setChildcareVoucher] = useState("");

  const [excludeNI, setExcludeNI] = useState(false);
  const [isBlind, setIsBlind] = useState(false);
  const [isMarried, setIsMarried] = useState(false);

  const [giveAsYouEarn, setGiveAsYouEarn] = useState("");
  const [giftAid, setGiftAid] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("5");

  // Output State
  const [breakdown, setBreakdown] = useState<SalaryBreakdown | null>(null);

  const handleCalculate = () => {
    const input: SalaryInput = {
      grossIncome: parseFloat(grossIncome) || 0,
      payFrequency,
      taxYear,
      isScottish,
      taxCode,
      studentLoanPlan,
      hasPostgradLoan,
      pensionScheme,
      pensionType,
      pensionValue: parseFloat(pensionValue) || 0,
      bonusAmount: parseFloat(bonusAmount) || 0,
      overtimeHours: parseFloat(overtimeHours) || 0,
      overtimeRate: parseFloat(overtimeRate) || 0,
      childcareVoucher: parseFloat(childcareVoucher) || 0,
      excludeNI,
      isBlind,
      isMarried,
      giveAsYouEarn: parseFloat(giveAsYouEarn) || 0,
      giftAid: parseFloat(giftAid) || 0,
      daysPerWeek: parseFloat(daysPerWeek) || 5,
    };

    const result = calculateSalary(input);
    setBreakdown(result);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(val);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tighter flex justify-center items-baseline">
            <span className="text-[#1e3a8a] tracking-tight">lit</span>
            <span className="text-[#c02636] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#c02636] to-[#e11d48]">finance</span>
            <span className="text-[#1e3a8a] text-4xl ml-0.5">.</span>
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Find out your take-home pay accurately across both standard UK and Scottish tax bands.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: INPPUT FORM */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-t-4 border-t-[#1e3a8a] shadow-lg">
              <CardHeader className="bg-slate-50 pb-4">
                <CardTitle className="text-xl text-[#1e3a8a] flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Basic Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">

                {/* Gross Income */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Gross (pre-tax) income</Label>
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-slate-500 font-bold">
                      £
                    </span>
                    <Input
                      type="number"
                      placeholder="e.g. 50000"
                      className="rounded-none shadow-none border-slate-300 focus-visible:ring-[#1e3a8a] text-lg font-medium"
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(e.target.value)}
                    />
                    <Select value={payFrequency} onValueChange={(val: any) => setPayFrequency(val)}>
                      <SelectTrigger className="w-[140px] rounded-l-none border-l-0 shadow-none border-slate-300bg-slate-50 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yearly">A Year</SelectItem>
                        <SelectItem value="Monthly">A Month</SelectItem>
                        <SelectItem value="4 Weekly">4 Weekly</SelectItem>
                        <SelectItem value="Weekly">A Week</SelectItem>
                        <SelectItem value="Daily">A Day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tax Year & Scotland Toggle */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                      Tax Year <Info className="w-3.5 h-3.5 text-slate-400" />
                    </Label>
                    <Select value={taxYear} onValueChange={(val: any) => setTaxYear(val)}>
                      <SelectTrigger className="border-slate-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025/26">2025 / 26</SelectItem>
                        <SelectItem value="2024/25">2024 / 25</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 flex flex-col justify-end pb-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="scotland"
                        checked={isScottish}
                        onCheckedChange={(checked) => setIsScottish(checked as boolean)}
                        className="border-slate-300 text-[#1e3a8a] focus-visible:ring-[#1e3a8a] w-5 h-5"
                      />
                      <label htmlFor="scotland" className="text-sm font-medium leading-none text-slate-700 cursor-pointer">
                        Resident in Scotland?
                      </label>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* ADVANCED OPTIONS ACCORDION */}
            <Card className="border border-slate-200 overflow-hidden">
              <Accordion type="single" collapsible className="w-full">

                {/* Tax Code Dedicated */}
                <AccordionItem value="tax-code-only" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline text-base font-semibold text-slate-800 bg-white border-b border-slate-100">
                    Enter Tax code here ( optional )
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-slate-50/50 space-y-4">
                    <div className="space-y-2">
                      <Label>Tax Code</Label>
                      <Input
                        placeholder="Leave blank for default (e.g. 1257L)"
                        value={taxCode} onChange={(e) => setTaxCode(e.target.value)}
                        className="border-slate-300"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Student Loan */}
                <AccordionItem value="student-loan" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline text-base font-semibold text-slate-800 bg-white border-b border-slate-100">
                    Student Loan
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-slate-50/50 space-y-4">
                    <div className="space-y-2">
                      <Label>Student Loan Plan</Label>
                      <Select value={studentLoanPlan} onValueChange={(val: any) => setStudentLoanPlan(val)}>
                        <SelectTrigger className="border-slate-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Plan 1">Plan 1</SelectItem>
                          <SelectItem value="Plan 2">Plan 2</SelectItem>
                          <SelectItem value="Plan 4">Plan 4 (Scotland)</SelectItem>
                          <SelectItem value="Plan 5">Plan 5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="postgrad" checked={hasPostgradLoan} onCheckedChange={(c) => setHasPostgradLoan(c as boolean)} />
                      <label htmlFor="postgrad" className="text-sm font-medium">Repaying Postgraduate Loan?</label>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Pension */}
                <AccordionItem value="pension" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline text-base font-semibold text-slate-800 bg-white border-y border-slate-100">
                    Pension
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-slate-50/50 space-y-6">

                    <div className="space-y-4 pt-2 pb-2 pl-2">
                      <RadioGroup
                        value={pensionScheme}
                        onValueChange={(val: any) => setPensionScheme(val)}
                        className="flex flex-col space-y-3"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="Auto-enrolment" id="r1" className="w-5 h-5" />
                          <Label htmlFor="r1" className="text-base font-normal text-slate-600 cursor-pointer">Auto-enrolment</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="Employer" id="r2" className="w-5 h-5" />
                          <Label htmlFor="r2" className="text-base font-normal text-slate-600 cursor-pointer">Employer</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="Salary sacrifice" id="r3" className="w-5 h-5" />
                          <Label htmlFor="r3" className="text-base font-normal text-slate-600 cursor-pointer">Salary sacrifice</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="Personal" id="r4" className="w-5 h-5" />
                          <Label htmlFor="r4" className="text-base font-normal text-slate-600 cursor-pointer">Personal</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex gap-4 border-t pt-5">
                      <div className="flex-1 space-y-2">
                        <Label>Contribution Amount</Label>
                        <Input type="number" placeholder="e.g. 5" value={pensionValue} onChange={(e) => setPensionValue(e.target.value)} className="border-slate-300" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label>Type</Label>
                        <Select value={pensionType} onValueChange={(val: any) => setPensionType(val)}>
                          <SelectTrigger className="border-slate-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Percentage">%</SelectItem>
                            <SelectItem value="Amount">£</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Additional Options (Bonus, Overtime, Deductions) */}
                <AccordionItem value="additional" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline text-base font-semibold text-slate-800 bg-white border-t border-slate-100">
                    Additional Options (Bonus, Extra Deductions)
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-slate-50/50 space-y-6">

                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-700 border-b pb-1 text-sm uppercase tracking-wide">Extra Earnings</h4>
                      <div className="space-y-2">
                        <Label>Yearly Bonus (£)</Label>
                        <Input type="number" value={bonusAmount} onChange={e => setBonusAmount(e.target.value)} className="border-slate-300" />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                          <Label>Overtime (hrs/mth)</Label>
                          <Input type="number" value={overtimeHours} onChange={e => setOvertimeHours(e.target.value)} className="border-slate-300" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label>Overtime Rate (£/hr)</Label>
                          <Input type="number" value={overtimeRate} onChange={e => setOvertimeRate(e.target.value)} className="border-slate-300" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <h4 className="font-semibold text-slate-700 border-b pb-1 text-sm uppercase tracking-wide">Allowances & Exemptions</h4>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="no-ni" checked={excludeNI} onCheckedChange={(c) => setExcludeNI(c as boolean)} />
                        <label htmlFor="no-ni" className="text-sm">I do not pay National Insurance</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="blind" checked={isBlind} onCheckedChange={(c) => setIsBlind(c as boolean)} />
                        <label htmlFor="blind" className="text-sm">Eligible for Blind Person's Allowance</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="married" checked={isMarried} onCheckedChange={(c) => setIsMarried(c as boolean)} />
                        <label htmlFor="married" className="text-sm">Married & born before 6th April 1935</label>
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <h4 className="font-semibold text-slate-700 border-b pb-1 text-sm uppercase tracking-wide">Other Deductions (Monthly)</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Childcare Vouchers (£)</Label>
                          <Input type="number" value={childcareVoucher} onChange={e => setChildcareVoucher(e.target.value)} className="border-slate-300" />
                        </div>
                        <div className="space-y-2">
                          <Label>Give As You Earn (£)</Label>
                          <Input type="number" value={giveAsYouEarn} onChange={e => setGiveAsYouEarn(e.target.value)} className="border-slate-300" />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label>Gift Aid (After tax - £)</Label>
                          <Input type="number" value={giftAid} onChange={e => setGiftAid(e.target.value)} className="border-slate-300" />
                        </div>
                      </div>
                    </div>

                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </Card>

            <Button
              onClick={handleCalculate}
              className="w-full h-14 text-lg bg-[#c02636] hover:bg-[#a01f2d] text-white font-bold tracking-wide shadow-md transition-all hover:-translate-y-0.5"
            >
              CALCULATE!
            </Button>
          </div>

          {/* RIGHT: RESULTS TABLE */}
          <div className="lg:col-span-7">
            {breakdown ? (
              <div className="overflow-x-auto overflow-y-hidden border border-slate-200 rounded-sm bg-white shadow-sm mt-8">
                <table className="w-full text-sm text-left table-fixed">
                  <thead className="bg-white text-slate-500 font-normal border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-normal w-[28%]"></th>
                      <th className="px-4 py-4 font-normal text-right">Yearly</th>
                      <th className="px-4 py-4 font-normal text-right border-l border-slate-100">Monthly</th>
                      <th className="px-4 py-4 font-normal text-right border-l border-slate-100">Weekly</th>
                      <th className="px-4 py-4 font-normal text-right border-l border-slate-100">Daily</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-600">
                    <tr className="bg-slate-100/60">
                      <td className="px-6 py-4 font-bold text-slate-700 border-r border-slate-200">Gross Income</td>
                      <td className="px-4 py-4 text-right font-bold text-slate-700">{formatCurrency(breakdown.grossIncome.yearly)}</td>
                      <td className="px-4 py-4 text-right font-bold text-slate-700 border-l border-slate-200">{formatCurrency(breakdown.grossIncome.monthly)}</td>
                      <td className="px-4 py-4 text-right font-bold text-slate-700 border-l border-slate-200">{formatCurrency(breakdown.grossIncome.weekly)}</td>
                      <td className="px-4 py-4 text-right font-bold text-slate-700 border-l border-slate-200">{formatCurrency(breakdown.grossIncome.daily)}</td>
                    </tr>

                    {breakdown.overtime.yearly > 0 && (
                      <tr className="bg-white">
                        <td className="px-6 py-4 font-semibold text-slate-700 border-r border-slate-200 flex items-center gap-1">+ Overtime</td>
                        <td className="px-4 py-4 text-right text-slate-500">{formatCurrency(breakdown.overtime.yearly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.overtime.monthly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.overtime.weekly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.overtime.daily)}</td>
                      </tr>
                    )}
                    {breakdown.bonus.yearly > 0 && (
                      <tr className="bg-slate-100/60">
                        <td className="px-6 py-4 font-semibold text-slate-700 border-r border-slate-200 flex items-center gap-1">+ Bonus</td>
                        <td className="px-4 py-4 text-right text-slate-500">{formatCurrency(breakdown.bonus.yearly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.bonus.monthly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.bonus.weekly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.bonus.daily)}</td>
                      </tr>
                    )}
                    {breakdown.pension.yearly > 0 && (
                      <tr className="bg-white">
                        <td className="px-6 py-4 font-semibold text-slate-700 border-r border-slate-200 flex items-center gap-1">- Pension</td>
                        <td className="px-4 py-4 text-right text-slate-500">{formatCurrency(breakdown.pension.yearly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.pension.monthly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.pension.weekly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.pension.daily)}</td>
                      </tr>
                    )}
                    {breakdown.employerPension.yearly > 0 && (
                      <tr className="bg-slate-100/60">
                        <td className="px-6 py-4 font-semibold text-slate-700 border-r border-slate-200 flex items-center gap-1">+ Employer Pension</td>
                        <td className="px-4 py-4 text-right text-slate-500">{formatCurrency(breakdown.employerPension.yearly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.employerPension.monthly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.employerPension.weekly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.employerPension.daily)}</td>
                      </tr>
                    )}
                    {breakdown.childcareVouchers.yearly > 0 && (
                      <tr className="bg-white">
                        <td className="px-6 py-4 font-semibold text-slate-700 border-r border-slate-200 flex items-center gap-1">- Childcare Vouchers</td>
                        <td className="px-4 py-4 text-right text-slate-500">{formatCurrency(breakdown.childcareVouchers.yearly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.childcareVouchers.monthly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.childcareVouchers.weekly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.childcareVouchers.daily)}</td>
                      </tr>
                    )}

                    <tr className="bg-white">
                      <td className="px-6 py-4 font-semibold text-slate-600 border-r border-slate-200">Taxable Income</td>
                      <td className="px-4 py-4 text-right text-slate-500">{formatCurrency(breakdown.taxableIncome.yearly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.taxableIncome.monthly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.taxableIncome.weekly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.taxableIncome.daily)}</td>
                    </tr>

                    <tr className="bg-slate-100/60">
                      <td className="px-6 py-4 font-semibold text-slate-700 border-r border-slate-200">Tax</td>
                      <td className="px-4 py-4 text-right text-slate-500">{formatCurrency(breakdown.incomeTax.yearly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.incomeTax.monthly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.incomeTax.weekly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.incomeTax.daily)}</td>
                    </tr>

                    <tr className="bg-white">
                      <td className="px-6 py-4 font-semibold text-slate-600 border-r border-slate-200">National Insurance</td>
                      <td className="px-4 py-4 text-right text-slate-500">{formatCurrency(breakdown.nationalInsurance.yearly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.nationalInsurance.monthly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.nationalInsurance.weekly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.nationalInsurance.daily)}</td>
                    </tr>

                    {breakdown.studentLoan.yearly > 0 && (
                      <tr className="bg-slate-100/60">
                        <td className="px-6 py-4 font-semibold text-slate-700 border-r border-slate-200 flex items-center gap-1">- Student Loan</td>
                        <td className="px-4 py-4 text-right text-slate-500">{formatCurrency(breakdown.studentLoan.yearly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.studentLoan.monthly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.studentLoan.weekly)}</td>
                        <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-200">{formatCurrency(breakdown.studentLoan.daily)}</td>
                      </tr>
                    )}

                    <tr className="bg-slate-100/60">
                      <td className="px-6 py-4 font-bold text-slate-700 border-r border-slate-200">{taxYear.split('/')[0]} Take Home</td>
                      <td className="px-4 py-4 text-right font-bold text-slate-800">{formatCurrency(breakdown.takeHome.yearly)}</td>
                      <td className="px-4 py-4 text-right font-bold text-slate-800 border-l border-slate-200">{formatCurrency(breakdown.takeHome.monthly)}</td>
                      <td className="px-4 py-4 text-right font-bold text-slate-800 border-l border-slate-200">{formatCurrency(breakdown.takeHome.weekly)}</td>
                      <td className="px-4 py-4 text-right font-bold text-slate-800 border-l border-slate-200">{formatCurrency(breakdown.takeHome.daily)}</td>
                    </tr>

                    <tr className="bg-white">
                      <td className="px-6 py-4 font-semibold text-slate-700 border-r border-slate-200 underline decoration-slate-400 underline-offset-4">{parseInt(taxYear.split('/')[0]) + 1} Take Home</td>
                      <td className="px-4 py-4 text-right text-slate-500">{formatCurrency(breakdown.takeHome.yearly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.takeHome.monthly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.takeHome.weekly)}</td>
                      <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.takeHome.daily)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-white border-2 border-dashed border-slate-200 rounded-xl text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Calculator className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Ready to calculate</h3>
                <p className="text-slate-500 max-w-sm text-lg">
                  Enter your salary details on the left and click <span className="font-semibold text-[#c02636]">CALCULATE!</span> to view your complete tax breakdown.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
