export default function NewArrivals() {
  return (
    <section className="px-6 lg:px-16 py-14 border-b border-white/10 bg-[#0a0a0e]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black uppercase italic">Fresh Showroom Arrivals</h2>
          <span className="text-xs font-mono text-red-500">Inspected & Documented This Week</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-black/60 border border-white/10 hover:border-red-600 transition">
            <div className="h-44 bg-slate-800 mb-3 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=700&q=80" alt="Porsche 718" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] font-mono bg-red-600/20 text-red-500 px-2 py-0.5 border border-red-600/40">OFFICIALLY DOCUMENTED</span>
            <h3 className="font-black text-sm text-white mt-2">2026 Porsche 718 Cayman GT4 RS</h3>
            <p className="text-sm text-red-500 font-black mt-1">₱6,400,000</p>
          </div>

          <div className="p-4 bg-black/60 border border-white/10 hover:border-red-600 transition">
            <div className="h-44 bg-slate-800 mb-3 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80" alt="Corvette Z06" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] font-mono bg-red-600/20 text-red-500 px-2 py-0.5 border border-red-600/40">OFFICIALLY DOCUMENTED</span>
            <h3 className="font-black text-sm text-white mt-2">2026 Chevrolet Corvette Z06 3LZ</h3>
            <p className="text-sm text-red-500 font-black mt-1">₱8,900,000</p>
          </div>

          <div className="p-4 bg-black/60 border border-white/10 hover:border-red-600 transition">
            <div className="h-44 bg-slate-800 mb-3 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=700&q=80" alt="Alfa Romeo" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] font-mono bg-red-600/20 text-red-500 px-2 py-0.5 border border-red-600/40">OFFICIALLY DOCUMENTED</span>
            <h3 className="font-black text-sm text-white mt-2">2026 Alfa Romeo Giulia Quadrifoglio</h3>
            <p className="text-sm text-red-500 font-black mt-1">₱4,950,000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
