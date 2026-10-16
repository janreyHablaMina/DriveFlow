export default function Testimonials() {
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10 sm:py-14 border-b border-white/10 bg-carbon">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs font-black uppercase text-red-500 tracking-widest">// CLIENT REVIEWS</span>
          <h2 className="text-2xl sm:text-3xl font-black italic uppercase mt-1">Verified Vehicle Owners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-4 sm:p-6 bg-black/70 border border-white/15 rounded-sm">
            <p className="font-body text-xs text-slate-300 italic mb-3 leading-relaxed">
              &quot;The entire purchase with DriveFlow was seamless and transparent. Their trade-in valuation on my old sedan was very generous, and all LTO transfer documents were handled without hassle.&quot;
            </p>
            <span className="text-xs font-black text-red-500 block">- Kevin Tan, Bonifacio Global City</span>
            <span className="text-[10px] text-slate-500 font-mono">Delivered 2026 BMW M4 Competition</span>
          </div>

          <div className="p-4 sm:p-6 bg-black/70 border border-white/15 rounded-sm">
            <p className="font-body text-xs text-slate-300 italic mb-3 leading-relaxed">
              &quot;Fastest financing pre-approval I have ever experienced in the Philippines. From the initial credit application to keys in hand took less than 48 hours.&quot;
            </p>
            <span className="text-xs font-black text-red-500 block">- Derrick Sy, Greenhills</span>
            <span className="text-[10px] text-slate-500 font-mono">Delivered 2025 Porsche 911 Carrera</span>
          </div>
        </div>
      </div>
    </section>
  );
}
