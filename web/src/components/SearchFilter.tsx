'use client';

import { Car, Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchFilter() {
  const [make, setMake] = useState('all');
  const [bodyType, setBodyType] = useState('all');
  const [budget, setBudget] = useState('any');

  const executeSearch = () => {
    alert(`[Search Filter Applied]\nMake: ${make}\nBody Type: ${bodyType}\nBudget: ${budget}\n\nDisplaying matching vehicles in DriveFlow inventory.`);
  };

  return (
    <section id="section-search" className="px-6 lg:px-16 py-12 border-b border-white/10 bg-black relative">
      <div className="max-w-6xl mx-auto relative z-10 shadow-2xl">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-black italic uppercase tracking-wider text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-red-500" /> Advanced Inventory Search
            </h2>
            <span className="font-mono text-[10px] px-3 py-1.5 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full font-semibold">
              48+ CERTIFIED VEHICLES IN STOCK
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-wider">Make / Brand</label>
              <select 
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full bg-[#12121a] border border-white/10 text-sm font-semibold p-3 text-white outline-none focus:border-red-500 rounded-sm hover:bg-[#1a1a24] transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Brands</option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda</option>
                <option value="ford">Ford</option>
                <option value="mitsubishi">Mitsubishi</option>
                <option value="nissan">Nissan</option>
                <option value="bmw">BMW</option>
                <option value="mercedes">Mercedes-Benz</option>
                <option value="porsche">Porsche</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-wider">Body Type</label>
              <select 
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="w-full bg-[#12121a] border border-white/10 text-sm font-semibold p-3 text-white outline-none focus:border-red-500 rounded-sm hover:bg-[#1a1a24] transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Body Styles</option>
                <option value="suv">SUV & Crossover</option>
                <option value="sedan">Sedan</option>
                <option value="hatchback">Hatchback</option>
                <option value="pickup">Pickup Truck</option>
                <option value="van">Van / MPV</option>
                <option value="coupe">Sports Coupe</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-wider">Max Budget</label>
              <select 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-[#12121a] border border-white/10 text-sm font-semibold p-3 text-white outline-none focus:border-red-500 rounded-sm hover:bg-[#1a1a24] transition-colors appearance-none cursor-pointer"
              >
                <option value="any">No Maximum Budget</option>
                <option value="500000">Under ₱500,000</option>
                <option value="1000000">Under ₱1,000,000</option>
                <option value="1500000">Under ₱1,500,000</option>
                <option value="2500000">Under ₱2,500,000</option>
                <option value="premium">Premium (₱3M+)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={executeSearch} className="w-full h-[46px] bg-racing-red hover:bg-white hover:text-black text-white text-xs font-black uppercase tracking-wider transition-all rounded-sm flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                <span>Search Vehicles</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
