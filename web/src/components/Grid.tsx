'use client';

export default function Grid() {
  const bookTestDrive = (car: string, price: string) => {
    alert(`[Test Drive & Viewing Request Saved]\n\nVehicle: ${car}\nPrice: ${price}\n\nA DriveFlow sales specialist will reach out within 15 minutes to confirm your appointment.`);
  };

  return (
    <section id="section-grid" className="px-6 lg:px-16 py-16 border-b border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-black uppercase text-red-500">// HOT DEALS & ARRIVALS</span>
            <h2 className="text-4xl font-black italic uppercase mt-1">Featured Inventory</h2>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">100% Certified LTO Registered & Road-Ready</span>
        </div>

        {/* Featured Special Deal Container */}
        <div className="bg-black/80 border-2 border-red-600 p-6 mb-8 relative overflow-hidden">
          <span className="bg-red-600 text-white font-black text-xs px-4 py-1 uppercase skew-12 absolute top-4 left-4 shadow-lg z-10">
            <span className="unskew-12 inline-block">DEAL OF THE WEEK</span>
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-6">
            <div className="h-64 sm:h-80 bg-slate-900 overflow-hidden relative rounded-sm">
              <img src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80" alt="Featured SUV" className="w-full h-full object-cover" />
              <span className="absolute bottom-3 right-3 bg-black/90 text-xs font-mono text-red-500 font-bold px-2 py-1 border border-red-600/30">CERTIFIED PRE-OWNED</span>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase">2024 FORD EVEREST TITANIUM+ 4X4</span>
              <h3 className="text-3xl font-black italic uppercase text-white mt-1">Ford Everest Titanium+</h3>
              <p className="font-body text-xs text-slate-300 mt-2 leading-relaxed">
                The ultimate family and adventure SUV. Finished in Absolute Black with premium leather interior, panoramic sunroof, and a massive 12-inch infotainment screen. Freshly traded in and fully serviced.
              </p>
              <div className="grid grid-cols-3 gap-2 my-5 text-center font-mono border-y border-white/10 py-3">
                <div><span className="text-[10px] text-slate-500">ENGINE</span><p className="text-sm font-bold text-white">2.0L Bi-Turbo</p></div>
                <div><span className="text-[10px] text-slate-500">ODOMETER</span><p className="text-sm font-bold text-red-500">12,400 KM</p></div>
                <div><span className="text-[10px] text-slate-500">TRANSMISSION</span><p className="text-sm font-bold text-white">10-Speed AT</p></div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Outright Price</span>
                  <span className="text-3xl font-black text-red-500">₱2,350,000</span>
                </div>
                <button onClick={() => bookTestDrive('2024 Ford Everest Titanium+', '₱2,350,000')} className="bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs px-6 py-3 uppercase skew-12 transition shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                  <span className="unskew-12 inline-block">Book Test Drive</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Featured Vehicles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/60 border border-white/15 p-5 relative group hover:border-red-600 transition rounded-sm">
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block mb-2">DAILY DRIVER // SPORT SEDAN</span>
            <div className="h-56 bg-slate-900 overflow-hidden mb-4 rounded-sm">
              <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80" alt="Honda Civic" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <h4 className="font-black text-xl text-white uppercase">2023 Honda Civic RS Turbo</h4>
            <p className="font-body text-xs text-slate-400 mt-1">1.5L VTEC Turbo engine, Honda SENSING suite, and black suede/leather combo interior. Perfect daily commuter.</p>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-2xl font-black text-red-500">₱1,450,000</span>
              <button onClick={() => bookTestDrive('2023 Honda Civic RS Turbo', '₱1,450,000')} className="bg-white/10 hover:bg-red-600 px-4 py-2 text-xs font-black uppercase transition">View Details</button>
            </div>
          </div>

          <div className="bg-black/60 border border-white/15 p-5 relative group hover:border-red-600 transition rounded-sm">
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block mb-2">WORK & UTILITY // 4X4</span>
            <div className="h-56 bg-slate-900 overflow-hidden mb-4 rounded-sm">
              <img src="https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80" alt="Toyota Hilux" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <h4 className="font-black text-xl text-white uppercase">2022 Toyota Hilux Conquest 4x4</h4>
            <p className="font-body text-xs text-slate-400 mt-1">2.8L Diesel workhorse. Upgraded with all-terrain tires, bedliner, and sports bar. Ready for any terrain.</p>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-2xl font-black text-red-500">₱1,680,000</span>
              <button onClick={() => bookTestDrive('2022 Toyota Hilux Conquest', '₱1,680,000')} className="bg-white/10 hover:bg-red-600 px-4 py-2 text-xs font-black uppercase transition">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
