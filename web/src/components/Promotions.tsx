'use client';

export default function Promotions() {
  const claimOffer = () => {
    alert(`[Promo Code Claimed: FREE-CERAMIC-2026]\n\nA free set of Michelin Pilot tires or complimentary ceramic coating package has been attached to your profile.`);
  };

  return (
    <section className="px-6 lg:px-16 py-12 bg-racing-red text-black border-b border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 skew-12 inline-block mb-1">
            <span className="unskew-12 inline-block">LIMITED SHOWROOM PROMO</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-black italic uppercase">FREE 1-YEAR COMPREHENSIVE INSURANCE + CERAMIC COATING</h3>
          <p className="text-xs font-bold mt-1">Included with every vehicle purchase or reservation confirmed before the end of this month.</p>
        </div>
        <button onClick={claimOffer} className="bg-black text-white hover:bg-white hover:text-black px-8 py-3 text-xs font-black uppercase tracking-wider transition whitespace-nowrap skew-12">
          <span className="unskew-12 inline-block">Claim Special Offer</span>
        </button>
      </div>
    </section>
  );
}
