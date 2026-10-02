export default function Testimonials() {
  return (
    <section className="px-6 lg:px-16 py-14 border-b border-white/10 bg-carbon">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase text-red-500 tracking-widest">// DRIVER LOGBOOKS</span>
          <h2 className="text-3xl font-black italic uppercase mt-1">Verified Track Day Drivers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-black/70 border border-white/15">
            <p className="font-body text-xs text-slate-300 italic mb-3">
              "They dialed in my M4 suspension for Clark Speedway before I even took delivery. Their driver coach trimmed 2.4 seconds off my personal best on day one."
            </p>
            <span className="text-xs font-black text-red-500 block">- Kevin Tan, Manila</span>
            <span className="text-[10px] text-slate-500 font-mono">Delivered 2026 Scuderia M4 CSL</span>
          </div>

          <div className="p-6 bg-black/70 border border-white/15">
            <p className="font-body text-xs text-slate-300 italic mb-3">
              "Fastest financing approval I have ever had in the Philippines. From trade-in inspection to keys in hand took exactly 48 hours."
            </p>
            <span className="text-xs font-black text-red-500 block">- Derrick Sy, Greenhills</span>
            <span className="text-[10px] text-slate-500 font-mono">Delivered 2026 GT3 RS Clubsport</span>
          </div>
        </div>
      </div>
    </section>
  );
}
