export default function Telemetry() {
  return (
    <section className="px-6 lg:px-16 py-12 bg-black border-b border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-carbon opacity-30 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-center relative z-10">
        <div className="flex-1">
          <p className="text-4xl font-bold italic text-red-500 tracking-tight">500+</p>
          <p className="text-[10px] font-semibold text-slate-400 uppercase mt-2 tracking-widest">Vehicles Delivered Nationwide</p>
        </div>
        
        <div className="hidden md:block w-px h-10 bg-white/10"></div>
        
        <div className="flex-1">
          <p className="text-4xl font-bold italic text-white tracking-tight">200-Pt</p>
          <p className="text-[10px] font-semibold text-slate-400 uppercase mt-2 tracking-widest">Master Vehicle Inspection</p>
        </div>
        
        <div className="hidden md:block w-px h-10 bg-white/10"></div>
        
        <div className="flex-1">
          <p className="text-4xl font-bold italic text-red-500 tracking-tight">15 Min</p>
          <p className="text-[10px] font-semibold text-slate-400 uppercase mt-2 tracking-widest">Loan Pre-Approval Time</p>
        </div>
        
        <div className="hidden md:block w-px h-10 bg-white/10"></div>
        
        <div className="flex-1">
          <p className="text-4xl font-bold italic text-white tracking-tight">100%</p>
          <p className="text-[10px] font-semibold text-slate-400 uppercase mt-2 tracking-widest">Clean Title & Flood-Free</p>
        </div>
      </div>
    </section>
  );
}
