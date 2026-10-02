export default function Telemetry() {
  return (
    <section className="px-6 lg:px-16 py-12 bg-black border-b border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-4 border-b-2 border-red-600 bg-[#121218]">
          <p className="text-4xl font-black text-red-500">500+</p>
          <p className="text-xs font-bold text-slate-400 uppercase mt-1">Vehicles Delivered Nationwide</p>
        </div>
        <div className="p-4 border-b-2 border-red-600 bg-[#121218]">
          <p className="text-4xl font-black text-white">200-Pt</p>
          <p className="text-xs font-bold text-slate-400 uppercase mt-1">Master Vehicle Inspection</p>
        </div>
        <div className="p-4 border-b-2 border-red-600 bg-[#121218]">
          <p className="text-4xl font-black text-red-500">15 Min</p>
          <p className="text-xs font-bold text-slate-400 uppercase mt-1">Loan Pre-Approval Time</p>
        </div>
        <div className="p-4 border-b-2 border-red-600 bg-[#121218]">
          <p className="text-4xl font-black text-white">100%</p>
          <p className="text-xs font-bold text-slate-400 uppercase mt-1">Clean Title & Flood-Free Guarantee</p>
        </div>
      </div>
    </section>
  );
}
