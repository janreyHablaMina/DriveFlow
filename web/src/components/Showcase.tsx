'use client';

import { useState } from 'react';

export default function Showcase() {
  const [livery, setLivery] = useState('Rosso Corsa Metallic Red');
  const [imgUrl, setImgUrl] = useState('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80');

  const updateLivery = (name: string, url: string) => {
    setLivery(name);
    setImgUrl(url);
  };

  const reserveVehicle = () => {
    alert(`[Vehicle Spec Inquiry Saved]\nColor Finish: ${livery}\n\nOur client advisor will check current stock availability for this exterior paint spec.`);
  };

  return (
    <section id="section-showcase" className="px-6 lg:px-16 py-16 border-b border-white/10 bg-carbon">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="h-80 bg-slate-900 border border-red-600/40 overflow-hidden relative">
          <img src={imgUrl} alt="Showcase Car" className="w-full h-full object-cover transition-all duration-500" />
          <div className="absolute bottom-3 left-3 bg-black/90 px-3 py-1 text-xs font-black text-red-500 border border-red-600/50">
            FINISH: <span className="text-white">{livery}</span>
          </div>
        </div>

        <div>
          <span className="text-xs font-black uppercase text-red-500 tracking-widest">// CUSTOM STUDIO</span>
          <h2 className="text-3xl font-black italic uppercase mt-1 mb-4">Exterior & Finish Studio</h2>
          <p className="font-body text-xs text-slate-300 leading-relaxed mb-6">
            Preview our inventory in signature exterior paint finishes. Every car is delivered with multi-stage paint decontamination and professional ceramic coat protection.
          </p>

          <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">Select Exterior Color:</p>
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={() => updateLivery('Rosso Corsa Metallic Red', 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80')} 
              title="Rosso Corsa Metallic Red"
              className="w-8 h-8 rounded-full bg-red-600 border-2 border-white shadow-lg cursor-pointer transition hover:scale-110"
            ></button>
            <button 
              onClick={() => updateLivery('Nardo Stealth Grey', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80')} 
              title="Nardo Stealth Grey"
              className="w-8 h-8 rounded-full bg-slate-400 border-2 border-slate-600 hover:border-white cursor-pointer transition hover:scale-110"
            ></button>
            <button 
              onClick={() => updateLivery('Obsidian Black Metallic', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80')} 
              title="Obsidian Black Metallic"
              className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-slate-500 hover:border-white cursor-pointer transition hover:scale-110"
            ></button>
          </div>

          <button onClick={reserveVehicle} className="bg-racing-red hover:bg-red-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-white skew-12 inline-block">
            <span className="unskew-12 inline-block">Inquire In This Color</span>
          </button>
        </div>
      </div>
    </section>
  );
}
