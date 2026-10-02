'use client';

export default function CategoryBrowser() {
  const selectCategory = (category: string) => {
    alert(`[Category Selected: ${category}]\nDisplaying all qualifying inventory available for viewing.`);
  };

  return (
    <section className="px-6 lg:px-16 py-14 border-b border-white/10 bg-carbon">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-black text-red-500 uppercase tracking-widest">// BROWSE SHOWROOM</span>
            <h2 className="text-3xl font-black italic uppercase mt-1">Vehicle Categories</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div onClick={() => selectCategory('Sports & Coupés')} className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition cursor-pointer group">
            <span className="text-red-500 font-black text-xs">CLASS A //</span>
            <h3 className="font-black text-lg uppercase mt-1 group-hover:text-red-500 transition">Sports & Coupés</h3>
            <p className="font-body text-xs text-slate-400 mt-1">Twin-turbo engines, sport suspension, and thrilling performance.</p>
            <span className="text-xs font-black text-red-500 mt-4 block">14 In Stock →</span>
          </div>
          <div onClick={() => selectCategory('Executive Sedans')} className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition cursor-pointer group">
            <span className="text-red-500 font-black text-xs">CLASS B //</span>
            <h3 className="font-black text-lg uppercase mt-1 group-hover:text-red-500 transition">Executive Sedans</h3>
            <p className="font-body text-xs text-slate-400 mt-1">First-class passenger comfort, executive appointments, and quiet rides.</p>
            <span className="text-xs font-black text-red-500 mt-4 block">12 In Stock →</span>
          </div>
          <div onClick={() => selectCategory('Luxury SUVs')} className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition cursor-pointer group">
            <span className="text-red-500 font-black text-xs">CLASS C //</span>
            <h3 className="font-black text-lg uppercase mt-1 group-hover:text-red-500 transition">Luxury SUVs</h3>
            <p className="font-body text-xs text-slate-400 mt-1">Intelligent AWD capability, spacious family seating, and refined interiors.</p>
            <span className="text-xs font-black text-red-500 mt-4 block">16 In Stock →</span>
          </div>
          <div onClick={() => selectCategory('Hybrid & Electric')} className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition cursor-pointer group">
            <span className="text-red-500 font-black text-xs">CLASS D //</span>
            <h3 className="font-black text-lg uppercase mt-1 group-hover:text-red-500 transition">Electric & Hybrid</h3>
            <p className="font-body text-xs text-slate-400 mt-1">Next-gen energy efficiency, instant acceleration, and silent travel.</p>
            <span className="text-xs font-black text-red-500 mt-4 block">6 In Stock →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
