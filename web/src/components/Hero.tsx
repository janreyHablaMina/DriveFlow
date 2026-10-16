'use client';

import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

export default function Hero() {
  return (
    <>
      <section 
        className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 pt-6 sm:pt-10 md:pt-8 lg:pt-14 pb-8 sm:pb-12 md:pb-10 lg:pb-16 border-b border-red-600/30 overflow-hidden bg-gradient-to-b from-[#0f0f17] via-[#09090e] to-black"
      >
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-6 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              
              {/* Top Badge */}
              <AnimateOnScroll delay={100} direction="up">
                <div className="inline-block bg-racing-red text-white text-[10px] sm:text-[11px] md:text-[10px] lg:text-[11px] font-black uppercase px-2.5 sm:px-3 py-1 tracking-wider sm:tracking-widest skew-12 mb-3 sm:mb-4 md:mb-3 lg:mb-5 shadow-md">
                  <span className="unskew-12 flex items-center gap-1.5 sm:gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 fill-current shrink-0" /> 
                    <span>DRIVEFLOW // CERTIFIED LUXURY & PERFORMANCE</span>
                  </span>
                </div>
              </AnimateOnScroll>
              
              {/* Main Headline */}
              <AnimateOnScroll delay={200} direction="up">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-3xl lg:text-5xl xl:text-6xl font-black italic tracking-tighter uppercase leading-[0.95] mb-3 sm:mb-4 md:mb-3 lg:mb-5">
                  PRECISION DRIVEN. <br />
                  <span className="text-racing-red drop-shadow-[0_0_25px_rgba(225,6,0,0.35)]">LUXURY REDEFINED.</span>
                </h1>
              </AnimateOnScroll>
              
              {/* Descriptive Paragraph */}
              <AnimateOnScroll delay={300} direction="up">
                <p className="font-body text-slate-300 text-xs sm:text-sm md:text-xs lg:text-sm leading-relaxed max-w-lg mb-4 sm:mb-6 md:mb-4 lg:mb-8 font-normal">
                  Metro Manila&apos;s premier destination for authenticated luxury, sports, and executive automobiles. Every vehicle comes 200-point inspected with clear documentation, dealer warranty, and flexible bank financing.
                </p>
              </AnimateOnScroll>

              {/* Action Buttons */}
              <AnimateOnScroll delay={400} direction="up">
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2.5 sm:gap-3 lg:gap-4 items-stretch sm:items-center md:items-stretch lg:items-center">
                  <Link 
                    href="/#section-inventory" 
                    className="button-shimmer bg-racing-red px-5 lg:px-8 py-3 text-xs font-black uppercase tracking-wider sm:skew-12 hover:bg-white hover:text-black transition-all glow-red flex items-center justify-center text-center group rounded-sm shadow-lg cursor-pointer"
                  >
                    <span className="sm:unskew-12 flex items-center gap-2">
                      Explore Inventory <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </Link>
                  <Link 
                    href="/#section-testdrive" 
                    className="bg-black/60 border border-white/20 hover:border-red-500 hover:bg-white/5 text-white px-5 lg:px-7 py-3 text-xs font-black uppercase tracking-wider sm:skew-12 transition-all flex items-center justify-center text-center rounded-sm cursor-pointer"
                  >
                    <span className="sm:unskew-12 inline-block">Book A Test Drive</span>
                  </Link>
                </div>
              </AnimateOnScroll>

              {/* Quick Trust Checklist */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-[10px] sm:text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-red-500 font-bold">✓</span> 200-Pt Inspection
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-red-500 font-bold">✓</span> 100% Clean LTO Title
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-red-500 font-bold">✓</span> 15-Min Bank Approval
                </span>
              </div>
            </div>

            {/* Right Visual: REAL HERO SHOWROOM CAR BANNER */}
            <div className="md:col-span-6 lg:col-span-6 mt-3 md:mt-0">
              <AnimateOnScroll delay={250} direction="up">
                <div className="relative group">
                  {/* Subtle Red Ambient Underglow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-600/30 via-red-600/15 to-transparent blur-xl rounded-lg opacity-80 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
                  
                  {/* The Banner Image Container */}
                  <div className="relative rounded-sm overflow-hidden border border-white/15 bg-gradient-to-b from-[#14141c] to-[#0c0c12] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                    
                    {/* Top Banner Tag */}
                    <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-300 tracking-wider uppercase">FLAGSHIP SHOWROOM UNIT</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-red-400 bg-red-600/15 px-2 py-0.5 rounded border border-red-500/25">
                        READY FOR RELEASE
                      </span>
                    </div>

                    {/* Prominent High-Def Hero Car Photo */}
                    <div className="relative h-[220px] xs:h-[260px] sm:h-[300px] md:h-[280px] lg:h-[380px] overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85" 
                        alt="DriveFlow Premier Supercar"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                      
                      {/* Floating Vehicle Info Pill inside the banner */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 p-2.5 sm:p-3.5 bg-black/85 backdrop-blur-md rounded border border-white/15 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] sm:text-[10px] font-mono text-red-500 uppercase tracking-widest block font-bold">2026 PORSCHE 718 CAYMAN GT4 RS</span>
                          <span className="text-[11px] sm:text-xs md:text-[11px] lg:text-sm font-black text-white tracking-wide">4.0L FLAT-6 • 500 HP</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 uppercase tracking-wider block">CASH PRICE</span>
                          <span className="text-[11px] sm:text-xs md:text-[11px] lg:text-sm font-black text-red-500 font-mono">₱6,400,000</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </AnimateOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="py-3 bg-racing-red text-black font-black italic text-xs tracking-widest uppercase overflow-hidden shadow-lg">
        <div className="ticker-bar flex items-center gap-12 whitespace-nowrap">
          <span>DRIVEFLOW MOTORS MANILA</span> <span>///</span>
          <span>200-POINT MULTI-POINT VEHICLE CERTIFICATION</span> <span>///</span>
          <span>COMPLIMENTARY 12-MONTH DEALER POWERTRAIN WARRANTY</span> <span>///</span>
          <span>15-MINUTE FAST AUTO LOAN APPROVAL</span> <span>///</span>
          <span>GUARANTEED ACCIDENT-FREE & ZERO FLOOD INCLUSION</span> <span>///</span>
          <span>DRIVEFLOW MOTORS MANILA</span> <span>///</span>
          <span>100% CLEAN TITLES & OFFICIAL LTO VERIFICATION</span> <span>///</span>
        </div>
      </div>
    </>
  );
}
