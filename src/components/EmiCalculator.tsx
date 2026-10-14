"use client";

import React, { useState } from "react";
import { Calculator, IndianRupee, HelpCircle, CheckCircle } from "lucide-react";
import { formatIndianPrice } from "@/lib/utils";

interface EmiCalculatorProps {
  carPrice: number;
}

export default function EmiCalculator({ carPrice }: EmiCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(9.5);

  const downPaymentAmount = Math.round((carPrice * downPaymentPercent) / 100);
  const loanAmount = carPrice - downPaymentAmount;

  // Monthly EMI Calculation: [P x R x (1+R)^N]/[(1+R)^N-1]
  const tenureMonths = tenureYears * 12;
  const monthlyRate = interestRate / 12 / 100;
  const emi =
    monthlyRate === 0
      ? loanAmount / tenureMonths
      : Math.round(
          (loanAmount *
            monthlyRate *
            Math.pow(1 + monthlyRate, tenureMonths)) /
            (Math.pow(1 + monthlyRate, tenureMonths) - 1)
        );

  const totalPayable = emi * tenureMonths;
  const totalInterest = totalPayable - loanAmount;

  return (
    <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Estimated Monthly EMI Calculator
            </h3>
            <p className="text-[11px] text-slate-500">
              Assisted financing with leading Kerala banks (SBI, HDFC, Federal Bank)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className="space-y-4">
          {/* Down Payment */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="text-blue-700 font-bold">
                {formatIndianPrice(downPaymentAmount)}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>Min 10%</span>
              <span>Max 60%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Loan Tenure</span>
              <span className="text-blue-700 font-bold">
                {tenureYears} Years ({tenureMonths} Months)
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5, 7].slice(0, 5).map((years) => (
                <button
                  key={years}
                  type="button"
                  onClick={() => setTenureYears(years)}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    tenureYears === years
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {years}Y
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Interest Rate</span>
              <span className="text-blue-700 font-bold">{interestRate}% p.a.</span>
            </div>
            <input
              type="range"
              min="8.0"
              max="14.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* EMI Result Card */}
        <div className="bg-white rounded-xl border border-blue-100 p-5 flex flex-col justify-between shadow-xs">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
              Estimated Monthly Payment
            </p>
            <div className="text-3xl font-black text-blue-900 tracking-tight">
              {formatIndianPrice(emi)}
              <span className="text-xs font-medium text-slate-500"> /month</span>
            </div>
          </div>

          <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600 mt-3">
            <div className="flex justify-between">
              <span>Loan Amount:</span>
              <span className="font-semibold text-slate-900">
                {formatIndianPrice(loanAmount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest:</span>
              <span className="font-semibold text-slate-900">
                {formatIndianPrice(totalInterest)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount (P + I):</span>
              <span className="font-semibold text-slate-900">
                {formatIndianPrice(totalPayable)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 mt-2 font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Zero hidden charges • Fast 48h loan approval support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
