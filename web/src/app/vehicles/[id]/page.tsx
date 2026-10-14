'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, ShieldCheck, CheckCircle2, Calendar, Phone, 
  Share2, ChevronRight, Calculator, Car, Fuel, Gauge, Cog, Award,
  Clock, FileText, Check, ArrowRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VEHICLES, Vehicle } from '@/data/vehicles';

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const vehicle = VEHICLES.find((v) => v.id === resolvedParams.id);

  if (!vehicle) {
    notFound();
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [loanTermMonths, setLoanTermMonths] = useState(36);
  const [testDriveBooked, setTestDriveBooked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic loan calculator
  const downPaymentAmount = Math.round(vehicle.priceNumeric * (downPaymentPercent / 100));
  const principal = vehicle.priceNumeric - downPaymentAmount;
  // Estimated interest rate (approx 6.5% per annum for certified auto loan)
  const annualRate = 0.065;
  const totalInterest = principal * (annualRate * (loanTermMonths / 12));
  const totalLoanPayable = principal + totalInterest;
  const calculatedMonthly = Math.round(totalLoanPayable / loanTermMonths);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTestDriveBooked(true);
    setTimeout(() => setTestDriveBooked(false), 5000);
  };

  // Recommended related vehicles
  const relatedVehicles = VEHICLES.filter(
    (v) => v.category === vehicle.category && v.id !== vehicle.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#08080c] text-white flex flex-col font-sans">
      <Header />

      {/* Top Breadcrumb & Actions Bar */}
      <div className="border-b border-white/10 bg-[#0d0d14] px-6 lg:px-16 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-red-500 flex items-center gap-1.5 transition">
              <ArrowLeft className="w-4 h-4" /> Back to Showroom
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-500 uppercase">{vehicle.categoryLabel}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-bold truncate max-w-xs sm:max-w-md">{vehicle.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-slate-300 rounded border border-white/10 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Vehicle'}</span>
            </button>
            <span className="text-[10px] font-mono px-2.5 py-1 bg-green-500/10 border border-green-500/30 text-green-400 font-bold rounded">
              AVAILABLE IN SHOWROOM
            </span>
          </div>
        </div>
      </div>

      {/* Main Vehicle Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-16 py-10">
        
        {/* Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-racing-red text-white text-[10px] font-black uppercase px-3 py-1 tracking-wider rounded-sm shadow-md">
                {vehicle.badge}
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                STOCK ID: #{vehicle.id.toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase text-white tracking-tight">
              {vehicle.name}
            </h1>
            <p className="text-slate-400 text-sm mt-2 flex items-center gap-3 font-mono">
              <span>{vehicle.color}</span> • <span>Plate Ending: {vehicle.plateEnding}</span> • <span>{vehicle.orCrStatus}</span>
            </p>
          </div>

          <div className="text-left lg:text-right">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
              Outright Cash Dealership Price
            </span>
            <span className="text-4xl sm:text-5xl font-black text-red-500 tracking-tight">
              {vehicle.price}
            </span>
            <span className="text-xs font-mono text-slate-400 block mt-1">
              or approx. <strong className="text-white">{vehicle.monthly}</strong> (Zero Down Available)
            </span>
          </div>
        </div>

        {/* Gallery & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Left: Gallery & Vehicle Overview (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Main Active Image with Zoom Frame */}
            <div className="relative h-[360px] sm:h-[480px] bg-slate-900 border border-white/10 rounded-sm overflow-hidden shadow-2xl group">
              <img 
                src={vehicle.images[activeImageIndex]} 
                alt={`${vehicle.name} Photo ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono bg-black/80 backdrop-blur-md px-4 py-2 rounded border border-white/10">
                <span className="text-slate-300 font-bold">DriveFlow High-Definition Showroom Scan</span>
                <span className="text-red-500 font-bold">{activeImageIndex + 1} / {vehicle.images.length}</span>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {vehicle.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-24 rounded-sm overflow-hidden border-2 transition-all relative ${
                      activeImageIndex === idx 
                        ? 'border-red-600 scale-95 shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
                        : 'border-white/10 hover:border-white/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Specs Matrix */}
            <div className="bg-[#101017] border border-white/10 p-6 rounded-sm shadow-xl">
              <h3 className="text-sm font-black uppercase text-slate-300 tracking-wider mb-6 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-red-500" /> Essential Vehicle Specifications
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
                <div className="bg-black/60 p-4 rounded border border-white/5">
                  <Gauge className="w-5 h-5 text-red-500 mx-auto mb-2" />
                  <span className="text-[10px] text-slate-500 uppercase block">Odometer</span>
                  <span className="text-sm font-black text-white">{vehicle.mileage}</span>
                </div>
                <div className="bg-black/60 p-4 rounded border border-white/5">
                  <Fuel className="w-5 h-5 text-red-500 mx-auto mb-2" />
                  <span className="text-[10px] text-slate-500 uppercase block">Fuel Type</span>
                  <span className="text-sm font-black text-white">{vehicle.fuel}</span>
                </div>
                <div className="bg-black/60 p-4 rounded border border-white/5">
                  <Cog className="w-5 h-5 text-red-500 mx-auto mb-2" />
                  <span className="text-[10px] text-slate-500 uppercase block">Transmission</span>
                  <span className="text-xs font-black text-white truncate block">{vehicle.transmission}</span>
                </div>
                <div className="bg-black/60 p-4 rounded border border-white/5">
                  <Car className="w-5 h-5 text-red-500 mx-auto mb-2" />
                  <span className="text-[10px] text-slate-500 uppercase block">Drivetrain</span>
                  <span className="text-xs font-black text-white truncate block">{vehicle.drivetrain}</span>
                </div>
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="bg-[#101017] border border-white/10 p-8 rounded-sm shadow-xl space-y-4">
              <h3 className="text-base font-black uppercase text-white tracking-wider">
                Vehicle Overview & Condition
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-body">
                {vehicle.description}
              </p>
            </div>

            {/* Premium Features List */}
            <div className="bg-[#101017] border border-white/10 p-8 rounded-sm shadow-xl">
              <h3 className="text-base font-black uppercase text-white tracking-wider mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-red-500" /> Factory Features & Equipment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 font-body">
                {vehicle.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-black/50 p-3.5 rounded border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Master 200-Point Inspection Certificate */}
            <div className="bg-[#101017] border border-white/10 p-8 rounded-sm shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest block">
                    QUALITY ASSURANCE
                  </span>
                  <h3 className="text-lg font-black uppercase text-white">
                    Master 200-Point Inspection Audit
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1.5 rounded">
                  <ShieldCheck className="w-4 h-4" /> 100% CERTIFIED PASS
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {vehicle.inspectionHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-black/60 rounded border border-white/5">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> {item.name}
                    </span>
                    <span className="text-red-400 font-bold text-right">{item.score}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-body text-slate-400">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500" />
                  <span>Physical LTO verification report on file</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>Inspection date: Verified this week</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Sticky Booking & Loan Financing Calculator Sidebar (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Test Drive Booking Card */}
            <div className="bg-[#12121a] border-2 border-red-600/80 p-6 sm:p-8 rounded-sm shadow-2xl relative sticky top-24">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-black uppercase text-white">Schedule Private Viewing</h3>
              </div>
              <p className="text-slate-400 text-xs mb-6 font-body">
                Reserve this unit for a complimentary physical inspection and test drive at our Metro Manila showroom.
              </p>

              {testDriveBooked ? (
                <div className="p-8 bg-green-500/10 border border-green-500/30 rounded text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h4 className="text-base font-black uppercase text-white mb-1">Appointment Requested</h4>
                  <p className="text-xs text-slate-300 font-body">
                    A sales specialist will call you shortly to confirm your VIP showroom viewing slot.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTestDriveSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Your Full Name
                    </label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Juan dela Cruz" 
                      className="w-full bg-black border border-white/10 text-xs text-white p-3.5 outline-none focus:border-red-500 transition rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Mobile Number (Philippines)
                    </label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="+63 917 000 0000" 
                      className="w-full bg-black border border-white/10 text-xs text-white p-3.5 outline-none focus:border-red-500 transition rounded-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Preferred Date
                      </label>
                      <input 
                        required 
                        type="date" 
                        className="w-full bg-black border border-white/10 text-xs text-white p-3.5 outline-none focus:border-red-500 transition rounded-sm" 
                        style={{ colorScheme: 'dark' }} 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Preferred Time
                      </label>
                      <select 
                        required 
                        className="w-full bg-black border border-white/10 text-xs text-white p-3.5 outline-none focus:border-red-500 transition rounded-sm appearance-none cursor-pointer"
                      >
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (1PM - 4PM)</option>
                        <option value="late">Late (4PM - 6PM)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-racing-red hover:bg-white hover:text-black text-white font-black text-xs py-4 uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 group rounded-sm"
                  >
                    <span>Confirm Test Drive Slot</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="pt-2 text-center">
                    <a
                      href="tel:+639170000000"
                      className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-red-500" /> Or call hotline directly: +63 917 000 0000
                    </a>
                  </div>
                </form>
              )}

              {/* Dynamic Auto Loan Financing Calculator Card */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-red-500" />
                  <h4 className="text-sm font-black uppercase text-white">Instant Loan Payment Estimator</h4>
                </div>

                {/* Down Payment Buttons */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400">Down Payment ({downPaymentPercent}%):</span>
                    <span className="text-white font-bold">₱{downPaymentAmount.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[20, 30, 40, 50].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setDownPaymentPercent(pct)}
                        className={`py-2 text-xs font-mono font-bold rounded transition ${
                          downPaymentPercent === pct
                            ? 'bg-racing-red text-white'
                            : 'bg-black/60 text-slate-400 border border-white/10 hover:text-white'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loan Term Buttons */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400">Financing Term:</span>
                    <span className="text-white font-bold">{loanTermMonths} Months ({loanTermMonths / 12} Yrs)</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[24, 36, 48, 60].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setLoanTermMonths(term)}
                        className={`py-2 text-xs font-mono font-bold rounded transition ${
                          loanTermMonths === term
                            ? 'bg-racing-red text-white'
                            : 'bg-black/60 text-slate-400 border border-white/10 hover:text-white'
                        }`}
                      >
                        {term}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculated Monthly Display */}
                <div className="bg-black/80 border border-white/10 p-4 rounded text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    Estimated Monthly Amortization
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-red-500 tracking-tight block mt-1">
                    ₱{calculatedMonthly.toLocaleString()}<span className="text-xs text-slate-400 font-normal"> / month</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 block mt-2">
                    Rates subject to bank approval with partner banks (BDO, BPI, Security Bank, Metrobank).
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Similar / Related Vehicles Section */}
        {relatedVehicles.length > 0 && (
          <div className="pt-16 border-t border-white/10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-black uppercase text-red-500 tracking-widest block">
                  // SIMILAR RECOMMENDATIONS
                </span>
                <h3 className="text-2xl font-black italic uppercase text-white mt-1">
                  More in {vehicle.categoryLabel}
                </h3>
              </div>
              <Link 
                href="/#section-inventory"
                className="text-xs font-mono text-red-500 hover:text-white flex items-center gap-1 transition"
              >
                View Full Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVehicles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/vehicles/${rel.id}`}
                  className="bg-[#101017] border border-white/10 hover:border-red-600 transition-all rounded-sm overflow-hidden flex flex-col group shadow-xl"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101017] via-transparent to-transparent"></div>
                    <span className="absolute bottom-2 left-3 text-[10px] font-mono text-white font-bold bg-black/80 px-2 py-0.5 rounded">
                      {rel.mileage}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-black text-sm uppercase text-white group-hover:text-red-500 transition line-clamp-1">
                        {rel.name}
                      </h4>
                      <p className="text-xs font-mono text-red-500 font-bold mt-1">
                        {rel.price}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                      <span>Explore Specs</span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

