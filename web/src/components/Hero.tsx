'use client';

import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

export default function Hero() {
  return (
    <>
      <section 
        className="min-h-[85vh] relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-14 sm:pb-20 border-b border-red-600/30 overflow-hidden bg-gradient-to-r from-black via-[#12121a] to-black"
      >
        {/* Background Car Image (Static, Clean) */}
        <div 
          className="absolute right-0 top-0 w-full lg:w-2/3 h-full opacity-30 lg:opacity-55 pointer-events-none bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1800&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl lg:max-w-5xl">
            
            {/* Top Badge */}
            <AnimateOnScroll delay={100} direction="up">
              <div className="inline-block bg-racing-red text-white text-[10px] sm:text-[11px] font-black uppercase px-2.5 sm:px-3 py-1 tracking-wider sm:tracking-widest skew-12 mb-5 sm:mb-6 shadow-md transition-transform hover:scale-105 duration-300">
                <span className="unskew-12 flex items-center gap-1.5 sm:gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 fill-current shrink-0" /> 
                  <span>DRIVEFLOW // CERTIFIED PRE-OWNED & NEW</span>
                </span>
              </div>
            </AnimateOnScroll>
            
            {/* Main Headline */}
            <AnimateOnScroll delay={200} direction="up">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black italic tracking-tighter uppercase leading-[0.96] sm:leading-[0.92] mb-5 sm:mb-6 break-words">
                PRECISION DRIVEN. <br />
                <span className="text-racing-red drop-shadow-[0_0_25px_rgba(225,6,0,0.3)]">LUXURY REDEFINED.</span>
              </h1>
            </AnimateOnScroll>
            
            {/* Descriptive Paragraph */}
            <AnimateOnScroll delay={350} direction="up">
              <p className="font-body text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mb-7 sm:mb-8 font-normal">
                Metro Manila&apos;s premier destination for authenticated luxury, sports, and executive automobiles. Every vehicle comes 200-point inspected with clear documentation, dealer warranty, and flexible bank financing.
              </p>
            </AnimateOnScroll>

            {/* Action Buttons */}
            <AnimateOnScroll delay={480} direction="up">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <Link 
                  href="/#section-inventory" 
                  className="button-shimmer bg-racing-red px-6 sm:px-8 py-3.5 text-xs font-black uppercase tracking-widest sm:skew-12 hover:bg-white hover:text-black transition-all glow-red flex items-center justify-center text-center group rounded-sm"
                >
                  <span className="sm:unskew-12 flex items-center gap-2">
                    Explore Inventory <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </Link>
                <Link 
                  href="/#section-testdrive" 
                  className="bg-black/60 border border-white/20 hover:border-red-500 hover:bg-white/5 text-white px-6 sm:px-7 py-3.5 text-xs font-black uppercase tracking-widest sm:skew-12 transition-all flex items-center justify-center text-center rounded-sm"
                >
                  <span className="sm:unskew-12 inline-block">Book A Test Drive</span>
                </Link>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Quick Metrics Bar */}
          <AnimateOnScroll delay={600} direction="up">
            <div className="relative z-10 mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl bg-black/85 border border-red-600/30 p-4 sm:p-5 backdrop-blur-md rounded-sm">
              <div className="border-r border-b sm:border-b-0 border-white/10 pr-2 sm:pr-4 pb-2 sm:pb-0">
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 block uppercase">AVAILABLE INVENTORY</span>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-red-500">48+ <span className="text-[10px] sm:text-xs text-white">UNITS</span></p>
              </div>
              <div className="border-b sm:border-b-0 sm:border-r border-white/10 pl-2 sm:pl-0 pr-0 sm:pr-4 pb-2 sm:pb-0">
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 block uppercase">INSPECTION CHECKPOINT</span>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white">200 <span className="text-[10px] sm:text-xs text-red-500">POINTS</span></p>
              </div>
              <div className="border-r border-white/10 pr-2 sm:pr-4 pt-2 sm:pt-0">
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 block uppercase">FAST LOAN APPROVAL</span>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-red-500">15 <span className="text-[10px] sm:text-xs text-white">MIN</span></p>
              </div>
              <div className="pl-2 sm:pl-0 pt-2 sm:pt-0">
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 block uppercase">CLIENT SATISFACTION</span>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white">99.4% <span className="text-[10px] sm:text-xs text-red-500">RATING</span></p>
              </div>
            </div>
          </AnimateOnScroll>
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
