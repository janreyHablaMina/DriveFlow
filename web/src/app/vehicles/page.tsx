'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  X, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Gauge, 
  Fuel, 
  Car, 
  RefreshCw,
  LayoutGrid,
  List,
  Sparkles
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VEHICLES, Vehicle } from '@/data/vehicles';
import NordicVehiclesCatalog from '@/components/nordic/NordicVehiclesCatalog';
import { useShowroomTheme } from '@/context/ThemeContext';

// Featured Spotlight Vehicles for the Top Hero Banner Slider
const SPOTLIGHT_IDS = ['bmw-2023', 'everest-2024', 'mercedes-2022', 'lexus-2021'];

function BannerSlider({ vehicles }: { vehicles: Vehicle[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (isPaused || vehicles.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % vehicles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, vehicles.length]);

  if (vehicles.length === 0) return null;

  const currentCar = vehicles[currentSlide];

  return (
    <div 
      className="relative w-full h-[380px] xs:h-[430px] sm:h-[480px] md:h-[500px] lg:h-[540px] overflow-hidden bg-black group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Smooth Fade Transition */}
      {vehicles.map((car, idx) => (
        <div
          key={car.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={car.images[0]}
            alt={car.name}
            className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/95 via-black/60 md:via-black/35 to-transparent pointer-events-none"></div>
        </div>
      ))}

      {/* Slide Content Overlay - Contained to max-w-7xl for grid alignment */}
      <div className="relative z-20 h-full w-full px-4 sm:px-6 lg:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-end md:justify-center pb-12 md:pb-0">
          <div className="max-w-2xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 bg-black/80 backdrop-blur-md border border-red-500/40 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono text-white mb-3 self-start">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-red-400 font-bold uppercase tracking-wider">SHOWROOM SPOTLIGHT</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">Ready For Delivery</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase text-white tracking-tight leading-[0.95] drop-shadow-lg">
            {currentCar.name}
          </h2>

          {/* Specs Pill */}
          <p className="text-xs sm:text-sm text-slate-300 mt-2.5 font-mono flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{currentCar.engine}</span>
            <span className="text-red-500">•</span>
            <span>{currentCar.power.split('@')[0]}</span>
            <span className="text-red-500">•</span>
            <span>{currentCar.mileage}</span>
          </p>

          {/* Price & CTA */}
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-4">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Cash Outright Price</span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentCar.price}
              </span>
            </div>

            <Link
              href={`/vehicles/${currentCar.id}`}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-3.5 rounded transition flex items-center gap-2 group/btn cursor-pointer shadow-lg ml-auto sm:ml-0"
            >
              <span>Explore This Vehicle</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      </div>

      {/* Prev / Next Chevrons */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + vehicles.length) % vehicles.length)}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center border border-white/20 transition cursor-pointer backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % vehicles.length)}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center border border-white/20 transition cursor-pointer backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-4 right-4 sm:right-12 z-30 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
        {vehicles.map((car, idx) => (
          <button
            key={car.id}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide
                ? 'w-6 h-2 bg-red-600'
                : 'w-2 h-2 bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function VehiclesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialMake = searchParams.get('make') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMake, setSelectedMake] = useState<string>(initialMake);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Spotlight vehicles for the banner
  const spotlightVehicles = useMemo(() => {
    const list = VEHICLES.filter((v) => SPOTLIGHT_IDS.includes(v.id));
    return list.length > 0 ? list : VEHICLES.slice(0, 4);
  }, []);

  // Unique makes
  const allMakes = useMemo(() => {
    return Array.from(new Set(VEHICLES.map((v) => v.make))).sort();
  }, []);

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((car) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches = 
          car.name.toLowerCase().includes(q) ||
          car.make.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.categoryLabel.toLowerCase().includes(q) ||
          car.year.toString().includes(q);
        if (!matches) return false;
      }

      // Category
      if (selectedCategory !== 'all' && car.category !== selectedCategory) {
        return false;
      }

      // Make
      if (selectedMake !== 'all' && car.make.toLowerCase() !== selectedMake.toLowerCase()) {
        return false;
      }

      // Price Range
      if (selectedPriceRange !== 'all') {
        const p = car.priceNumeric;
        if (selectedPriceRange === 'under-2m' && p >= 2000000) return false;
        if (selectedPriceRange === '2m-2.5m' && (p < 2000000 || p > 2500000)) return false;
        if (selectedPriceRange === 'above-2.5m' && p <= 2500000) return false;
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
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedMake, selectedPriceRange, sortBy]);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6; // Exactly 2 rows of 3 cards on desktop

  // Reset to page 1 whenever search or filter options change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedMake, selectedPriceRange, sortBy]);

  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);

  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVehicles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVehicles, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById('inventory-catalog-top');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const categories = [
    { id: 'all', label: 'All Cars', count: VEHICLES.length },
    { id: 'suv', label: 'Family SUVs', count: VEHICLES.filter(v => v.category === 'suv').length },
    { id: 'sedan', label: 'Daily Sedans', count: VEHICLES.filter(v => v.category === 'sedan').length },
    { id: 'truck', label: 'Work & Utility', count: VEHICLES.filter(v => v.category === 'truck').length },
    { id: 'premium', label: 'Premium & Luxury', count: VEHICLES.filter(v => v.category === 'premium').length },
  ];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMake('all');
    setSelectedPriceRange('all');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedMake !== 'all' ||
    selectedPriceRange !== 'all' ||
    sortBy !== 'featured';

  return (
    <div className="min-h-screen bg-[#09090e] text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 pb-16">
        
        {/* Full-Width Edge-to-Edge Hero Banner Slider */}
        <div className="w-full mb-8 border-b border-white/10">
          <BannerSlider vehicles={spotlightVehicles} />
        </div>

        {/* Vehicles Content Container matching Header/Footer width */}
        <div className="w-full px-4 sm:px-6 lg:px-12">
          {/* Clean Breadcrumb Strip */}
          <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-red-400 transition">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Vehicles For Sale</span>
            </div>
            <span className="text-slate-400 hidden sm:inline">
              <strong className="text-white">{VEHICLES.length}</strong> Units Available in Showroom
            </span>
          </div>

          {/* Lightweight, Breathable Filter & Search Bar */}
          <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-[#101017] border border-white/10 rounded p-4 sm:p-5 shadow-lg space-y-4">
            
            {/* Row 1: Search & Controls */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by car name, make, model (e.g. Ford, BMW, Everest, Civic)..."
                  className="w-full bg-[#161622] border border-white/10 text-xs sm:text-sm text-white pl-10 pr-10 py-3 rounded outline-none focus:border-red-500 transition"
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

              {/* Make / Brand Filter */}
              <div className="flex items-center gap-2 bg-[#161622] border border-white/10 px-3 py-2.5 rounded text-xs">
                <span className="text-slate-400 font-mono hidden sm:inline">MAKE:</span>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="bg-transparent text-white font-medium outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#161622] text-white">All Brands</option>
                  {allMakes.map((m) => (
                    <option key={m} value={m} className="bg-[#161622] text-white">{m}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="flex items-center gap-2 bg-[#161622] border border-white/10 px-3 py-2.5 rounded text-xs">
                <span className="text-slate-400 font-mono hidden sm:inline">PRICE:</span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="bg-transparent text-white font-medium outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#161622] text-white">All Budgets</option>
                  <option value="under-2m" className="bg-[#161622] text-white">Under ₱2,000,000</option>
                  <option value="2m-2.5m" className="bg-[#161622] text-white">₱2M - ₱2.5M</option>
                  <option value="above-2.5m" className="bg-[#161622] text-white">Above ₱2.5M</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2 bg-[#161622] border border-white/10 px-3 py-2.5 rounded text-xs">
                <span className="text-slate-400 font-mono hidden sm:inline">SORT:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-white font-medium outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-[#161622] text-white">Featured</option>
                  <option value="price-low" className="bg-[#161622] text-white">Price: Low to High</option>
                  <option value="price-high" className="bg-[#161622] text-white">Price: High to Low</option>
                  <option value="year-newest" className="bg-[#161622] text-white">Year: Newest</option>
                  <option value="mileage-lowest" className="bg-[#161622] text-white">Mileage: Lowest</option>
                </select>
              </div>

              {/* Grid / List Switcher */}
              <div className="hidden sm:flex items-center bg-[#161622] border border-white/10 p-0.5 rounded">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition cursor-pointer ${
                    viewMode === 'grid' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition cursor-pointer ${
                    viewMode === 'list' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Row 2: Category Pills */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/5 flex-wrap">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-black/40 text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] font-mono px-1 rounded ${
                      selectedCategory === cat.id ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Filter Clear */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-red-400 hover:text-white flex items-center gap-1 transition cursor-pointer ml-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Cars Inventory List / Grid */}
        <div className="max-w-7xl mx-auto">
          <div id="inventory-catalog-top" className="scroll-mt-24" />
          
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Available Inventory</span>
              <span className="text-xs font-mono font-normal text-slate-400">
                ({filteredVehicles.length} of {VEHICLES.length} units)
              </span>
            </h2>

            {totalPages > 1 && (
              <span className="text-xs font-mono text-slate-400">
                Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
              </span>
            )}
          </div>

          {filteredVehicles.length === 0 ? (
            <div className="bg-[#101017] border border-white/10 rounded p-12 text-center max-w-md mx-auto my-12 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-red-600/15 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-3">
                <Car className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">No Matching Vehicles Found</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                We couldn&apos;t find any vehicles in our showroom matching your current search or filters.
              </p>
              <button
                onClick={resetFilters}
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2.5 rounded transition cursor-pointer inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            </div>
          ) : viewMode === 'list' ? (
            /* List View */
            <div className="space-y-4">
              {paginatedVehicles.map((car) => (
                <div
                  key={car.id}
                  className="bg-[#101017] border border-white/10 hover:border-red-600/60 transition-all rounded overflow-hidden flex flex-col md:flex-row group shadow-lg"
                >
                  <div className="md:w-80 h-52 md:h-auto relative shrink-0 overflow-hidden bg-slate-900">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-black/80 text-red-400 border border-red-500/30 uppercase">
                      {car.badge}
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white bg-black/80 px-2 py-0.5 rounded">
                      {car.mileage}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono text-red-400 font-bold uppercase">
                          {car.categoryLabel}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {car.year} • Plate Ending {car.plateEnding.split(' ')[0]}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                        {car.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {car.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Cash Price</span>
                        <span className="text-xl font-bold text-white tracking-tight">
                          {car.price}
                        </span>
                      </div>

                      <Link
                        href={`/vehicles/${car.id}`}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2.5 rounded transition flex items-center justify-center gap-1.5 self-start sm:self-auto"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedVehicles.map((car) => (
                <div
                  key={car.id}
                  className="bg-[#101017] border border-white/10 hover:border-red-600/70 transition-all rounded overflow-hidden flex flex-col group shadow-lg hover:-translate-y-1"
                >
                  {/* Photo */}
                  <div className="h-52 sm:h-56 relative overflow-hidden bg-slate-900">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-black/80 text-red-400 border border-red-500/30 uppercase">
                        {car.badge}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-white bg-red-600 px-2 py-0.5 rounded">
                        {car.year}
                      </span>
                    </div>

                    {/* Bottom Mileage & Plate */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-slate-300">
                      <span className="bg-black/80 px-2 py-0.5 rounded flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-red-500" /> {car.mileage}
                      </span>
                      <span className="bg-black/80 px-2 py-0.5 rounded">
                        Plate: {car.plateEnding.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block mb-1">
                        {car.categoryLabel}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {car.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {car.engine} • {car.transmission.split(' ')[0]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 mt-3">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-[9px] font-mono text-slate-400 block uppercase">Cash Price</span>
                          <span className="text-lg font-bold text-white tracking-tight">
                            {car.price}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-mono text-slate-400 block uppercase">Est. Monthly</span>
                          <span className="text-xs font-semibold text-red-400 font-mono">
                            {car.monthly}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/vehicles/${car.id}`}
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2.5 rounded transition text-center flex items-center justify-center gap-1.5 shadow"
                      >
                        <span>View Vehicle Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Clean Modern Pagination Bar (2 Rows Per Page) */}
          {totalPages > 1 && (
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400">
                Showing <strong className="text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong> - <strong className="text-white">{Math.min(currentPage * ITEMS_PER_PAGE, filteredVehicles.length)}</strong> of <strong className="text-white">{filteredVehicles.length}</strong> vehicles
              </span>

              <div className="flex items-center gap-2">
                {/* Previous Page Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3.5 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    currentPage === 1
                      ? 'bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed'
                      : 'bg-[#14141e] hover:bg-white/10 text-white border border-white/10'
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded text-xs font-mono font-bold transition cursor-pointer flex items-center justify-center ${
                        currentPage === page
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-[#14141e] hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Page Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3.5 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    currentPage === totalPages
                      ? 'bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed'
                      : 'bg-[#14141e] hover:bg-white/10 text-white border border-white/10'
                  }`}
                  aria-label="Next Page"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      </main>

      <Footer />
    </div>
  );
}

export default function VehiclesPage() {
  const { activeTheme } = useShowroomTheme();

  if (activeTheme === 'nordic-minimalist') {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center text-slate-900 font-mono text-xs">
            Loading Curated Collection...
          </div>
        }
      >
        <Header />
        <NordicVehiclesCatalog />
        <Footer />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090e] flex items-center justify-center text-white font-mono text-xs">
        Loading Showroom Inventory...
      </div>
    }>
      <VehiclesContent />
    </Suspense>
  );
}
