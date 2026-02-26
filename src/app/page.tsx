"use client";

import { useState, useMemo } from "react";
import { calculateSalaryBreakdown } from "@/lib/salaryLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Calculator, Briefcase, Plus, Minus, Building2, GraduationCap } from "lucide-react";

export default function Home() {

  const [grossSalary, setGrossSalary] = useState<number | "">("");
  const [payFrequency, setPayFrequency] = useState<'Yearly' | 'Monthly' | '4-Weekly' | '2-Weekly' | 'Weekly' | 'Daily' | ''>('');
  const [taxCode, setTaxCode] = useState<string>("");
  const [studentLoanPlan1, setStudentLoanPlan1] = useState(false);
  const [studentLoanPlan2, setStudentLoanPlan2] = useState(false);
  const [studentLoanPlan4, setStudentLoanPlan4] = useState(false);
  const [studentLoanPlan5, setStudentLoanPlan5] = useState(false);
  const [postgraduateLoan, setPostgraduateLoan] = useState(false);
  const [pensionContributionPercent, setPensionContributionPercent] = useState<number>(5);
  const [isScotland, setIsScotland] = useState(false);

  const breakdown = useMemo(() => {
    return calculateSalaryBreakdown({

      grossSalary: grossSalary || 0,
      payFrequency,
      taxCode: taxCode || "1257L",
      studentLoanPlan1,
      studentLoanPlan2,
      studentLoanPlan4,
      studentLoanPlan5,
      postgraduateLoan,
      pensionContributionPercent,
      location: isScotland ? 'Scotland' : 'Rest of UK',
    });
  }, [

    grossSalary,
    payFrequency,
    taxCode,
    studentLoanPlan1,
    studentLoanPlan2,
    studentLoanPlan4,
    studentLoanPlan5,
    postgraduateLoan,
    pensionContributionPercent,
    isScotland,
  ]);

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  });

  const m = payFrequency === 'Monthly' ? 12 : payFrequency === '4-Weekly' ? 13 : payFrequency === '2-Weekly' ? 26 : payFrequency === 'Weekly' ? 52 : payFrequency === 'Daily' ? 260 : 1;
  const currentPeriodTakeHome = payFrequency === '' ? 0 : breakdown.takeHomeFrequencies[payFrequency === 'Yearly' ? 'yearly' : payFrequency === 'Monthly' ? 'monthly' : payFrequency === '4-Weekly' ? 'fourWeekly' : payFrequency === '2-Weekly' ? 'twoWeekly' : payFrequency === 'Weekly' ? 'weekly' : 'daily'];

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-4 md:p-8 space-y-6 md:space-y-8">

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Calculator className="w-8 h-8 text-emerald-600" />
          Your Take Home Pay Tax Calculator
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Calculate your net UK salary accurately using the 2025/26 tax bands.
        </p>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-8">

        {/* Input Configuration Column */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                Your Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="salary" className="text-sm font-medium text-slate-700">
                      Total Income
                    </Label>
                    <div className="relative">
                      <Input
                        id="salary"
                        type="number"
                        className="h-14 text-2xl font-bold bg-slate-50 border-slate-200 text-slate-800 focus-visible:ring-emerald-500"
                        value={grossSalary === "" ? "" : grossSalary}
                        onChange={(e) => setGrossSalary(e.target.value === "" ? "" : Number(e.target.value))}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="payFrequency" className="text-sm font-medium text-slate-700">How often are you paid?</Label>
                    <div className="relative">
                      <select
                        id="payFrequency"
                        className="w-full h-14 px-4 rounded-md border border-slate-200 bg-slate-50 text-slate-800 text-lg font-bold focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                        value={payFrequency}
                        onChange={(e) => setPayFrequency(e.target.value as 'Yearly' | 'Monthly' | '4-Weekly' | '2-Weekly' | 'Weekly' | 'Daily' | '')}
                      >
                        <option value="" disabled hidden></option>
                        <option value="Yearly">Yearly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="4-Weekly">4-Weekly</option>
                        <option value="2-Weekly">2-Weekly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Daily">Daily</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <Label htmlFor="taxCode" className="text-sm font-medium text-slate-700">Do you have a Tax Code?</Label>
                <div className="relative pt-1">
                  <Input
                    id="taxCode"
                    type="text"
                    className="h-12 text-lg font-bold bg-slate-50 border-slate-200 text-slate-800 focus-visible:ring-emerald-500 uppercase"
                    value={taxCode}
                    onChange={(e) => setTaxCode(e.target.value)}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <Label htmlFor="location" className="text-sm font-medium text-slate-700 cursor-pointer">Are you a resident in Scotland?</Label>
                  <Switch id="location" checked={isScotland} onCheckedChange={setIsScotland} />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <Label htmlFor="pension" className="text-sm font-medium text-slate-700">Do you contribute to a pension?</Label>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{pensionContributionPercent}%</span>
                </div>
                <Slider
                  id="pension"
                  defaultValue={[5]}
                  max={100}
                  step={1}
                  value={[pensionContributionPercent]}
                  onValueChange={(val) => setPensionContributionPercent(val[0])}
                  className="py-2"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-slate-500" />
                  If you&apos;re still repaying your Student Loan, please select the repayment option that applies to you.
                </Label>

                <div className="grid gap-3">
                  <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="plan1" className="cursor-pointer text-sm text-slate-700">Plan 1</Label>
                      <Switch id="plan1" checked={studentLoanPlan1} onCheckedChange={setStudentLoanPlan1} />
                    </div>
                    <p className="text-[10px] text-slate-500">Threshold: £26,065</p>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="plan2" className="cursor-pointer text-sm text-slate-700">Plan 2</Label>
                      <Switch id="plan2" checked={studentLoanPlan2} onCheckedChange={setStudentLoanPlan2} />
                    </div>
                    <p className="text-[10px] text-slate-500">Threshold: £28,470</p>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="plan4" className="cursor-pointer text-sm text-slate-700">Plan 4 (Scotland)</Label>
                      <Switch id="plan4" checked={studentLoanPlan4} onCheckedChange={setStudentLoanPlan4} />
                    </div>
                    <p className="text-[10px] text-slate-500">Threshold: £32,745</p>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="plan5" className="cursor-pointer text-sm text-slate-700">Plan 5</Label>
                      <Switch id="plan5" checked={studentLoanPlan5} onCheckedChange={setStudentLoanPlan5} />
                    </div>
                    <p className="text-[10px] text-slate-500">Threshold: £25,000</p>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="postgrad" className="cursor-pointer text-sm text-slate-700">Postgraduate</Label>
                      <Switch id="postgrad" checked={postgraduateLoan} onCheckedChange={setPostgraduateLoan} />
                    </div>
                    <p className="text-[10px] text-slate-500">Threshold: £21,000</p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">

          {/* Primary Take Home Display */}
          <Card className="bg-white border-slate-200 overflow-hidden relative shadow-lg">
            <CardContent className="p-8 relative z-10 flex flex-col items-center justify-center min-h-[16rem] space-y-8">
              <div className="text-center space-y-2">
                <p className="text-slate-500 font-medium tracking-widest text-sm uppercase">
                  Take-home per {payFrequency ? payFrequency.toLowerCase() : 'period'}
                </p>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-emerald-600 tracking-tight line-clamp-1">
                  {formatter.format(currentPeriodTakeHome)}
                </h2>
              </div>

              <div className="w-16 h-1 bg-emerald-100 rounded-full"></div>

              <div className="text-center space-y-1">
                <p className="text-slate-500 font-medium tracking-wide text-xs uppercase">
                  Monthly Net Pay
                </p>
                <h3 className="text-3xl sm:text-4xl font-bold text-emerald-600 opacity-90 line-clamp-1">
                  {formatter.format(breakdown.takeHomeFrequencies.monthly)}
                </h3>
              </div>
            </CardContent>
          </Card>


          {/* Visual Breakdown List */}
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
              <CardTitle className="text-lg text-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-slate-600" />
                  Salary Breakdown
                </div>
                {payFrequency !== 'Yearly' && payFrequency !== '' && (
                  <span className="text-xs font-normal text-slate-500 bg-slate-200 px-2 py-1 rounded-full">
                    Showing per {payFrequency.toLowerCase()}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <div className="p-3 sm:p-4 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 hover:bg-slate-50 transition-colors bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-200 p-2 rounded-lg">
                      <Building2 className="w-4 h-4 text-slate-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Total Cost to Employer</p>
                      <p className="text-xs text-slate-500">Gross Salary + Employer NI</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-slate-900">{formatter.format(breakdown.totalCostToEmployer / m)}</span>
                    {payFrequency !== 'Yearly' && <span className="text-xs text-slate-500">{formatter.format(breakdown.totalCostToEmployer)} /yr</span>}
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Plus className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Gross Income</p>
                      <p className="text-xs text-slate-500">Taxable part: {formatter.format(breakdown.taxableIncome / m)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-slate-800">{formatter.format(breakdown.gross / m)}</span>
                    {payFrequency !== 'Yearly' && <span className="text-xs text-slate-500">{formatter.format(breakdown.gross)} /yr</span>}
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <Minus className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Income Tax</p>
                      {breakdown.personalAllowance < 12570 && (
                        <p className="text-xs text-amber-600">PA Reduced: {formatter.format(breakdown.personalAllowance)}</p>
                      )}
                      {breakdown.incomeTax.total > 0 && (
                        <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                          {breakdown.locationUsed === 'Scotland' ? (
                            <>
                              {(breakdown.incomeTax.scotlandStarter ?? 0) > 0 && <p>Starter Rate (19%): {formatter.format((breakdown.incomeTax.scotlandStarter ?? 0) / m)}</p>}
                              {(breakdown.incomeTax.scotlandBasic ?? 0) > 0 && <p>Basic Rate (20%): {formatter.format((breakdown.incomeTax.scotlandBasic ?? 0) / m)}</p>}
                              {(breakdown.incomeTax.scotlandIntermediate ?? 0) > 0 && <p>Intermediate Rate (21%): {formatter.format((breakdown.incomeTax.scotlandIntermediate ?? 0) / m)}</p>}
                              {(breakdown.incomeTax.scotlandHigher ?? 0) > 0 && <p>Higher Rate (42%): {formatter.format((breakdown.incomeTax.scotlandHigher ?? 0) / m)}</p>}
                              {(breakdown.incomeTax.scotlandAdvanced ?? 0) > 0 && <p>Advanced Rate (45%): {formatter.format((breakdown.incomeTax.scotlandAdvanced ?? 0) / m)}</p>}
                              {(breakdown.incomeTax.scotlandTop ?? 0) > 0 && <p>Top Rate (48%): {formatter.format((breakdown.incomeTax.scotlandTop ?? 0) / m)}</p>}
                            </>
                          ) : (
                            <>
                              {breakdown.incomeTax.basic > 0 && <p>Basic Rate (20%): {formatter.format(breakdown.incomeTax.basic / m)}</p>}
                              {breakdown.incomeTax.higher > 0 && <p>Higher Rate (40%): {formatter.format(breakdown.incomeTax.higher / m)}</p>}
                              {breakdown.incomeTax.additional > 0 && <p>Additional Rate (45%): {formatter.format(breakdown.incomeTax.additional / m)}</p>}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-semibold text-slate-700">{formatter.format(breakdown.incomeTax.total / m)}</span>
                    {payFrequency !== 'Yearly' && <span className="text-xs text-slate-500">{formatter.format(breakdown.incomeTax.total)} /yr</span>}
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Minus className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">National Insurance</p>
                      <p className="text-xs text-slate-500">
                        You pay Employee NI
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-semibold text-slate-700">{formatter.format(breakdown.employeeNI / m)}</span>
                    {payFrequency !== 'Yearly' && <span className="text-xs text-slate-500">{formatter.format(breakdown.employeeNI)} /yr</span>}
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Minus className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Student Loan</p>
                      <p className="text-xs text-slate-500">Deducted from gross</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-semibold text-slate-700">{formatter.format(breakdown.studentLoan / m)}</span>
                    {payFrequency !== 'Yearly' && <span className="text-xs text-slate-500">{formatter.format(breakdown.studentLoan)} /yr</span>}
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <Minus className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Pension</p>
                      <p className="text-xs text-slate-500">{pensionContributionPercent}% Contribution</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-semibold text-slate-700">{formatter.format(breakdown.pension / m)}</span>
                    {payFrequency !== 'Yearly' && <span className="text-xs text-slate-500">{formatter.format(breakdown.pension)} /yr</span>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Net Pay Frequencies Table */}
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100 uppercase text-xs font-semibold text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Frequency</th>
                    <th className="px-6 py-4 text-right">Net Pay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">Yearly</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{formatter.format(breakdown.takeHomeFrequencies.yearly)}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">Monthly</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{formatter.format(breakdown.takeHomeFrequencies.monthly)}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">4-Weekly</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{formatter.format(breakdown.takeHomeFrequencies.fourWeekly)}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">2-Weekly</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{formatter.format(breakdown.takeHomeFrequencies.twoWeekly)}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">Weekly</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{formatter.format(breakdown.takeHomeFrequencies.weekly)}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">Daily</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{formatter.format(breakdown.takeHomeFrequencies.daily)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      </div>

      {/* SEO Content: Featured Snippets & E-E-A-T */}
      <div className="mt-16 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        <section className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How to Calculate Your UK Take-Home Pay (2025/26) Step-by-Step</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Understanding exactly how much you&apos;ll take home after taxes can be complex. Use our free, highly accurate UK Salary Calculator to instantly determine your net pay. We simplify the complexities of Income Tax, National Insurance, Student Loans, and Pension deductions for the 2025/2026 tax year. Here is a step-by-step guide on how our calculator works out your final net income.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">1</div>
                <h3 className="font-bold text-slate-800 text-lg">Enter Your Gross Income</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Start by inputting your total earnings before any deductions. You can enter your salary based on how often you get paid—whether that&apos;s Yearly, Monthly, 4-Weekly, 2-Weekly, Weekly, or Daily. Our tool automatically annualizes your income for accurate bracket calculations.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">2</div>
                <h3 className="font-bold text-slate-800 text-lg">Apply Your Specific Tax Code</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                The standard UK tax code for 2025/26 is <strong>1257L</strong>, granting you a tax-free Personal Allowance of £12,570. Have a different code? Simply replace the default. If you are a resident in Scotland, toggle the switch or use an &quot;S&quot; code (e.g., S1257L) to automatically apply the 6-band Scottish Income Tax system.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">3</div>
                <h3 className="font-bold text-slate-800 text-lg">Factor in Essential Deductions</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Customize your wage breakdown by adding workplace pension contributions as a percentage. If you are repaying a student loan, simply switch on the relevant plan (Plan 1, Plan 2, Plan 4 for Scotland, Plan 5, or Postgraduate). We calculate exact deductions starting precisely above your plan&apos;s legal threshold.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">4</div>
                <h3 className="font-bold text-slate-800 text-lg">Review Your Net Pay Breakdown</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Instantly view a complete, transparent breakdown of your Take-Home Pay. We clearly separate Gross Income, Income Tax rates, Employee National Insurance (Class 1), Student Loan repayments, and Pensions. See these figures annualized or specifically adjusted for your selected pay period.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            {breakdown.locationUsed === 'Scotland' ? "2025/26 Scottish Income Tax Bands" : "2025/26 UK Income Tax Bands (England, Wales & NI)"}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 border border-slate-200 font-semibold text-slate-700">Band</th>
                  <th className="p-3 border border-slate-200 font-semibold text-slate-700">Taxable Income</th>
                  <th className="p-3 border border-slate-200 font-semibold text-slate-700">Tax Rate</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                {breakdown.locationUsed === 'Scotland' ? (
                  <>
                    <tr>
                      <td className="p-3 border border-slate-200">Personal Allowance</td>
                      <td className="p-3 border border-slate-200">Up to £12,570</td>
                      <td className="p-3 border border-slate-200">0%</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200">Starter Rate</td>
                      <td className="p-3 border border-slate-200">£12,571 to £15,397</td>
                      <td className="p-3 border border-slate-200">19%</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200">Basic Rate</td>
                      <td className="p-3 border border-slate-200">£15,398 to £27,491</td>
                      <td className="p-3 border border-slate-200">20%</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200">Intermediate Rate</td>
                      <td className="p-3 border border-slate-200">£27,492 to £43,662</td>
                      <td className="p-3 border border-slate-200">21%</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200">Higher Rate</td>
                      <td className="p-3 border border-slate-200">£43,663 to £75,000</td>
                      <td className="p-3 border border-slate-200">42%</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200">Advanced Rate</td>
                      <td className="p-3 border border-slate-200">£75,001 to £125,140</td>
                      <td className="p-3 border border-slate-200">45%</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200">Top Rate</td>
                      <td className="p-3 border border-slate-200">Over £125,140</td>
                      <td className="p-3 border border-slate-200">48%</td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="p-3 border border-slate-200">Personal Allowance</td>
                      <td className="p-3 border border-slate-200">Up to £12,570</td>
                      <td className="p-3 border border-slate-200">0%</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200">Basic Rate</td>
                      <td className="p-3 border border-slate-200">£12,571 to £50,270</td>
                      <td className="p-3 border border-slate-200">20%</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200">Higher Rate</td>
                      <td className="p-3 border border-slate-200">£50,271 to £125,140</td>
                      <td className="p-3 border border-slate-200">40%</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200">Additional Rate</td>
                      <td className="p-3 border border-slate-200">Over £125,140</td>
                      <td className="p-3 border border-slate-200">45%</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

    </div>
  );
}
