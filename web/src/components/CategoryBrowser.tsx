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
            <span className="text-xs font-black text-red-500 uppercase tracking-widest">// SHOP BY LIFESTYLE</span>
            <h2 className="text-3xl font-black italic uppercase mt-1">Browse Inventory</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div onClick={() => selectCategory('Family SUVs')} className="relative h-[280px] overflow-hidden group cursor-pointer border border-white/10 hover:border-red-600 transition">
            <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 opacity-90 group-hover:opacity-100 transition" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="text-red-500 font-black text-[10px] tracking-widest mb-1 drop-shadow-md">CATEGORY //</span>
              <h3 className="font-black text-xl uppercase text-white group-hover:text-red-500 transition drop-shadow-md">Family SUVs</h3>
              <p className="font-body text-xs text-slate-300 mt-2 line-clamp-2">Spacious, safe, and ready for weekend road trips or school runs.</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">24 In Stock</span>
                <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 font-black text-xs">EXPLORE →</span>
              </div>
            </div>
          </div>
          
          <div onClick={() => selectCategory('Daily Commuters')} className="relative h-[280px] overflow-hidden group cursor-pointer border border-white/10 hover:border-red-600 transition">
            <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 opacity-90 group-hover:opacity-100 transition" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="text-red-500 font-black text-[10px] tracking-widest mb-1 drop-shadow-md">CATEGORY //</span>
              <h3 className="font-black text-xl uppercase text-white group-hover:text-red-500 transition drop-shadow-md">Daily Commuters</h3>
              <p className="font-body text-xs text-slate-300 mt-2 line-clamp-2">Fuel-efficient sedans and hatchbacks perfect for city driving.</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">18 In Stock</span>
                <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 font-black text-xs">EXPLORE →</span>
              </div>
            </div>
          </div>

          <div onClick={() => selectCategory('Work & Utility')} className="relative h-[280px] overflow-hidden group cursor-pointer border border-white/10 hover:border-red-600 transition">
            <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 opacity-90 group-hover:opacity-100 transition" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="text-red-500 font-black text-[10px] tracking-widest mb-1 drop-shadow-md">CATEGORY //</span>
              <h3 className="font-black text-xl uppercase text-white group-hover:text-red-500 transition drop-shadow-md">Work & Utility</h3>
              <p className="font-body text-xs text-slate-300 mt-2 line-clamp-2">Tough, reliable pickup trucks built for business and heavy lifting.</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">12 In Stock</span>
                <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 font-black text-xs">EXPLORE →</span>
              </div>
            </div>
          </div>

          <div onClick={() => selectCategory('Premium Collection')} className="relative h-[280px] overflow-hidden group cursor-pointer border border-white/10 hover:border-red-600 transition">
            <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 opacity-90 group-hover:opacity-100 transition" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="text-red-500 font-black text-[10px] tracking-widest mb-1 drop-shadow-md">CATEGORY //</span>
              <h3 className="font-black text-xl uppercase text-white group-hover:text-red-500 transition drop-shadow-md">Premium Collection</h3>
              <p className="font-body text-xs text-slate-300 mt-2 line-clamp-2">Luxury and sports vehicles for when you want to make a statement.</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">8 In Stock</span>
                <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 font-black text-xs">EXPLORE →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
