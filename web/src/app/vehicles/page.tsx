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
  RefreshCw,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  Zap,
  Check,
  CheckCircle,
  Award
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VEHICLES, Vehicle } from '@/data/vehicles';

function VehicleCard({ 
  car, 
  viewMode, 
  onQuickView 
}: { 
  car: Vehicle; 
  viewMode: 'grid' | 'list';
  onQuickView: (car: Vehicle) => void;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const setImage = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex(idx);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-[#0f0f17] border border-white/10 hover:border-red-600/70 transition-all duration-300 rounded overflow-hidden flex flex-col md:flex-row group shadow-xl hover:shadow-[0_15px_40px_rgba(225,6,0,0.15)]">
        
        {/* List Image Carousel Container */}
        <div className="md:w-80 lg:w-96 h-60 md:h-auto relative shrink-0 overflow-hidden bg-slate-950">
          <img
            src={car.images[activeImageIndex]}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none"></div>

          {/* Image Navigation Arrows */}
          {car.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Thumbnail Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
            {car.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => setImage(e, idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'w-4 bg-red-500' : 'bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Show image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Badges on List Image */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-black/85 backdrop-blur-md text-red-400 border border-red-500/30 uppercase">
              {car.badge}
            </span>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-red-600 text-white">
              {car.year}
            </span>
          </div>
        </div>

        {/* List Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> {car.categoryLabel}
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                Plate Ending: <strong className="text-white">{car.plateEnding.split(' ')[0]}</strong>
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors">
              {car.name}
            </h2>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {car.description}
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4 py-2.5 px-3 bg-black/40 rounded border border-white/5 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Mileage</span>
                <span className="font-semibold text-white truncate block">{car.mileage}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Engine</span>
                <span className="font-semibold text-white truncate block">{car.engine}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Power</span>
                <span className="font-semibold text-white truncate block">{car.power.split('@')[0]}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Transmission</span>
                <span className="font-semibold text-white truncate block">{car.transmission.split(' ')[0]}</span>
              </div>
            </div>
          </div>

          {/* Pricing and Action row */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Cash Purchase Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {car.price}
                </span>
                <span className="text-xs text-red-400 font-mono font-medium">
                  Est. {car.monthly}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onQuickView(car)}
                className="bg-[#181824] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white px-3.5 py-2.5 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-red-400" />
                <span>Quick Specs</span>
              </button>
              <Link
                href={`/vehicles/${car.id}`}
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2.5 rounded transition flex items-center gap-2 group/btn cursor-pointer shadow-md"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // Grid View Mode
  return (
    <div className="bg-[#0f0f17] border border-white/10 hover:border-red-600/70 transition-all duration-300 rounded overflow-hidden flex flex-col group shadow-xl hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(225,6,0,0.18)]">
      
      {/* Vehicle Image Container with Multi-Image Navigation */}
      <div className="h-56 sm:h-60 relative overflow-hidden bg-slate-950">
        <img
          src={car.images[activeImageIndex]}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none"></div>

        {/* Left / Right Image Arrows on Hover */}
        {car.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Thumbnail Dots */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {car.images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => setImage(e, idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                activeImageIndex === idx ? 'w-3.5 bg-red-500' : 'bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Show image ${idx + 1}`}
            />
          ))}
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded bg-black/85 backdrop-blur-md text-red-400 border border-red-500/30 uppercase">
            {car.badge}
          </span>
          <span className="text-[11px] font-mono font-bold text-white bg-red-600 px-2 py-0.5 rounded">
            {car.year}
          </span>
        </div>

        {/* Bottom Mileage & Coding Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-300 pointer-events-none">
          <span className="bg-black/85 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
            <Gauge className="w-3 h-3 text-red-500" /> {car.mileage}
          </span>
          <span className="bg-black/85 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
            Plate: {car.plateEnding.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest block mb-1">
            {car.categoryLabel}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
            {car.name}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
            {car.color} • {car.trim}
          </p>

          {/* Quick Specs Pill Row */}
          <div className="grid grid-cols-2 gap-2 my-3 py-2 px-3 bg-black/40 rounded border border-white/5 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5 truncate">
              <Zap className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="truncate">{car.power.split('@')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Fuel className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="truncate">{car.fuel}</span>
            </div>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-white/10">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[9px] font-mono text-slate-400 block uppercase">Cash Price</span>
              <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {car.price}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-slate-400 block uppercase">Est. Monthly</span>
              <span className="text-xs sm:text-sm font-semibold text-red-400 font-mono">
                {car.monthly}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onQuickView(car)}
              className="bg-[#181824] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold text-xs py-2.5 px-2 rounded transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-red-400" />
              <span>Specs</span>
            </button>
            <Link
              href={`/vehicles/${car.id}`}
              className="bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-xs py-2.5 px-3 rounded transition text-center flex items-center justify-center gap-1 group/btn cursor-pointer shadow-md"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

function QuickSpecsModal({ 
  car, 
  onClose 
}: { 
  car: Vehicle | null; 
  onClose: () => void; 
}) {
  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#11111a] border border-white/15 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center border border-white/10 transition cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Photo */}
        <div className="relative h-60 sm:h-72 overflow-hidden bg-slate-950">
          <img
            src={car.images[0]}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11111a] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-2.5 py-0.5 rounded uppercase">
              {car.categoryLabel}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {car.name}
            </h2>
            <p className="text-xs text-slate-300">
              {car.year} • {car.color} • {car.mileage} • Plate Ending {car.plateEnding}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Price Strip */}
          <div className="bg-black/50 p-4 rounded border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Outright Cash Price</span>
              <span className="text-2xl font-bold text-white">{car.price}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Estimated Financing</span>
              <span className="text-base font-bold text-red-400 font-mono">{car.monthly}</span>
            </div>
          </div>

          {/* Key Specifications Table */}
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-red-500" /> Vehicle Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-[#181824] p-2.5 rounded border border-white/5">
                <span className="text-slate-400 text-[10px] block">Engine</span>
                <span className="text-white font-medium">{car.engine}</span>
              </div>
              <div className="bg-[#181824] p-2.5 rounded border border-white/5">
                <span className="text-slate-400 text-[10px] block">Power & Torque</span>
                <span className="text-white font-medium">{car.power.split('@')[0]}</span>
              </div>
              <div className="bg-[#181824] p-2.5 rounded border border-white/5">
                <span className="text-slate-400 text-[10px] block">Transmission</span>
                <span className="text-white font-medium truncate block">{car.transmission}</span>
              </div>
              <div className="bg-[#181824] p-2.5 rounded border border-white/5">
                <span className="text-slate-400 text-[10px] block">Drivetrain</span>
                <span className="text-white font-medium">{car.drivetrain}</span>
              </div>
              <div className="bg-[#181824] p-2.5 rounded border border-white/5">
                <span className="text-slate-400 text-[10px] block">Fuel Type</span>
                <span className="text-white font-medium">{car.fuel}</span>
              </div>
              <div className="bg-[#181824] p-2.5 rounded border border-white/5">
                <span className="text-slate-400 text-[10px] block">Seating Capacity</span>
                <span className="text-white font-medium">{car.seating}</span>
              </div>
            </div>
          </div>

          {/* 200-Point Inspection highlights */}
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 200-Point Certified Inspection
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {car.inspectionHighlights.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> {item.name}
                  </span>
                  <span className="font-mono text-emerald-400 text-[11px]">{item.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/vehicles/${car.id}`}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-3 rounded transition text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Full Vehicle Page & Loan Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+639170000000"
              className="bg-[#181824] hover:bg-white/10 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded transition text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>Call Advisor</span>
            </a>
          </div>

        </div>

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
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [quickViewCar, setQuickViewCar] = useState<Vehicle | null>(null);

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
          car.color.toLowerCase().includes(q) ||
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
    { id: 'all', label: 'All Inventory', count: VEHICLES.length },
    { id: 'premium', label: 'Supercars & Premium', count: VEHICLES.filter(v => v.category === 'premium').length },
    { id: 'suv', label: 'Executive SUVs', count: VEHICLES.filter(v => v.category === 'suv').length },
    { id: 'sedan', label: 'Performance Sedans', count: VEHICLES.filter(v => v.category === 'sedan').length },
    { id: 'truck', label: 'Utility Trucks', count: VEHICLES.filter(v => v.category === 'truck').length },
  ];

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        
        {/* Luxury Showroom Studio Banner Header */}
        <section className="relative px-4 sm:px-6 lg:px-12 pt-10 sm:pt-16 pb-12 sm:pb-16 border-b border-red-600/30 overflow-hidden bg-gradient-to-b from-[#13131c] via-[#0b0b10] to-[#07070a]">
          
          {/* Subtle Red Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/12 blur-[140px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-4">
              <Link href="/" className="hover:text-red-400 transition">Showroom Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Allocated Showroom Inventory</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                {/* Live Inventory Status Pill */}
                <div className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-md border border-red-500/30 px-3 py-1 rounded text-[11px] font-mono text-white mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-red-400 font-bold uppercase tracking-wider">OFFICIAL SHOWROOM ARCHIVE</span>
                  <span className="text-slate-400 hidden sm:inline">•</span>
                  <span className="text-slate-300 hidden sm:inline">12 Available Allocations</span>
                </div>

                <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-white leading-[0.95]">
                  VEHICLES FOR <span className="text-red-600 drop-shadow-[0_0_30px_rgba(225,6,0,0.4)]">SALE.</span>
                </h1>
                
                <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed font-body">
                  Metro Manila&apos;s authenticated showroom for luxury, supercar, and executive automobiles. Every allocation is 200-point inspected with official LTO NCR verification, clean title certification, and comprehensive dealer powertrain warranty.
                </p>
              </div>

              {/* Fast Advisory Hotline Pill */}
              <div className="bg-[#0f0f18]/90 backdrop-blur-md border border-white/10 p-4 rounded flex items-center gap-4 shrink-0 shadow-xl self-start lg:self-auto">
                <div className="w-11 h-11 rounded bg-red-600/15 border border-red-500/30 text-red-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">VIP INVENTORY HOTLINE</span>
                  <span className="text-sm font-bold font-mono text-white tracking-wide">+63 (2) 8877-CARS</span>
                  <span className="text-[10px] text-emerald-400 block font-mono">Mon–Sat 9AM–7PM</span>
                </div>
              </div>
            </div>

            {/* Showroom Trust Telemetry Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10 text-xs font-mono">
              <div className="bg-black/50 border border-white/5 p-3 sm:p-3.5 rounded flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Title Guarantee</span>
                  <span className="font-bold text-white text-xs sm:text-sm">100% Clean LTO Title</span>
                </div>
              </div>
              <div className="bg-black/50 border border-white/5 p-3 sm:p-3.5 rounded flex items-center gap-3">
                <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Rigorous Audit</span>
                  <span className="font-bold text-white text-xs sm:text-sm">200-Point Inspected</span>
                </div>
              </div>
              <div className="bg-black/50 border border-white/5 p-3 sm:p-3.5 rounded flex items-center gap-3">
                <Zap className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Financing Speed</span>
                  <span className="font-bold text-white text-xs sm:text-sm">15-Min Bank Approval</span>
                </div>
              </div>
              <div className="bg-black/50 border border-white/5 p-3 sm:p-3.5 rounded flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Dealer Protection</span>
                  <span className="font-bold text-white text-xs sm:text-sm">12-Mo Warranty</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Filter & Inventory Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          
          {/* Main Search & Control Deck */}
          <div className="bg-[#0e0e15] border border-white/10 rounded-sm p-4 sm:p-5 mb-8 shadow-2xl">
            
            {/* Row 1: Search bar, view switcher, and mobile filter button */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by car make, model, displacement, or keywords (e.g. Porsche, GT4 RS, Bi-Turbo, V8)..."
                  className="w-full bg-[#14141e] border border-white/10 text-xs sm:text-sm text-white pl-10 pr-10 py-3 rounded outline-none focus:border-red-500 transition"
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

              {/* Right Controls: Sort & View Mode Switcher */}
              <div className="flex items-center gap-2.5">
                
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 bg-[#14141e] border border-white/10 px-3 py-2.5 rounded text-xs shrink-0">
                  <span className="text-slate-400 font-mono hidden sm:inline">SORT:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-white font-medium outline-none cursor-pointer"
                  >
                    <option value="featured" className="bg-[#14141e] text-white">Featured Allocation</option>
                    <option value="price-low" className="bg-[#14141e] text-white">Price: Low to High</option>
                    <option value="price-high" className="bg-[#14141e] text-white">Price: High to Low</option>
                    <option value="year-newest" className="bg-[#14141e] text-white">Year: Newest First</option>
                    <option value="mileage-lowest" className="bg-[#14141e] text-white">Mileage: Lowest First</option>
                  </select>
                </div>

                {/* Grid / List Switcher */}
                <div className="hidden sm:flex items-center bg-[#14141e] border border-white/10 p-0.5 rounded">
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

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                  className="md:hidden flex items-center justify-center gap-2 bg-[#14141e] border border-white/10 px-3.5 py-2.5 rounded text-xs font-semibold text-white cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4 text-red-500" />
                  <span>Filters</span>
                </button>
              </div>

            </div>

            {/* Row 2: Category Navigation Tabs */}
            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-white/10 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 uppercase tracking-wider ${
                    selectedCategory === cat.id
                      ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(225,6,0,0.4)]'
                      : 'bg-black/50 text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    selectedCategory === cat.id ? 'bg-black/40 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Row 3: Make Quick Brand Chips */}
            <div className="flex items-center gap-1.5 pt-3.5 mt-3.5 border-t border-white/5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 text-xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 mr-1 shrink-0">BRANDS:</span>
              <button
                onClick={() => setSelectedMake('all')}
                className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase transition cursor-pointer shrink-0 ${
                  selectedMake === 'all'
                    ? 'bg-white/20 text-white font-bold border border-white/40'
                    : 'text-slate-400 hover:text-white bg-black/30 border border-white/5'
                }`}
              >
                All Brands
              </button>
              {allMakes.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMake(m)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase transition cursor-pointer shrink-0 ${
                    selectedMake.toLowerCase() === m.toLowerCase()
                      ? 'bg-red-600/30 text-red-400 border border-red-500/50 font-bold'
                      : 'text-slate-400 hover:text-white bg-black/30 border border-white/5'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Row 4: Advanced Dropdown Filter Drawer */}
            <div className={`pt-4 mt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ${
              showFiltersMobile ? 'block' : 'hidden md:grid'
            }`}>
              
              {/* Price Range */}
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Budget Allocation</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full bg-[#14141e] border border-white/10 text-xs text-white p-2.5 rounded outline-none focus:border-red-500 transition cursor-pointer"
                >
                  <option value="all">Any Price</option>
                  <option value="under-3m">Under ₱3,000,000</option>
                  <option value="3m-6m">₱3,000,000 - ₱6,000,000</option>
                  <option value="above-6m">Above ₱6,000,000</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Transmission System</label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="w-full bg-[#14141e] border border-white/10 text-xs text-white p-2.5 rounded outline-none focus:border-red-500 transition cursor-pointer"
                >
                  <option value="all">Any Transmission</option>
                  <option value="automatic">Automatic / PDK Dual-Clutch</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Powertrain / Fuel</label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full bg-[#14141e] border border-white/10 text-xs text-white p-2.5 rounded outline-none focus:border-red-500 transition cursor-pointer"
                >
                  <option value="all">Any Powertrain</option>
                  <option value="gasoline">Gasoline / High-Octane</option>
                  <option value="diesel">Turbo Diesel</option>
                </select>
              </div>

            </div>

            {/* Status Footer: Count and Active Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-white/5 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span>Displaying <strong className="text-white font-bold">{filteredVehicles.length}</strong> allocated units</span>
                {hasActiveFilters && (
                  <span className="text-red-400 font-semibold">• Active Filters</span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-red-400 hover:text-white transition cursor-pointer text-xs font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

          </div>

          {/* Vehicles List or Grid */}
          {filteredVehicles.length === 0 ? (
            <div className="bg-[#0f0f17] border border-white/10 rounded p-12 text-center max-w-xl mx-auto my-12 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-red-600/15 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">No Matching Allocations In Stock</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                We couldn&apos;t find any vehicles in our current showroom inventory matching your selected filters. Reset your filters or contact our client advisor for bespoke sourcing.
              </p>
              <button
                onClick={resetFilters}
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-3 rounded transition cursor-pointer inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }>
              {filteredVehicles.map((car) => (
                <VehicleCard
                  key={car.id}
                  car={car}
                  viewMode={viewMode}
                  onQuickView={(selectedCar) => setQuickViewCar(selectedCar)}
                />
              ))}
            </div>
          )}

          {/* Bottom VIP Bespoke Sourcing Banner */}
          <div className="mt-14 p-6 sm:p-10 rounded border border-white/10 bg-gradient-to-r from-[#12121e] via-[#0c0c14] to-black relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none rounded-full"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest block mb-1">
                  // BESPOKE AUTOMOTIVE CONCIERGE
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black italic uppercase text-white">
                  Searching for a Specific Model or Rare Specification?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-body">
                  If the exact model, trim, or color finish you desire is not listed in today&apos;s allocation, our procurement specialists will source authenticated vehicles from our verified collector and dealer networks with full 200-point inspection and title guarantees.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="tel:+63288772277"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-3.5 rounded transition text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call VIP Sourcing Desk</span>
                </a>
                <Link
                  href="/#section-testdrive"
                  className="bg-[#181824] hover:bg-white/10 border border-white/15 text-white font-semibold text-xs px-6 py-3.5 rounded transition text-center flex items-center justify-center cursor-pointer"
                >
                  Book Showroom Consultation
                </Link>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Quick Specs Modal */}
      <QuickSpecsModal
        car={quickViewCar}
        onClose={() => setQuickViewCar(null)}
      />

      <Footer />
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#07070a] flex items-center justify-center text-white font-mono text-xs">
        Loading Showroom Inventory Archive...
      </div>
    }>
      <VehiclesContent />
    </Suspense>
  );
}
