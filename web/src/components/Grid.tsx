'use client';

export default function Grid() {
  const claimPitPass = (car: string, price: string) => {
    alert(`[Scuderia Pit Pass Locked]\n\nChassis: ${car}\nTarget Outlay: ${price}\n\nOur race telemetry pit crew will call your mobile within 15 minutes.`);
  };

  return (
    <section id="section-grid" className="px-6 lg:px-16 py-16 border-b border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-black uppercase text-red-500">// THE STARTING GRID</span>
            <h2 className="text-4xl font-black italic uppercase mt-1">Pole Position Allocations</h2>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">Official LTO Registered Race Weapons</span>
        </div>

        <div className="bg-black/80 border-2 border-red-600 p-6 mb-8 relative overflow-hidden">
          <span className="bg-red-600 text-white font-black text-xs px-4 py-1 uppercase skew-12 absolute top-4 left-4 shadow-lg">
            <span className="unskew-12 inline-block">P1 // POLE POSITION ALLOCATION</span>
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-6">
            <div className="h-64 sm:h-80 bg-slate-900 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=900&q=80" alt="P1 Car" className="w-full h-full object-cover" />
              <span className="absolute bottom-3 right-3 bg-black/90 text-xs font-mono text-red-500 font-bold px-2 py-1">680 CRANK HP</span>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase">2026 HOMOLOGATION SPEC</span>
              <h3 className="text-3xl font-black italic uppercase text-white mt-1">Scuderia M4 CSL Track Weapon</h3>
              <p className="font-body text-xs text-slate-300 mt-2 leading-relaxed">
                Lightweight carbon autoclave hood, ceramic brake rotors, Michelin Pilot Sport Cup 2 R rubber, and Akrapovič valved titanium exhaust with launch telemetry.
              </p>
              <div className="grid grid-cols-3 gap-2 my-5 text-center font-mono border-y border-white/10 py-3">
                <div><span className="text-[10px] text-slate-500">0-100 KPH</span><p className="text-sm font-bold text-white">2.9s</p></div>
                <div><span className="text-[10px] text-slate-500">CIS LAP TIME</span><p className="text-sm font-bold text-red-500">1:54.2</p></div>
                <div><span className="text-[10px] text-slate-500">TRANSMISSION</span><p className="text-sm font-bold text-white">7-DCT</p></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Outright Acquisition</span>
                  <span className="text-3xl font-black text-red-500">₱5,800,000</span>
                </div>
                <button onClick={() => claimPitPass('2026 Scuderia M4 CSL', '₱5,800,000')} className="bg-red-600 hover:bg-red-500 text-white font-black text-xs px-6 py-3 uppercase skew-12 transition glow-red-sm">
                  <span className="unskew-12 inline-block">Claim P1 Pass</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/60 border border-white/15 p-5 relative group hover:border-red-600 transition">
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block mb-2">P2 ALLOCATION // 525 HP</span>
            <div className="h-56 bg-slate-900 overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" alt="P2" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <h4 className="font-black text-xl text-white uppercase">GT3 RS Clubsport Spec</h4>
            <p className="font-body text-xs text-slate-400 mt-1">Naturally aspirated 4.0L flat-six, 9,000 RPM screamer with swan-neck aero wing.</p>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-2xl font-black text-red-500">₱9,200,000</span>
              <button onClick={() => claimPitPass('GT3 RS Clubsport Spec', '₱9,200,000')} className="bg-white/10 hover:bg-red-600 px-4 py-2 text-xs font-black uppercase transition">Pit Pass</button>
            </div>
          </div>

          <div className="bg-black/60 border border-white/15 p-5 relative group hover:border-red-600 transition">
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block mb-2">P3 ALLOCATION // 700 HP</span>
            <div className="h-56 bg-slate-900 overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80" alt="P3" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <h4 className="font-black text-xl text-white uppercase">RS6 V8 Competition Avant</h4>
            <p className="font-body text-xs text-slate-400 mt-1">Twin-turbo all-wheel drive launch control master with sport differential.</p>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-2xl font-black text-red-500">₱7,600,000</span>
              <button onClick={() => claimPitPass('RS6 V8 Competition Avant', '₱7,600,000')} className="bg-white/10 hover:bg-red-600 px-4 py-2 text-xs font-black uppercase transition">Pit Pass</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
