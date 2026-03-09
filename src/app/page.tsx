"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { calculateSalary, SalaryInput, SalaryBreakdown } from "@/lib/salaryLogic";

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
  const [age, setAge] = useState("");
  const [dividendIncome, setDividendIncome] = useState("");

  // Advanced accordion open state
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Output State
  const [breakdown, setBreakdown] = useState<SalaryBreakdown | null>(null);

  // Sparks effect state
  type Spark = { id: number; angle: number; size: number; speed: number; color: string; delay: number };
  const [sparks, setSparks] = useState<Spark[]>([]);

  const fireSparks = () => {
    const colors = ["#facc15", "#fbbf24", "#f97316", "#ffffff", "#fde68a", "#fed7aa", "#ff6b6b"];
    const newSparks: Spark[] = Array.from({ length: 22 }, (_, i) => ({
      id: Date.now() + i,
      angle: Math.random() * 360,
      size: 4 + Math.random() * 6,
      speed: 60 + Math.random() * 80,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.12,
    }));
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 700);
  };

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
    if (checked) setIsWelsh(false);
  };

  const handleWelshChange = (checked: boolean) => {
    setIsWelsh(checked);
    if (checked) setIsScottish(false);
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(val);

  // MSE colour tokens
  const mseBlue = "#2e54bf";
  const inputBg = "#f5f7fe";
  const inputBorder = "1px solid #c8d0e8";

  const mseInput = {
    background: inputBg,
    border: inputBorder,
    borderRadius: "4px",
    height: "48px",
    padding: "0 12px",
    fontSize: "15px",
    color: "#273157",
    width: "100%",
    outline: "none",
  } as React.CSSProperties;

  const mseLabel = {
    display: "block",
    fontWeight: 700,
    fontSize: "15px",
    color: "#4a4a4a",
    marginBottom: "6px",
  } as React.CSSProperties;

  const mseSelect = {
    ...mseInput,
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23273157' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "36px",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f6f6f6", fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: "#333" }}>

      {/* ===== HEADER (unchanged) ===== */}
      <header style={{ background: "#1e3a8a", color: "white" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "8px", lineHeight: 1.1 }}>
                <span style={{ color: "white" }}>NetPayHome </span>
                <span style={{ color: "#facc15" }}>Calculator</span>
              </h1>
              <p style={{ color: "#bfdbfe", fontSize: "16px", maxWidth: "520px" }}>
                Here is our accurate UK take home pay calculator to see your actual earnings for both standard and Scottish tax bands.
              </p>
            </div>
            <span style={{ fontSize: "60px", fontWeight: 900, color: "#fde68a", opacity: 0.6, display: "none" }} className="hero-pound">£</span>
          </div>
        </div>
      </header>

      {/* ===== NAV STRIP ===== */}
      <nav style={{ background: "#162d6e", color: "white", borderBottom: "1px solid #1e3a8a", padding: "12px 0" }}>
        <div className="scrollbar-hide" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", gap: "32px", overflowX: "auto", whiteSpace: "nowrap" }}>
          <Link href="/" style={{ color: "white", textDecoration: "none", fontWeight: 600, fontSize: "14px" }} onMouseOver={e => (e.currentTarget.style.color = "#facc15")} onMouseOut={e => (e.currentTarget.style.color = "white")}>
            Tax calculator
          </Link>
          <Link href="/salary-guide" style={{ color: "white", textDecoration: "none", fontWeight: 600, fontSize: "14px" }} onMouseOver={e => (e.currentTarget.style.color = "#facc15")} onMouseOut={e => (e.currentTarget.style.color = "white")}>
            Salary Guide
          </Link>
          <Link href="/how-to" style={{ color: "white", textDecoration: "none", fontWeight: 600, fontSize: "14px" }} onMouseOver={e => (e.currentTarget.style.color = "#facc15")} onMouseOut={e => (e.currentTarget.style.color = "white")}>
            How to use
          </Link>
          <Link href="/sources" style={{ color: "white", textDecoration: "none", fontWeight: 600, fontSize: "14px" }} onMouseOver={e => (e.currentTarget.style.color = "#facc15")} onMouseOut={e => (e.currentTarget.style.color = "white")}>
            Data sources
          </Link>
        </div>
      </nav>

      {/* ===== MAIN ===== */}
      <main style={{ flex: 1, padding: "24px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="calc-grid">

            {/* ===== LEFT: INPUT PANEL ===== */}
            <div style={{ minWidth: 0 }}>

              {/* Basic Details Card */}
              <div style={{ background: "white", border: "1px solid #dde3f0", borderRadius: "6px", padding: "24px", marginBottom: "16px" }}>

                {/* Amber disclaimer */}
                <div style={{ background: "#fffbeb", borderLeft: "4px solid #f59e0b", padding: "12px 16px", borderRadius: "0 4px 4px 0", marginBottom: "24px" }}>
                  <p style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a1a", marginBottom: "4px" }}>This is just an estimate.</p>
                  <p style={{ fontSize: "13px", color: "#555" }}>
                    Your results are based on the information you provide. Always check with HMRC or a qualified accountant.
                  </p>
                </div>

                <h3 style={{ fontSize: "18px", fontWeight: 700, color: mseBlue, marginBottom: "20px" }}>Basic details</h3>

                {/* Work Status + Age */}
                <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                    <label style={mseLabel}>Work Status</label>
                    <select value={persona} onChange={e => setPersona(e.target.value)} style={mseSelect}>
                      <option value="Employee">Employee</option>
                      <option value="Sole Trader">Sole Trader (Self-Employed)</option>
                      <option value="Director">Company Director</option>
                    </select>
                  </div>
                  <div className="age-field">
                    <label style={mseLabel}>
                      Age
                      {parseInt(age) >= 66 && <span style={{ marginLeft: "8px", fontSize: "11px", fontWeight: 700, background: "#fef3c7", color: "#92400e", padding: "2px 8px", borderRadius: "12px" }}>No NI</span>}
                    </label>
                    <input type="number" min="16" max="120" placeholder="Age" className="placeholder:text-slate-400" value={age} onChange={e => setAge(e.target.value)} style={mseInput} />
                  </div>
                </div>

                {/* Gross Income */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={mseLabel}>Gross (pre-tax) income</label>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 180px", display: "flex", border: inputBorder, borderRadius: "4px", overflow: "hidden", background: inputBg }}>
                      <span style={{ background: "#e8ecf8", padding: "0 14px", display: "flex", alignItems: "center", fontWeight: 700, color: "#273157", fontSize: "16px", borderRight: inputBorder }}>£</span>
                      <input
                        type="number"
                        placeholder="Value"
                        value={grossIncome}
                        onChange={e => setGrossIncome(e.target.value)}
                        style={{ flex: 1, border: "none", background: "transparent", padding: "0 12px", fontSize: "15px", color: "#273157", outline: "none", height: "48px" }}
                      />
                    </div>
                    <select value={payFrequency} onChange={e => setPayFrequency(e.target.value as any)} className="freq-select" style={{ ...mseSelect }}>
                      <option value="Yearly">A year</option>
                      <option value="Monthly">A month</option>
                      <option value="4 Weekly">4 weekly</option>
                      <option value="Weekly">A week</option>
                      <option value="Daily">A day</option>
                    </select>
                  </div>
                </div>

                {/* Tax Year */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={mseLabel}>Tax Year <Info style={{ display: "inline", width: "14px", height: "14px", color: "#888", verticalAlign: "middle", marginLeft: "4px" }} /></label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    {(['2025/26', '2024/25'] as const).map(year => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => setTaxYear(year)}
                        style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          padding: "12px 14px", borderRadius: "4px",
                          border: taxYear === year ? "2px solid #2e54bf" : "2px solid #c8d0e8",
                          background: taxYear === year ? "#ebf0fd" : inputBg,
                          color: taxYear === year ? "#2e54bf" : "#4a4a4a",
                          fontWeight: 600, fontSize: "14px", cursor: "pointer", textAlign: "left",
                          transition: "all 0.15s",
                        }}
                      >
                        <span style={{
                          width: "16px", height: "16px", borderRadius: "50%",
                          border: `2px solid ${taxYear === year ? "#2e54bf" : "#999"}`,
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          {taxYear === year && <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2e54bf" }} />}
                        </span>
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scotland & Wales */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", paddingTop: "12px", borderTop: "1px solid #eef0f7", marginBottom: "20px" }}>
                  {[
                    { id: "scotland", label: "Resident in Scotland?", checked: isScottish, onChange: handleScotlandChange },
                    { id: "wales", label: "Resident in Wales?", checked: isWelsh, onChange: handleWelshChange },
                  ].map(({ id, label, checked, onChange }) => (
                    <label key={id} htmlFor={id} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", fontWeight: 500, color: "#333" }}>
                      <input
                        type="checkbox"
                        id={id}
                        checked={checked}
                        onChange={e => onChange(e.target.checked)}
                        style={{ width: "18px", height: "18px", accentColor: mseBlue, cursor: "pointer" }}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* ===== ADVANCED OPTIONS ===== */}
              <div style={{ background: "white", border: "1px solid #dde3f0", borderRadius: "6px", overflow: "hidden" }}>
                <button
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "16px 24px", background: "white", border: "none", cursor: "pointer",
                    fontWeight: 700, fontSize: "15px", color: "#1a1a1a",
                    borderBottom: advancedOpen ? "1px solid #eef0f7" : "none",
                  }}
                >
                  <span>Advanced options</span>
                  <span style={{ fontSize: "20px", color: "#888", lineHeight: 1 }}>{advancedOpen ? "−" : "+"}</span>
                </button>

                {advancedOpen && (
                  <div style={{ padding: "24px" }}>

                    {/* Tax Code */}
                    <div style={{ marginBottom: "24px" }}>
                      <h4 style={{ fontSize: "16px", fontWeight: 700, color: mseBlue, marginBottom: "14px" }}>Tax Code (optional)</h4>
                      <div style={{ marginBottom: "14px" }}>
                        <label style={mseLabel}>Tax Code</label>
                        <input
                          type="text"
                          placeholder={`e.g. ${isScottish ? 'S1257L' : isWelsh ? 'C1257L' : '1257L'}`}
                          value={taxCode}
                          onChange={e => setTaxCode(e.target.value)}
                          style={mseInput}
                        />
                      </div>
                    </div>

                    {/* Student Loan */}
                    {parseInt(age) <= 65 && (
                      <div style={{ marginBottom: "24px", paddingTop: "20px", borderTop: "1px solid #eef0f7" }}>
                        <h4 style={{ fontSize: "16px", fontWeight: 700, color: mseBlue, marginBottom: "14px" }}>Student Loan</h4>
                        <div style={{ marginBottom: "14px" }}>
                          <label style={mseLabel}>Loan Plan</label>
                          <select value={studentLoanPlan} onChange={e => setStudentLoanPlan(e.target.value as any)} style={mseSelect}>
                            <option value="None">None</option>
                            <option value="Plan 1">Plan 1</option>
                            <option value="Plan 2">Plan 2</option>
                            <option value="Plan 4">Plan 4 (Scotland)</option>
                            <option value="Plan 5">Plan 5</option>
                          </select>
                        </div>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                          <input type="checkbox" checked={hasPostgradLoan} onChange={e => setHasPostgradLoan(e.target.checked)} style={{ width: "18px", height: "18px", accentColor: mseBlue }} />
                          Repaying Postgraduate Loan?
                        </label>
                      </div>
                    )}

                    {/* Pension */}
                    <div style={{ marginBottom: "24px", paddingTop: "20px", borderTop: "1px solid #eef0f7" }}>
                      <h4 style={{ fontSize: "16px", fontWeight: 700, color: mseBlue, marginBottom: "14px" }}>Pension</h4>
                      {persona === 'Sole Trader' ? (
                        <div style={{ display: "flex", gap: "10px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "4px", padding: "12px" }}>
                          <Info style={{ width: "18px", height: "18px", color: "#3b82f6", flexShrink: 0, marginTop: "2px" }} />
                          <p style={{ fontSize: "13px", color: "#1e40af" }}>Sole Traders can only contribute to a Personal Pension (Relief at Source). Employer contributions are not applicable.</p>
                        </div>
                      ) : (
                        <div style={{ marginBottom: "14px" }}>
                          <label style={mseLabel}>Pension Scheme</label>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                            {(['Auto-enrolment', 'Employer', 'Salary sacrifice', 'Personal'] as const).map(scheme => (
                              <button
                                key={scheme}
                                type="button"
                                onClick={() => setPensionScheme(scheme)}
                                style={{
                                  display: "flex", alignItems: "center", gap: "8px",
                                  padding: "10px 12px", borderRadius: "4px",
                                  border: pensionScheme === scheme ? "2px solid #2e54bf" : "2px solid #c8d0e8",
                                  background: pensionScheme === scheme ? "#ebf0fd" : inputBg,
                                  color: pensionScheme === scheme ? "#2e54bf" : "#4a4a4a",
                                  fontWeight: 600, fontSize: "13px", cursor: "pointer", textAlign: "left",
                                }}
                              >
                                <span style={{
                                  width: "14px", height: "14px", borderRadius: "50%", flexShrink: 0,
                                  border: `2px solid ${pensionScheme === scheme ? "#2e54bf" : "#999"}`,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                  {pensionScheme === scheme && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2e54bf" }} />}
                                </span>
                                {scheme}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                        <div style={{ flex: 1 }}>
                          <label style={mseLabel}>Contribution Amount</label>
                          <input type="number" placeholder="e.g. 5" value={pensionValue} onChange={e => setPensionValue(e.target.value)} style={mseInput} />
                        </div>
                        <div style={{ flex: "0 0 120px" }}>
                          <label style={mseLabel}>Type</label>
                          <select value={pensionType} onChange={e => setPensionType(e.target.value as any)} style={mseSelect}>
                            <option value="Percentage">%</option>
                            <option value="Amount">£</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Family & Child Benefit */}
                    <div style={{ marginBottom: "24px", paddingTop: "20px", borderTop: "1px solid #eef0f7" }}>
                      <h4 style={{ fontSize: "16px", fontWeight: 700, color: mseBlue, marginBottom: "14px" }}>Family &amp; Child Benefit</h4>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", marginBottom: "12px" }}>
                        <input type="checkbox" checked={claimsChildBenefit} onChange={e => setClaimsChildBenefit(e.target.checked)} style={{ width: "18px", height: "18px", accentColor: mseBlue }} />
                        Claiming Child Benefit?
                      </label>
                      {claimsChildBenefit && (
                        <div style={{ marginTop: "10px" }}>
                          <label style={mseLabel}>Number of Children</label>
                          <input type="number" min="1" value={numberOfChildren} onChange={e => setNumberOfChildren(e.target.value)} style={{ ...mseInput, maxWidth: "120px" }} />
                        </div>
                      )}
                    </div>

                    {/* Additional Options */}
                    <div style={{ paddingTop: "20px", borderTop: "1px solid #eef0f7" }}>
                      <h4 style={{ fontSize: "16px", fontWeight: 700, color: mseBlue, marginBottom: "14px" }}>Additional Options</h4>

                      {/* Extra Earnings */}
                      <p style={{ fontSize: "11px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Extra Earnings</p>

                      {persona === 'Director' && (
                        <div style={{ marginBottom: "12px" }}>
                          <label style={mseLabel}>Yearly Dividends (£)</label>
                          <input type="number" value={dividendIncome} onChange={e => setDividendIncome(e.target.value)} style={mseInput} />
                        </div>
                      )}
                      {persona !== 'Sole Trader' && (
                        <div style={{ marginBottom: "12px" }}>
                          <label style={mseLabel}>Yearly Bonus (£)</label>
                          <input type="number" value={bonusAmount} onChange={e => setBonusAmount(e.target.value)} style={mseInput} />
                        </div>
                      )}
                      {persona === 'Employee' && (
                        <div style={{ display: "flex", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                          <div style={{ flex: "1 1 140px", minWidth: 0 }}>
                            <label style={mseLabel}>Overtime (hrs/mth)</label>
                            <input type="number" value={overtimeHours} onChange={e => setOvertimeHours(e.target.value)} style={mseInput} />
                          </div>
                          <div style={{ flex: "1 1 140px", minWidth: 0 }}>
                            <label style={mseLabel}>Overtime Rate (£/hr)</label>
                            <input type="number" value={overtimeRate} onChange={e => setOvertimeRate(e.target.value)} style={mseInput} />
                          </div>
                        </div>
                      )}

                      {/* Allowances */}
                      <p style={{ fontSize: "11px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", margin: "16px 0 10px" }}>Allowances &amp; Exemptions</p>
                      {[
                        { id: "no-ni", label: "I do not pay National Insurance", checked: excludeNI, onChange: setExcludeNI },
                        { id: "blind", label: "Eligible for Blind Person's Allowance", checked: isBlind, onChange: setIsBlind },
                        { id: "married", label: "Married & born before 6th April 1935", checked: isMarried, onChange: setIsMarried },
                      ].map(({ id, label, checked, onChange }) => (
                        <label key={id} htmlFor={id} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", marginBottom: "8px" }}>
                          <input type="checkbox" id={id} checked={checked} onChange={e => onChange(e.target.checked)} style={{ width: "18px", height: "18px", accentColor: mseBlue }} />
                          {label}
                        </label>
                      ))}

                      {/* Other Deductions */}
                      <p style={{ fontSize: "11px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", margin: "16px 0 10px" }}>Other Deductions (Monthly)</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        {persona !== 'Sole Trader' && (
                          <div>
                            <label style={mseLabel}>Childcare Vouchers (£)</label>
                            <input type="number" value={childcareVoucher} onChange={e => setChildcareVoucher(e.target.value)} style={mseInput} />
                          </div>
                        )}
                        {persona !== 'Sole Trader' && (
                          <div>
                            <label style={mseLabel}>Give As You Earn (£)</label>
                            <input type="number" value={giveAsYouEarn} onChange={e => setGiveAsYouEarn(e.target.value)} style={mseInput} />
                          </div>
                        )}
                        <div style={{ gridColumn: persona !== 'Sole Trader' ? "1 / -1" : "auto" }}>
                          <label style={mseLabel}>Gift Aid (After tax - £)</label>
                          <input type="number" value={giftAid} onChange={e => setGiftAid(e.target.value)} style={mseInput} />
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
              {/* ===== CALCULATE BUTTON ===== */}
              <div style={{ position: "relative", marginTop: "16px" }}>
                {/* Spark particles */}
                {sparks.map(spark => (
                  <span
                    key={spark.id}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: `${spark.size}px`,
                      height: `${spark.size}px`,
                      borderRadius: spark.size > 6 ? "50%" : "2px",
                      background: spark.color,
                      boxShadow: `0 0 4px ${spark.color}`,
                      pointerEvents: "none",
                      animation: `spark-fly 0.65s ease-out forwards`,
                      animationDelay: `${spark.delay}s`,
                      ['--spark-tx' as string]: `${Math.cos((spark.angle * Math.PI) / 180) * spark.speed}px`,
                      ['--spark-ty' as string]: `${Math.sin((spark.angle * Math.PI) / 180) * spark.speed}px`,
                      zIndex: 50,
                    }}
                  />
                ))}
                <button
                  onClick={() => { fireSparks(); handleCalculate(); }}
                  style={{
                    width: "100%", height: "56px",
                    background: "#c62035", color: "white",
                    fontWeight: 700, fontSize: "18px",
                    border: "none", borderRadius: "6px",
                    cursor: "pointer", letterSpacing: "0.02em",
                    transition: "background 0.15s",
                    position: "relative",
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = "#a01829")}
                  onMouseOut={e => (e.currentTarget.style.background = "#c62035")}
                >
                  Calculate
                </button>
              </div>
            </div>

            {/* ===== RIGHT: RESULTS TABLE ===== */}
            <div style={{ minWidth: 0 }}>
              {breakdown ? (
                <div>

                  {/* Tax Traps Warning */}
                  {(breakdown.taxTraps.personalAllowanceLost > 0 || breakdown.taxTraps.hicbcChargeAmount > 0) && (
                    <div style={{ borderLeft: "4px solid #dc2626", background: "#fef2f2", padding: "16px 20px", borderRadius: "0 4px 4px 0", marginBottom: "20px" }}>
                      <p style={{ fontWeight: 700, fontSize: "15px", color: "#7f1d1d", marginBottom: "8px" }}>⚠️ Tax Traps Detected</p>
                      <ul style={{ paddingLeft: "18px", fontSize: "13px", color: "#7f1d1d", lineHeight: 1.6 }}>
                        {breakdown.taxTraps.personalAllowanceLost > 0 && (
                          <li><strong>60% Marginal Trap:</strong> You've lost <strong>{formatCurrency(breakdown.taxTraps.personalAllowanceLost)}</strong> of your Personal Allowance.</li>
                        )}
                        {breakdown.taxTraps.hicbcChargeAmount > 0 && (
                          <li><strong>Child Benefit Clawback:</strong> Charge of <strong>{formatCurrency(breakdown.taxTraps.hicbcChargeAmount)}</strong>.</li>
                        )}
                      </ul>
                      <p style={{ fontSize: "12px", color: "#991b1b", marginTop: "8px" }}>💡 Allocating more into a pension can help mitigate these traps.</p>
                    </div>
                  )}

                  {/* Results Card */}
                  <div style={{ background: "white", border: "1px solid #dde3f0", borderRadius: "6px", overflow: "hidden" }}>
                    <div style={{ background: "#1e3a8a", padding: "16px 20px" }}>
                      <h2 style={{ color: "white", fontWeight: 700, fontSize: "17px", margin: 0 }}>Your Take Home Pay Results</h2>
                      <p style={{ color: "#bfdbfe", fontSize: "13px", margin: "4px 0 0" }}>Based on tax year {taxYear}</p>
                    </div>

                    <div style={{ overflowX: "auto", maxWidth: "100%" }}>
                      <table style={{ width: "100%", minWidth: "750px", borderCollapse: "collapse", fontSize: "14px", whiteSpace: "nowrap" }}>
                        <thead>
                          <tr style={{ background: "#f5f7fe", borderBottom: "1px solid #dde3f0" }}>
                            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#273157", width: "30%" }}></th>
                            <th style={{ padding: "12px 12px", textAlign: "right", fontWeight: 700, color: "#273157" }}>Yearly</th>
                            <th style={{ padding: "12px 12px", textAlign: "right", fontWeight: 700, color: "#273157", borderLeft: "1px solid #eef0f7" }}>Monthly</th>
                            <th style={{ padding: "12px 12px", textAlign: "right", fontWeight: 700, color: "#273157", borderLeft: "1px solid #eef0f7" }}>4 Weekly</th>
                            <th style={{ padding: "12px 12px", textAlign: "right", fontWeight: 700, color: "#273157", borderLeft: "1px solid #eef0f7" }}>2 Weekly</th>
                            <th style={{ padding: "12px 12px", textAlign: "right", fontWeight: 700, color: "#273157", borderLeft: "1px solid #eef0f7" }}>Weekly</th>
                            <th style={{ padding: "12px 12px", textAlign: "right", fontWeight: 700, color: "#273157", borderLeft: "1px solid #eef0f7" }}>Daily</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Rows helper */}
                          {[
                            { label: "Gross Income", data: breakdown.grossIncome, bold: true, show: true },
                            { label: "+ Overtime", data: breakdown.overtime, bold: false, show: breakdown.overtime.yearly > 0 },
                            { label: "+ Bonus", data: breakdown.bonus, bold: false, show: breakdown.bonus.yearly > 0 },
                            { label: "− Pension", data: breakdown.pension, bold: false, show: breakdown.pension.yearly > 0 },
                            { label: "+ Employer Pension", data: breakdown.employerPension, bold: false, show: breakdown.employerPension.yearly > 0 },
                            { label: "− Childcare Vouchers", data: breakdown.childcareVouchers, bold: false, show: breakdown.childcareVouchers.yearly > 0 },
                            { label: "Taxable Income", data: breakdown.taxableIncome, bold: false, show: true },
                            { label: "− Income Tax", data: breakdown.incomeTax, bold: false, show: true },
                            { label: "− Dividend Tax", data: breakdown.dividendTax, bold: false, show: breakdown.dividendTax.yearly > 0 },
                            { label: "− National Insurance", data: breakdown.nationalInsurance, bold: false, show: true },
                            { label: "− Student Loan", data: breakdown.studentLoan, bold: false, show: breakdown.studentLoan.yearly > 0 },
                          ].filter(r => r.show).map((row, i) => (
                            <tr key={row.label} style={{ background: i % 2 === 0 ? "white" : "#ebf0fd" }}>
                              <td style={{ padding: "11px 16px", fontWeight: row.bold ? 700 : 500, color: "#273157", borderRight: "1px solid #eef0f7" }}>{row.label}</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", fontWeight: row.bold ? 700 : 400, color: "#273157" }}>{formatCurrency(row.data.yearly)}</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", color: "#555", borderLeft: "1px solid #eef0f7" }}>{formatCurrency(row.data.monthly)}</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", color: "#555", borderLeft: "1px solid #eef0f7" }}>{formatCurrency(row.data.fourWeekly)}</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", color: "#555", borderLeft: "1px solid #eef0f7" }}>{formatCurrency(row.data.twoWeekly)}</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", color: "#555", borderLeft: "1px solid #eef0f7" }}>{formatCurrency(row.data.weekly)}</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", color: "#555", borderLeft: "1px solid #eef0f7" }}>{formatCurrency(row.data.daily)}</td>
                            </tr>
                          ))}

                          {/* Child Benefit Charge */}
                          {breakdown.childBenefitCharge.yearly > 0 && (
                            <tr style={{ background: "#fff1f2" }}>
                              <td style={{ padding: "11px 16px", fontWeight: 500, color: "#be123c", borderRight: "1px solid #eef0f7" }}>− Child Benefit Charge</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", color: "#be123c", fontWeight: 600 }}>−{formatCurrency(breakdown.childBenefitCharge.yearly)}</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", color: "#be123c", borderLeft: "1px solid #eef0f7" }}>−{formatCurrency(breakdown.childBenefitCharge.monthly)}</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", color: "#be123c", borderLeft: "1px solid #eef0f7" }}>−{formatCurrency(breakdown.childBenefitCharge.fourWeekly)}</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", color: "#be123c", borderLeft: "1px solid #eef0f7" }}>−{formatCurrency(breakdown.childBenefitCharge.twoWeekly)}</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", color: "#be123c", borderLeft: "1px solid #eef0f7" }}>−{formatCurrency(breakdown.childBenefitCharge.weekly)}</td>
                              <td style={{ padding: "11px 12px", textAlign: "right", color: "#be123c", borderLeft: "1px solid #eef0f7" }}>−{formatCurrency(breakdown.childBenefitCharge.daily)}</td>
                            </tr>
                          )}

                          {/* Take Home — highlighted */}
                          <tr style={{ background: "#d3dcf7", borderTop: "2px solid #2e54bf" }}>
                            <td style={{ padding: "14px 16px", fontWeight: 700, fontSize: "15px", color: "#1e3a8a", borderRight: "1px solid #b0bde8" }}>
                              {taxYear.split('/')[0]} Take Home
                            </td>
                            <td style={{ padding: "14px 12px", textAlign: "right", fontWeight: 700, fontSize: "15px", color: "#1e3a8a" }}>{formatCurrency(breakdown.takeHome.yearly)}</td>
                            <td style={{ padding: "14px 12px", textAlign: "right", fontWeight: 700, color: "#1e3a8a", borderLeft: "1px solid #b0bde8" }}>{formatCurrency(breakdown.takeHome.monthly)}</td>
                            <td style={{ padding: "14px 12px", textAlign: "right", fontWeight: 700, color: "#1e3a8a", borderLeft: "1px solid #b0bde8" }}>{formatCurrency(breakdown.takeHome.fourWeekly)}</td>
                            <td style={{ padding: "14px 12px", textAlign: "right", fontWeight: 700, color: "#1e3a8a", borderLeft: "1px solid #b0bde8" }}>{formatCurrency(breakdown.takeHome.twoWeekly)}</td>
                            <td style={{ padding: "14px 12px", textAlign: "right", fontWeight: 700, color: "#1e3a8a", borderLeft: "1px solid #b0bde8" }}>{formatCurrency(breakdown.takeHome.weekly)}</td>
                            <td style={{ padding: "14px 12px", textAlign: "right", fontWeight: 700, color: "#1e3a8a", borderLeft: "1px solid #b0bde8" }}>{formatCurrency(breakdown.takeHome.daily)}</td>
                          </tr>

                          {/* Next year estimate */}
                          <tr style={{ background: "#f5f7fe" }}>
                            <td style={{ padding: "11px 16px", fontWeight: 500, color: "#888", fontSize: "13px", borderRight: "1px solid #eef0f7" }}>
                              {parseInt(taxYear.split('/')[0]) + 1} estimate
                            </td>
                            <td style={{ padding: "11px 12px", textAlign: "right", color: "#888", fontSize: "13px" }}>{formatCurrency(breakdown.takeHome.yearly)}</td>
                            <td style={{ padding: "11px 12px", textAlign: "right", color: "#888", fontSize: "13px", borderLeft: "1px solid #eef0f7" }}>{formatCurrency(breakdown.takeHome.monthly)}</td>
                            <td style={{ padding: "11px 12px", textAlign: "right", color: "#888", fontSize: "13px", borderLeft: "1px solid #eef0f7" }}>{formatCurrency(breakdown.takeHome.fourWeekly)}</td>
                            <td style={{ padding: "11px 12px", textAlign: "right", color: "#888", fontSize: "13px", borderLeft: "1px solid #eef0f7" }}>{formatCurrency(breakdown.takeHome.twoWeekly)}</td>
                            <td style={{ padding: "11px 12px", textAlign: "right", color: "#888", fontSize: "13px", borderLeft: "1px solid #eef0f7" }}>{formatCurrency(breakdown.takeHome.weekly)}</td>
                            <td style={{ padding: "11px 12px", textAlign: "right", color: "#888", fontSize: "13px", borderLeft: "1px solid #eef0f7" }}>{formatCurrency(breakdown.takeHome.daily)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  minHeight: "400px", background: "white", border: "1px solid #dde3f0", borderRadius: "6px",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: "40px 24px", textAlign: "center",
                }}>
                  <div style={{ position: "relative", width: "200px", height: "200px", marginBottom: "24px" }}>
                    <Image src="/empty-state.png" alt="Illustration" fill style={{ objectFit: "contain" }} priority />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", marginBottom: "10px" }}>Let&#39;s work out your take home pay</h3>
                  <p style={{ color: "#666", maxWidth: "360px", fontSize: "15px", lineHeight: 1.6 }}>
                    Pop your salary details into the form, then hit Calculate. We&#39;ll crunch the numbers and show you exactly what ends up in your pocket.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <style jsx>{`
        /* Desktop: two-column grid */
        @media (min-width: 1024px) {
          .calc-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .hero-pound {
            display: flex !important;
          }
        }

        /* Age field: fixed width on wider screens, full width on mobile */
        .age-field {
          flex: 0 0 130px;
        }
        @media (max-width: 639px) {
          .age-field {
            flex: 1 1 100% !important;
          }
        }

        /* Frequency dropdown: fixed width on wider screens, full width on mobile */
        .freq-select {
          flex: 0 0 150px;
        }
        @media (max-width: 639px) {
          .freq-select {
            flex: 1 1 100% !important;
            width: 100% !important;
          }
        }

        /* Spark animation — uses CSS custom properties set per spark */
        @keyframes spark-fly {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 1;
          }
          70% {
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--spark-tx), var(--spark-ty)) scale(0);
            opacity: 0;
          }
        }
      `}</style>

      {/* ===== FOOTER — matches the dark blue header ===== */}
      <footer style={{ background: "#1e3a8a", color: "white", marginTop: "auto" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "24px", marginBottom: "24px" }}>
            {/* Brand */}
            <div style={{ fontWeight: 800, fontSize: "20px", letterSpacing: "-0.02em" }}>
              <span style={{ color: "#93c5fd" }}>netpay</span><span style={{ color: "#facc15" }}>home</span><span style={{ color: "#93c5fd" }}>.</span>
            </div>
            {/* Links */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 32px" }}>
              {[
                { href: "/about", label: "About Us" },
                { href: "/how-to", label: "How to Use" },
                { href: "/sources", label: "Data Sources" },
                { href: "/privacy", label: "Privacy & Terms" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ color: "#93c5fd", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}
                  onMouseOver={e => (e.currentTarget.style.color = "#facc15")}
                  onMouseOut={e => (e.currentTarget.style.color = "#93c5fd")}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", textAlign: "center" }}>
            &copy; {new Date().getFullYear()} NetPayHome. Designed for accurate UK 2024/2025 &amp; 2025/2026 Salary calculations.
          </p>
        </div>
      </footer>

    </div>
  );
}
