'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Eye } from 'lucide-react';
import { VEHICLES } from '@/data/vehicles';
import AnimateOnScroll from './AnimateOnScroll';

export default function Grid() {
  const [activeTab, setActiveTab] = useState<'all' | 'suv' | 'sedan' | 'truck' | 'premium'>('all');
  const [showAll, setShowAll] = useState(false);

  // Listen for category selection events from CategoryBrowser or external triggers
  useEffect(() => {
    const handleCategoryFilter = (e: any) => {
      const cat = e.detail?.toLowerCase();
      setShowAll(false);
      if (cat?.includes('suv')) setActiveTab('suv');
      else if (cat?.includes('commuter') || cat?.includes('sedan')) setActiveTab('sedan');
      else if (cat?.includes('utility') || cat?.includes('truck') || cat?.includes('work')) setActiveTab('truck');
      else if (cat?.includes('premium') || cat?.includes('luxury')) setActiveTab('premium');
      else setActiveTab('all');
    };

    window.addEventListener('filter-inventory', handleCategoryFilter);
    return () => window.removeEventListener('filter-inventory', handleCategoryFilter);
  }, []);

  const handleTabChange = (tab: 'all' | 'suv' | 'sedan' | 'truck' | 'premium') => {
    setActiveTab(tab);
    setShowAll(false);
  };

  const filteredVehicles = activeTab === 'all' 
    ? VEHICLES 
    : VEHICLES.filter((v) => v.category === activeTab);

  const displayedVehicles = showAll ? filteredVehicles : filteredVehicles.slice(0, 6);

  const handleBookTestDrive = (vehicleName: string) => {
    const testDriveSection = document.getElementById('section-testdrive');
    if (testDriveSection) {
      testDriveSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const carInput = testDriveSection.querySelector('input[placeholder*="Ford Everest"]') as HTMLInputElement;
        if (carInput) {
          carInput.value = vehicleName;
          carInput.focus();
        }
      }, 500);
    }
  };

  return (
    <section id="section-inventory" className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 border-b border-white/10 bg-[#08080c] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Entrance Animation */}
        <AnimateOnScroll direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 gap-3 sm:gap-4">
            <div>
              <span className="text-[11px] sm:text-xs font-black uppercase text-red-500 tracking-widest block mb-1">
                // VERIFIED DEALERSHIP INVENTORY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase text-white">
                Vehicles For Sale
              </h2>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="text-xs font-mono px-3 py-1.5 bg-red-600/10 border border-red-600/30 text-red-400 font-bold rounded-full">
                {filteredVehicles.length} Units In Stock
              </span>
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                100% LTO Certified & Clean Title
              </span>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Category Tabs - Horizontally scrollable on mobile */}
        <div className="flex items-center gap-2 mb-8 sm:mb-10 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => handleTabChange('all')}
            className={`shrink-0 whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
              activeTab === 'all'
                ? 'bg-racing-red text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-black/60 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            All Vehicles ({VEHICLES.length})
          </button>
          <button
            onClick={() => handleTabChange('suv')}
            className={`shrink-0 whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
              activeTab === 'suv'
                ? 'bg-racing-red text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-black/60 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            Family SUVs ({VEHICLES.filter(v => v.category === 'suv').length})
          </button>
          <button
            onClick={() => handleTabChange('sedan')}
            className={`shrink-0 whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
              activeTab === 'sedan'
                ? 'bg-racing-red text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-black/60 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            Daily Commuters ({VEHICLES.filter(v => v.category === 'sedan').length})
          </button>
          <button
            onClick={() => handleTabChange('truck')}
            className={`shrink-0 whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
              activeTab === 'truck'
                ? 'bg-racing-red text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-black/60 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            Work & Utility ({VEHICLES.filter(v => v.category === 'truck').length})
          </button>
          <button
            onClick={() => handleTabChange('premium')}
            className={`shrink-0 whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
              activeTab === 'premium'
                ? 'bg-racing-red text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-black/60 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            Premium ({VEHICLES.filter(v => v.category === 'premium').length})
          </button>
        </div>

        {/* Vehicles Grid - Staggered entrance & Hover Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedVehicles.map((car, idx) => (
            <AnimateOnScroll key={car.id} delay={idx * 80} direction="up">
              <div 
                className="bg-[#101017] border border-white/10 hover:border-red-600/80 transition-all duration-500 rounded-sm overflow-hidden flex flex-col group shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:-translate-y-2 h-full"
              >
                {/* Image & Badges */}
                <Link href={`/vehicles/${car.id}`} className="block relative h-48 sm:h-56 bg-slate-900 overflow-hidden cursor-pointer">
                  <img 
                    src={car.images[0]} 
                    alt={car.name} 
                    className="w-full h-full object-cover image-hover-zoom" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101017] via-transparent to-black/30"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="bg-racing-red text-white text-[9px] font-black uppercase px-2.5 py-1 tracking-wider rounded-sm shadow-md transition-transform group-hover:scale-105">
                      {car.badge}
                    </span>
                  </div>
                  
                  <span className="absolute bottom-3 right-3 text-[10px] font-mono font-bold bg-black/80 backdrop-blur-sm text-slate-300 px-2.5 py-1 rounded border border-white/10">
                    {car.categoryLabel}
                  </span>
                </Link>

                {/* Card Body */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/vehicles/${car.id}`}>
                      <h3 className="font-black text-base sm:text-lg text-white uppercase group-hover:text-red-500 transition-colors leading-snug line-clamp-1 cursor-pointer">
                        {car.name}
                      </h3>
                    </Link>
                    <p className="text-slate-400 text-xs font-body mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed">
                      {car.description}
                    </p>
                  </div>

                  {/* Price and Action Buttons */}
                  <div className="pt-3.5 sm:pt-4 border-t border-white/10 mt-5 sm:mt-6">
                    <div className="flex items-baseline justify-between mb-3.5 sm:mb-4">
                      <div>
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Outright Cash Price</span>
                        <span className="text-xl sm:text-2xl font-black text-red-500 tracking-tight">{car.price}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Est. Loan</span>
                        <span className="text-xs font-bold text-slate-300 font-mono">{car.monthly}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link 
                        href={`/vehicles/${car.id}`}
                        className="w-full py-2.5 sm:py-3 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-bold uppercase transition rounded-sm border border-white/10 flex items-center justify-center gap-1.5 text-center"
                      >
                        <Eye className="w-3.5 h-3.5" /> Full Specs
                      </Link>
                      <button 
                        onClick={() => handleBookTestDrive(car.name)}
                        className="button-shimmer w-full py-2.5 sm:py-3 bg-racing-red hover:bg-white hover:text-black text-white text-xs font-black uppercase transition-all duration-300 rounded-sm shadow-md flex items-center justify-center gap-1 group/btn cursor-pointer"
                      >
                        <span>Book Drive</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* View All Call To Action */}
        {filteredVehicles.length > 6 && (
          <AnimateOnScroll direction="up" delay={200}>
            <div className="mt-8 sm:mt-12 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="button-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-racing-red text-white border border-white/15 hover:border-red-600 px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-sm shadow-xl group cursor-pointer"
              >
                <span>{showAll ? 'Show Fewer Vehicles' : `Explore All Inventory (${filteredVehicles.length} Units)`}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 mt-2.5 sm:mt-3">
                Showing {displayedVehicles.length} of {filteredVehicles.length} certified vehicles ready for immediate release
              </p>
            </div>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
