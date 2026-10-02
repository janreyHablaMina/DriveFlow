'use client';

import { Car, Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchFilter() {
  const [vehicleClass, setVehicleClass] = useState('all');
  const [price, setPrice] = useState('99999999');
  const [fuel, setFuel] = useState('all');

  const executeSearch = () => {
    alert(`[Search Filter Applied]\nCategory: ${vehicleClass}\nMax Price: ₱${parseInt(price).toLocaleString()}\nFuel Type: ${fuel}\n\nDisplaying matching vehicles in DriveFlow inventory.`);
  };

  return (
    <section id="section-search" className="px-6 lg:px-16 py-12 border-b border-white/10 bg-[#0e0e14]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black italic uppercase tracking-wider text-red-500 flex items-center gap-2">
            <Car className="w-5 h-5" /> Search Our Inventory
          </h2>
          <span className="font-mono text-xs text-slate-500">LIVE SHOWROOM: 48 CERTIFIED VEHICLES IN STOCK</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 bg-black/80 border-l-4 border-red-600 border-t border-r border-b border-white/10">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Vehicle Category</label>
            <select 
              value={vehicleClass}
              onChange={(e) => setVehicleClass(e.target.value)}
              className="w-full bg-[#161620] border border-white/10 text-xs font-bold p-2.5 text-white outline-none focus:border-red-500"
            >
              <option value="all">All Body Styles</option>
              <option value="sports">Sports Cars & Coupes</option>
              <option value="sedan">Executive Sedans</option>
              <option value="suv">Luxury & Mid-Size SUVs</option>
              <option value="ev">Hybrid & All-Electric</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Max Price Budget (PHP)</label>
            <select 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#161620] border border-white/10 text-xs font-bold p-2.5 text-white outline-none focus:border-red-500"
            >
              <option value="99999999">No Ceiling Limit</option>
              <option value="4000000">Under ₱4,000,000</option>
              <option value="6000000">Under ₱6,000,000</option>
              <option value="10000000">Under ₱10,000,000</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Fuel / Powertrain</label>
            <select 
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className="w-full bg-[#161620] border border-white/10 text-xs font-bold p-2.5 text-white outline-none focus:border-red-500"
            >
              <option value="all">All Powertrains</option>
              <option value="turbo">Gasoline Turbocharged</option>
              <option value="v8">V8 High Performance</option>
              <option value="hybrid">Plug-in Hybrid (PHEV)</option>
              <option value="ev">Pure Electric (BEV)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={executeSearch} className="w-full bg-racing-red hover:bg-red-500 py-2.5 text-xs font-black uppercase tracking-wider text-white transition skew-12">
              <span className="unskew-12 flex items-center justify-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> Find Vehicle
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
