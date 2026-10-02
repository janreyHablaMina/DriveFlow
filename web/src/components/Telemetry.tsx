export default function Telemetry() {
  return (
    <section className="px-6 lg:px-16 py-12 bg-black border-b border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-4 border-b-2 border-red-600 bg-[#121218]">
          <p className="text-4xl font-black text-red-500">1:54.2</p>
          <p className="text-xs font-bold text-slate-400 uppercase mt-1">Clark Speedway Lap Record</p>
        </div>
        <div className="p-4 border-b-2 border-red-600 bg-[#121218]">
          <p className="text-4xl font-black text-white">332 KPH</p>
          <p className="text-xs font-bold text-slate-400 uppercase mt-1">SCTEX Speed Trap Record</p>
        </div>
        <div className="p-4 border-b-2 border-red-600 bg-[#121218]">
          <p className="text-4xl font-black text-red-500">1.42 G</p>
          <p className="text-xs font-bold text-slate-400 uppercase mt-1">Peak Lateral Cornering</p>
        </div>
        <div className="p-4 border-b-2 border-red-600 bg-[#121218]">
          <p className="text-4xl font-black text-white">31.2 M</p>
          <p className="text-xs font-bold text-slate-400 uppercase mt-1">100-0 KPH Stopping Distance</p>
        </div>
      </div>
    </section>
  );
}
