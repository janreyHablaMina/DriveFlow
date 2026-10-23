'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Calendar,
  MapPin,
  Phone,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Fuel,
  Award,
  Clock,
} from 'lucide-react';
import { VEHICLES } from '@/data/vehicles';

export default function NordicHome() {
  // Hero Spotlight Switcher
  const spotlightCars = useMemo(() => VEHICLES.slice(0, 4), []);
  const [heroIndex, setHeroIndex] = useState(0);
  const activeHeroCar = spotlightCars[heroIndex] || VEHICLES[0];

  // Curated Collection Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Financing Simulator
  const [calcVehicleId, setCalcVehicleId] = useState(VEHICLES[0].id);
  const [calcDpPercent, setCalcDpPercent] = useState(30);
  const [calcTermMonths, setCalcTermMonths] = useState(48);

  // Private Viewing Booking State
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState(VEHICLES[0].name);
  const [bookingStudio, setBookingStudio] = useState('Bonifacio Global City Salon');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((v) => {
      const matchesCat = selectedCategory === 'all' || v.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    }).slice(0, 6);
  }, [selectedCategory, searchQuery]);

  // Financing Calculations
  const selectedCalcCar = VEHICLES.find((v) => v.id === calcVehicleId) || VEHICLES[0];
  const dpAmount = Math.round((selectedCalcCar.priceNumeric * calcDpPercent) / 100);
  const loanPrincipal = selectedCalcCar.priceNumeric - dpAmount;
  const monthlyRate = 0.088 / 12;
  const estimatedMonthly = Math.round(
    (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, calcTermMonths))) /
      (Math.pow(1 + monthlyRate, calcTermMonths) - 1)
  );

  const faqs = [
    {
      q: 'How does the 200-Point Provenance Certification work?',
      a: 'Every motorcar entering the DriveFlow Atelier undergoes a comprehensive 200-point diagnostic, paint-depth micrometer scan, underchassis inspection, and full LTO/HPG legal verification to guarantee zero flood or structural history.',
    },
    {
      q: 'Can I arrange a private viewing at my residence or office in Metro Manila?',
      a: 'Yes. Our Private Concierge program can transport any vehicle in our collection to your residence or corporate office in Makati, BGC, Ortigas, or Alabang for an unhurried inspection.',
    },
    {
      q: 'How fast is bank financing approval through your partner institutions?',
      a: 'Through our priority executive desks at BDO, BPI, Security Bank, and EastWest, complete applications typically receive credit decisions within 24 to 48 business hours.',
    },
    {
      q: 'Do you accept trade-ins toward a new acquisition?',
      a: 'Absolutely. We conduct transparent, fair-market appraisals on casa-maintained vehicles and can apply the full equity directly as your down payment.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* ===================== 1. ASYMMETRIC EDITORIAL MAGAZINE HERO ===================== */}
      <section className="px-4 sm:px-6 lg:px-12 pt-8 pb-16 lg:py-20 border-b border-stone-200/90">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Architectural Typography & Search (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-200/80 border border-stone-300 text-[11px] font-mono uppercase tracking-widest text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
              <span>2026 Curated Collection • Manila</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.04]">
              Automotive Architecture,{' '}
              <span className="font-light italic text-stone-500">Curated for Distinction.</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
              An editorial approach to pre-owned luxury and executive motorcars. Every vehicle in our Bonifacio Global City and Makati salons is 200-point certified with verified provenance.
            </p>

            {/* Quick Editorial Search Bar */}
            <div className="bg-white p-2 rounded-2xl border border-stone-300/90 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl">
              <div className="flex items-center gap-2.5 pl-3 flex-1">
                <Search className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Porsche, Land Cruiser, BMW, Civic..."
                  className="w-full text-xs sm:text-sm text-slate-900 placeholder-stone-400 bg-transparent focus:outline-hidden py-2"
                />
              </div>
              <Link
                href={searchQuery ? `/vehicles?q=${encodeURIComponent(searchQuery)}` : '/vehicles'}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shrink-0"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Key Provenance Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200 max-w-lg">
              <div>
                <div className="text-2xl font-black text-slate-900 font-mono">200+</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Diagnostic Checkpoints</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 font-mono">100%</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Flood-Free & HPG Cleared</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 font-mono">24h</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Priority Bank Underwriting</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Gallery Showcase Frame (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-stone-200/90 p-4 sm:p-5 shadow-xl shadow-stone-900/5 space-y-4">
              {/* Top Frame Header */}
              <div className="flex items-center justify-between text-xs px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="font-mono uppercase tracking-wider text-[11px] text-stone-500">
                    ATELIER SPOTLIGHT 0{heroIndex + 1} / 0{spotlightCars.length}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setHeroIndex((prev) => (prev - 1 + spotlightCars.length) % spotlightCars.length)
                    }
                    className="w-8 h-8 rounded-full border border-stone-200 hover:border-slate-900 flex items-center justify-center text-slate-700 transition cursor-pointer"
                    aria-label="Previous spotlight vehicle"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroIndex((prev) => (prev + 1) % spotlightCars.length)}
                    className="w-8 h-8 rounded-full border border-stone-200 hover:border-slate-900 flex items-center justify-center text-slate-700 transition cursor-pointer"
                    aria-label="Next spotlight vehicle"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Vehicle Image */}
              <Link
                href={`/vehicles/${activeHeroCar.id}`}
                className="block relative h-[280px] sm:h-[340px] rounded-2xl overflow-hidden bg-stone-100 group"
              >
                <img
                  src={activeHeroCar.images[0]}
                  alt={activeHeroCar.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-mono uppercase font-bold px-3 py-1 rounded-full border border-stone-200">
                  {activeHeroCar.badge}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-full">
                  {activeHeroCar.mileage}
                </div>
              </Link>

              {/* Bottom Dossier Summary */}
              <div className="pt-1 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                    {activeHeroCar.categoryLabel} • {activeHeroCar.fuel}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                    {activeHeroCar.name}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {activeHeroCar.engine} • {activeHeroCar.transmission}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                  <div className="text-left sm:text-right">
                    <span className="text-xl font-black text-slate-900 font-mono block">
                      {activeHeroCar.price}
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      Est. {activeHeroCar.monthly}
                    </span>
                  </div>
                  <Link
                    href={`/vehicles/${activeHeroCar.id}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:underline underline-offset-4"
                  >
                    <span>Open Dossier</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 2. ARCHITECTURAL BENTO CATEGORY GRID ===================== */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
                01 / CLASSIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                Browse by Architectural Class
              </h2>
            </div>
            <Link
              href="/vehicles"
              className="text-xs font-semibold text-slate-900 hover:text-stone-600 flex items-center gap-1.5"
            >
              <span>View Complete Catalog ({VEHICLES.length} Motorcars)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                key: 'suv',
                title: 'Executive SUVs',
                subtitle: 'Commanding presence & 7-seat versatility',
                count: VEHICLES.filter((v) => v.category === 'suv').length,
                image:
                  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=700&q=80',
              },
              {
                key: 'premium',
                title: 'Luxury & Bespoke',
                subtitle: 'Continental grand tourers & flagship saloons',
                count: VEHICLES.filter((v) => v.category === 'premium').length,
                image:
                  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=700&q=80',
              },
              {
                key: 'sedan',
                title: 'Sport Sedans',
                subtitle: 'Refined daily agility & executive efficiency',
                count: VEHICLES.filter((v) => v.category === 'sedan').length,
                image:
                  'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=700&q=80',
              },
              {
                key: 'truck',
                title: 'All-Terrain 4x4',
                subtitle: 'Engineered utility & off-road capability',
                count: VEHICLES.filter((v) => v.category === 'truck').length,
                image:
                  'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=700&q=80',
              },
            ].map((cat) => (
              <Link
                key={cat.key}
                href={`/vehicles?category=${cat.key}`}
                className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-slate-900 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-slate-900">
                    {cat.count} Units
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{cat.title}</h3>
                    <p className="text-[11px] text-stone-500 mt-0.5">{cat.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 3. CURATED SHOWROOM COLLECTION ===================== */}
      <section id="section-inventory" className="px-4 sm:px-6 lg:px-12 py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
                02 / CURRENT EXHIBITION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                Curated Showroom Fleet
              </h2>
            </div>

            {/* Pill Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Motorcars' },
                { id: 'suv', label: 'SUVs' },
                { id: 'premium', label: 'Luxury' },
                { id: 'sedan', label: 'Sedans' },
                { id: 'truck', label: 'Pickups' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-stone-300 text-stone-600 hover:border-slate-900 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Editorial Gallery Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((car) => (
              <Link
                key={car.id}
                href={`/vehicles/${car.id}`}
                className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-slate-900 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-mono uppercase font-bold px-3 py-1 rounded-full border border-stone-200">
                      {car.badge}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded-full">
                      {car.year} • {car.mileage}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                      <span>{car.categoryLabel}</span>
                      <span>{car.fuel}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1">
                      {car.name}
                    </h3>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {car.description}
                    </p>
                  </div>
                </div>

                {/* Price & Action Footer */}
                <div className="px-5 py-4 bg-[#faf9f6] border-t border-stone-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-slate-900 font-mono block leading-none">
                      {car.price}
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono mt-1 block">
                      {car.monthly}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
                    <span>View Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition shadow-sm"
            >
              <span>Explore Full Curated Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== 4. INTERACTIVE NORDIC FINANCING ATELIER ===================== */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-[#f1efe9] border-b border-stone-300/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Explanation & Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
                03 / TAILORED ACQUISITION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                Bespoke Financing Simulator
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
                Structure your acquisition with transparent terms. Select any motorcar from our showroom to calculate your equity and monthly amortization across our partner private banks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 space-y-5 shadow-xs">
              {/* Vehicle Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">
                  Select Motorcar from Collection
                </label>
                <select
                  value={calcVehicleId}
                  onChange={(e) => setCalcVehicleId(e.target.value)}
                  className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-slate-900 cursor-pointer"
                >
                  {VEHICLES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} — {v.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Down Payment Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-700">Down Payment Equity ({calcDpPercent}%)</span>
                  <span className="font-mono font-bold text-slate-900">
                    ₱{dpAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={60}
                  step={5}
                  value={calcDpPercent}
                  onChange={(e) => setCalcDpPercent(Number(e.target.value))}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1">
                  <span>20% Min</span>
                  <span>30% Standard</span>
                  <span>40%</span>
                  <span>60% Max</span>
                </div>
              </div>

              {/* Term Pills */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">
                  Amortization Horizon (Months)
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {[24, 36, 48, 60].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setCalcTermMonths(term)}
                      className={`py-2.5 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                        calcTermMonths === term
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-[#f8f7f4] border-stone-300 text-slate-700 hover:border-slate-900'
                      }`}
                    >
                      {term} Mo
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Output Dossier Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                    ESTIMATED MONTHLY INVESTMENT
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                    ₱{estimatedMonthly.toLocaleString()}
                    <span className="text-xs font-normal text-stone-400 font-sans"> / mo</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5 text-amber-300" />
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-stone-300">
                  <span>Selected Motorcar</span>
                  <span className="font-semibold text-white">{selectedCalcCar.name}</span>
                </div>
                <div className="flex items-center justify-between text-stone-300">
                  <span>Cash Price</span>
                  <span className="font-mono text-white">{selectedCalcCar.price}</span>
                </div>
                <div className="flex items-center justify-between text-stone-300">
                  <span>Down Payment ({calcDpPercent}%)</span>
                  <span className="font-mono text-emerald-400">₱{dpAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-stone-300">
                  <span>Principal Financed ({calcTermMonths} Months)</span>
                  <span className="font-mono text-white">₱{loanPrincipal.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                  ACCREDITED PRIVATE BANKING PARTNERS
                </div>
                <div className="flex flex-wrap gap-2">
                  {['BDO Unibank', 'BPI Family', 'Security Bank', 'EastWest'].map((bank) => (
                    <span
                      key={bank}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-stone-200"
                    >
                      {bank}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/vehicles/${selectedCalcCar.id}`}
                  className="w-full mt-2 bg-white hover:bg-stone-200 text-slate-900 font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <span>Proceed with This Structure</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 5. THE 4 PILLARS OF PROVENANCE (#section-about) ===================== */}
      <section id="section-about" className="px-4 sm:px-6 lg:px-12 py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
              04 / THE DRIVEFLOW STANDARD
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
              Uncompromising Provenance & Engineering Verification
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: '200-Point Mechanical Audit',
                desc: 'ComputerizedOBD-II telemetry, compression testing, and digital paint-thickness verification on every panel.',
              },
              {
                num: '02',
                title: 'Authenticated Legal Title',
                desc: 'Guaranteed clean LTO Original Receipt & Certificate of Registration with nationwide HPG clearance.',
              },
              {
                num: '03',
                title: 'Zero Flood & Collision Guarantee',
                desc: 'Written contractual warranty certifying the vehicle has never sustained structural collision or flood submersion.',
              },
              {
                num: '04',
                title: 'Concierge Ownership Transfer',
                desc: 'End-to-end handling of chattel mortgage, LTO transfer of ownership, and comprehensive insurance.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-white p-6 rounded-2xl border border-stone-200/90 space-y-3"
              >
                <span className="text-xs font-mono font-bold text-stone-400 block">
                  /{item.num}
                </span>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 6. PRIVATE VIEWING & SALON CONCIERGE (#section-testdrive & #section-location) ===================== */}
      <section id="section-testdrive" className="px-4 sm:px-6 lg:px-12 py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Private Viewing Reservation Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
              05 / PRIVATE APPOINTMENT
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Reserve a Private Salon Viewing
            </h2>
            <p className="text-xs text-stone-500 mt-1 mb-6">
              Schedule an exclusive inspection and test drive at our BGC or Makati gallery.
            </p>

            {bookingSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/5 border border-emerald-800/20 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">
                  Private Viewing Reserved
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Our Senior Client Advisor has reserved <strong>{bookingVehicle}</strong> at our{' '}
                  <strong>{bookingStudio}</strong> and will contact you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBookingSubmitted(true);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lorenzo Zobel"
                      className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1.5">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+63 917 000 0000"
                      className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1.5">Motorcar of Interest</label>
                    <select
                      value={bookingVehicle}
                      onChange={(e) => setBookingVehicle(e.target.value)}
                      className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-slate-900"
                    >
                      {VEHICLES.map((v) => (
                        <option key={v.id} value={v.name}>
                          {v.name} ({v.price})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1.5">Preferred Gallery Studio</label>
                    <select
                      value={bookingStudio}
                      onChange={(e) => setBookingStudio(e.target.value)}
                      className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-slate-900"
                    >
                      <option value="Bonifacio Global City Salon">Bonifacio Global City Salon</option>
                      <option value="Circuit Makati Flagship">Circuit Makati Flagship</option>
                      <option value="Home / Office Concierge Delivery">Home / Office Concierge Delivery</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold transition cursor-pointer"
                >
                  Confirm Private Appointment
                </button>
              </form>
            )}
          </div>

          {/* Right: Showroom Locations (#section-location) (5 Cols) */}
          <div id="section-location" className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
              06 / GALLERY LOCATIONS
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Manila Private Studios
            </h3>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 space-y-2">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-stone-100 text-slate-800 font-bold">
                FLAGSHIP ATELIER
              </span>
              <h4 className="text-sm font-bold text-slate-900 pt-1">
                Bonifacio Global City Studio
              </h4>
              <p className="text-xs text-stone-600">
                5th Avenue cor. 28th Street, Bonifacio Global City, Taguig, Metro Manila
              </p>
              <div className="pt-2 flex items-center gap-4 text-[11px] text-stone-500 font-mono">
                <span>Mon–Sun: 9AM – 7PM</span>
                <span>•</span>
                <span>Valet Parking Available</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 space-y-2">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-stone-100 text-slate-800 font-bold">
                INSPECTION & SERVICE GALLERY
              </span>
              <h4 className="text-sm font-bold text-slate-900 pt-1">
                Circuit Makati Showroom
              </h4>
              <p className="text-xs text-stone-600">
                Hippodromo Street, Circuit Makati, Makati City, Metro Manila
              </p>
              <div className="pt-2 flex items-center gap-4 text-[11px] text-stone-500 font-mono">
                <span>Mon–Sun: 9AM – 7PM</span>
                <span>•</span>
                <span>200-Point Diagnostic Bay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 7. CLIENT ADVISORY FAQ (#section-faq) ===================== */}
      <section id="section-faq" className="px-4 sm:px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
              07 / CLIENT ADVISORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-slate-900">{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

