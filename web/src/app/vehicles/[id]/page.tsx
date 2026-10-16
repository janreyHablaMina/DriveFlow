'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, CheckCircle2, Calendar, Phone, 
  Share2, ChevronRight, Calculator, ShieldCheck,
  Check, ArrowRight, MessageSquare
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VEHICLES } from '@/data/vehicles';

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const vehicle = VEHICLES.find((v) => v.id === resolvedParams.id);

  if (!vehicle) {
    notFound();
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [loanTermMonths, setLoanTermMonths] = useState(36);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic loan calculator (simple & realistic)
  const downPaymentAmount = Math.round(vehicle.priceNumeric * (downPaymentPercent / 100));
  const principal = vehicle.priceNumeric - downPaymentAmount;
  const annualRate = 0.065;
  const totalInterest = principal * (annualRate * (loanTermMonths / 12));
  const calculatedMonthly = Math.round((principal + totalInterest) / loanTermMonths);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => setInquirySubmitted(false), 5000);
  };

  const relatedVehicles = VEHICLES.filter(
    (v) => v.category === vehicle.category && v.id !== vehicle.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#09090e] text-slate-100 flex flex-col font-sans">
      <Header />

      {/* Clean Top Navigation Bar */}
      <div className="border-b border-white/5 bg-[#0f0f16] px-4 sm:px-6 lg:px-12 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs gap-2">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap">
            <Link href="/#section-inventory" className="hover:text-white flex items-center gap-1.5 transition shrink-0">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
            <span className="text-slate-400 hidden xs:inline shrink-0">{vehicle.categoryLabel}</span>
            <ChevronRight className="w-3 h-3 text-slate-600 hidden xs:inline shrink-0" />
            <span className="text-white font-medium truncate max-w-[160px] sm:max-w-md">{vehicle.name}</span>
          </nav>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-white/5 hover:bg-white/10 text-slate-300 rounded text-xs transition border border-white/5 shrink-0 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Clean Header: Title & Pricing */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-white/10 gap-3.5 sm:gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold bg-red-600/15 text-red-400 border border-red-500/20 rounded">
                  {vehicle.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {vehicle.year} • {vehicle.mileage}
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
                {vehicle.name}
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 sm:mt-1.5">
                {vehicle.color} &nbsp;•&nbsp; Plate Ending: {vehicle.plateEnding} &nbsp;•&nbsp; {vehicle.orCrStatus}
              </p>
            </div>

            <div className="md:text-right pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
              <span className="text-[11px] sm:text-xs text-slate-400 block">Outright Cash Price</span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {vehicle.price}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Est. Monthly: <strong className="text-red-400 font-medium">{vehicle.monthly}</strong>
              </span>
            </div>
          </div>

          {/* Gallery & Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
            
            {/* Left Column: Gallery & Details (7 cols) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              {/* Main Featured Photo */}
              <div className="relative h-[250px] xs:h-[320px] sm:h-[400px] md:h-[440px] bg-[#121218] rounded border border-white/10 overflow-hidden">
                <img 
                  src={vehicle.images[activeImageIndex]} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 text-[10px] sm:text-[11px] font-mono bg-black/75 backdrop-blur-sm text-slate-300 px-2.5 py-1 rounded border border-white/10">
                  {activeImageIndex + 1} of {vehicle.images.length}
                </div>
              </div>

              {/* Thumbnail Row */}
              {vehicle.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {vehicle.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-16 xs:h-20 sm:h-24 rounded overflow-hidden border transition-all cursor-pointer ${
                        activeImageIndex === idx 
                          ? 'border-red-500 opacity-100 ring-1 ring-red-500' 
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

            {/* Quick Specs Grid (Clean & Modern Table) */}
            <div className="bg-[#111118] border border-white/5 rounded p-4 sm:p-6">
              <h2 className="text-xs sm:text-sm font-semibold uppercase text-slate-300 tracking-wider mb-3.5 sm:mb-4">
                Vehicle Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 sm:gap-y-4 gap-x-3 sm:gap-x-6 text-xs">
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[10px] sm:text-xs">Odometer</span>
                  <span className="font-medium text-white">{vehicle.mileage}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[10px] sm:text-xs">Transmission</span>
                  <span className="font-medium text-white truncate block">{vehicle.transmission}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[10px] sm:text-xs">Fuel Type</span>
                  <span className="font-medium text-white">{vehicle.fuel}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[10px] sm:text-xs">Engine</span>
                  <span className="font-medium text-white">{vehicle.engine}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[10px] sm:text-xs">Drivetrain</span>
                  <span className="font-medium text-white">{vehicle.drivetrain}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[10px] sm:text-xs">Power & Torque</span>
                  <span className="font-medium text-white">{vehicle.power.split('@')[0]}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[10px] sm:text-xs">Seating</span>
                  <span className="font-medium text-white">{vehicle.seating}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[10px] sm:text-xs">Exterior Color</span>
                  <span className="font-medium text-white">{vehicle.color}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[10px] sm:text-xs">Plate Coding</span>
                  <span className="font-medium text-white">Ending in {vehicle.plateEnding}</span>
                </div>
              </div>
            </div>

            {/* Description / Condition */}
            <div className="bg-[#111118] border border-white/5 rounded p-4 sm:p-6">
              <h2 className="text-xs sm:text-sm font-semibold uppercase text-slate-300 tracking-wider mb-2.5 sm:mb-3">
                Condition & Overview
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            {/* Key Equipment / Features */}
            <div className="bg-[#111118] border border-white/5 rounded p-4 sm:p-6">
              <h2 className="text-xs sm:text-sm font-semibold uppercase text-slate-300 tracking-wider mb-3.5 sm:mb-4">
                Key Features & Equipment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs text-slate-300">
                {vehicle.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-black/30 p-2.5 rounded border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 200-Point Inspection Highlights */}
            <div className="bg-[#111118] border border-white/5 rounded p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-xs sm:text-sm font-semibold uppercase text-white">
                    Inspection & Quality Report
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Verified clean title and flood-free certification</p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded flex items-center gap-1.5 self-start sm:self-auto">
                  <ShieldCheck className="w-3.5 h-3.5" /> Inspected & Certified
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {vehicle.inspectionHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 px-3 bg-black/30 rounded border border-white/5">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> {item.name}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Clean Sidebar for Inquiry & Loan Calculator (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Booking / Inquiry Form */}
            <div className="bg-[#111118] border border-white/10 rounded p-4 sm:p-6 static lg:sticky lg:top-20 shadow-xl">
              <h2 className="text-sm sm:text-base font-bold text-white mb-1">
                Interested in this vehicle?
              </h2>
              <p className="text-xs text-slate-400 mb-4 sm:mb-5">
                Book an on-site viewing, request video walkaround, or speak with an advisor.
              </p>

              {inquirySubmitted ? (
                <div className="p-5 sm:p-6 bg-emerald-500/10 border border-emerald-500/20 rounded text-center">
                  <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-400 mx-auto mb-2" />
                  <h3 className="text-sm font-semibold text-white">Request Received</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    An advisor will reach out to you shortly via phone or message.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3 sm:space-y-3.5">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] text-slate-400 mb-1">Your Full Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Juan dela Cruz" 
                      className="w-full bg-[#181822] border border-white/10 text-base sm:text-xs text-white p-3 rounded outline-none focus:border-red-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] text-slate-400 mb-1">Contact Number</label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="+63 917 000 0000" 
                      className="w-full bg-[#181822] border border-white/10 text-base sm:text-xs text-white p-3 rounded outline-none focus:border-red-500 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] text-slate-400 mb-1">Preferred Date</label>
                      <input 
                        required 
                        type="date" 
                        className="w-full bg-[#181822] border border-white/10 text-base sm:text-xs text-white p-3 rounded outline-none focus:border-red-500 transition" 
                        style={{ colorScheme: 'dark' }} 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-[11px] text-slate-400 mb-1">Preferred Time</label>
                      <select 
                        required 
                        className="w-full bg-[#181822] border border-white/10 text-base sm:text-xs text-white p-3 rounded outline-none focus:border-red-500 transition cursor-pointer"
                      >
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (1PM - 4PM)</option>
                        <option value="late">Late (4PM - 6PM)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold text-xs py-3.5 rounded transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Schedule Test Drive & Viewing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-slate-400 border-t border-white/5 mt-3">
                    <a href="tel:+639170000000" className="flex items-center gap-1.5 hover:text-white transition py-1">
                      <Phone className="w-3.5 h-3.5 text-red-400" /> Call Hotline
                    </a>
                    <span className="hidden sm:inline">•</span>
                    <a href="https://wa.me/639170000000" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition py-1">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp / Viber
                    </a>
                  </div>
                </form>
              )}

              {/* Clean Loan Calculator */}
              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-red-400" /> Financing Calculator
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">
                    Est. 6.5% rate
                  </span>
                </div>

                {/* Down Payment Option Pills */}
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                    <span>Down Payment ({downPaymentPercent}%):</span>
                    <span className="text-white font-medium">₱{downPaymentAmount.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[20, 30, 40, 50].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setDownPaymentPercent(pct)}
                        className={`py-1.5 text-xs rounded transition cursor-pointer ${
                          downPaymentPercent === pct
                            ? 'bg-red-600 text-white font-medium'
                            : 'bg-[#181822] text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Term Option Pills */}
                <div className="mb-4">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                    <span>Financing Term:</span>
                    <span className="text-white font-medium">{loanTermMonths} Months</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[24, 36, 48, 60].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setLoanTermMonths(term)}
                        className={`py-1.5 text-xs rounded transition cursor-pointer ${
                          loanTermMonths === term
                            ? 'bg-red-600 text-white font-medium'
                            : 'bg-[#181822] text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {term}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Payment Summary */}
                <div className="bg-[#181822] p-3 sm:p-3.5 rounded border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Estimated Monthly:</span>
                  <span className="text-sm sm:text-base font-bold text-red-400">
                    ₱{calculatedMonthly.toLocaleString()}<span className="text-[10px] sm:text-[11px] font-normal text-slate-400">/mo</span>
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Similar Vehicles Recommendation */}
        {relatedVehicles.length > 0 && (
          <div className="pt-8 sm:pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Similar {vehicle.categoryLabel}s In Stock
              </h2>
              <Link 
                href="/#section-inventory"
                className="text-xs text-red-400 hover:text-white flex items-center gap-1 transition"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {relatedVehicles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/vehicles/${rel.id}`}
                  className="bg-[#111118] border border-white/5 hover:border-red-500/50 transition rounded overflow-hidden flex flex-col group"
                >
                  <div className="h-40 sm:h-44 overflow-hidden relative">
                    <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/80 px-2 py-0.5 rounded">
                      {rel.mileage}
                    </span>
                  </div>
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-xs sm:text-sm text-white group-hover:text-red-400 transition line-clamp-1">
                        {rel.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-white mt-1">
                        {rel.price}
                      </p>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-white/5 flex items-center justify-between">
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 text-red-400 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
