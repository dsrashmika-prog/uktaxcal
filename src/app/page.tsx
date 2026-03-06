"use client";

import { useState } from "react";
import { Calculator, Info, PoundSterling } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  const [isWelsh, setIsWelsh] = useState(false);

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

  // Child Benefit
  const [claimsChildBenefit, setClaimsChildBenefit] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState("1");

  // Persona & Demographics
  const [persona, setPersona] = useState("Employee");
  const [age, setAge] = useState("30");
  const [dividendIncome, setDividendIncome] = useState("");

  // Output State
  const [breakdown, setBreakdown] = useState<SalaryBreakdown | null>(null);

  const handleCalculate = () => {
    const input: SalaryInput = {
      grossIncome: parseFloat(grossIncome) || 0,
      payFrequency,
      taxYear,
      isScottish,
      isWelsh,
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
      claimsChildBenefit,
      numberOfChildren: parseInt(numberOfChildren) || 0,
      persona,
      age: parseInt(age) || 30,
      dividendIncome: parseFloat(dividendIncome) || 0,
    };

    const result = calculateSalary(input);
    setBreakdown(result);
  };

  const handleScotlandChange = (checked: boolean) => {
    setIsScottish(checked);
    if (checked) setIsWelsh(false); // Mutually exclusive
  };

  const handleWelshChange = (checked: boolean) => {
    setIsWelsh(checked);
    if (checked) setIsScottish(false); // Mutually exclusive
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(val);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-[#1e3a8a] selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tighter flex justify-center items-baseline">
              <span className="text-[#1e3a8a] tracking-tight">netpay</span>
              <span className="text-[#c02636] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#c02636] to-[#e11d48]">home</span>
              <span className="text-[#1e3a8a] text-4xl ml-0.5">.</span>
            </h1>
            <p className="mt-2 text-lg text-slate-600">
              Use our accurate UK take home pay calculator to find out your true earnings across both standard and Scottish tax bands.
            </p>
          </div>
        </div>
      </header>

      {/* Blue Navigation Strip */}
      <nav className="bg-[#1e3a8a] text-white py-3 shadow-md border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex space-x-8 text-sm font-semibold tracking-wide">
            <li>
              <Link href="/" className="text-white hover:text-rose-300 transition-colors">
                Tax calculator
              </Link>
            </li>
            {/* Future topic links will go here */}
          </ul>
        </div>
      </nav>

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
                <CardContent className="space-y-8 pt-6">

                  {/* Persona & Age Selection */}
                  <div className="flex flex-row gap-4 sm:gap-6 bg-slate-100/50 p-4 rounded-lg border border-slate-200">
                    <div className="space-y-3 flex-1 min-w-0">
                      <Label className="text-sm font-semibold text-slate-700">Work Status</Label>
                      <Select value={persona} onValueChange={setPersona}>
                        <SelectTrigger className="border-slate-300 bg-white font-medium text-xs sm:text-sm h-10 w-full truncate">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Employee">Employee</SelectItem>
                          <SelectItem value="Sole Trader">Sole Trader (Self-Employed)</SelectItem>
                          <SelectItem value="Director">Company Director</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3 w-28 sm:w-32 md:w-40 shrink-0">
                      <Label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
                        Age
                        {parseInt(age) >= 66 && <span className="text-[10px] text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider hidden sm:inline-block">No NI</span>}
                      </Label>
                      <Input
                        type="number"
                        min="16"
                        max="120"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="border-slate-300 bg-white font-medium focus-visible:ring-[#1e3a8a] w-full"
                      />
                    </div>
                  </div>

                  {/* Gross Income */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Gross income (pre tax)</Label>
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
                          onCheckedChange={(checked) => handleScotlandChange(checked as boolean)}
                          className="border-slate-300 text-[#1e3a8a] focus-visible:ring-[#1e3a8a] w-5 h-5"
                        />
                        <label htmlFor="scotland" className="text-sm font-medium leading-none text-slate-700 cursor-pointer">
                          Resident in Scotland?
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="wales"
                          checked={isWelsh}
                          onCheckedChange={(checked) => handleWelshChange(checked as boolean)}
                          className="border-slate-300 text-[#1e3a8a] focus-visible:ring-[#1e3a8a] w-5 h-5"
                        />
                        <label htmlFor="wales" className="text-sm font-medium leading-none text-slate-700 cursor-pointer">
                          Resident in Wales?
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
                          placeholder={`Leave blank for default (e.g. ${isScottish ? 'S1257L' : isWelsh ? 'C1257L' : '1257L'})`}
                          value={taxCode} onChange={(e) => setTaxCode(e.target.value)}
                          className="border-slate-300"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Student Loan (Hidden if Age > 65) */}
                  {parseInt(age) <= 65 && (
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
                  )}

                  {/* Pension Tools (Simplified for Sole Traders) */}
                  <AccordionItem value="pension" className="border-b-0">
                    <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline text-base font-semibold text-slate-800 bg-white border-y border-slate-100">
                      Pension
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-slate-50/50 space-y-6">

                      <div className="space-y-4 pt-2 pb-2 pl-2">
                        {persona === 'Sole Trader' ? (
                          <div className="flex items-center space-x-3 bg-white p-3 rounded border border-blue-100">
                            <Info className="w-5 h-5 text-blue-500" />
                            <Label className="text-sm font-normal text-slate-600">Sole Traders can only contribute to a Personal Pension (Relief at Source). Employer contributions are hidden.</Label>
                          </div>
                        ) : (
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
                        )}
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

                  {/* Family & Child Benefit */}
                  <AccordionItem value="family" className="border-b-0">
                    <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline text-base font-semibold text-slate-800 bg-white border-t border-slate-100">
                      Family & Child Benefit
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-slate-50/50 space-y-6">
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox id="child-benefit" checked={claimsChildBenefit} onCheckedChange={(c) => setClaimsChildBenefit(c as boolean)} />
                        <label htmlFor="child-benefit" className="text-sm font-medium">Claiming Child Benefit?</label>
                      </div>
                      {claimsChildBenefit && (
                        <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-top-2">
                          <Label>Number of Children</Label>
                          <Input type="number" min="1" value={numberOfChildren} onChange={e => setNumberOfChildren(e.target.value)} className="border-slate-300 w-1/3" />
                        </div>
                      )}
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

                        {persona === 'Director' && (
                          <div className="space-y-2">
                            <Label className="text-[#1e3a8a] font-semibold">Yearly Dividends (£)</Label>
                            <Input type="number" value={dividendIncome} onChange={e => setDividendIncome(e.target.value)} className="border-blue-300 bg-blue-50" />
                          </div>
                        )}

                        {persona !== 'Sole Trader' && (
                          <div className="space-y-2">
                            <Label>Yearly Bonus (£)</Label>
                            <Input type="number" value={bonusAmount} onChange={e => setBonusAmount(e.target.value)} className="border-slate-300" />
                          </div>
                        )}

                        {persona === 'Employee' && (
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
                        )}
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
                          {persona !== 'Sole Trader' && (
                            <div className="space-y-2">
                              <Label>Childcare Vouchers (£)</Label>
                              <Input type="number" value={childcareVoucher} onChange={e => setChildcareVoucher(e.target.value)} className="border-slate-300" />
                            </div>
                          )}
                          {persona !== 'Sole Trader' && (
                            <div className="space-y-2">
                              <Label>Give As You Earn (£)</Label>
                              <Input type="number" value={giveAsYouEarn} onChange={e => setGiveAsYouEarn(e.target.value)} className="border-slate-300" />
                            </div>
                          )}
                          <div className={`space-y-2 ${persona !== 'Sole Trader' ? 'col-span-2' : 'col-span-1'}`}>
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
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                  {/* TAX TRAPS BANNER */}
                  {(breakdown.taxTraps.personalAllowanceLost > 0 || breakdown.taxTraps.hicbcChargeAmount > 0) && (
                    <div className="border-l-4 border-l-amber-500 bg-amber-50/80 p-5 rounded-r-md shadow-sm">
                      <h3 className="text-lg font-bold text-amber-800 flex items-center gap-2 mb-2">
                        <span className="text-xl">⚠️</span> Tax Traps Detected
                      </h3>
                      <p className="text-sm text-amber-900 leading-relaxed mb-3">
                        Your income level has triggered one or more UK marginal tax rate traps:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800 font-medium pb-4 border-b border-amber-200/50">
                        {breakdown.taxTraps.personalAllowanceLost > 0 && (
                          <li>
                            <strong>60% Marginal Trap:</strong> Because you earn over £100,000, you have lost <strong>{formatCurrency(breakdown.taxTraps.personalAllowanceLost)}</strong> of your Personal Allowance.
                          </li>
                        )}
                        {breakdown.taxTraps.hicbcChargeAmount > 0 && (
                          <li>
                            <strong>Child Benefit Clawback:</strong> Because you earn over £60,000, you are being charged <strong>{formatCurrency(breakdown.taxTraps.hicbcChargeAmount)}</strong> to repay your Child Benefit.
                          </li>
                        )}
                      </ul>
                      <p className="text-xs text-amber-700 font-semibold mt-3 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        Pro Tip: You can mitigate these traps by allocating more salary into a Pension!
                      </p>
                    </div>
                  )}

                  <div className="overflow-x-auto overflow-y-hidden border border-slate-200 rounded-sm bg-white shadow-sm mt-8">
                    <table className="w-full min-w-[700px] text-sm text-left">
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

                        {breakdown.dividendTax.yearly > 0 && (
                          <tr className="bg-white">
                            <td className="px-6 py-4 font-semibold text-slate-700 border-r border-slate-200">- Dividend Tax</td>
                            <td className="px-4 py-4 text-right text-slate-500">{formatCurrency(breakdown.dividendTax.yearly)}</td>
                            <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.dividendTax.monthly)}</td>
                            <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.dividendTax.weekly)}</td>
                            <td className="px-4 py-4 text-right text-slate-500 border-l border-slate-100">{formatCurrency(breakdown.dividendTax.daily)}</td>
                          </tr>
                        )}

                        <tr className="bg-slate-100/60">
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
                        {breakdown.childBenefitCharge.yearly > 0 && (
                          <tr className="bg-white">
                            <td className="px-6 py-4 font-semibold text-rose-600 border-r border-slate-200 flex items-center gap-1">
                              - Child Benefit Charge
                            </td>
                            <td className="px-4 py-4 text-right text-rose-600 font-medium">-{formatCurrency(breakdown.childBenefitCharge.yearly)}</td>
                            <td className="px-4 py-4 text-right text-rose-600 font-medium border-l border-slate-100">-{formatCurrency(breakdown.childBenefitCharge.monthly)}</td>
                            <td className="px-4 py-4 text-right text-rose-600 font-medium border-l border-slate-100">-{formatCurrency(breakdown.childBenefitCharge.weekly)}</td>
                            <td className="px-4 py-4 text-right text-rose-600 font-medium border-l border-slate-100">-{formatCurrency(breakdown.childBenefitCharge.daily)}</td>
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
                </div>
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-white border-2 border-dashed border-slate-200 rounded-xl text-center">
                  <div className="mb-6 relative w-56 h-56 sm:w-72 sm:h-72">
                    <Image
                      src="/empty-state.png"
                      alt="Confused person illustration"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">Let's work out your take home pay</h3>
                  <p className="text-slate-500 max-w-md text-base sm:text-lg">
                    Pop your salary details into the form above, then hit calculate. We'll crunch the numbers and show you exactly what ends up in your pocket.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer for SEO & Internal Linking */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white font-bold text-xl mb-4 md:mb-0">
            <span className="text-[#1e3a8a]">netpay</span><span className="text-rose-500">home</span><span className="text-[#1e3a8a]">.</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
              About NetPayHome
            </Link>
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center md:text-left text-xs text-slate-500">
          &copy; {new Date().getFullYear()} NetPayHome. Designed for accurate UK 2024/2025 & 2025/2026 Salary calculations.
        </div>
      </footer>
    </div>
  );
}
