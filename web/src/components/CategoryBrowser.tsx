'use client';

export default function CategoryBrowser() {
  const selectRaceClass = (category: string) => {
    alert(`[Paddock Division Selected: ${category}]\nDisplaying all qualifying machines staged in Clark & Makati.`);
  };

  return (
    <section className="px-6 lg:px-16 py-14 border-b border-white/10 bg-carbon">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-black text-red-500 uppercase tracking-widest">// RACING CATEGORIES</span>
            <h2 className="text-3xl font-black italic uppercase mt-1">Paddock Grid Divisions</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div onClick={() => selectRaceClass('GT3 Homologations')} className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition cursor-pointer group">
            <span className="text-red-500 font-black text-xs">CLASS A //</span>
            <h3 className="font-black text-lg uppercase mt-1 group-hover:text-red-500 transition">GT3 Coupés</h3>
            <p className="font-body text-xs text-slate-400 mt-1">Sequential shifters, aerodynamic downforce wings.</p>
            <span className="text-xs font-black text-red-500 mt-4 block">12 Units Active →</span>
          </div>
          <div onClick={() => selectRaceClass('Super Sedans')} className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition cursor-pointer group">
            <span className="text-red-500 font-black text-xs">CLASS B //</span>
            <h3 className="font-black text-lg uppercase mt-1 group-hover:text-red-500 transition">Super Sedans</h3>
            <p className="font-body text-xs text-slate-400 mt-1">600+ HP practical circuit road weapons.</p>
            <span className="text-xs font-black text-red-500 mt-4 block">9 Units Active →</span>
          </div>
          <div onClick={() => selectRaceClass('Competition SUVs')} className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition cursor-pointer group">
            <span className="text-red-500 font-black text-xs">CLASS C //</span>
            <h3 className="font-black text-lg uppercase mt-1 group-hover:text-red-500 transition">Racing SUVs</h3>
            <p className="font-body text-xs text-slate-400 mt-1">Twin-turbo launch control with carbon ceramic brakes.</p>
            <span className="text-xs font-black text-red-500 mt-4 block">7 Units Active →</span>
          </div>
          <div onClick={() => selectRaceClass('Formula EV')} className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition cursor-pointer group">
            <span className="text-red-500 font-black text-xs">CLASS D //</span>
            <h3 className="font-black text-lg uppercase mt-1 group-hover:text-red-500 transition">Formula EV</h3>
            <p className="font-body text-xs text-slate-400 mt-1">Instant torque vectoring and sub-2.8s launches.</p>
            <span className="text-xs font-black text-red-500 mt-4 block">4 Units Active →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
