'use client';

import { useState } from 'react';

export default function FinancingCalculator() {
  const [price, setPrice] = useState(5800000);
  const [dpPct, setDpPct] = useState(20);
  const [tenure, setTenure] = useState(48);

  const dpValue = price * (dpPct / 100);
  const principal = price - dpValue;
  const totalInterest = principal * 0.039 * (tenure / 12);
  const monthly = (principal + totalInterest) / tenure;

  const claimPitPass = (car: string, priceStr: string) => {
    alert(`[Scuderia Pit Pass Locked]\n\nChassis: ${car}\nTarget Outlay: ${priceStr}\n\nOur race telemetry pit crew will call your mobile within 15 minutes.`);
  };

  return (
    <section id="section-calculator" className="px-6 lg:px-16 py-16 border-b border-white/10 bg-[#0e0e14]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-black text-red-500 uppercase tracking-widest">// PIT STOP TELEMETRY</span>
          <h2 className="text-3xl font-black italic uppercase mt-1">Pit Wall Financing Sprint</h2>
        </div>

        <div className="p-6 sm:p-8 bg-black/90 border border-white/10 rounded grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl">
          <div className="space-y-4 font-mono">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">SRP Price:</span>
                <span className="text-white font-bold">₱{price.toLocaleString()}</span>
              </div>
              <input type="range" min="2000000" max="15000000" step="200000" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-red-600" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Capital Down:</span>
                <span className="text-red-500 font-bold">{dpPct}% (₱{dpValue.toLocaleString()})</span>
              </div>
              <input type="range" min="15" max="60" step="5" value={dpPct} onChange={(e) => setDpPct(Number(e.target.value))} className="w-full accent-red-600" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Sprint Tenure:</span>
                <span className="text-white font-bold">{tenure} Months</span>
              </div>
              <select value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full bg-[#181822] border border-white/15 text-xs text-white p-2.5 outline-none font-bold">
                <option value="24">24 Months Sprint (2.9% Rate)</option>
                <option value="36">36 Months Sprint (3.4% Rate)</option>
                <option value="48">48 Months Standard (4.1% Rate)</option>
                <option value="60">60 Months Extended (4.8% Rate)</option>
              </select>
            </div>
          </div>

          <div className="p-6 bg-[#161622] border-l-4 border-red-600 text-center">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Estimated Monthly Lap Amortization</span>
            <p className="text-4xl font-black text-red-500 my-2">₱{Math.round(monthly).toLocaleString()}<span className="text-xs text-white"> / mo</span></p>
            <p className="font-body text-xs text-slate-400 mb-4">Underwritten by Tier-1 Philippine automotive finance desks in 15 minutes flat.</p>
            <button onClick={() => claimPitPass('Pit Wall Fast Loan', '₱5,800,000')} className="w-full bg-racing-red hover:bg-red-500 py-3 text-xs font-black uppercase text-white skew-12 transition">
              <span className="unskew-12 inline-block">Pre-Qualify in 15 Minutes</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
