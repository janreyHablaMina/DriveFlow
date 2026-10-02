export default function Creed() {
  return (
    <section className="px-6 lg:px-16 py-14 border-b border-white/10 bg-[#0a0a0e]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-black text-red-500 uppercase tracking-widest">// OUR GUARANTEE</span>
          <h2 className="text-3xl font-black italic uppercase mt-1">4 Ironclad Dealership Standards</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 border-l-4 border-red-600 bg-black/60">
            <h4 className="font-black text-sm uppercase text-white">200-Pt Inspection</h4>
            <p className="font-body text-xs text-slate-400 mt-1">Every engine, transmission, electrical, and suspension system verified by master mechanics.</p>
          </div>
          <div className="p-5 border-l-4 border-red-600 bg-black/60">
            <h4 className="font-black text-sm uppercase text-white">Dealer Warranty</h4>
            <p className="font-body text-xs text-slate-400 mt-1">Comprehensive 12-month mechanical powertrain warranty for complete peace of mind.</p>
          </div>
          <div className="p-5 border-l-4 border-red-600 bg-black/60">
            <h4 className="font-black text-sm uppercase text-white">Clean Title Guarantee</h4>
            <p className="font-body text-xs text-slate-400 mt-1">100% buyback guarantee with clean LTO registration and zero flood or major accident history.</p>
          </div>
          <div className="p-5 border-l-4 border-red-600 bg-black/60">
            <h4 className="font-black text-sm uppercase text-white">24/7 Roadside Concierge</h4>
            <p className="font-body text-xs text-slate-400 mt-1">Nationwide flatbed assistance and emergency roadside support anywhere in Luzon.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
