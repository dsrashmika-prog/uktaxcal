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
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-[#1e3a8a] selection:text-white">
      {/* MSE-Style Hero Header */}
      <header className="bg-[#1e3a8a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-2">
                <span className="text-white">NetPayHome </span>
                <span className="text-yellow-400">Calculator</span>
              </h1>
              <p className="text-blue-200 text-base sm:text-lg max-w-xl">
                Use our accurate UK take home pay calculator to find out your true earnings across both standard and Scottish tax bands.
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end text-right opacity-60 shrink-0">
              <span className="text-5xl font-black text-yellow-300">£</span>
            </div>
          </div>
        </div>
      </header>

      {/* Blue Navigation Strip */}
      <nav className="bg-[#162d6e] text-white py-3 shadow-md border-b border-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 sm:space-x-8 text-sm font-semibold tracking-wide overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-white hover:text-yellow-300 transition-colors">
            Tax calculator
          </Link>
          <Link href="/how-to" className="text-white hover:text-yellow-300 transition-colors">
            How to use
          </Link>
          <Link href="/sources" className="text-white hover:text-yellow-300 transition-colors">
            Data sources
          </Link>
        </div>
      </nav>


      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT: INPUT FORM */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <CardContent className="space-y-7 pt-6 pb-6">

                  {/* Amber Disclaimer Banner */}
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-md">
                    <p className="font-bold text-sm text-gray-900 mb-1">This is just an estimate.</p>
                    <p className="text-sm text-gray-700">
                      Your results are based on the information you provide. Always check with HMRC or a qualified accountant to confirm your exact position.
                    </p>
                  </div>

                  {/* Persona & Age Selection */}
                  <div className="flex flex-row gap-4 sm:gap-6">
                    <div className="space-y-2 flex-1 min-w-0">
                      <Label className="text-sm font-bold text-gray-900">Work Status</Label>
                      <Select value={persona} onValueChange={setPersona}>
                        <SelectTrigger className="border-gray-300 bg-white font-medium text-xs sm:text-sm h-11 w-full truncate rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Employee">Employee</SelectItem>
                          <SelectItem value="Sole Trader">Sole Trader (Self-Employed)</SelectItem>
                          <SelectItem value="Director">Company Director</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 w-28 sm:w-32 md:w-40 shrink-0">
                      <Label className="text-sm font-bold text-gray-900 flex items-center justify-between">
                        Age
                        {parseInt(age) >= 66 && <span className="text-[10px] text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider hidden sm:inline-block">No NI</span>}
                      </Label>
                      <Input
                        type="number"
                        min="16"
                        max="120"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="border-gray-300 bg-white font-medium focus-visible:ring-[#1e3a8a] w-full h-11 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Gross Income */}
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-900">Gross income (pre tax)</Label>
                    <div className="flex rounded-lg shadow-sm overflow-hidden border border-gray-300">
                      <span className="inline-flex items-center px-4 bg-gray-100 text-gray-700 font-bold border-r border-gray-300">
                        £
                      </span>
                      <Input
                        type="number"
                        placeholder="e.g. 50000"
                        className="rounded-none shadow-none border-0 focus-visible:ring-0 text-lg font-medium"
                        value={grossIncome}
                        onChange={(e) => setGrossIncome(e.target.value)}
                      />
                      <Select value={payFrequency} onValueChange={(val: any) => setPayFrequency(val)}>
                        <SelectTrigger className="w-[130px] rounded-none border-0 border-l border-gray-300 shadow-none bg-gray-50 font-medium">
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

                  {/* Tax Year - Pill Radio Buttons */}
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-900 flex items-center gap-1">
                      Tax Year <Info className="w-3.5 h-3.5 text-gray-400" />
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['2025/26', '2024/25'] as const).map((year) => (
                        <button
                          key={year}
                          type="button"
                          onClick={() => setTaxYear(year)}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all cursor-pointer text-left
                            ${taxYear === year
                              ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a]'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                            }`}
                        >
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${taxYear === year ? 'border-[#1e3a8a]' : 'border-gray-400'
                            }`}>
                            {taxYear === year && <span className="w-2 h-2 rounded-full bg-[#1e3a8a]"></span>}
                          </span>
                          {year.replace('/', '/')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scotland & Wales */}
                  <div className="flex flex-col sm:flex-row sm:gap-6 pt-1 border-t border-gray-100">
                    <div className="flex items-center space-x-2 py-2">
                      <Checkbox
                        id="scotland"
                        checked={isScottish}
                        onCheckedChange={(checked) => handleScotlandChange(checked as boolean)}
                        className="border-gray-300 text-[#1e3a8a] focus-visible:ring-[#1e3a8a] w-5 h-5"
                      />
                      <label htmlFor="scotland" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Resident in Scotland?
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 py-2">
                      <Checkbox
                        id="wales"
                        checked={isWelsh}
                        onCheckedChange={(checked) => handleWelshChange(checked as boolean)}
                        className="border-gray-300 text-[#1e3a8a] focus-visible:ring-[#1e3a8a] w-5 h-5"
                      />
                      <label htmlFor="wales" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Resident in Wales?
                      </label>
                    </div>
                  </div>

                  {/* Calculate Button — inside the card */}
                  <Button
                    onClick={handleCalculate}
                    className="w-full h-14 text-lg bg-[#c02636] hover:bg-[#a01f2d] text-white font-bold tracking-wide shadow-sm rounded-lg transition-all hover:-translate-y-0.5"
                  >
                    Calculate
                  </Button>

                </CardContent>
              </Card>


              {/* ADVANCED OPTIONS ACCORDION */}
              <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <Accordion type="single" collapsible className="w-full">

                  {/* Tax Code */}
                  <AccordionItem value="tax-code-only" className="border-b border-gray-200">
                    <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 hover:no-underline text-sm font-bold text-gray-900 bg-white">
                      Tax Code (optional)
                    </AccordionTrigger>
                    <AccordionContent className="px-5 py-4 bg-gray-50 space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-gray-900">Tax Code</Label>
                        <Input
                          placeholder={`Leave blank for default (e.g. ${isScottish ? 'S1257L' : isWelsh ? 'C1257L' : '1257L'})`}
                          value={taxCode} onChange={(e) => setTaxCode(e.target.value)}
                          className="border-gray-300 rounded-lg h-11"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Student Loan */}
                  {parseInt(age) <= 65 && (
                    <AccordionItem value="student-loan" className="border-b border-gray-200">
                      <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 hover:no-underline text-sm font-bold text-gray-900 bg-white">
                        Student Loan
                      </AccordionTrigger>
                      <AccordionContent className="px-5 py-4 bg-gray-50 space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-bold text-gray-900">Student Loan Plan</Label>
                          <Select value={studentLoanPlan} onValueChange={(val: any) => setStudentLoanPlan(val)}>
                            <SelectTrigger className="border-gray-300 rounded-lg h-11">
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
                        <div className="flex items-center space-x-2">
                          <Checkbox id="postgrad" checked={hasPostgradLoan} onCheckedChange={(c) => setHasPostgradLoan(c as boolean)} className="border-gray-300 w-5 h-5" />
                          <label htmlFor="postgrad" className="text-sm font-medium text-gray-700 cursor-pointer">Repaying Postgraduate Loan?</label>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {/* Pension */}
                  <AccordionItem value="pension" className="border-b border-gray-200">
                    <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 hover:no-underline text-sm font-bold text-gray-900 bg-white">
                      Pension
                    </AccordionTrigger>
                    <AccordionContent className="px-5 py-4 bg-gray-50 space-y-5">
                      {persona === 'Sole Trader' ? (
                        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 p-3 rounded-lg">
                          <Info className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                          <p className="text-sm text-blue-800">Sole Traders can only contribute to a Personal Pension (Relief at Source). Employer contributions are not applicable.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {(['Auto-enrolment', 'Employer', 'Salary sacrifice', 'Personal'] as const).map((scheme) => (
                            <button
                              key={scheme}
                              type="button"
                              onClick={() => setPensionScheme(scheme)}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-all cursor-pointer text-left ${pensionScheme === scheme
                                ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a]'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                                }`}
                            >
                              <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${pensionScheme === scheme ? 'border-[#1e3a8a]' : 'border-gray-400'
                                }`}>
                                {pensionScheme === scheme && <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a]"></span>}
                              </span>
                              {scheme}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-4 pt-1">
                        <div className="flex-1 space-y-2">
                          <Label className="text-sm font-bold text-gray-900">Contribution Amount</Label>
                          <Input type="number" placeholder="e.g. 5" value={pensionValue} onChange={(e) => setPensionValue(e.target.value)} className="border-gray-300 rounded-lg h-11" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label className="text-sm font-bold text-gray-900">Type</Label>
                          <Select value={pensionType} onValueChange={(val: any) => setPensionType(val)}>
                            <SelectTrigger className="border-gray-300 rounded-lg h-11">
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
                  <AccordionItem value="family" className="border-b border-gray-200">
                    <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 hover:no-underline text-sm font-bold text-gray-900 bg-white">
                      Family &amp; Child Benefit
                    </AccordionTrigger>
                    <AccordionContent className="px-5 py-4 bg-gray-50 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="child-benefit" checked={claimsChildBenefit} onCheckedChange={(c) => setClaimsChildBenefit(c as boolean)} className="border-gray-300 w-5 h-5" />
                        <label htmlFor="child-benefit" className="text-sm font-medium text-gray-700 cursor-pointer">Claiming Child Benefit?</label>
                      </div>
                      {claimsChildBenefit && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                          <Label className="text-sm font-bold text-gray-900">Number of Children</Label>
                          <Input type="number" min="1" value={numberOfChildren} onChange={e => setNumberOfChildren(e.target.value)} className="border-gray-300 rounded-lg h-11 w-1/3" />
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  {/* Additional Options */}
                  <AccordionItem value="additional" className="border-b-0">
                    <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 hover:no-underline text-sm font-bold text-gray-900 bg-white">
                      Additional Options
                    </AccordionTrigger>
                    <AccordionContent className="px-5 py-4 bg-gray-50 space-y-5">

                      <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Extra Earnings</p>

                        {persona === 'Director' && (
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-gray-900">Yearly Dividends (£)</Label>
                            <Input type="number" value={dividendIncome} onChange={e => setDividendIncome(e.target.value)} className="border-gray-300 rounded-lg h-11" />
                          </div>
                        )}

                        {persona !== 'Sole Trader' && (
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-gray-900">Yearly Bonus (£)</Label>
                            <Input type="number" value={bonusAmount} onChange={e => setBonusAmount(e.target.value)} className="border-gray-300 rounded-lg h-11" />
                          </div>
                        )}

                        {persona === 'Employee' && (
                          <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                              <Label className="text-sm font-bold text-gray-900">Overtime (hrs/mth)</Label>
                              <Input type="number" value={overtimeHours} onChange={e => setOvertimeHours(e.target.value)} className="border-gray-300 rounded-lg h-11" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <Label className="text-sm font-bold text-gray-900">Overtime Rate (£/hr)</Label>
                              <Input type="number" value={overtimeRate} onChange={e => setOvertimeRate(e.target.value)} className="border-gray-300 rounded-lg h-11" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 pt-2 border-t border-gray-200">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest pt-2">Allowances &amp; Exemptions</p>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="no-ni" checked={excludeNI} onCheckedChange={(c) => setExcludeNI(c as boolean)} className="border-gray-300 w-5 h-5" />
                          <label htmlFor="no-ni" className="text-sm text-gray-700 cursor-pointer">I do not pay National Insurance</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="blind" checked={isBlind} onCheckedChange={(c) => setIsBlind(c as boolean)} className="border-gray-300 w-5 h-5" />
                          <label htmlFor="blind" className="text-sm text-gray-700 cursor-pointer">Eligible for Blind Person's Allowance</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="married" checked={isMarried} onCheckedChange={(c) => setIsMarried(c as boolean)} className="border-gray-300 w-5 h-5" />
                          <label htmlFor="married" className="text-sm text-gray-700 cursor-pointer">Married &amp; born before 6th April 1935</label>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-gray-200">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest pt-2">Other Deductions (Monthly)</p>
                        <div className="grid grid-cols-2 gap-4">
                          {persona !== 'Sole Trader' && (
                            <div className="space-y-2">
                              <Label className="text-sm font-bold text-gray-900">Childcare Vouchers (£)</Label>
                              <Input type="number" value={childcareVoucher} onChange={e => setChildcareVoucher(e.target.value)} className="border-gray-300 rounded-lg h-11" />
                            </div>
                          )}
                          {persona !== 'Sole Trader' && (
                            <div className="space-y-2">
                              <Label className="text-sm font-bold text-gray-900">Give As You Earn (£)</Label>
                              <Input type="number" value={giveAsYouEarn} onChange={e => setGiveAsYouEarn(e.target.value)} className="border-gray-300 rounded-lg h-11" />
                            </div>
                          )}
                          <div className={`space-y-2 ${persona !== 'Sole Trader' ? 'col-span-2' : 'col-span-1'}`}>
                            <Label className="text-sm font-bold text-gray-900">Gift Aid (After tax - £)</Label>
                            <Input type="number" value={giftAid} onChange={e => setGiftAid(e.target.value)} className="border-gray-300 rounded-lg h-11" />
                          </div>
                        </div>
                      </div>

                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </Card>

            </div>

            {/* RIGHT: RESULTS TABLE */}
            <div className="lg:col-span-7">
              {breakdown ? (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">

                  {/* TAX TRAPS BANNER */}
                  {(breakdown.taxTraps.personalAllowanceLost > 0 || breakdown.taxTraps.hicbcChargeAmount > 0) && (
                    <div className="border-l-4 border-l-red-500 bg-red-50 p-5 rounded-r-lg">
                      <h3 className="text-base font-bold text-red-800 flex items-center gap-2 mb-2">
                        ⚠️ Tax Traps Detected
                      </h3>
                      <p className="text-sm text-red-900 leading-relaxed mb-3">
                        Your income level has triggered one or more UK marginal tax rate traps:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-red-800 font-medium pb-4 border-b border-red-200/50">
                        {breakdown.taxTraps.personalAllowanceLost > 0 && (
                          <li>
                            <strong>60% Marginal Trap:</strong> You have lost <strong>{formatCurrency(breakdown.taxTraps.personalAllowanceLost)}</strong> of your Personal Allowance.
                          </li>
                        )}
                        {breakdown.taxTraps.hicbcChargeAmount > 0 && (
                          <li>
                            <strong>Child Benefit Clawback:</strong> You are being charged <strong>{formatCurrency(breakdown.taxTraps.hicbcChargeAmount)}</strong> to repay your Child Benefit.
                          </li>
                        )}
                      </ul>
                      <p className="text-xs text-red-700 font-semibold mt-3 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        Pro Tip: Allocating more salary into a pension can help mitigate these traps.
                      </p>
                    </div>
                  )}

                  {/* Results Table */}
                  <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-[#1e3a8a] px-6 py-4">
                      <h2 className="text-white font-bold text-lg">Your Take Home Pay Results</h2>
                      <p className="text-blue-200 text-sm">Based on tax year {taxYear}</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[560px] text-sm text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-5 py-3 font-bold text-gray-900 text-left w-[32%]"></th>
                            <th className="px-4 py-3 font-bold text-gray-700 text-right">Yearly</th>
                            <th className="px-4 py-3 font-bold text-gray-700 text-right border-l border-gray-100">Monthly</th>
                            <th className="px-4 py-3 font-bold text-gray-700 text-right border-l border-gray-100">Weekly</th>
                            <th className="px-4 py-3 font-bold text-gray-700 text-right border-l border-gray-100">Daily</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                          <tr className="bg-white">
                            <td className="px-5 py-3.5 font-bold text-gray-900 border-r border-gray-100">Gross Income</td>
                            <td className="px-4 py-3.5 text-right font-semibold text-gray-900">{formatCurrency(breakdown.grossIncome.yearly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.grossIncome.monthly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.grossIncome.weekly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.grossIncome.daily)}</td>
                          </tr>

                          {breakdown.overtime.yearly > 0 && (
                            <tr className="bg-gray-50">
                              <td className="px-5 py-3.5 font-medium text-gray-700 border-r border-gray-100">+ Overtime</td>
                              <td className="px-4 py-3.5 text-right text-gray-600">{formatCurrency(breakdown.overtime.yearly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.overtime.monthly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.overtime.weekly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.overtime.daily)}</td>
                            </tr>
                          )}
                          {breakdown.bonus.yearly > 0 && (
                            <tr className="bg-white">
                              <td className="px-5 py-3.5 font-medium text-gray-700 border-r border-gray-100">+ Bonus</td>
                              <td className="px-4 py-3.5 text-right text-gray-600">{formatCurrency(breakdown.bonus.yearly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.bonus.monthly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.bonus.weekly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.bonus.daily)}</td>
                            </tr>
                          )}
                          {breakdown.pension.yearly > 0 && (
                            <tr className="bg-gray-50">
                              <td className="px-5 py-3.5 font-medium text-gray-700 border-r border-gray-100">- Pension</td>
                              <td className="px-4 py-3.5 text-right text-gray-600">{formatCurrency(breakdown.pension.yearly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.pension.monthly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.pension.weekly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.pension.daily)}</td>
                            </tr>
                          )}
                          {breakdown.employerPension.yearly > 0 && (
                            <tr className="bg-white">
                              <td className="px-5 py-3.5 font-medium text-gray-700 border-r border-gray-100">+ Employer Pension</td>
                              <td className="px-4 py-3.5 text-right text-gray-600">{formatCurrency(breakdown.employerPension.yearly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.employerPension.monthly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.employerPension.weekly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.employerPension.daily)}</td>
                            </tr>
                          )}
                          {breakdown.childcareVouchers.yearly > 0 && (
                            <tr className="bg-gray-50">
                              <td className="px-5 py-3.5 font-medium text-gray-700 border-r border-gray-100">- Childcare Vouchers</td>
                              <td className="px-4 py-3.5 text-right text-gray-600">{formatCurrency(breakdown.childcareVouchers.yearly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.childcareVouchers.monthly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.childcareVouchers.weekly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-600 border-l border-gray-100">{formatCurrency(breakdown.childcareVouchers.daily)}</td>
                            </tr>
                          )}

                          <tr className="bg-gray-50">
                            <td className="px-5 py-3.5 font-medium text-gray-600 border-r border-gray-100">Taxable Income</td>
                            <td className="px-4 py-3.5 text-right text-gray-600">{formatCurrency(breakdown.taxableIncome.yearly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.taxableIncome.monthly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.taxableIncome.weekly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.taxableIncome.daily)}</td>
                          </tr>

                          <tr className="bg-white">
                            <td className="px-5 py-3.5 font-medium text-gray-700 border-r border-gray-100">- Income Tax</td>
                            <td className="px-4 py-3.5 text-right text-gray-600">{formatCurrency(breakdown.incomeTax.yearly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.incomeTax.monthly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.incomeTax.weekly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.incomeTax.daily)}</td>
                          </tr>

                          {breakdown.dividendTax.yearly > 0 && (
                            <tr className="bg-gray-50">
                              <td className="px-5 py-3.5 font-medium text-gray-700 border-r border-gray-100">- Dividend Tax</td>
                              <td className="px-4 py-3.5 text-right text-gray-600">{formatCurrency(breakdown.dividendTax.yearly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.dividendTax.monthly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.dividendTax.weekly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.dividendTax.daily)}</td>
                            </tr>
                          )}

                          <tr className="bg-white">
                            <td className="px-5 py-3.5 font-medium text-gray-700 border-r border-gray-100">- National Insurance</td>
                            <td className="px-4 py-3.5 text-right text-gray-600">{formatCurrency(breakdown.nationalInsurance.yearly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.nationalInsurance.monthly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.nationalInsurance.weekly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.nationalInsurance.daily)}</td>
                          </tr>

                          {breakdown.studentLoan.yearly > 0 && (
                            <tr className="bg-gray-50">
                              <td className="px-5 py-3.5 font-medium text-gray-700 border-r border-gray-100">- Student Loan</td>
                              <td className="px-4 py-3.5 text-right text-gray-600">{formatCurrency(breakdown.studentLoan.yearly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.studentLoan.monthly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.studentLoan.weekly)}</td>
                              <td className="px-4 py-3.5 text-right text-gray-500 border-l border-gray-100">{formatCurrency(breakdown.studentLoan.daily)}</td>
                            </tr>
                          )}
                          {breakdown.childBenefitCharge.yearly > 0 && (
                            <tr className="bg-white">
                              <td className="px-5 py-3.5 font-medium text-red-600 border-r border-gray-100">- Child Benefit Charge</td>
                              <td className="px-4 py-3.5 text-right text-red-600 font-medium">-{formatCurrency(breakdown.childBenefitCharge.yearly)}</td>
                              <td className="px-4 py-3.5 text-right text-red-600 font-medium border-l border-gray-100">-{formatCurrency(breakdown.childBenefitCharge.monthly)}</td>
                              <td className="px-4 py-3.5 text-right text-red-600 font-medium border-l border-gray-100">-{formatCurrency(breakdown.childBenefitCharge.weekly)}</td>
                              <td className="px-4 py-3.5 text-right text-red-600 font-medium border-l border-gray-100">-{formatCurrency(breakdown.childBenefitCharge.daily)}</td>
                            </tr>
                          )}

                          {/* Take Home - highlighted green row */}
                          <tr className="bg-green-50 border-t-2 border-green-200">
                            <td className="px-5 py-4 font-bold text-green-900 border-r border-green-200 text-base">{taxYear.split('/')[0]} Take Home</td>
                            <td className="px-4 py-4 text-right font-bold text-green-900 text-base">{formatCurrency(breakdown.takeHome.yearly)}</td>
                            <td className="px-4 py-4 text-right font-bold text-green-800 border-l border-green-200">{formatCurrency(breakdown.takeHome.monthly)}</td>
                            <td className="px-4 py-4 text-right font-bold text-green-800 border-l border-green-200">{formatCurrency(breakdown.takeHome.weekly)}</td>
                            <td className="px-4 py-4 text-right font-bold text-green-800 border-l border-green-200">{formatCurrency(breakdown.takeHome.daily)}</td>
                          </tr>

                          <tr className="bg-white">
                            <td className="px-5 py-3.5 font-medium text-gray-500 border-r border-gray-100 text-sm">{parseInt(taxYear.split('/')[0]) + 1} Take Home</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 text-sm">{formatCurrency(breakdown.takeHome.yearly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 text-sm border-l border-gray-100">{formatCurrency(breakdown.takeHome.monthly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 text-sm border-l border-gray-100">{formatCurrency(breakdown.takeHome.weekly)}</td>
                            <td className="px-4 py-3.5 text-right text-gray-500 text-sm border-l border-gray-100">{formatCurrency(breakdown.takeHome.daily)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-xl text-center shadow-sm">
                  <div className="mb-6 relative w-56 h-56 sm:w-72 sm:h-72">
                    <Image
                      src="/empty-state.png"
                      alt="Confused person illustration"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Let's work out your take home pay</h3>
                  <p className="text-gray-500 max-w-md text-base sm:text-lg">
                    Pop your salary details into the form, then hit Calculate. We'll crunch the numbers and show you exactly what ends up in your pocket.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white font-bold text-xl mb-4 md:mb-0">
            <span className="text-blue-400">netpay</span><span className="text-rose-500">home</span><span className="text-blue-400">.</span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 text-sm font-medium text-slate-400">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/how-to" className="hover:text-white transition-colors">How to Use</Link>
            <Link href="/sources" className="hover:text-white transition-colors">Data Sources</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy &amp; Terms</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center md:text-left text-xs text-slate-500">
          &copy; {new Date().getFullYear()} NetPayHome. Designed for accurate UK 2024/2025 &amp; 2025/2026 Salary calculations.
        </div>
      </footer>
    </div>
  );
}
