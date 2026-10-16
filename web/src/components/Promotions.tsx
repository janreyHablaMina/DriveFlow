'use client';

export default function Promotions() {
  const claimOffer = () => {
    alert(`[Promo Code Claimed: FREE-CERAMIC-2026]\n\nA free set of Michelin Pilot tires or complimentary ceramic coating package has been attached to your profile.`);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-8 sm:py-12 bg-racing-red text-black border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-6 text-center md:text-left">
        <div>
          <span className="bg-black text-white text-[10px] font-black uppercase px-2.5 py-0.5 skew-12 inline-block mb-2">
            <span className="unskew-12 inline-block">LIMITED SHOWROOM PROMO</span>
          </span>
          <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black italic uppercase leading-snug">FREE 1-YEAR COMPREHENSIVE INSURANCE + CERAMIC COATING</h3>
          <p className="text-xs font-bold mt-1.5 opacity-90">Included with every vehicle purchase or reservation confirmed before the end of this month.</p>
        </div>
        <button onClick={claimOffer} className="w-full sm:w-auto bg-black text-white hover:bg-white hover:text-black active:bg-zinc-800 px-6 sm:px-8 py-3.5 sm:py-3 text-xs font-black uppercase tracking-wider transition whitespace-nowrap sm:skew-12 cursor-pointer shrink-0">
          <span className="sm:unskew-12 inline-block">Claim Special Offer</span>
        </button>
      </div>
    </section>
  );
}
