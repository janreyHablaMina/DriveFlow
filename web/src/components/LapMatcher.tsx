'use client';

import { useState } from 'react';

export default function LapMatcher() {
  const [budget, setBudget] = useState(85000);

  const getMatchedCar = () => {
    if (budget < 70000) return '2026 Alfa Quadrifoglio Racing (₱4,950,000)';
    if (budget < 110000) return '2026 Scuderia M4 CSL (₱5,800,000)';
    if (budget < 150000) return '2026 RS6 V8 Competition Avant (₱7,600,000)';
    return '2026 GT3 RS Clubsport Spec (₱9,200,000)';
  };

  const claimPitPass = () => {
    alert(`[Scuderia Pit Pass Locked]\n\nChassis: Matched Lap Allocation\nTarget Outlay: ₱5,800,000\n\nOur race telemetry pit crew will call your mobile within 15 minutes.`);
  };

  return (
    <section className="px-6 lg:px-16 py-14 border-b border-white/10 bg-carbon">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs font-black uppercase text-red-500 tracking-widest">// ALGORITHMIC TELEMETRY</span>
        <h2 className="text-3xl font-black italic uppercase mt-1 mb-4">Target Your Monthly Pit Window</h2>
        <p className="font-body text-xs text-slate-400 mb-6">Select your planned monthly amortization to identify available track platforms instantly.</p>
        
        <div className="p-6 bg-black/80 border border-red-600/40 rounded">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">MONTHLY LAP BUDGET</span>
            <span className="text-2xl font-black text-red-500">₱{budget.toLocaleString()} / month</span>
          </div>
          <input type="range" min="40000" max="200000" step="5000" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full accent-red-600 mb-4" />
          <div className="p-4 bg-[#14141c] border border-white/10 text-left flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-red-500 block uppercase">Matched Track Weapon</span>
              <p className="font-black text-white text-base">{getMatchedCar()}</p>
            </div>
            <button onClick={claimPitPass} className="bg-red-600 hover:bg-red-500 text-white font-black text-xs px-4 py-2 uppercase skew-12">
              <span className="unskew-12 inline-block">Lock Car</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
