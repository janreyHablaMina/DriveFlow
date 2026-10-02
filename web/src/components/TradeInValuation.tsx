'use client';

import { ArrowRight, Calculator, Check, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function TradeInValuation() {
  const [make, setMake] = useState('BMW');
  const [year, setYear] = useState('2022');
  const [mileage, setMileage] = useState('under30k');
  const [condition, setCondition] = useState('excellent');

  // Dynamic estimate calculator
  const calculateEstimate = () => {
    let base = 2500000;
    if (make === 'Porsche') base = 5500000;
    if (make === 'Mercedes-Benz') base = 3200000;
    if (make === 'Audi') base = 2800000;
    if (make === 'Lexus') base = 2600000;
    if (make === 'Toyota') base = 1600000;

    const yearFactor = 1 + (Number(year) - 2020) * 0.08;
    const mileageFactor = mileage === 'under15k' ? 1.1 : mileage === 'under30k' ? 1.0 : mileage === 'under50k' ? 0.9 : 0.8;
    const conditionFactor = condition === 'mint' ? 1.08 : condition === 'excellent' ? 1.0 : 0.92;

    const est = Math.round((base * yearFactor * mileageFactor * conditionFactor) / 50000) * 50000;
    const low = Math.round(est * 0.95);
    const high = Math.round(est * 1.05);

    return {
      low: low.toLocaleString(),
      high: high.toLocaleString(),
    };
  };

  const estimate = calculateEstimate();

  const handleTradeLock = () => {
    alert(`[Trade-In Valuation Submitted]\nVehicle: ${year} ${make}\nMileage: ${mileage}\nCondition: ${condition}\nEstimated Value: ₱${estimate.low} – ₱${estimate.high}\n\nOur appraisal team will reach out to confirm your complimentary on-site physical inspection!`);
  };

  return (
    <section id="section-tradein" className="px-6 lg:px-16 py-16 border-b border-white/10 bg-carbon">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black text-red-500 uppercase tracking-widest">// INSTANT VEHICLE APPRAISAL</span>
          <h2 className="text-3xl sm:text-4xl font-black italic uppercase mt-1">Trade-In Or Sell Your Vehicle</h2>
          <p className="font-body text-xs sm:text-sm text-slate-400 mt-3">
            Upgrade your drive seamlessly. Receive top-tier market valuation for your luxury, sports, or premium vehicle with zero stress, instant equity rollout, or same-day direct payout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Appraisal Selector */}
          <div className="lg:col-span-7 bg-black/80 border border-white/15 p-6 sm:p-8 rounded shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-red-500" />
              <h3 className="text-base sm:text-lg font-black uppercase text-white">60-Second Valuation Estimator</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Vehicle Make</label>
                <select 
                  value={make} 
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full bg-[#161622] border border-white/15 text-xs font-bold text-white p-3 outline-none focus:border-red-500"
                >
                  <option value="BMW">BMW</option>
                  <option value="Porsche">Porsche</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Audi">Audi</option>
                  <option value="Lexus">Lexus</option>
                  <option value="Toyota">Toyota</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Model Year</label>
                <select 
                  value={year} 
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-[#161622] border border-white/15 text-xs font-bold text-white p-3 outline-none focus:border-red-500"
                >
                  <option value="2025">2025 (Latest Spec)</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Current Mileage</label>
                <select 
                  value={mileage} 
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full bg-[#161622] border border-white/15 text-xs font-bold text-white p-3 outline-none focus:border-red-500"
                >
                  <option value="under15k">Under 15,000 KM (Low Mileage)</option>
                  <option value="under30k">15,000 – 30,000 KM</option>
                  <option value="under50k">30,000 – 50,000 KM</option>
                  <option value="over50k">Above 50,000 KM</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Overall Condition</label>
                <select 
                  value={condition} 
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-[#161622] border border-white/15 text-xs font-bold text-white p-3 outline-none focus:border-red-500"
                >
                  <option value="mint">Showroom / Pristine (No Scratches)</option>
                  <option value="excellent">Excellent (Minor Wear)</option>
                  <option value="good">Good (Normal Daily Use)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-red-500" /> Free on-site inspection
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-red-500" /> Same-day LTO transfer
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-red-500" /> Direct bank wire payout
              </span>
            </div>
          </div>

          {/* Right Column: Live Valuation Card & Action */}
          <div className="lg:col-span-5 bg-[#14141e] border-2 border-red-600 p-6 sm:p-8 rounded text-center shadow-2xl relative overflow-hidden">
            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest skew-12 inline-block mb-3">
              <span className="unskew-12 inline-block flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> ESTIMATED TRADE VALUE
              </span>
            </span>

            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-1">
              {year} {make} ({condition.toUpperCase()} COND.)
            </p>

            <div className="my-5">
              <p className="text-3xl sm:text-4xl font-black text-white">
                ₱{estimate.low} <span className="text-red-500">–</span> ₱{estimate.high}
              </p>
              <span className="text-[11px] font-mono text-slate-400 block mt-1">Estimated Philippine Wholesale Market Equity</span>
            </div>

            <div className="p-3 bg-black/60 border border-white/10 rounded mb-6 text-left space-y-1.5 text-xs text-slate-300 font-body">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-500 shrink-0" />
                <span>Apply as 100% down payment toward any inventory vehicle</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                <span>Zero hassle with selling privately or dealing with buyers</span>
              </div>
            </div>

            <button 
              onClick={handleTradeLock}
              className="w-full bg-racing-red hover:bg-red-500 py-3.5 text-xs font-black uppercase text-white skew-12 transition glow-red-sm"
            >
              <span className="unskew-12 flex items-center justify-center gap-2">
                Lock In Trade-In Appraisal <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
