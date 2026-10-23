'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  X,
  ArrowUpRight,
  ArrowRight,
  LayoutGrid,
  List,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { VEHICLES } from '@/data/vehicles';

export default function NordicVehiclesCatalog() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredVehicles = useMemo(() => {
    const result = VEHICLES.filter((car) => {
      const matchesSearch =
        !searchQuery.trim() ||
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || car.category === selectedCategory;

      const matchesFuel =
        selectedFuel === 'all' ||
        car.fuel.toLowerCase().includes(selectedFuel.toLowerCase());

      let matchesPrice = true;
      if (priceRange === 'under-1.5m') matchesPrice = car.priceNumeric < 1500000;
      else if (priceRange === '1.5m-2.5m')
        matchesPrice = car.priceNumeric >= 1500000 && car.priceNumeric <= 2500000;
      else if (priceRange === 'above-2.5m') matchesPrice = car.priceNumeric > 2500000;

      return matchesSearch && matchesCategory && matchesFuel && matchesPrice;
    });

    if (sortBy === 'price-asc') {
      return [...result].sort((a, b) => a.priceNumeric - b.priceNumeric);
    }
    if (sortBy === 'price-desc') {
      return [...result].sort((a, b) => b.priceNumeric - a.priceNumeric);
    }
    if (sortBy === 'year-desc') {
      return [...result].sort((a, b) => b.year - a.year);
    }
    return result;
  }, [searchQuery, selectedCategory, selectedFuel, priceRange, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFuel('all');
    setPriceRange('all');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-slate-900">
      {/* Top Editorial Banner */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 bg-[#f1efe9] border-b border-stone-300/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
              <span>CURATED ARCHIVE • MANILA SALON</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
              The Motorcar Collection
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              Every automobile listed below is physically present at our Bonifacio Global City or Circuit Makati studio, complete with 200-point diagnostic documentation.
            </p>
          </div>

          {/* View Switcher & Count */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="text-xs font-mono text-stone-600 bg-white px-3.5 py-2 rounded-full border border-stone-300">
              Showing <strong className="text-slate-900">{filteredVehicles.length}</strong> of {VEHICLES.length} Units
            </span>

            <div className="flex items-center bg-white border border-stone-300 rounded-full p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-slate-900 text-white'
                    : 'text-stone-500 hover:text-slate-900'
                }`}
                title="Gallery Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-full transition cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-slate-900 text-white'
                    : 'text-stone-500 hover:text-slate-900'
                }`}
                title="Editorial Dossier Rows"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Architecture: Sticky Left Sidebar + Right Gallery */}
      <section className="px-4 sm:px-6 lg:px-12 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Filter Atelier (3 Cols) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 bg-white rounded-2xl border border-stone-200/90 p-5 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Filter Specification
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] font-medium text-stone-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-stone-500 block">
                Search Make or Model
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Everest, BMW, Civic..."
                  className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl pl-8 pr-8 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-slate-900"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-stone-400 hover:text-slate-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Classification */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase text-stone-500 block">
                Chassis Classification
              </label>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Motorcars', count: VEHICLES.length },
                  {
                    id: 'suv',
                    label: 'Executive SUVs',
                    count: VEHICLES.filter((v) => v.category === 'suv').length,
                  },
                  {
                    id: 'premium',
                    label: 'Luxury & Sports',
                    count: VEHICLES.filter((v) => v.category === 'premium').length,
                  },
                  {
                    id: 'sedan',
                    label: 'Sport Sedans',
                    count: VEHICLES.filter((v) => v.category === 'sedan').length,
                  },
                  {
                    id: 'truck',
                    label: 'All-Terrain 4x4',
                    count: VEHICLES.filter((v) => v.category === 'truck').length,
                  },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between transition cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-mono ${
                        selectedCategory === cat.id ? 'text-stone-300' : 'text-stone-400'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Bracket */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase text-stone-500 block">
                Price Bracket
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-slate-900 cursor-pointer"
              >
                <option value="all">All Price Tiers</option>
                <option value="under-1.5m">Under ₱1,500,000</option>
                <option value="1.5m-2.5m">₱1,500,000 – ₱2,500,000</option>
                <option value="above-2.5m">Above ₱2,500,000</option>
              </select>
            </div>

            {/* Powertrain Fuel */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase text-stone-500 block">
                Powertrain Fuel
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'diesel', label: 'Diesel' },
                  { id: 'gasoline', label: 'Gasoline' },
                ].map((fuel) => (
                  <button
                    key={fuel.id}
                    type="button"
                    onClick={() => setSelectedFuel(fuel.id)}
                    className={`py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                      selectedFuel === fuel.id
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-[#f8f7f4] border-stone-300 text-stone-600 hover:border-slate-900'
                    }`}
                  >
                    {fuel.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase text-stone-500 block">
                Sort Order
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-slate-900 cursor-pointer"
              >
                <option value="featured">Curated Priority</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Model Year: Newest</option>
              </select>
            </div>
          </aside>

          {/* Right Exhibition Results (9 Cols) */}
          <div className="lg:col-span-9">
            {filteredVehicles.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
                <p className="text-base font-bold text-slate-900">
                  No motorcars match your current filter specification.
                </p>
                <p className="text-xs text-stone-500">
                  Try clearing your search filter or exploring all vehicle classifications.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVehicles.map((car) => (
                  <Link
                    key={car.id}
                    href={`/vehicles/${car.id}`}
                    className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-slate-900 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-60 overflow-hidden bg-stone-100">
                        <img
                          src={car.images[0]}
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-mono uppercase font-bold px-3 py-1 rounded-full border border-stone-200">
                          {car.badge}
                        </div>
                        <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-[10px] font-mono px-3 py-1 rounded-full">
                          {car.mileage}
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                          <span>{car.categoryLabel}</span>
                          <span>
                            {car.fuel} • {car.plateEnding.split(' ')[0]} Plate
                          </span>
                        </div>

                        <h2 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition">
                          {car.name}
                        </h2>

                        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                          {car.engine} • {car.transmission}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-4 bg-[#faf9f6] border-t border-stone-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-xl font-black text-slate-900 font-mono block leading-none">
                          {car.price}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono mt-1 block">
                          Est. {car.monthly}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
                        <span>Inspect Dossier</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Editorial List View */
              <div className="space-y-4">
                {filteredVehicles.map((car) => (
                  <Link
                    key={car.id}
                    href={`/vehicles/${car.id}`}
                    className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-slate-900 transition-all duration-300 hover:shadow-lg flex flex-col sm:flex-row"
                  >
                    <div className="sm:w-72 h-52 sm:h-auto relative overflow-hidden bg-stone-100 shrink-0">
                      <img
                        src={car.images[0]}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 text-slate-900 text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full">
                        {car.badge}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                          <span>
                            {car.categoryLabel} • {car.year}
                          </span>
                          <span>{car.mileage}</span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                          {car.name}
                        </h2>
                        <p className="text-xs text-stone-600 line-clamp-2">
                          {car.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                        <div>
                          <span className="text-xl font-black text-slate-900 font-mono">
                            {car.price}
                          </span>
                          <span className="text-xs text-stone-500 font-mono ml-2">
                            ({car.monthly})
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900">
                          <span>Open Dossier</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

