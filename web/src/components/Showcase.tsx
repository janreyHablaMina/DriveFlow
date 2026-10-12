'use client';

import { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

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
    <section id="section-showcase" className="px-6 lg:px-12 py-16 border-b border-white/10 bg-carbon">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="h-80 bg-slate-900 border border-red-600/40 overflow-hidden relative rounded-sm shadow-xl group">
              <img 
                src={imgUrl} 
                alt="Showcase Car" 
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 bg-black/90 px-3 py-1 text-xs font-black text-red-500 border border-red-600/50 backdrop-blur-sm">
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
                  className={`w-8 h-8 rounded-full bg-red-600 border-2 cursor-pointer transition-transform duration-300 hover:scale-110 ${livery === 'Rosso Corsa Metallic Red' ? 'border-white scale-110 shadow-[0_0_12px_rgba(220,38,38,0.8)]' : 'border-transparent'}`}
                ></button>
                <button 
                  onClick={() => updateLivery('Nardo Stealth Grey', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80')} 
                  title="Nardo Stealth Grey"
                  className={`w-8 h-8 rounded-full bg-slate-400 border-2 cursor-pointer transition-transform duration-300 hover:scale-110 ${livery === 'Nardo Stealth Grey' ? 'border-white scale-110 shadow-[0_0_12px_rgba(200,200,200,0.8)]' : 'border-transparent'}`}
                ></button>
                <button 
                  onClick={() => updateLivery('Obsidian Black Metallic', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80')} 
                  title="Obsidian Black Metallic"
                  className={`w-8 h-8 rounded-full bg-zinc-900 border-2 cursor-pointer transition-transform duration-300 hover:scale-110 ${livery === 'Obsidian Black Metallic' ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'border-transparent'}`}
                ></button>
              </div>

              <button onClick={reserveVehicle} className="button-shimmer bg-racing-red hover:bg-white hover:text-black px-6 py-3 text-xs font-black uppercase tracking-wider text-white skew-12 inline-block transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.3)] cursor-pointer">
                <span className="unskew-12 inline-block">Inquire In This Color</span>
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
