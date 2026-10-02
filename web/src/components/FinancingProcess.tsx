export default function FinancingProcess() {
  return (
    <section className="px-6 lg:px-16 py-14 border-b border-white/10 bg-carbon">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-black text-red-500 uppercase tracking-widest">// PROTOCOL</span>
          <h2 className="text-3xl font-black italic uppercase mt-1">The 4-Stage Pit Stop Sprint</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-5 bg-black/70 border border-white/10">
            <p className="text-red-500 font-black text-2xl mb-1">STAGE 1</p>
            <h4 className="font-black text-xs uppercase text-white">Chassis Telemetry</h4>
            <p className="font-body text-[11px] text-slate-400 mt-1">Pick your chassis and review the full Clark Speedway lap telemetry file.</p>
          </div>
          <div className="p-5 bg-black/70 border border-white/10">
            <p className="text-red-500 font-black text-2xl mb-1">STAGE 2</p>
            <h4 className="font-black text-xs uppercase text-white">15-Min Pit Credit</h4>
            <p className="font-body text-[11px] text-slate-400 mt-1">Fast-tracked bank pre-approval with preferential commercial auto rates.</p>
          </div>
          <div className="p-5 bg-black/70 border border-white/10">
            <p className="text-red-500 font-black text-2xl mb-1">STAGE 3</p>
            <h4 className="font-black text-xs uppercase text-white">Clark Shakedown</h4>
            <p className="font-body text-[11px] text-slate-400 mt-1">Trackside trial run with tire temperature and brake pad calibration.</p>
          </div>
          <div className="p-5 bg-black/70 border border-white/10">
            <p className="text-red-500 font-black text-2xl mb-1">STAGE 4</p>
            <h4 className="font-black text-xs uppercase text-white">Chequered Flag</h4>
            <p className="font-body text-[11px] text-slate-400 mt-1">Doorstep flatbed haul with full documentation and ceremonial keys.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
