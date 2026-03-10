"use client";

import React, { useState, useMemo } from "react";
import { Info } from "lucide-react";
import Link from "next/link";


import { calculateSalary, SalaryInput, SalaryBreakdown } from "@/lib/salaryLogic";

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

  // Child Benefit
  const [claimsChildBenefit, setClaimsChildBenefit] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState("1");

  // Persona & Demographics
  const [persona, setPersona] = useState("Employee");
  const [age, setAge] = useState("");
  const [dividendIncome, setDividendIncome] = useState("");

  // Advanced accordion open state
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Output State - Real-time Calculation
  const breakdown = useMemo(() => {
    const inputGross = parseFloat(grossIncome) || 0;
    const inputDiv = parseFloat(dividendIncome) || 0;
    const inputBonus = parseFloat(bonusAmount) || 0;

    const input: SalaryInput = {
      grossIncome: inputGross,
      payFrequency,
      taxYear,
      isScottish,
      taxCode,
      studentLoanPlan,
      hasPostgradLoan,
      pensionScheme,
      pensionType,
      pensionValue: parseFloat(pensionValue) || 0,
      bonusAmount: inputBonus,
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
      dividendIncome: inputDiv,
    };
    return calculateSalary(input);
  }, [
    grossIncome, payFrequency, taxYear, isScottish, taxCode, studentLoanPlan, hasPostgradLoan,
    pensionScheme, pensionType, pensionValue, bonusAmount, overtimeHours, overtimeRate, childcareVoucher,
    excludeNI, isBlind, isMarried, giveAsYouEarn, giftAid, daysPerWeek, claimsChildBenefit, numberOfChildren,
    persona, age, dividendIncome
  ]);

  const handleScotlandChange = (checked: boolean) => {
    setIsScottish(checked);
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(val);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 selection:bg-blue-200">

      {/* ===== HEADER ===== */}
      <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="bg-yellow-400/20 border border-yellow-400/30 rounded-full px-3 py-1 text-[11px] font-black text-yellow-300 tracking-[0.15em] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">UK 2025/26</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight mb-4 leading-[1.1]">
                <span className="text-white">NetPayHome </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300 drop-shadow-sm">Calculator</span>
              </h1>
              <p className="text-blue-100/90 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
                Accurate UK take-home pay — covering income tax, National Insurance, pensions, and more.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="flex-1 -mt-10 pb-20 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* Main Card Container */}
          <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl shadow-blue-900/10 ring-1 ring-slate-900/5 overflow-hidden flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200/60">

            {/* ===== LEFT: INPUT PANEL ===== */}
            <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 xl:p-12 relative z-10 bg-white">

              <h3 className="text-[22px] font-extrabold text-slate-800 mb-6 tracking-tight">Enter your income</h3>

              {/* Gross Income Primary Box */}
              <div className="bg-slate-50/80 border border-slate-200/80 px-6 pt-5 pb-6 rounded-2xl mb-8 shadow-sm ring-1 ring-white inset-0">
                <label className="block text-sm font-bold text-slate-400 mb-3 tracking-wide uppercase">Gross (Pre-Tax) Income</label>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-3">
                  <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-shadow shadow-sm h-14">
                    <span className="bg-slate-50/80 px-4 h-full flex items-center justify-center font-bold text-blue-700 text-lg border-r border-slate-200">£</span>
                    <input
                      type="number"
                      placeholder="e.g. 50000"
                      value={grossIncome}
                      onChange={e => setGrossIncome(e.target.value)}
                      className="flex-1 w-full border-none bg-transparent px-4 text-xl font-bold text-slate-800 focus:outline-none placeholder:text-slate-300 placeholder:font-medium"
                    />
                  </div>
                  <select
                    value={payFrequency}
                    onChange={e => setPayFrequency(e.target.value as any)}
                    className="h-14 bg-white border border-slate-300 rounded-xl px-4 text-base font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOTIuNCIgaGVpZ2h0PSIyOTIuNCI+PHBhdGggZmlsbD0iIzQ3NTU2OSIgZD0iTTI4NyA2OS40YTE3LjYgMTcuNiAwIDAgMC0xMy01LjRIMTguNGMtNSAwLTkuMyAxLjgtMTIuOSA1LjRBMTcuNiAxNy42IDAgMCAwIDAgODIuMmMwIDUgMS44IDkuMyA1LjQgMTIuOWwxMjggMTI3LjlYzLjYgMy42IDcuOCA1LjQgMTIuOCA1LjRzOS4yLTEuOCAxMi44LTUuNEwyODcgOTVjMy41LTMuNSA1LjQtNy44IDUuNC0xMi44IDAtNS0xLjktOS4yLTUuNS0xMi44eiIvPjwvc3ZnPg==')] bg-[length:12px_12px] bg-[position:right_1rem_center] bg-no-repeat pr-10"
                  >
                    <option value="Yearly">A year</option>
                    <option value="Monthly">A month</option>
                    <option value="4 Weekly">4 weekly</option>
                    <option value="Weekly">A week</option>
                    <option value="Daily">A day</option>
                  </select>
                </div>
              </div>

              {/* Scotland & Wales Checkboxes */}
              <div className="flex flex-wrap gap-3 pb-6 border-b border-slate-100">
                {[
                  { id: "scotland", label: "Resident in Scotland?", checked: isScottish, onChange: handleScotlandChange },
                ].map(({ id, label, checked, onChange }) => (
                  <label key={id} htmlFor={id} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 select-none ${checked ? 'bg-blue-50 border-blue-200 text-blue-800 font-bold shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 font-semibold hover:bg-slate-100'}`}>
                    <input
                      type="checkbox"
                      id={id}
                      checked={checked}
                      onChange={e => onChange(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    {label}
                  </label>
                ))}
              </div>

              {/* ===== ADVANCED OPTIONS ===== */}
              <div className="mt-4">
                <button
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="w-full flex items-center justify-between py-4 group bg-transparent border-none outline-none cursor-pointer"
                >
                  <span className="text-base font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Advanced options</span>
                  <span className={`text-2xl font-light text-slate-400 group-hover:text-blue-500 transition-transform duration-300 ${advancedOpen ? 'rotate-45' : ''}`}>+</span>
                </button>

                {advancedOpen && (
                  <div className="pt-4 pb-2 space-y-8 animate-in slide-in-from-top-2 fade-in duration-300">

                    {/* Work Status + Age */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your Circumstances</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Work Status</label>
                          <select value={persona} onChange={e => setPersona(e.target.value)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOTIuNCIgaGVpZ2h0PSIyOTIuNCI+PHBhdGggZmlsbD0iIzQ3NTU2OSIgZD0iTTI4NyA2OS40YTE3LjYgMTcuNiAwIDAgMC0xMy01LjRIMTguNGMtNSAwLTkuMyAxLjgtMTIuOSA1LjRBMTcuNiAxNy42IDAgMCAwIDAgODIuMmMwIDUgMS44IDkuMyA1LjQgMTIuOWwxMjggMTI3LjlYzLjYgMy42IDcuOCA1LjQgMTIuOCA1LjRzOS4yLTEuOCAxMi44LTUuNEwyODcgOTVjMy41LTMuNSA1LjQtNy44IDUuNC0xMi44IDAtNS0xLjktOS4yLTUuNS0xMi44eiIvPjwvc3ZnPg==')] bg-[length:12px_12px] bg-[position:right_1rem_center] bg-no-repeat pr-10 shadow-sm">
                            <option value="Employee">Employee</option>
                            <option value="Sole Trader">Sole Trader (Self-Employed)</option>
                            <option value="Director">Company Director</option>
                          </select>
                        </div>
                        <div>
                          <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                            Age
                            {parseInt(age) >= 66 && <span className="ml-2 text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase tracking-wider">No NI</span>}
                          </label>
                          <input type="number" min="16" max="120" placeholder="e.g. 30" value={age} onChange={e => setAge(e.target.value)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Tax Year */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tax Year</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {(['2025/26', '2024/25'] as const).map(year => (
                          <button
                            key={year}
                            type="button"
                            onClick={() => setTaxYear(year)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${taxYear === year ? 'bg-blue-50/80 border-2 border-blue-600 text-blue-700' : 'bg-slate-50 border-2 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'}`}
                          >
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${taxYear === year ? 'border-blue-600' : 'border-slate-400'}`}>
                              {taxYear === year && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                            </span>
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tax Code */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tax Code (optional)</h4>
                      <input
                        type="text"
                        placeholder={`e.g. ${isScottish ? 'S1257L' : '1257L'}`}
                        value={taxCode}
                        onChange={e => setTaxCode(e.target.value)}
                        className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm transition-shadow"
                      />
                    </div>

                    {/* Student Loan */}
                    {parseInt(age) <= 65 && (
                      <div className="pt-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Student Loan</h4>
                        <div className="space-y-4">
                          <select value={studentLoanPlan} onChange={e => setStudentLoanPlan(e.target.value as any)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOTIuNCIgaGVpZ2h0PSIyOTIuNCI+PHBhdGggZmlsbD0iIzQ3NTU2OSIgZD0iTTI4NyA2OS40YTE3LjYgMTcuNiAwIDAgMC0xMy01LjRIMTguNGMtNSAwLTkuMyAxLjgtMTIuOSA1LjRBMTcuNiAxNy42IDAgMCAwIDAgODIuMmMwIDUgMS44IDkuMyA1LjQgMTIuOWwxMjggMTI3LjlYzLjYgMy42IDcuOCA1LjQgMTIuOCA1LjRzOS4yLTEuOCAxMi44LTUuNEwyODcgOTVjMy41LTMuNSA1LjQtNy44IDUuNC0xMi44IDAtNS0xLjktOS4yLTUuNS0xMi44eiIvPjwvc3ZnPg==')] bg-[length:12px_12px] bg-[position:right_1rem_center] bg-no-repeat pr-10">
                            <option value="None">None</option>
                            <option value="Plan 1">Plan 1</option>
                            <option value="Plan 2">Plan 2</option>
                            <option value="Plan 4">Plan 4 (Scotland)</option>
                            <option value="Plan 5">Plan 5</option>
                          </select>
                          <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                            <input type="checkbox" checked={hasPostgradLoan} onChange={e => setHasPostgradLoan(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                            Repaying Postgraduate Loan?
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Pension */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Pension</h4>
                      {persona === 'Sole Trader' ? (
                        <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
                          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <p className="text-sm font-semibold text-blue-900 leading-relaxed">Sole Traders can only contribute to a Personal Pension (Relief at Source). Employer contributions are not applicable.</p>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Pension Scheme</label>
                          <div className="grid grid-cols-2 gap-2">
                            {(['Auto-enrolment', 'Employer', 'Salary sacrifice', 'Personal'] as const).map(scheme => (
                              <button
                                key={scheme}
                                type="button"
                                onClick={() => setPensionScheme(scheme)}
                                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${pensionScheme === scheme ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
                              >
                                <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${pensionScheme === scheme ? 'border-blue-600' : 'border-slate-300'}`}>
                                  {pensionScheme === scheme && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                                </span>
                                {scheme}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Contribution</label>
                          <input type="number" placeholder="e.g. 5" value={pensionValue} onChange={e => setPensionValue(e.target.value)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Type</label>
                          <select value={pensionType} onChange={e => setPensionType(e.target.value as any)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOTIuNCIgaGVpZ2h0PSIyOTIuNCI+PHBhdGggZmlsbD0iIzQ3NTU2OSIgZD0iTTI4NyA2OS40YTE3LjYgMTcuNiAwIDAgMC0xMy01LjRIMTguNGMtNSAwLTkuMyAxLjgtMTIuOSA1LjRBMTcuNiAxNy42IDAgMCAwIDAgODIuMmMwIDUgMS44IDkuMyA1LjQgMTIuOWwxMjggMTI3LjlYzLjYgMy42IDcuOCA1LjQgMTIuOCA1LjRzOS4yLTEuOCAxMi44LTUuNEwyODcgOTVjMy41LTMuNSA1LjQtNy44IDUuNC0xMi44IDAtNS0xLjktOS4yLTUuNS0xMi44eiIvPjwvc3ZnPg==')] bg-[length:12px_12px] bg-[position:right_1rem_center] bg-no-repeat pr-10">
                            <option value="Percentage">%</option>
                            <option value="Amount">£</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Family & Child Benefit */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Family &amp; Child Benefit</h4>
                      <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-sm">
                        <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                          <input type="checkbox" checked={claimsChildBenefit} onChange={e => setClaimsChildBenefit(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                          Claiming Child Benefit?
                        </label>
                        {claimsChildBenefit && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Children</label>
                            <input type="number" min="1" value={numberOfChildren} onChange={e => setNumberOfChildren(e.target.value)} className="w-24 h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight mb-6">Extra Incomes &amp; Deductions</h4>

                      {/* Extra Earnings */}
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">Extra Earnings</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {persona === 'Director' && (
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Yearly Dividends (£)</label>
                            <input type="number" value={dividendIncome} onChange={e => setDividendIncome(e.target.value)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
                          </div>
                        )}
                        {persona !== 'Sole Trader' && (
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Yearly Bonus (£)</label>
                            <input type="number" value={bonusAmount} onChange={e => setBonusAmount(e.target.value)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
                          </div>
                        )}
                        {persona === 'Employee' && (
                          <>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">Overtime (hrs/mth)</label>
                              <input type="number" value={overtimeHours} onChange={e => setOvertimeHours(e.target.value)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">Overtime Rate (£/hr)</label>
                              <input type="number" value={overtimeRate} onChange={e => setOvertimeRate(e.target.value)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Allowances */}
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">Allowances &amp; Exemptions</p>
                      <div className="space-y-4 border border-slate-100 bg-slate-50 rounded-2xl p-5 mb-8 shadow-sm">
                        {[
                          { id: "no-ni", label: "I do not pay National Insurance", checked: excludeNI, onChange: setExcludeNI },
                          { id: "blind", label: "Eligible for Blind Person's Allowance", checked: isBlind, onChange: setIsBlind },
                          { id: "married", label: "Married & born before 6th April 1935", checked: isMarried, onChange: setIsMarried },
                        ].map(({ id, label, checked, onChange }) => (
                          <label key={id} htmlFor={id} className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                            <input type="checkbox" id={id} checked={checked} onChange={e => onChange(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                            {label}
                          </label>
                        ))}
                      </div>

                      {/* Other Deductions */}
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">Other Deductions (Monthly)</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {persona !== 'Sole Trader' && (
                          <>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">Childcare Vouchers (£)</label>
                              <input type="number" value={childcareVoucher} onChange={e => setChildcareVoucher(e.target.value)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">Give As You Earn (£)</label>
                              <input type="number" value={giveAsYouEarn} onChange={e => setGiveAsYouEarn(e.target.value)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
                            </div>
                          </>
                        )}
                        <div className="sm:col-span-full">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Gift Aid (After tax - £)</label>
                          <input type="number" value={giftAid} onChange={e => setGiftAid(e.target.value)} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>

            {/* ===== RIGHT: RESULTS TABLE ===== */}
            <div className="lg:w-1/2 flex flex-col bg-slate-50/50 relative">

              {/* Subtle mesh background on results */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none mix-blend-multiply"></div>

              {/* Tax Traps Warning */}
              {(breakdown.taxTraps.personalAllowanceLost > 0 || breakdown.taxTraps.hicbcChargeAmount > 0) && (
                <div className="shrink-0 border-l-4 border-red-500 bg-red-50 p-5 mx-4 sm:mx-6 lg:mx-8 xl:mx-10 mt-6 lg:mt-10 rounded-r-xl shadow-sm z-10 block">
                  <p className="font-extrabold text-sm text-red-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">⚠️</span> Tax Traps Detected
                  </p>
                  <ul className="list-disc pl-5 text-[13px] text-red-700 space-y-1.5 mb-3 font-medium">
                    {breakdown.taxTraps.personalAllowanceLost > 0 && (
                      <li><strong>60% Marginal Trap:</strong> You've lost <strong>{formatCurrency(breakdown.taxTraps.personalAllowanceLost)}</strong> of your Personal Allowance.</li>
                    )}
                    {breakdown.taxTraps.hicbcChargeAmount > 0 && (
                      <li><strong>Child Benefit Clawback:</strong> Charge of <strong>{formatCurrency(breakdown.taxTraps.hicbcChargeAmount)}</strong>.</li>
                    )}
                  </ul>
                  <p className="text-xs font-bold text-red-600 uppercase tracking-wide">💡 Tip: Allocating more into a pension can help mitigate these traps.</p>
                </div>
              )}

              {/* Results Table Header */}
              <div className="flex flex-col flex-1 overflow-hidden z-10 w-full relative">
                <div className="shrink-0 px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-10">
                  <h2 className="text-slate-800 font-extrabold text-[22px] tracking-tight m-0 mb-1">Take Home Pay</h2>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Calculated for tax year {taxYear}</p>
                </div>

                <div className="overflow-x-auto w-full flex-1 touch-pan-x px-4 sm:px-6 lg:px-8 xl:px-10 pb-10">
                  <div className="min-w-[700px] border border-slate-200/60 bg-white rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
                    <table className="w-full h-full border-collapse text-sm text-right align-middle">
                      <thead>
                        <tr className="bg-slate-100 inline-table w-full text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                          <th className="py-4 px-5 text-left w-[22%]"></th>
                          <th className="py-4 px-4 w-[13%]">Yearly</th>
                          <th className="py-4 px-4 w-[13%]">Monthly</th>
                          <th className="py-4 px-4 w-[13%]">4 Weekly</th>
                          <th className="py-4 px-4 w-[13%]">2 Weekly</th>
                          <th className="py-4 px-4 w-[13%]">Weekly</th>
                          <th className="py-4 px-4 w-[13%]">Daily</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 flex-1 flex flex-col justify-between">
                        {/* Rows helper */}
                        {[
                          { label: "Gross Income", data: breakdown.grossIncome, bold: true, show: true },
                          { label: "+ Overtime", data: breakdown.overtime, bold: false, show: breakdown.overtime.yearly > 0 },
                          { label: "+ Bonus", data: breakdown.bonus, bold: false, show: breakdown.bonus.yearly > 0 },
                          { label: "− Pension", data: breakdown.pension, bold: false, show: breakdown.pension.yearly > 0 },
                          { label: "+ Employer Pension", data: breakdown.employerPension, bold: false, show: breakdown.employerPension.yearly > 0 },
                          { label: "− Childcare Vouchers", data: breakdown.childcareVouchers, bold: false, show: breakdown.childcareVouchers.yearly > 0 },
                          { label: "Taxable Income", data: breakdown.taxableIncome, bold: false, show: true },
                          { label: "Income Tax", data: breakdown.incomeTax, bold: false, show: true },
                          { label: "− Dividend Tax", data: breakdown.dividendTax, bold: false, show: breakdown.dividendTax.yearly > 0 },
                          { label: "National Insurance", data: breakdown.nationalInsurance, bold: false, show: true },
                          { label: "− Student Loan", data: breakdown.studentLoan, bold: false, show: breakdown.studentLoan.yearly > 0 },
                        ].filter(r => r.show).map((row, i) => (
                          <tr key={row.label} className={`transition-colors hover:bg-slate-50/50 flex-1 flex w-full ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                            <td className={`py-3.5 px-5 text-left border-r border-slate-100/50 w-[22%] ${row.bold ? 'font-bold text-slate-800' : 'font-semibold text-slate-600'}`}>{row.label}</td>
                            <td className={`py-3.5 px-4 w-[13%] ${row.bold ? 'font-bold text-slate-800' : 'font-semibold text-slate-600'}`}>{formatCurrency(row.data.yearly)}</td>
                            <td className="py-3.5 px-4 w-[13%] font-medium text-slate-500">{formatCurrency(row.data.monthly)}</td>
                            <td className="py-3.5 px-4 w-[13%] font-medium text-slate-500">{formatCurrency(row.data.fourWeekly)}</td>
                            <td className="py-3.5 px-4 w-[13%] font-medium text-slate-500">{formatCurrency(row.data.twoWeekly)}</td>
                            <td className="py-3.5 px-4 w-[13%] font-medium text-slate-500">{formatCurrency(row.data.weekly)}</td>
                            <td className="py-3.5 px-4 w-[13%] font-medium text-slate-400">{formatCurrency(row.data.daily)}</td>
                          </tr>
                        ))}

                        {/* Child Benefit Charge */}
                        {breakdown.childBenefitCharge.yearly > 0 && (
                          <tr className="bg-red-50/30 w-full flex flex-1">
                            <td className="py-3.5 px-5 w-[22%] text-left font-bold text-red-700 border-r border-red-100/50">− Child Benefit Charge</td>
                            <td className="py-3.5 px-4 w-[13%] font-bold text-red-700">−{formatCurrency(breakdown.childBenefitCharge.yearly)}</td>
                            <td className="py-3.5 px-4 w-[13%] font-semibold text-red-600">−{formatCurrency(breakdown.childBenefitCharge.monthly)}</td>
                            <td className="py-3.5 px-4 w-[13%] font-semibold text-red-500">−{formatCurrency(breakdown.childBenefitCharge.fourWeekly)}</td>
                            <td className="py-3.5 px-4 w-[13%] font-semibold text-red-500">−{formatCurrency(breakdown.childBenefitCharge.twoWeekly)}</td>
                            <td className="py-3.5 px-4 w-[13%] font-semibold text-red-500">−{formatCurrency(breakdown.childBenefitCharge.weekly)}</td>
                            <td className="py-3.5 px-4 w-[13%] font-semibold text-red-400">−{formatCurrency(breakdown.childBenefitCharge.daily)}</td>
                          </tr>
                        )}

                        {/* Take Home — highlighted */}
                        <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md flex w-full flex-[1.5]">
                          <td className="py-5 px-5 w-[22%] text-left font-extrabold text-[15px] border-r border-white/20">
                            {taxYear.split('/')[0]} Take Home
                          </td>
                          <td className="py-5 px-4 w-[13%] font-extrabold text-base bg-white/10">{formatCurrency(breakdown.takeHome.yearly)}</td>
                          <td className="py-5 px-4 w-[13%] font-bold text-blue-100">{formatCurrency(breakdown.takeHome.monthly)}</td>
                          <td className="py-5 px-4 w-[13%] font-semibold text-blue-100/90">{formatCurrency(breakdown.takeHome.fourWeekly)}</td>
                          <td className="py-5 px-4 w-[13%] font-semibold text-blue-100/90">{formatCurrency(breakdown.takeHome.twoWeekly)}</td>
                          <td className="py-5 px-4 w-[13%] font-semibold text-blue-100/90">{formatCurrency(breakdown.takeHome.weekly)}</td>
                          <td className="py-5 px-4 w-[13%] font-medium text-blue-200/80">{formatCurrency(breakdown.takeHome.daily)}</td>
                        </tr>

                        {/* Next year estimate */}
                        <tr className="bg-slate-100 text-[13px] flex w-full flex-1">
                          <td className="py-3.5 px-5 w-[22%] text-left font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200/50">
                            {parseInt(taxYear.split('/')[0]) + 1} est.
                          </td>
                          <td className="py-3.5 px-4 w-[13%] font-bold text-slate-500">{formatCurrency(breakdown.takeHome.yearly)}</td>
                          <td className="py-3.5 px-4 w-[13%] font-semibold text-slate-400">{formatCurrency(breakdown.takeHome.monthly)}</td>
                          <td className="py-3.5 px-4 w-[13%] font-semibold text-slate-400">{formatCurrency(breakdown.takeHome.fourWeekly)}</td>
                          <td className="py-3.5 px-4 w-[13%] font-semibold text-slate-400">{formatCurrency(breakdown.takeHome.twoWeekly)}</td>
                          <td className="py-3.5 px-4 w-[13%] font-medium text-slate-400">{formatCurrency(breakdown.takeHome.weekly)}</td>
                          <td className="py-3.5 px-4 w-[13%] font-medium text-slate-400">{formatCurrency(breakdown.takeHome.daily)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-[13px] font-semibold text-slate-400 mt-8 max-w-2xl mx-auto px-4">
            This is an estimate. Your results are based on the information provided. Always check with HMRC or a qualified accountant.
          </p>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            {/* Brand */}
            <div className="font-extrabold text-2xl tracking-tight">
              <span className="text-white">netpay</span><span className="text-yellow-400">home</span><span className="text-blue-500">.</span>
            </div>
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {[
                { href: "/about", label: "About Us" },
                { href: "/how-to", label: "How to Use" },
                { href: "/sources", label: "Data Sources" },
                { href: "/privacy", label: "Privacy & Terms" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-sm font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors duration-200">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-[13px] font-medium text-slate-500 text-center mt-8">
            &copy; {new Date().getFullYear()} NetPayHome. Designed for accurate UK 2024/2025 &amp; 2025/2026 Salary calculations.
          </p>
        </div>
      </footer>
    </div>
  );
}
