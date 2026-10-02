import { Flag, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <>
      <section className="min-h-[88vh] relative flex flex-col justify-center px-6 lg:px-16 pt-12 pb-20 border-b border-red-600/30 overflow-hidden bg-gradient-to-r from-black via-[#12121a] to-black">
        <div className="absolute right-0 top-0 w-full lg:w-2/3 h-full opacity-35 lg:opacity-55 pointer-events-none bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1800&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-block bg-racing-red text-white text-[11px] font-black uppercase px-3 py-1 tracking-widest skew-12 mb-6">
            <span className="unskew-12 flex items-center gap-2">
              <Flag className="w-3.5 h-3.5 fill-current" /> STARTING GRID 2026 // HOMOLOGATION SPECIALS
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase leading-[0.92] mb-6">
            BRED FOR SPEED. <br />
            <span className="text-racing-red">STREET LEGAL.</span>
          </h1>
          
          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-normal">
            Direct factory imports of GT championship homologations, high-downforce coupés, and aerodynamic track weapons. Every allocation includes certified dyno crank horsepower sheets and Clark International Speedway shakedowns.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a href="#section-grid" className="bg-racing-red px-8 py-3.5 text-xs font-black uppercase tracking-widest skew-12 hover:bg-white hover:text-black transition glow-red inline-block">
              <span className="unskew-12 flex items-center gap-2">
                Inspect The Grid (32 Cars) <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a href="#section-calculator" className="bg-black/60 border border-white/20 hover:border-red-500 text-white px-7 py-3.5 text-xs font-black uppercase tracking-widest skew-12 transition inline-block">
              <span className="unskew-12 inline-block">15-Min Pit Finance</span>
            </a>
          </div>
        </div>

        <div className="relative z-10 mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl bg-black/80 border border-red-600/30 p-5 backdrop-blur-md">
          <div className="border-r border-white/10 pr-4">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">CLARK SPEEDWAY LAP</span>
            <p className="text-2xl lg:text-3xl font-black text-red-500">1:54.2 <span className="text-xs text-white">RECORD</span></p>
          </div>
          <div className="border-r border-white/10 pr-4">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">AVERAGE PADDOCK OUTPUT</span>
            <p className="text-2xl lg:text-3xl font-black text-white">740 <span className="text-xs text-red-500">BHP</span></p>
          </div>
          <div className="border-r border-white/10 pr-4">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">PIT WALL CREDIT CHECK</span>
            <p className="text-2xl lg:text-3xl font-black text-red-500">15 <span className="text-xs text-white">MINUTES</span></p>
          </div>
          <div>
            <span className="text-[9px] font-mono text-slate-500 block uppercase">SPEEDWAY PIT BAYS</span>
            <p className="text-2xl lg:text-3xl font-black text-white">28 <span className="text-xs text-red-500">CIS/BRC</span></p>
          </div>
        </div>
      </section>

      <div className="py-3 bg-racing-red text-black font-black italic text-xs tracking-widest uppercase overflow-hidden shadow-lg">
        <div className="ticker-bar flex items-center gap-12 whitespace-nowrap">
          <span>SCUDERIA CORSE PERFORMANCE MANILA</span> <span>///</span>
          <span>100% DYNO BENCH CERTIFIED CRANK HORSEPOWER</span> <span>///</span>
          <span>FIA-LICENSED TRACK COACHING AT CLARK SPEEDWAY</span> <span>///</span>
          <span>15-MINUTE FAST PIT FINANCING APPROVAL</span> <span>///</span>
          <span>ZERO FLOOD ACCIDENT BUYBACK WARRANTY</span> <span>///</span>
          <span>SCUDERIA CORSE PERFORMANCE MANILA</span> <span>///</span>
          <span>100% DYNO BENCH CERTIFIED CRANK HORSEPOWER</span> <span>///</span>
        </div>
      </div>
    </>
  );
}
