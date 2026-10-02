'use client';

export default function Promotions() {
  const claimPitPass = () => {
    alert(`[Scuderia Pit Pass Locked]\n\nChassis: Free Michelin Cup 2 Pack\nTarget Outlay: Included\n\nOur race telemetry pit crew will call your mobile within 15 minutes.`);
  };

  return (
    <section className="px-6 lg:px-16 py-12 bg-racing-red text-black border-b border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 skew-12 inline-block mb-1">
            <span className="unskew-12 inline-block">LIMITED QUARTERLY TRACK PACK</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-black italic uppercase">FREE SET OF MICHELIN PILOT SPORT CUP 2 TIRES</h3>
          <p className="text-xs font-bold mt-1">Included with every pole position sports coupé purchase booked before end of month.</p>
        </div>
        <button onClick={claimPitPass} className="bg-black text-white hover:bg-white hover:text-black px-8 py-3 text-xs font-black uppercase tracking-wider transition whitespace-nowrap skew-12">
          <span className="unskew-12 inline-block">Claim Track Rubber</span>
        </button>
      </div>
    </section>
  );
}
