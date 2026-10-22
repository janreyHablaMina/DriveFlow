'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Award,
  Quote,
  Paintbrush,
  Gift,
  RefreshCw,
} from 'lucide-react';
import { VEHICLES } from '@/data/vehicles';

export default function NordicHome() {
  // 1. Hero Spotlight Switcher
  const spotlightCars = useMemo(() => VEHICLES.slice(0, 4), []);
  const [heroIndex, setHeroIndex] = useState(0);
  const activeHeroCar = spotlightCars[heroIndex] || VEHICLES[0];

  // 2. Curated Collection Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Bespoke Finish Studio (Showcase)
  const finishOptions = [
    {
      name: 'Rosso Corsa Metallic',
      code: '#dc2626',
      tag: 'Italian Heritage Finish',
      img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Nardo Architectural Grey',
      code: '#64748b',
      tag: 'Scandinavian Satin Coat',
      img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Obsidian Piano Black',
      code: '#18181b',
      tag: 'Deep Ceramic Mirror',
      img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Alpine Glacier White',
      code: '#e2e8f0',
      tag: 'Tri-Coat Pearlescent',
      img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    },
  ];
  const [selectedFinish, setSelectedFinish] = useState(finishOptions[0]);
  const [finishReserved, setFinishReserved] = useState(false);

  // 4. Seasonal Privilege Promo State
  const [promoClaimed, setPromoClaimed] = useState(false);

  // 5. Interactive Financing Simulator
  const [calcVehicleId, setCalcVehicleId] = useState(VEHICLES[0].id);
  const [calcDpPercent, setCalcDpPercent] = useState(30);
  const [calcTermMonths, setCalcTermMonths] = useState(48);

  // 6. Trade-In Valuation State
  const [tradeMake, setTradeMake] = useState('');
  const [tradeYear, setTradeYear] = useState('2023');
  const [tradeMileage, setTradeMileage] = useState('15000');
  const [tradeSubmitted, setTradeSubmitted] = useState(false);

  // 7. Private Viewing Booking State
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState(VEHICLES[0].name);
  const [bookingStudio, setBookingStudio] = useState('Bonifacio Global City Salon');

  // 8. FAQ Accordion State
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

  const newArrivals = [
    {
      name: '2026 Porsche 718 Cayman GT4 RS',
      price: '₱6,400,000',
      spec: '4.0L Naturally Aspirated Flat-6 • 493 HP',
      tag: 'Weissach Package',
      img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: '2026 Chevrolet Corvette Z06 3LZ',
      price: '₱8,900,000',
      spec: '5.5L Flat-Plane Crank V8 • 670 HP',
      tag: 'Collector Allocation',
      img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: '2026 Alfa Romeo Giulia Quadrifoglio',
      price: '₱4,950,000',
      spec: '2.9L Bi-Turbo V6 • Carbon Ceramic Brakes',
      tag: 'Fresh Import',
      img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const testimonials = [
    {
      quote:
        'The entire purchase with DriveFlow was seamless and transparent. Their trade-in valuation on my old sedan was very generous, and all LTO transfer documents were handled without hassle.',
      author: 'Kevin Tan',
      location: 'Bonifacio Global City',
      vehicle: 'Delivered 2026 BMW M4 Competition',
    },
    {
      quote:
        'Fastest financing pre-approval I have ever experienced in the Philippines. From the initial credit application to keys in hand took less than 48 hours.',
      author: 'Derrick Sy',
      location: 'Greenhills, San Juan',
      vehicle: 'Delivered 2025 Porsche 911 Carrera',
    },
    {
      quote:
        'Their private concierge brought the Land Cruiser directly to our Makati office for inspection. The 200-point diagnostic report gave our family complete peace of mind.',
      author: 'Sofia Elizalde',
      location: 'Forbes Park, Makati',
      vehicle: 'Delivered Toyota Land Cruiser 300 ZX',
    },
  ];

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
      {/* ===================== 01. ASYMMETRIC EDITORIAL MAGAZINE HERO ===================== */}
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

      {/* ===================== 02. ARCHITECTURAL BENTO CATEGORY GRID ===================== */}
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

      {/* ===================== 03. CURATED SHOWROOM COLLECTION ===================== */}
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

      {/* ===================== 04. FRESH SHOWROOM ARRIVALS (NEW ARRIVALS) ===================== */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-[#f1efe9] border-b border-stone-300/80">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
                03 / NEW ACQUISITIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                Fresh Showroom Arrivals
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-950/10 border border-emerald-800/20 px-3.5 py-1.5 rounded-full self-start sm:self-end">
              Inspected & Documented This Week
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newArrivals.map((item) => (
              <div
                key={item.name}
                className="group bg-white rounded-3xl border border-stone-200/90 p-4 hover:border-slate-900 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 rounded-2xl overflow-hidden bg-stone-100 mb-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-mono uppercase font-bold px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <div className="px-1 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-semibold">
                      OFFICIALLY DOCUMENTED
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-stone-500">{item.spec}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 px-1 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-lg font-black font-mono text-slate-900">
                    {item.price}
                  </span>
                  <Link
                    href="/vehicles"
                    className="text-xs font-bold text-slate-900 hover:underline underline-offset-4 flex items-center gap-1"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 05. BESPOKE EXTERIOR & FINISH STUDIO (SHOWCASE) ===================== */}
      <section id="section-showcase" className="px-4 sm:px-6 lg:px-12 py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Preview Frame (7 Cols) */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={selectedFinish.img}
                alt={selectedFinish.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-stone-200 shadow-md flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full border border-stone-300 shrink-0"
                  style={{ backgroundColor: selectedFinish.code }}
                />
                <div>
                  <span className="text-[10px] font-mono uppercase text-stone-500 block leading-none">
                    ACTIVE FINISH SPECIFICATION
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {selectedFinish.name} — {selectedFinish.tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Finish Selector (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500 flex items-center gap-1.5">
                  <Paintbrush className="w-3.5 h-3.5 text-slate-900" />
                  <span>04 / BESPOKE ATELIER STUDIO</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                  Exterior Paint & Ceramic Studio
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Preview our collection in signature architectural finishes. Every motorcar is delivered with multi-stage paint correction and 9H graphene ceramic protection.
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-semibold text-slate-800 block">
                  Select Exterior Livery Swatch:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {finishOptions.map((item) => {
                    const isActive = selectedFinish.name === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          setSelectedFinish(item);
                          setFinishReserved(false);
                        }}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                            : 'bg-[#f8f7f4] border-stone-300 text-slate-800 hover:border-slate-900'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-white/40 shrink-0"
                          style={{ backgroundColor: item.code }}
                        />
                        <span className="text-xs font-semibold truncate">{item.name.split(' ')[0]} {item.name.split(' ')[1]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {finishReserved ? (
                <div className="p-4 rounded-2xl bg-emerald-950/5 border border-emerald-800/20 text-xs text-emerald-900 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Specification logged for <strong>{selectedFinish.name}</strong>. Our curator will send matching stock dossiers.
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setFinishReserved(true)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Request Allocation in This Finish
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 06. SEASONAL ACQUISITION PRIVILEGE (PROMOTIONS) ===================== */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 bg-slate-900 text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] font-mono uppercase tracking-widest">
              <Gift className="w-3.5 h-3.5" />
              <span>LIMITED ATELIER PRIVILEGE • Q4 2026</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              Complimentary 1-Year Comprehensive Insurance & Ceramic Detail
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
              Included with every motorcar acquisition or private reservation confirmed before the end of this month.
            </p>
          </div>

          {promoClaimed ? (
            <div className="px-6 py-3.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              <span>PRIVILEGE CODE ATTACHED: ATELIER-2026</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPromoClaimed(true)}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-stone-200 text-slate-900 text-xs font-bold uppercase tracking-wider transition cursor-pointer shrink-0"
            >
              Claim Acquisition Privilege
            </button>
          )}
        </div>
      </section>

      {/* ===================== 07. INTERACTIVE NORDIC FINANCING ATELIER ===================== */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 bg-[#f1efe9] border-b border-stone-300/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Explanation & Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
                05 / TAILORED ACQUISITION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                Bespoke Financing Simulator
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
                Structure your acquisition with transparent terms. Select any motorcar from our showroom to calculate your equity and monthly amortization across our partner private banks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 space-y-5 shadow-xs">
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

      {/* ===================== 08. INSTANT TRADE-IN & EQUITY APPRAISAL ===================== */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-slate-900" />
              <span>06 / PORTFOLIO EXCHANGE</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Trade-In & Equity Valuation
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Apply the full market value of your current casa-maintained automobile directly toward your next DriveFlow acquisition. Receive a preliminary valuation within 30 minutes.
            </p>
          </div>

          <div className="lg:col-span-7">
            {tradeSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/5 border border-emerald-800/20 text-center space-y-2">
                <CheckCircle2 className="w-7 h-7 text-emerald-700 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900">
                  Preliminary Appraisal Dossier Initiated
                </h3>
                <p className="text-xs text-stone-600">
                  Our acquisition desk is computing the fair-market equity for your{' '}
                  <strong>{tradeYear} {tradeMake || 'Vehicle'}</strong> ({Number(tradeMileage).toLocaleString()} KM).
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setTradeSubmitted(true);
                }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs"
              >
                <div>
                  <label className="font-semibold text-slate-700 block mb-1.5">Make & Model</label>
                  <input
                    type="text"
                    required
                    value={tradeMake}
                    onChange={(e) => setTradeMake(e.target.value)}
                    placeholder="e.g. Toyota Fortuner LTD"
                    className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1.5">Model Year</label>
                  <select
                    value={tradeYear}
                    onChange={(e) => setTradeYear(e.target.value)}
                    className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-slate-900"
                  >
                    {['2025', '2024', '2023', '2022', '2021', '2020', '2019'].map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1.5">Mileage (KM)</label>
                  <input
                    type="number"
                    required
                    value={tradeMileage}
                    onChange={(e) => setTradeMileage(e.target.value)}
                    placeholder="15000"
                    className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-slate-900"
                  />
                </div>
                <div className="sm:col-span-3 pt-1 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold transition cursor-pointer"
                  >
                    Compute Trade-In Equity
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===================== 09. THE 4 PILLARS OF PROVENANCE (#section-about) ===================== */}
      <section id="section-about" className="px-4 sm:px-6 lg:px-12 py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
              07 / THE DRIVEFLOW STANDARD
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
                desc: 'Computerized OBD-II telemetry, compression testing, and digital paint-thickness verification on every panel.',
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

      {/* ===================== 10. OUR STORY & ARCHITECTURAL HERITAGE (#section-story) ===================== */}
      <section id="section-story" className="px-4 sm:px-6 lg:px-12 py-16 bg-[#f1efe9] border-b border-stone-300/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 h-72 sm:h-96 rounded-3xl overflow-hidden bg-stone-200 border border-stone-300">
            <img
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80"
              alt="DriveFlow Atelier Heritage"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
              08 / OUR STORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Redefining the Manila Automotive Acquisition Experience
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Founded with a passion for architectural design and mechanical transparency, DriveFlow Atelier Manila was created to replace ambiguous dealership practices with gallery-grade curation and long-term client relationships.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              From flagship European grand tourers to executive SUVs and daily commuters, our specialists ensure every motorcar meets stringent diagnostic, cosmetic, and legal documentation standards before entering our floor.
            </p>
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-widest font-bold text-slate-900 block">
                THE CURATORIAL BOARD — DRIVEFLOW ATELIER MANILA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 11. VERIFIED CLIENT CHRONICLES (TESTIMONIALS) ===================== */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
                09 / CLIENT CHRONICLES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                Verified Owner Handovers
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-500">
              4.9 / 5.0 Client Satisfaction Across 400+ Deliveries
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-stone-200/90 flex flex-col justify-between space-y-5 shadow-xs"
              >
                <div className="space-y-3">
                  <Quote className="w-6 h-6 text-stone-300" />
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <span className="text-xs font-bold text-slate-900 block">
                    {t.author} — <span className="font-normal text-stone-500">{t.location}</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 mt-0.5 block">
                    ✓ {t.vehicle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 12. PRIVATE VIEWING & SALON CONCIERGE (#section-testdrive & #section-location) ===================== */}
      <section id="section-testdrive" className="px-4 sm:px-6 lg:px-12 py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Private Viewing Reservation Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
              10 / PRIVATE APPOINTMENT
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
              11 / GALLERY LOCATIONS
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

      {/* ===================== 13. CLIENT ADVISORY FAQ (#section-faq) ===================== */}
      <section id="section-faq" className="px-4 sm:px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
              12 / CLIENT ADVISORY
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
