"use client";

import { useState, useMemo } from "react";
import { calculateSalaryBreakdown } from "@/lib/salaryLogic";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { PoundSterling, Calculator, Briefcase, Plus, Minus, Building2, GraduationCap, Banknote } from "lucide-react";

export default function Home() {
  const [grossSalary, setGrossSalary] = useState<number | "">("");
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

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8">

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Calculator className="w-8 h-8 text-emerald-600" />
          Your Take Home Pay Tax Calculator
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Calculate your net UK salary accurately using the 2026/27 projected tax bands.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Input Configuration Column */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                Income Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">

              <div className="space-y-4">
                <Label htmlFor="salary" className="text-sm font-medium text-slate-700">I want to see the breakdown for a salary of </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PoundSterling className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="salary"
                    type="number"
                    className="pl-10 h-14 text-2xl font-bold bg-slate-50 border-slate-200 text-slate-800 focus-visible:ring-emerald-500"
                    value={grossSalary === "" ? "" : grossSalary}
                    onChange={(e) => setGrossSalary(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <Label htmlFor="taxCode" className="text-sm font-medium text-slate-700">I have a Tax Code</Label>
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
                  <Label htmlFor="location" className="text-sm font-medium text-slate-700 cursor-pointer">I am a resident in Scotland</Label>
                  <Switch id="location" checked={isScotland} onCheckedChange={setIsScotland} />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <Label htmlFor="pension" className="text-sm font-medium text-slate-700">Pension Contribution</Label>
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
                  Student Loans
                </Label>

                <div className="grid gap-3">
                  <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="plan1" className="cursor-pointer text-sm text-slate-700">Plan 1</Label>
                      <Switch id="plan1" checked={studentLoanPlan1} onCheckedChange={setStudentLoanPlan1} />
                    </div>
                    <p className="text-[10px] text-slate-500">Threshold: £26,900</p>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="plan2" className="cursor-pointer text-sm text-slate-700">Plan 2</Label>
                      <Switch id="plan2" checked={studentLoanPlan2} onCheckedChange={setStudentLoanPlan2} />
                    </div>
                    <p className="text-[10px] text-slate-500">Threshold: £29,385</p>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="plan4" className="cursor-pointer text-sm text-slate-700">Plan 4 (Scotland)</Label>
                      <Switch id="plan4" checked={studentLoanPlan4} onCheckedChange={setStudentLoanPlan4} />
                    </div>
                    <p className="text-[10px] text-slate-500">Threshold: £33,795</p>
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
                <p className="text-slate-500 font-medium tracking-widest text-sm uppercase">Yearly Net Pay</p>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-emerald-600 tracking-tight line-clamp-1">
                  {formatter.format(breakdown.takeHomeFrequencies.yearly)}
                </h2>
              </div>

              <div className="w-16 h-1 bg-emerald-100 rounded-full"></div>

              <div className="text-center space-y-1">
                <p className="text-slate-500 font-medium tracking-wide text-xs uppercase">Monthly Net Pay</p>
                <h3 className="text-3xl sm:text-4xl font-bold text-emerald-600 opacity-90 line-clamp-1">
                  {formatter.format(breakdown.takeHomeFrequencies.monthly)}
                </h3>
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

          {/* Visual Breakdown List */}
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-slate-600" />
                Salary Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <div className="p-4 md:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-200 p-2 rounded-lg">
                      <Building2 className="w-4 h-4 text-slate-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Total Cost to Employer</p>
                      <p className="text-xs text-slate-500">Gross Salary + Employer NI</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{formatter.format(breakdown.totalCostToEmployer)}</span>
                </div>

                <div className="p-4 md:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Plus className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Gross Income</p>
                      <p className="text-xs text-slate-500">Taxable: {formatter.format(breakdown.taxableIncome)}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-slate-800">{formatter.format(breakdown.gross)}</span>
                </div>

                <div className="p-4 md:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <Minus className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Income Tax</p>
                      {breakdown.personalAllowance < 12570 && (
                        <p className="text-xs text-amber-600">PA Reduced: {formatter.format(breakdown.personalAllowance)}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-slate-700">{formatter.format(breakdown.incomeTax.total)}</span>
                </div>

                <div className="p-4 md:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Minus className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">National Insurance</p>
                      <p className="text-xs text-slate-500">You pay Employee NI</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-slate-700">{formatter.format(breakdown.employeeNI)}</span>
                </div>

                <div className="p-4 md:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Minus className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Student Loan</p>
                      <p className="text-xs text-slate-500">Deducted from gross</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-slate-700">{formatter.format(breakdown.studentLoan)}</span>
                </div>

                <div className="p-4 md:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <Minus className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Pension</p>
                      <p className="text-xs text-slate-500">{pensionContributionPercent}% Contribution</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-slate-700">{formatter.format(breakdown.pension)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
