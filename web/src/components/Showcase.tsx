'use client';

import { useState } from 'react';

export default function Showcase() {
  const [livery, setLivery] = useState('Rosso Corsa Racing Red');
  const [imgUrl, setImgUrl] = useState('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80');

  const updateLivery = (name: string, url: string) => {
    setLivery(name);
    setImgUrl(url);
  };

  const claimPitPass = () => {
    alert(`[Scuderia Pit Pass Locked]\n\nChassis: Configured Homologation Special\nTarget Outlay: ₱5,800,000\n\nOur race telemetry pit crew will call your mobile within 15 minutes.`);
  };

  return (
    <section id="section-showcase" className="px-6 lg:px-16 py-16 border-b border-white/10 bg-carbon">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="h-80 bg-slate-900 border border-red-600/40 overflow-hidden relative">
          <img src={imgUrl} alt="Showcase Car" className="w-full h-full object-cover transition-all duration-500" />
          <div className="absolute bottom-3 left-3 bg-black/90 px-3 py-1 text-xs font-black text-red-500 border border-red-600/50">
            LIVERY: <span className="text-white">{livery}</span>
          </div>
        </div>

        <div>
          <span className="text-xs font-black uppercase text-red-500 tracking-widest">// AERO TUNNEL RIG</span>
          <h2 className="text-3xl font-black italic uppercase mt-1 mb-4">Dual Swan-Neck Downforce Pack</h2>
          <p className="font-body text-xs text-slate-300 leading-relaxed mb-6">
            Generating 400kg of functional downforce at 200 KPH. Carbon ceramic brake rotors with six-piston monobloc racing calipers and titanium hub center-locks.
          </p>

          <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">Select Circuit Livery:</p>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => updateLivery('Rosso Corsa Racing Red', 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80')} className="w-8 h-8 rounded-full bg-red-600 border-2 border-white shadow-lg cursor-pointer"></button>
            <button onClick={() => updateLivery('Nardo Stealth Grey', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80')} className="w-8 h-8 rounded-full bg-slate-400 border-2 border-slate-600 hover:border-white cursor-pointer"></button>
            <button onClick={() => updateLivery('Obsidian Black Carbon', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80')} className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-slate-500 hover:border-white cursor-pointer"></button>
          </div>

          <button onClick={claimPitPass} className="bg-racing-red hover:bg-red-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-white skew-12 inline-block">
            <span className="unskew-12 inline-block">Reserve Configured Spec</span>
          </button>
        </div>
      </div>
    </section>
  );
}
