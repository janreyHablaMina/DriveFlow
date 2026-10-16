export default function Story() {
  return (
    <section id="section-story" className="px-4 sm:px-6 lg:px-12 py-10 sm:py-16 border-b border-white/10 bg-[#0a0a0e]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
        <div className="h-60 sm:h-80 bg-slate-900 border border-red-600/40 overflow-hidden rounded-sm shadow-xl">
          <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80" alt="Showroom" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-[11px] sm:text-xs font-black uppercase text-red-500 tracking-widest">// OUR STORY</span>
          <h2 className="text-2xl sm:text-3xl font-black italic uppercase mt-1 mb-3 sm:mb-4">Redefining The Car Buying Experience</h2>
          <p className="font-body text-xs text-slate-300 leading-relaxed mb-3 sm:mb-4">
            Founded with a passion for automotive excellence and transparency, DriveFlow Motors Manila was created to replace outdated, ambiguous dealership practices with clear, honest customer relationships.
          </p>
          <p className="font-body text-xs text-slate-400 leading-relaxed mb-5 sm:mb-6">
            From new luxury allocations to certified pre-owned executive sedans and SUVs, our team of dedicated automotive consultants ensures every vehicle meets stringent safety, mechanical, and documentation standards.
          </p>
          <span className="font-black text-sm sm:text-base text-white tracking-wider block">THE MANAGEMENT TEAM // DRIVEFLOW MOTORS</span>
        </div>
      </div>
    </section>
  );
}
