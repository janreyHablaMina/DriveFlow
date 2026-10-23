'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Phone,
  Share2,
  ChevronRight,
  ShieldCheck,
  Check,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react';
import { Vehicle, VEHICLES } from '@/data/vehicles';

export default function NordicVehicleDetail({ vehicle }: { vehicle: Vehicle }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [loanTermMonths, setLoanTermMonths] = useState(48);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const downPaymentAmount = Math.round(vehicle.priceNumeric * (downPaymentPercent / 100));
  const principal = vehicle.priceNumeric - downPaymentAmount;
  const annualRate = 0.085;
  const monthlyRate = annualRate / 12;
  const calculatedMonthly = Math.round(
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) /
      (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedVehicles = VEHICLES.filter(
    (v) => v.category === vehicle.category && v.id !== vehicle.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-slate-900">
      {/* Top Breadcrumb & Dossier Header */}
      <div className="bg-[#f1efe9] border-b border-stone-300/80 px-4 sm:px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs">
            <nav className="flex items-center gap-2 text-stone-500">
              <Link
                href="/vehicles"
                className="hover:text-slate-900 flex items-center gap-1.5 font-medium transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Collection Archive</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <span>{vehicle.categoryLabel}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
              <span className="text-slate-900 font-semibold hidden sm:inline">
                {vehicle.name}
              </span>
            </nav>

            <button
              type="button"
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-full bg-white border border-stone-300 hover:border-slate-900 text-xs font-medium text-slate-800 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied' : 'Share Dossier'}</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-800 bg-emerald-950/10 px-3 py-1 rounded-full mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>200-Point Certified • {vehicle.orCrStatus}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
                {vehicle.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                {vehicle.price}
              </span>
              <span className="text-xs font-mono text-stone-500">
                ({vehicle.monthly})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Mosaic Architectural Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 relative h-[300px] sm:h-[440px] rounded-3xl overflow-hidden bg-stone-200 border border-stone-300/80">
              <img
                src={vehicle.images[activeImageIndex]}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-mono px-3.5 py-1.5 rounded-full border border-stone-200 font-semibold">
                Plate 0{activeImageIndex + 1} / 0{vehicle.images.length} • {vehicle.color}
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-2 gap-3">
              {vehicle.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 sm:h-28 lg:h-[212px] rounded-2xl overflow-hidden border-2 transition cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-slate-900 ring-2 ring-slate-900/20 opacity-100'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Editorial Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Specifications & Inspection (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Curator Notes */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
                  01 / CURATORIAL OVERVIEW
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Provenance & Specification Summary
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Technical Spec Matrix */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 space-y-5">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
                  02 / TECHNICAL ARCHITECTURE
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                  {[
                    { label: 'Model Year', val: String(vehicle.year) },
                    { label: 'Odometer Reading', val: vehicle.mileage },
                    { label: 'Powertrain', val: vehicle.engine },
                    { label: 'Transmission', val: vehicle.transmission },
                    { label: 'Drivetrain', val: vehicle.drivetrain },
                    { label: 'Horsepower', val: vehicle.power },
                    { label: 'Peak Torque', val: vehicle.torque },
                    { label: 'Seating Capacity', val: vehicle.seating },
                    { label: 'LTO Coding Day', val: vehicle.plateEnding },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="p-3.5 rounded-2xl bg-[#f8f7f4] border border-stone-200/80"
                    >
                      <span className="text-[10px] font-mono uppercase text-stone-500 block">
                        {spec.label}
                      </span>
                      <span className="text-xs font-bold text-slate-900 mt-1 block">
                        {spec.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 200-Point Inspection Report */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
                      03 / LABORATORY TELEMETRY
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      200-Point Diagnostic Certificate
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-950/10 px-3 py-1 rounded-full">
                    PASSED 100%
                  </span>
                </div>

                <div className="divide-y divide-stone-200/80">
                  {vehicle.inspectionHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-3 flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-slate-800">{item.name}</span>
                      <span className="font-mono font-bold text-emerald-700 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        {item.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Factory Features */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
                  04 / BESPOKE EQUIPMENT
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {vehicle.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Acquisition & Financing Atelier (5 Cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              {/* Interactive Financing Calculator Card */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 space-y-5 shadow-md">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                      TAILORED FINANCING
                    </span>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 mt-0.5">
                      ₱{calculatedMonthly.toLocaleString()}
                      <span className="text-xs font-normal text-stone-500 font-sans"> / mo</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                    <SlidersHorizontal className="w-4 h-4 text-slate-900" />
                  </div>
                </div>

                {/* Downpayment Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      Down Payment ({downPaymentPercent}%)
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      ₱{downPaymentAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={60}
                    step={5}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-slate-900 cursor-pointer"
                  />
                </div>

                {/* Term Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-700 block">
                    Loan Term (Months)
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[24, 36, 48, 60].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setLoanTermMonths(term)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                          loanTermMonths === term
                            ? 'bg-slate-900 border-slate-900 text-white'
                            : 'bg-[#f8f7f4] border-stone-300 text-slate-700 hover:border-slate-900'
                        }`}
                      >
                        {term}m
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f8f7f4] border border-stone-200/80 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Cash Outright Price</span>
                    <span className="font-mono font-bold text-slate-900">{vehicle.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Amount Financed</span>
                    <span className="font-mono font-semibold text-slate-800">
                      ₱{principal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Private Reservation Form */}
                <div className="pt-2 border-t border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Request Private Viewing or Financing Quote
                  </h4>

                  {inquirySubmitted ? (
                    <div className="p-4 rounded-2xl bg-emerald-950/5 border border-emerald-800/20 text-center space-y-1.5">
                      <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto" />
                      <p className="text-xs font-bold text-slate-900">
                        Dossier Inquiry Registered
                      </p>
                      <p className="text-[11px] text-stone-600">
                        Our Senior Advisor will contact you within 30 minutes regarding this {vehicle.model}.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setInquirySubmitted(true);
                      }}
                      className="space-y-3 text-xs"
                    >
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-slate-900"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number (+63 917 ...)"
                        className="w-full bg-[#f8f7f4] border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-slate-900"
                      />
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold transition cursor-pointer"
                      >
                        Reserve Private Viewing
                      </button>
                    </form>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-center gap-4 text-xs text-stone-500">
                  <a
                    href="tel:+63288772277"
                    className="hover:text-slate-900 flex items-center gap-1.5 font-mono"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>(02) 8877-CARS</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Motorcars */}
          {relatedVehicles.length > 0 && (
            <div className="pt-8 border-t border-stone-200 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Similar Motorcars in Collection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedVehicles.map((car) => (
                  <Link
                    key={car.id}
                    href={`/vehicles/${car.id}`}
                    className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-slate-900 transition-all"
                  >
                    <div className="h-48 overflow-hidden bg-stone-100">
                      <img
                        src={car.images[0]}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {car.name}
                        </h4>
                        <span className="text-xs font-mono font-bold text-stone-600">
                          {car.price}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-900 shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

