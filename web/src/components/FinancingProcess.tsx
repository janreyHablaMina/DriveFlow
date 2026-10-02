export default function FinancingProcess() {
  return (
    <section className="px-6 lg:px-16 py-14 border-b border-white/10 bg-carbon">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-black text-red-500 uppercase tracking-widest">// HOW IT WORKS</span>
          <h2 className="text-3xl font-black italic uppercase mt-1">Simple 4-Step Purchase Process</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-5 bg-black/70 border border-white/10">
            <p className="text-red-500 font-black text-2xl mb-1">STAGE 1</p>
            <h4 className="font-black text-xs uppercase text-white">Select Vehicle</h4>
            <p className="font-body text-[11px] text-slate-400 mt-1">Browse our online inventory and schedule an in-person viewing or test drive.</p>
          </div>
          <div className="p-5 bg-black/70 border border-white/10">
            <p className="text-red-500 font-black text-2xl mb-1">STAGE 2</p>
            <h4 className="font-black text-xs uppercase text-white">15-Min Loan Check</h4>
            <p className="font-body text-[11px] text-slate-400 mt-1">Fast-track bank pre-approval with competitive low interest auto financing.</p>
          </div>
          <div className="p-5 bg-black/70 border border-white/10">
            <p className="text-red-500 font-black text-2xl mb-1">STAGE 3</p>
            <h4 className="font-black text-xs uppercase text-white">Vehicle Prep & Detailing</h4>
            <p className="font-body text-[11px] text-slate-400 mt-1">Full 200-point re-inspection, interior detailing, and ceramic protective coating.</p>
          </div>
          <div className="p-5 bg-black/70 border border-white/10">
            <p className="text-red-500 font-black text-2xl mb-1">STAGE 4</p>
            <h4 className="font-black text-xs uppercase text-white">Vehicle Handover</h4>
            <p className="font-body text-[11px] text-slate-400 mt-1">Enclosed door-to-door delivery or ceremonial showroom handover with complete documents.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
