'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Car, 
  Fuel, 
  Gauge, 
  CheckCircle2, 
  Sparkles,
  Phone,
  RefreshCw
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VEHICLES, Vehicle } from '@/data/vehicles';

function VehiclesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialMake = searchParams.get('make') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMake, setSelectedMake] = useState<string>(initialMake);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Extract unique makes from data
  const allMakes = useMemo(() => {
    const set = new Set(VEHICLES.map((v) => v.make));
    return Array.from(set).sort();
  }, []);

  // Filtered and sorted vehicles
  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((car) => {
      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          car.name.toLowerCase().includes(q) ||
          car.make.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.categoryLabel.toLowerCase().includes(q) ||
          car.year.toString().includes(q) ||
          car.description.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Category
      if (selectedCategory !== 'all' && car.category !== selectedCategory) {
        return false;
      }

      // Make
      if (selectedMake !== 'all' && car.make.toLowerCase() !== selectedMake.toLowerCase()) {
        return false;
      }

      // Transmission
      if (selectedTransmission !== 'all') {
        const isAuto = car.transmission.toLowerCase().includes('auto') || car.transmission.toLowerCase().includes('pdk');
        if (selectedTransmission === 'automatic' && !isAuto) return false;
        if (selectedTransmission === 'manual' && isAuto) return false;
      }

      // Fuel
      if (selectedFuel !== 'all') {
        if (selectedFuel === 'diesel' && !car.fuel.toLowerCase().includes('diesel')) return false;
        if (selectedFuel === 'gasoline' && !car.fuel.toLowerCase().includes('gas')) return false;
      }

      // Price Range
      if (selectedPriceRange !== 'all') {
        const price = car.priceNumeric;
        if (selectedPriceRange === 'under-3m' && price >= 3000000) return false;
        if (selectedPriceRange === '3m-6m' && (price < 3000000 || price > 6000000)) return false;
        if (selectedPriceRange === 'above-6m' && price <= 6000000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'price-high') return b.priceNumeric - a.priceNumeric;
      if (sortBy === 'year-newest') return b.year - a.year;
      if (sortBy === 'mileage-lowest') {
        const numA = parseInt(a.mileage.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.mileage.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
      }
      return 0; // default / featured
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedMake,
    selectedPriceRange,
    selectedTransmission,
    selectedFuel,
    sortBy
  ]);

  const hasActiveFilters = 
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedMake !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedTransmission !== 'all' ||
    selectedFuel !== 'all' ||
    sortBy !== 'featured';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMake('all');
    setSelectedPriceRange('all');
    setSelectedTransmission('all');
    setSelectedFuel('all');
    setSortBy('featured');
  };

  const categories = [
    { id: 'all', label: 'All Vehicles', count: VEHICLES.length },
    { id: 'suv', label: 'Family SUVs', count: VEHICLES.filter(v => v.category === 'suv').length },
    { id: 'sedan', label: 'Daily Sedans', count: VEHICLES.filter(v => v.category === 'sedan').length },
    { id: 'truck', label: 'Work & Utility', count: VEHICLES.filter(v => v.category === 'truck').length },
    { id: 'premium', label: 'Premium & Sports', count: VEHICLES.filter(v => v.category === 'premium').length },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        
        {/* Page Banner Header */}
        <section className="relative px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-8 sm:pb-10 border-b border-white/10 bg-gradient-to-b from-[#12121c] via-[#0d0d14] to-[#0a0a0f]">
          <div className="max-w-7xl mx-auto">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-4">
              <Link href="/" className="hover:text-red-400 transition">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Showroom Inventory</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-red-600/15 text-red-400 border border-red-500/25 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono uppercase font-bold rounded mb-2.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Authenticated & LTO Clean Title Guarantee
                </div>
                <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tight text-white">
                  Showroom <span className="text-red-500">Inventory</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
                  Explore Metro Manila&apos;s finest collection of certified luxury, executive, and performance vehicles. Every unit is 200-point audited, cleared of flood damage, and ready for immediate delivery.
                </p>
              </div>

              {/* Quick Contact Badge on Top Right */}
              <div className="bg-[#14141e] border border-white/10 p-3.5 rounded flex items-center gap-3 shrink-0 self-start md:self-auto">
                <div className="w-9 h-9 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[10px] text-slate-400 block uppercase">Sales Concierge</span>
                  <span className="text-xs font-bold text-white">+63 (2) 8877-CARS</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10 text-xs font-mono">
              <div className="bg-black/40 border border-white/5 p-2.5 sm:p-3 rounded">
                <span className="text-slate-400 text-[10px] block uppercase">Units in Stock</span>
                <span className="text-base sm:text-lg font-bold text-white">{VEHICLES.length} Certified Units</span>
              </div>
              <div className="bg-black/40 border border-white/5 p-2.5 sm:p-3 rounded">
                <span className="text-slate-400 text-[10px] block uppercase">Warranty Included</span>
                <span className="text-base sm:text-lg font-bold text-red-400">12 Months</span>
              </div>
              <div className="bg-black/40 border border-white/5 p-2.5 sm:p-3 rounded">
                <span className="text-slate-400 text-[10px] block uppercase">Bank Financing</span>
                <span className="text-base sm:text-lg font-bold text-white">15-Min Pre-Approval</span>
              </div>
              <div className="bg-black/40 border border-white/5 p-2.5 sm:p-3 rounded">
                <span className="text-slate-400 text-[10px] block uppercase">Mechanical Audit</span>
                <span className="text-base sm:text-lg font-bold text-emerald-400">200-Pt Inspection</span>
              </div>
            </div>

          </div>
        </section>

        {/* Filter & Inventory Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          
          {/* Search Bar & Mobile Filter Toggle */}
          <div className="bg-[#111118] border border-white/10 rounded p-4 sm:p-5 mb-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by car make, model, name, or keyword (e.g. Porsche, Everest, V8)..."
                  className="w-full bg-[#181824] border border-white/10 text-xs sm:text-sm text-white pl-10 pr-10 py-3 rounded outline-none focus:border-red-500 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#181824] border border-white/10 px-3 py-2.5 rounded text-xs shrink-0">
                  <span className="text-slate-400 hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-white font-medium outline-none cursor-pointer"
                  >
                    <option value="featured" className="bg-[#181824] text-white">Featured (Default)</option>
                    <option value="price-low" className="bg-[#181824] text-white">Price: Low to High</option>
                    <option value="price-high" className="bg-[#181824] text-white">Price: High to Low</option>
                    <option value="year-newest" className="bg-[#181824] text-white">Year: Newest First</option>
                    <option value="mileage-lowest" className="bg-[#181824] text-white">Mileage: Lowest First</option>
                  </select>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                  className="md:hidden flex items-center justify-center gap-2 bg-[#181824] border border-white/10 px-3.5 py-2.5 rounded text-xs font-semibold text-white"
                >
                  <SlidersHorizontal className="w-4 h-4 text-red-500" />
                  <span>Filters</span>
                </button>
              </div>

            </div>

            {/* Category Pills (Horizontal scroll on mobile) */}
            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-white/10 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-black/50 text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    selectedCategory === cat.id ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Secondary Advanced Filters (Make, Price, Transmission, Fuel) */}
            <div className={`pt-4 mt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 ${
              showFiltersMobile ? 'block' : 'hidden md:grid'
            }`}>
              
              {/* Make / Brand */}
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Make / Brand</label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full bg-[#181824] border border-white/10 text-xs text-white p-2.5 rounded outline-none focus:border-red-500 transition cursor-pointer"
                >
                  <option value="all">All Brands ({allMakes.length})</option>
                  {allMakes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Budget Range</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full bg-[#181824] border border-white/10 text-xs text-white p-2.5 rounded outline-none focus:border-red-500 transition cursor-pointer"
                >
                  <option value="all">Any Price</option>
                  <option value="under-3m">Under ₱3,000,000</option>
                  <option value="3m-6m">₱3,000,000 - ₱6,000,000</option>
                  <option value="above-6m">Above ₱6,000,000</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Transmission</label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="w-full bg-[#181824] border border-white/10 text-xs text-white p-2.5 rounded outline-none focus:border-red-500 transition cursor-pointer"
                >
                  <option value="all">Any Transmission</option>
                  <option value="automatic">Automatic / Dual-Clutch</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Fuel Type</label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full bg-[#181824] border border-white/10 text-xs text-white p-2.5 rounded outline-none focus:border-red-500 transition cursor-pointer"
                >
                  <option value="all">Any Fuel Type</option>
                  <option value="gasoline">Gasoline / Petrol</option>
                  <option value="diesel">Diesel</option>
                </select>
              </div>

            </div>

            {/* Active Filters Bar & Results Counter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-white/5 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span>Showing <strong className="text-white">{filteredVehicles.length}</strong> of {VEHICLES.length} units</span>
                {hasActiveFilters && (
                  <span className="text-red-400">• Filtered results</span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-red-400 hover:text-white transition cursor-pointer text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

          </div>

          {/* Vehicles Grid / Empty State */}
          {filteredVehicles.length === 0 ? (
            <div className="bg-[#111118] border border-white/10 rounded p-12 text-center max-w-xl mx-auto my-12 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-red-600/15 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">No Matching Vehicles Found</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                We couldn&apos;t find any vehicles in our current inventory that match your specific search criteria. Try loosening your filters or search keywords.
              </p>
              <button
                onClick={resetFilters}
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-3 rounded transition cursor-pointer inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Clear All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((car) => (
                <div
                  key={car.id}
                  className="bg-[#111118] border border-white/10 hover:border-red-600/80 transition-all duration-300 rounded overflow-hidden flex flex-col group shadow-xl hover:-translate-y-1.5"
                >
                  
                  {/* Vehicle Image Container */}
                  <div className="h-52 sm:h-56 relative overflow-hidden bg-slate-900">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-red-400 border border-red-500/30 uppercase">
                        {car.badge}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-white border border-white/10">
                        Ending: {car.plateEnding.split(' ')[0]}
                      </span>
                    </div>

                    {/* Bottom Mileage Badge */}
                    <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white bg-black/85 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/10 flex items-center gap-1.5">
                      <Gauge className="w-3 h-3 text-red-500" />
                      <span>{car.mileage}</span>
                    </div>

                    {/* Year pill */}
                    <div className="absolute bottom-3 right-3 text-[11px] font-mono font-bold text-white bg-red-600 px-2.5 py-0.5 rounded">
                      {car.year}
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider block mb-1">
                        {car.categoryLabel}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {car.name}
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {car.color} • {car.trim}
                      </p>

                      {/* Specs Row */}
                      <div className="grid grid-cols-2 gap-2 my-3.5 py-2.5 px-3 bg-[#181824] rounded border border-white/5 text-[11px] text-slate-300">
                        <div className="flex items-center gap-1.5 truncate">
                          <Fuel className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span className="truncate">{car.fuel}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Car className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span className="truncate">{car.transmission.split(' ')[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 block uppercase">Cash Price</span>
                          <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                            {car.price}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-slate-400 block uppercase">Est. Monthly</span>
                          <span className="text-xs sm:text-sm font-semibold text-red-400 font-mono">
                            {car.monthly}
                          </span>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/vehicles/${car.id}`}
                          className="bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-xs py-2.5 px-3 rounded transition text-center flex items-center justify-center gap-1.5 group/btn"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                          href="/#section-testdrive"
                          className="bg-[#181824] hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-semibold text-xs py-2.5 px-3 rounded transition text-center flex items-center justify-center"
                        >
                          Test Drive
                        </Link>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white font-mono text-xs">
        Loading Showroom Inventory...
      </div>
    }>
      <VehiclesContent />
    </Suspense>
  );
}
