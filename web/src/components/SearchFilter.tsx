'use client';

import { Gauge, Zap } from 'lucide-react';
import { useState } from 'react';

export default function SearchFilter() {
  const [raceClass, setRaceClass] = useState('all');
  const [price, setPrice] = useState('99999999');

  const executePitSearch = () => {
    alert(`[Pit Wall Filter Applied]\nClass: ${raceClass}\nPrice Cap: ₱${parseInt(price).toLocaleString()}\n\nDisplaying matching pole position allocations.`);
  };

  return (
    <section id="section-search" className="px-6 lg:px-16 py-12 border-b border-white/10 bg-[#0e0e14]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black italic uppercase tracking-wider text-red-500 flex items-center gap-2">
            <Gauge className="w-5 h-5" /> Pit Wall Vehicle Filter
          </h2>
          <span className="font-mono text-xs text-slate-500">GRID SYNC: 32 ACTIVE HIGH-SPEED PLATFORMS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 bg-black/80 border-l-4 border-red-600 border-t border-r border-b border-white/10">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Motorsport Chassis Class</label>
            <select 
              value={raceClass}
              onChange={(e) => setRaceClass(e.target.value)}
              className="w-full bg-[#161620] border border-white/10 text-xs font-bold p-2.5 text-white outline-none focus:border-red-500"
            >
              <option value="all">All Racing Divisions</option>
              <option value="gt3">GT3 Homologations</option>
              <option value="cupsport">Trackday Coupés</option>
              <option value="suv">Competition SUVs</option>
              <option value="ev">Formula Torque EVs</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Max Capital Outlay (PHP)</label>
            <select 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#161620] border border-white/10 text-xs font-bold p-2.5 text-white outline-none focus:border-red-500"
            >
              <option value="99999999">No Ceiling Limit</option>
              <option value="5000000">Under ₱5,000,000</option>
              <option value="8000000">Under ₱8,000,000</option>
              <option value="12000000">Under ₱12,000,000</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Horsepower Bracket</label>
            <select className="w-full bg-[#161620] border border-white/10 text-xs font-bold p-2.5 text-white outline-none focus:border-red-500">
              <option>All Output Tiers</option>
              <option>500+ BHP Clubsport</option>
              <option>700+ BHP Extreme Output</option>
              <option>Sub-3.0s 0-100 KPH</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={executePitSearch} className="w-full bg-racing-red hover:bg-red-500 py-2.5 text-xs font-black uppercase tracking-wider text-white transition skew-12">
              <span className="unskew-12 flex items-center justify-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-current" /> Filter Paddock
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
