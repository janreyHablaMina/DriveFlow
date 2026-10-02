import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <>
      <section className="min-h-[88vh] relative flex flex-col justify-center px-6 lg:px-16 pt-12 pb-20 border-b border-red-600/30 overflow-hidden bg-gradient-to-r from-black via-[#12121a] to-black">
        <div className="absolute right-0 top-0 w-full lg:w-2/3 h-full opacity-35 lg:opacity-55 pointer-events-none bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1800&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl lg:max-w-5xl">
          <div className="inline-block bg-racing-red text-white text-[11px] font-black uppercase px-3 py-1 tracking-widest skew-12 mb-6">
            <span className="unskew-12 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 fill-current" /> DRIVEFLOW // CERTIFIED PRE-OWNED & NEW VEHICLES
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black italic tracking-tighter uppercase leading-[0.92] mb-6 whitespace-nowrap">
            PRECISION DRIVEN. <br />
            <span className="text-racing-red">LUXURY REDEFINED.</span>
          </h1>
          
          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-normal">
            Metro Manila&apos;s premier destination for authenticated luxury, sports, and executive automobiles. Every vehicle comes 200-point inspected with clear documentation, dealer warranty, and flexible bank financing.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a href="#section-grid" className="bg-racing-red px-8 py-3.5 text-xs font-black uppercase tracking-widest skew-12 hover:bg-white hover:text-black transition glow-red inline-block">
              <span className="unskew-12 flex items-center gap-2">
                Explore Inventory (48 Cars) <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a href="#section-calculator" className="bg-black/60 border border-white/20 hover:border-red-500 text-white px-7 py-3.5 text-xs font-black uppercase tracking-widest skew-12 transition inline-block">
              <span className="unskew-12 inline-block">Instant Loan Calculator</span>
            </a>
          </div>
        </div>

        <div className="relative z-10 mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl bg-black/80 border border-red-600/30 p-5 backdrop-blur-md">
          <div className="border-r border-white/10 pr-4">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">AVAILABLE INVENTORY</span>
            <p className="text-2xl lg:text-3xl font-black text-red-500">48+ <span className="text-xs text-white">UNITS</span></p>
          </div>
          <div className="border-r border-white/10 pr-4">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">INSPECTION CHECKPOINT</span>
            <p className="text-2xl lg:text-3xl font-black text-white">200 <span className="text-xs text-red-500">POINTS</span></p>
          </div>
          <div className="border-r border-white/10 pr-4">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">FAST LOAN APPROVAL</span>
            <p className="text-2xl lg:text-3xl font-black text-red-500">15 <span className="text-xs text-white">MINUTES</span></p>
          </div>
          <div>
            <span className="text-[9px] font-mono text-slate-500 block uppercase">CLIENT SATISFACTION</span>
            <p className="text-2xl lg:text-3xl font-black text-white">99.4% <span className="text-xs text-red-500">RATING</span></p>
          </div>
        </div>
      </section>

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
